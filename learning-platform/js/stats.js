// ===== STATS VIEW =====

const Stats = {
  render() {
    this.renderOverview();
    this.renderQuizHistory();
    this.renderTopicPerf();
    this.renderCalendar();
  },

  renderOverview() {
    const stats = App.getStats();
    const container = document.getElementById('statsOverview');
    container.innerHTML = `
      <div class="stat-item"><div class="stat-value">${stats.xp}</div><div class="stat-label">Total XP</div></div>
      <div class="stat-item"><div class="stat-value">${stats.streak}</div><div class="stat-label">Day Streak</div></div>
      <div class="stat-item"><div class="stat-value">${stats.quizzesTaken}</div><div class="stat-label">Quizzes</div></div>
      <div class="stat-item"><div class="stat-value">${stats.perfectQuizzes}</div><div class="stat-label">Perfect</div></div>
      <div class="stat-item"><div class="stat-value">${stats.flashcardReviews}</div><div class="stat-label">FC Reviews</div></div>
      <div class="stat-item"><div class="stat-value">${stats.level}</div><div class="stat-label">Level</div></div>
    `;
  },

  renderQuizHistory() {
    const history = App.getQuizHistory();
    const container = document.getElementById('statsQuizHistory');
    if (history.length === 0) {
      container.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem">No quizzes taken yet.</p>';
      return;
    }
    let html = '';
    history.slice().reverse().slice(0, 20).forEach(h => {
      const date = new Date(h.date).toLocaleDateString();
      const color = h.pct === 100 ? 'var(--green)' : h.pct >= 80 ? 'var(--green)' : h.pct >= 60 ? 'var(--yellow)' : 'var(--red)';
      html += `<div class="history-item">
        <span>${date}</span>
        <span style="color:${color};font-weight:700">${h.score}/${h.total} (${h.pct}%)</span>
      </div>`;
    });
    container.innerHTML = html;
  },

  renderTopicPerf() {
    const mastery = App.getMastery();
    const container = document.getElementById('statsTopicPerf');
    let html = '';
    TOPICS.forEach(topic => {
      const m = mastery[topic.id] || { correct: 0, total: 0 };
      const pct = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
      const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--yellow)' : pct > 0 ? 'var(--red)' : 'var(--text-dim)';
      html += `<div class="perf-item">
        <span>${topic.label.split('— ')[1] || topic.label}</span>
        <span style="color:${color};font-weight:700">${m.correct}/${m.total} (${pct}%)</span>
      </div>`;
    });
    container.innerHTML = html;
  },

  renderCalendar() {
    const container = document.getElementById('statsCalendar');
    // Last 35 days
    const days = [];
    for (let i = 34; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const key = 'jm_checkin_' + dateStr;
      const checkin = JSON.parse(localStorage.getItem(key) || '{}');
      const doneCount = Object.values(checkin).filter(Boolean).length;
      days.push({ date: d, doneCount });
    }

    let html = '';
    days.forEach(d => {
      const dayNum = d.date.getDate();
      let cls = 'calendar-day';
      if (d.doneCount >= 5) cls += ' studied-strong';
      else if (d.doneCount > 0) cls += ' studied';
      html += `<div class="${cls}" title="${d.date.toDateString()}: ${d.doneCount} items">${dayNum}</div>`;
    });
    container.innerHTML = html;
  },
};

if (typeof window !== 'undefined') window.Stats = Stats;
