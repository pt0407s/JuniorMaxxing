#!/usr/bin/env python3
"""
Grade Calculator — computes running averages from grade-tracker.csv
Shows current standing in every class with the 60/40 weighting.

Usage:
    python3 grade-calculator.py                  # reads grade-tracker.csv
    python3 grade-calculator.py --file other.csv  # custom file

The CSV format (from grade-tracker.csv):
    Class,Assignment,Category,Grade,Date,Notes

Category must be "Major" or "Minor". Grade is a number 0-100.
"""

import csv
import sys
import os
from collections import defaultdict
from datetime import datetime

WEIGHTS = {"Major": 0.60, "Minor": 0.40}

def load_grades(filepath):
    """Load grades from CSV, grouped by class."""
    classes = defaultdict(lambda: {"Major": [], "Minor": []})
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cls = row.get("Class", "").strip()
            category = row.get("Category", "").strip()
            grade_str = row.get("Grade", "").strip()
            if not cls or not category or not grade_str:
                continue
            if category not in WEIGHTS:
                continue
            try:
                grade = float(grade_str)
            except ValueError:
                continue
            classes[cls][category].append(grade)
    return classes

def compute_weighted_avg(major_grades, minor_grades):
    """Compute weighted average. If a category is empty, reweight to the other."""
    major_avg = sum(major_grades) / len(major_grades) if major_grades else None
    minor_avg = sum(minor_grades) / len(minor_grades) if minor_grades else None

    if major_avg is not None and minor_avg is not None:
        overall = major_avg * WEIGHTS["Major"] + minor_avg * WEIGHTS["Minor"]
        breakdown = f"Major: {major_avg:.1f} (n={len(major_grades)}, 60%) + Minor: {minor_avg:.1f} (n={len(minor_grades)}, 40%)"
    elif major_avg is not None:
        overall = major_avg
        breakdown = f"Major only: {major_avg:.1f} (n={len(major_grades)}) — no minor grades yet"
    elif minor_avg is not None:
        overall = minor_avg
        breakdown = f"Minor only: {minor_avg:.1f} (n={len(minor_grades)}) — no major grades yet"
    else:
        return None, "No grades entered yet"

    return overall, breakdown

def main():
    filepath = "grade-tracker.csv"
    if "--file" in sys.argv:
        idx = sys.argv.index("--file")
        filepath = sys.argv[idx + 1]

    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found")
        sys.exit(1)

    classes = load_grades(filepath)

    if not classes:
        print("No grades found in", filepath)
        print("Add grades with: Class,Assignment,Category,Grade,Date,Notes")
        print("Category must be 'Major' or 'Minor'")
        return

    print("=" * 70)
    print(f"  GRADE TRACKER — {datetime.now().strftime('%b %d, %Y %I:%M %p')}")
    print(f"  Weighting: 60% Major / 40% Minor (universal)")
    print("=" * 70)
    print()

    target = 100.0
    all_on_track = True

    for cls in sorted(classes.keys()):
        major = classes[cls]["Major"]
        minor = classes[cls]["Minor"]
        overall, breakdown = compute_weighted_avg(major, minor)

        if overall is None:
            print(f"  {cls}: No grades yet")
            print()
            continue

        status = "ON TRACK" if overall >= target else f"BEHIND by {target - overall:.1f}"
        if overall < target:
            all_on_track = False

        bar_len = 30
        filled = int(overall / 100 * bar_len) if overall <= 100 else bar_len
        bar = "█" * filled + "░" * (bar_len - filled)

        print(f"  {cls}")
        print(f"  {bar} {overall:.1f}/100  [{status}]")
        print(f"  {breakdown}")
        print()

    print("=" * 70)
    if all_on_track:
        print("  ALL CLASSES AT 100. Keep going.")
    else:
        print("  Some classes below 100. Check what's coming next and prep for it.")
    print("=" * 70)

if __name__ == "__main__":
    main()
