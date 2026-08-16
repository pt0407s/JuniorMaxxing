// ===== GRADE TRACKER =====
// 60% Major / 40% Minor weighting (universal for Legacy Ranch HS)

const Grades = {
  classes: ['AP Bio','AP Chem','AP Physics 1','AP Precalc','APUSH','AP Lang','Mobile App DEV','Entrepreneurship'],

  getAll() {
    return JSON.parse(localStorage.getItem('jm_grades') || '[]');
  },

  add(cls, assignment, category, score) {
    const grades = this.getAll();
    grades.push({ class: cls, assignment, category, score: parseFloat(score), date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('jm_grades', JSON.stringify(grades));
    this.render();
  },

  remove(idx) {
    const grades = this.getAll();
    grades.splice(idx, 1);
    localStorage.setItem('jm_grades', JSON.stringify(grades));
    this.render();
  },

  computeAvg(cls) {
    const grades = this.getAll();
    const major = grades.filter(g => g.class === cls && g.category === 'Major');
    const minor = grades.filter(g => g.class === cls && g.category === 'Minor');
    const majorAvg = major.length ? major.reduce((s,g) => s + g.score, 0) / major.length : null;
    const minorAvg = minor.length ? minor.reduce((s,g) => s + g.score, 0) / minor.length : null;
    if (majorAvg !== null && minorAvg !== null) return majorAvg * 0.6 + minorAvg * 0.4;
    if (majorAvg !== null) return majorAvg;
    if (minorAvg !== null) return minorAvg;
    return null;
  },

  render() {
    // Standings
    const standingsDiv = document.getElementById('gradeStandings');
    let html = '';
    this.classes.forEach(cls => {
      const avg = this.computeAvg(cls);
      const pct = avg !== null ? Math.min(avg, 100) : 0;
      const color = avg === null ? '#333' : avg >= 97 ? 'var(--green)' : avg >= 90 ? 'var(--yellow)' : 'var(--red)';
      const display = avg !== null ? avg.toFixed(1) : '—';
      html += `<div class="grade-standing">
        <div class="grade-standing-header">
          <span class="grade-standing-name">${cls}</span>
          <span class="grade-standing-score" style="color:${color}">${display}</span>
        </div>
        <div class="grade-standing-bar"><div class="grade-standing-fill" style="width:${pct}%;background:${color}"></div></div>
      </div>`;
    });
    standingsDiv.innerHTML = html;

    // All grades list
    const allDiv = document.getElementById('allGradesList');
    const all = this.getAll();
    if (all.length === 0) {
      allDiv.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem">No grades logged yet.</p>';
    } else {
      let listHtml = '';
      all.forEach((g, i) => {
        listHtml += `<div class="grade-entry">
          <span><strong>${g.class}</strong> — ${g.assignment} <span style="color:var(--text-dim)">(${g.category})</span></span>
          <span style="display:flex;align-items:center;gap:10px">
            <span style="font-weight:700;color:${g.score >= 97 ? 'var(--green)' : g.score >= 90 ? 'var(--yellow)' : 'var(--red)'}">${g.score}</span>
            <button class="del-btn" onclick="Grades.remove(${i})">✕</button>
          </span>
        </div>`;
      });
      allDiv.innerHTML = listHtml;
    }
  },

  exportCSV() {
    const grades = this.getAll();
    let csv = 'Class,Assignment,Category,Grade,Date\n';
    grades.forEach(g => { csv += `${g.class},${g.assignment},${g.category},${g.score},${g.date}\n`; });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'grade-tracker-export.csv';
    a.click();
  },

  initSelects() {
    const classSelect = document.getElementById('gradeClassSelect');
    classSelect.innerHTML = this.classes.map(c => `<option>${c}</option>`).join('');
  },
};

if (typeof window !== 'undefined') window.Grades = Grades;
