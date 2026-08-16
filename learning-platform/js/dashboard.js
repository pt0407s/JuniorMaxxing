// ===== DASHBOARD VIEW =====
// Renders: today's review count, mastery bars, AP countdown,
// daily check-in, badges, schedule

const Dashboard = {
  apExams: [
    { name: 'AP Biology', date: '2027-05-03', session: 'Afternoon' },
    { name: 'AP Physics 1', date: '2027-05-05', session: 'Afternoon' },
    { name: 'AP Chemistry', date: '2027-05-06', session: 'Afternoon' },
    { name: 'APUSH', date: '2027-05-07', session: 'Afternoon' },
    { name: 'AP Precalculus', date: '2027-05-11', session: 'Morning' },
    { name: 'AP English Lang', date: '2027-05-12', session: 'Morning' },
  ],

  checkinItems: [
    'Did 1 Anki card per AP class (6 cards)',
    'Checked every class for tomorrow\'s due items',
    'Logged every grade received today',
    'Identified the ONE most important thing for tomorrow',
    'Phone charging in another room',
    'Backpack ready by the door',
    'Study materials set up for tomorrow',
  ],

  badges: [
    { id: 'first_quiz', icon: '🎓', name: 'First Quiz', condition: s => s.quizzesTaken >= 1 },
    { id: 'ten_quizzes', icon: '📚', name: '10 Quizzes', condition: s => s.quizzesTaken >= 10 },
    { id: 'perfect_quiz', icon: '🎯', name: 'Perfect Score', condition: s => s.perfectQuizzes >= 1 },
    { id: 'streak_7', icon: '🔥', name: '7-Day Streak', condition: s => s.streak >= 7 },
    { id: 'streak_30', icon: '⚡', name: '30-Day Streak', condition: s => s.streak >= 30 },
    { id: 'xp_100', icon: '💯', name: '100 XP', condition: s => s.xp >= 100 },
    { id: 'xp_500', icon: '🌟', name: '500 XP', condition: s => s.xp >= 500 },
    { id: 'xp_1000', icon: '🚀', name: '1000 XP', condition: s => s.xp >= 1000 },
    { id: 'flashcards_50', icon: '🃏', name: '50 Reviews', condition: s => s.flashcardReviews >= 50 },
    { id: 'all_topics', icon: '🏆', name: 'All Topics Started', condition: s => s.topicsStarted >= TOPICS.length },
  ],

  schedule: {
    A: ['Mobile App DEV', 'APUSH', 'AP Precalc', 'AP Lang'],
    B: ['AP Bio', 'AP Chem', 'Entrepreneurship', 'AP Physics 1'],
  },

  render() {
    this.renderDueCount();
    this.renderMastery();
    this.renderCountdown();
    this.renderCheckin();
    this.renderBadges();
    this.renderSchedule();
  },

  renderDueCount() {
    const cards = SRS.getAllCards();
    const due = Object.values(cards).filter(c => SRS.isDue(c)).length;
    document.getElementById('dueCount').textContent = due;
  },

  renderMastery() {
    const mastery = App.getMastery();
    const container = document.getElementById('masteryList');
    let html = '';
    TOPICS.forEach(topic => {
      const m = mastery[topic.id] || { correct: 0, total: 0 };
      const pct = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
      const color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--yellow)' : pct > 0 ? 'var(--red)' : '#333';
      html += `<div class="mastery-item">
        <div class="mastery-item-header">
          <span>${topic.label.split('— ')[1] || topic.label}</span>
          <span style="color:${color}">${pct}%</span>
        </div>
        <div class="mastery-bar-container">
          <div class="mastery-bar" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
    });
    container.innerHTML = html;
  },

  renderCountdown() {
    const container = document.getElementById('countdownList');
    let html = '';
    this.apExams.forEach(exam => {
      const days = Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
      const urgent = days <= 30;
      html += `<div class="countdown-item ${urgent ? 'urgent' : ''}">
        <div><div class="exam-name">${exam.name}</div>
        <div class="exam-date">${exam.date} • ${exam.session}</div></div>
        <div class="days">${days}d</div>
      </div>`;
    });
    container.innerHTML = html;
  },

  renderCheckin() {
    const today = new Date().toISOString().split('T')[0];
    const key = 'jm_checkin_' + today;
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    const container = document.getElementById('checkinList');
    let html = '';
    this.checkinItems.forEach((item, i) => {
      const done = state[i] || false;
      html += `<div class="checkin-item ${done ? 'done' : ''}" onclick="Dashboard.toggleCheckin(${i})">
        <div class="checkin-box"></div>
        <span class="checkin-text">${item}</span>
      </div>`;
    });
    container.innerHTML = html;
  },

  toggleCheckin(idx) {
    const today = new Date().toISOString().split('T')[0];
    const key = 'jm_checkin_' + today;
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    state[idx] = !state[idx];
    localStorage.setItem(key, JSON.stringify(state));
    this.renderCheckin();
    // XP for completing all
    if (Object.values(state).filter(Boolean).length === this.checkinItems.length) {
      App.addXP(15);
    }
  },

  renderBadges() {
    const stats = App.getStats();
    const container = document.getElementById('badgeList');
    let html = '';
    this.badges.forEach(badge => {
      const earned = badge.condition(stats);
      html += `<div class="badge ${earned ? 'earned' : 'locked'}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
      </div>`;
    });
    container.innerHTML = html;
  },

  renderSchedule() {
    const container = document.getElementById('scheduleDisplay');
    // Determine A or B day
    const schoolStart = new Date('2026-08-12');
    const today = new Date();
    let schoolDays = 0;
    for (let d = new Date(schoolStart); d <= today; d.setDate(d.getDate() + 1)) {
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) schoolDays++;
    }
    const dayType = schoolDays > 0 && schoolDays % 2 === 1 ? 'A' : 'B';

    const colors = {
      'AP Bio': '#ff6b6b', 'AP Chem': '#4ecdc4', 'AP Physics 1': '#ffe66d',
      'AP Precalc': '#a8e6cf', 'APUSH': '#ff8a65', 'AP Lang': '#81d4fa',
      'Mobile App DEV': '#ce93d8', 'Entrepreneurship': '#ffd54f',
    };

    let html = `<div class="schedule-day-label">Today: ${dayType} Day</div>`;
    this.schedule[dayType].forEach(cls => {
      html += `<div class="schedule-block" style="background:${colors[cls] || '#666'};color:#000">${cls}</div>`;
    });
    container.innerHTML = html;
  },
};

if (typeof window !== 'undefined') window.Dashboard = Dashboard;
