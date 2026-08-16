# AGENTS.md — Project Rules for JuniorMaxxing

## Always commit to GitHub

**Every change must be committed and pushed.** No exceptions.

After creating or editing any file in this repo:
1. `git add -A`
2. `git commit -m "<descriptive message>"`
3. `git push`

If multiple files were changed in one session, one commit is fine — just describe all changes in the message.

## Repo structure

- Root `.md` files = system documents (strategy, discipline, grading, calendar, etc.)
- `AP-<Class>/` folders = per-class materials (study plans, syllabi, units, notes)
- `grade-tracker.csv` = the source of truth for grades
- `grade-calculator.py` = reads the CSV, outputs weighted averages
- `dashboard.html` = interactive learning dashboard (open in browser)
- `BEFORE-DAY-1.md` = one-day prep plan

## Conventions

- All documents cross-reference each other with markdown links
- Targets are always "100" (not 97+ or "aim for an A")
- Grading is universally 60% Major / 40% Minor
- School: Legacy Ranch HS, Liberty Hill TX, block schedule A/B days
- AP exams: May 3-12, 2027 (confirmed College Board dates)

## User context

- High school junior, 2026-27
- 6 APs + 2 electives
- Goal: 100 in every class
- Uses Anki for spaced repetition
- Phone stays in another room while studying
