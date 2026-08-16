// ===== APP CORE =====
// Central state, XP, streak, mastery, navigation

const App = {
  xp: 0,
  streak: 0,
  level: 1,
  quizHistory: [],
  mastery: {},
  flashcardReviews: 0,
  perfectQuizzes: 0,
  topicsStarted: new Set(),

  init() {
    this.loadState();
    this.initSRS();
    this.initSelects();
    this.bindEvents();
    this.updateStreak();
    this.renderAll();
    this.updateHeader();
  },

  loadState() {
    this.xp = parseInt(localStorage.getItem('jm_xp') || '0');
    this.streak = parseInt(localStorage.getItem('jm_streak') || '0');
    this.quizHistory = JSON.parse(localStorage.getItem('jm_quiz_history') || '[]');
    this.mastery = JSON.parse(localStorage.getItem('jm_mastery') || '{}');
    this.flashcardReviews = parseInt(localStorage.getItem('jm_fc_reviews') || '0');
    this.perfectQuizzes = parseInt(localStorage.getItem('jm_perfect') || '0');
    const ts = JSON.parse(localStorage.getItem('jm_topics_started') || '[]');
    this.topicsStarted = new Set(ts);
  },

  saveState() {
    localStorage.setItem('jm_xp', this.xp);
    localStorage.setItem('jm_streak', this.streak);
    localStorage.setItem('jm_quiz_history', JSON.stringify(this.quizHistory));
    localStorage.setItem('jm_mastery', JSON.stringify(this.mastery));
    localStorage.setItem('jm_fc_reviews', this.flashcardReviews);
    localStorage.setItem('jm_perfect', this.perfectQuizzes);
    localStorage.setItem('jm_topics_started', JSON.stringify([...this.topicsStarted]));
  },

  initSRS() {
    const ids = QUESTIONS.map(q => q.id);
    SRS.initCards(ids);
  },

  initSelects() {
    // Quiz topic select
    const quizSelect = document.getElementById('quizTopicSelect');
    quizSelect.innerHTML = '<option value="all">All Topics (Interleaved)</option>' +
      TOPICS.map(t => `<option value="${t.id}">${t.label}</option>`).join('');

    // Flashcard deck select
    const fcSelect = document.getElementById('flashcardDeckSelect');
    fcSelect.innerHTML = '<option value="all">All Due Cards</option>' +
      TOPICS.map(t => `<option value="${t.id}">${t.label}</option>`).join('');

    // Grade class select
    Grades.initSelects();
  },

  bindEvents() {
    // Nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchView(btn.dataset.view));
    });

    // Quiz
    document.getElementById('startQuizBtn').addEventListener('click', () => {
      const topic = document.getElementById('quizTopicSelect').value;
      const count = document.getElementById('quizCountSelect').value;
      const scramble = document.getElementById('quizScrambleAns').checked;
      const timed = document.getElementById('quizTimedMode').checked;
      const pretest = document.getElementById('quizPretestMode').checked;
      const confidence = document.getElementById('quizConfidenceMode').checked;
      const elaboration = document.getElementById('quizElaborationMode').checked;
      this.topicsStarted.add(topic);
      Quiz.start(topic, count, scramble, timed, pretest, confidence, elaboration);
    });
    document.getElementById('retryQuizBtn').addEventListener('click', () => Quiz.start(
      document.getElementById('quizTopicSelect').value,
      document.getElementById('quizCountSelect').value,
      document.getElementById('quizScrambleAns').checked,
      document.getElementById('quizTimedMode').checked,
      document.getElementById('quizPretestMode').checked,
      document.getElementById('quizConfidenceMode').checked,
      document.getElementById('quizElaborationMode').checked
    ));

    // Study mode (worked examples)
    document.getElementById('studyWrongBtn').addEventListener('click', () => Quiz.startStudyMode());
    document.getElementById('studyNextBtn').addEventListener('click', () => Quiz.studyNext());
    document.getElementById('studyPrevBtn').addEventListener('click', () => Quiz.studyPrev());
    document.getElementById('studyExitBtn').addEventListener('click', () => Quiz.studyExit());
    document.getElementById('newQuizBtn').addEventListener('click', () => Quiz.reset());

    // Flashcards
    document.getElementById('startFlashBtn').addEventListener('click', () => {
      const deck = document.getElementById('flashcardDeckSelect').value;
      Flashcards.start(deck);
    });
    document.getElementById('flipCardBtn').addEventListener('click', () => Flashcards.flip());
    document.querySelectorAll('[data-rating]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.flashcardReviews++;
        Flashcards.rate(parseInt(btn.dataset.rating));
        this.saveState();
        this.updateHeader();
      });
    });

    // Grades
    document.getElementById('addGradeBtn').addEventListener('click', () => {
      const cls = document.getElementById('gradeClassSelect').value;
      const assignment = document.getElementById('gradeAssignmentInput').value.trim();
      const category = document.getElementById('gradeCategorySelect').value;
      const score = document.getElementById('gradeScoreInput').value;
      if (!assignment || !score) { alert('Enter assignment name and score'); return; }
      Grades.add(cls, assignment, category, score);
      document.getElementById('gradeAssignmentInput').value = '';
      document.getElementById('gradeScoreInput').value = '';
    });
    document.getElementById('exportGradesBtn').addEventListener('click', () => Grades.exportCSV());

    // Dashboard start review
    document.getElementById('startReviewBtn').addEventListener('click', () => {
      this.switchView('flashcards');
      Flashcards.start('all');
    });
  },

  switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${view}`).classList.add('active');
    if (view === 'dashboard') Dashboard.render();
    if (view === 'grades') Grades.render();
    if (view === 'stats') Stats.render();
  },

  addXP(amount) {
    this.xp += amount;
    const newLevel = Math.floor(this.xp / 100) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
    }
    this.saveState();
    this.updateHeader();
  },

  updateStreak() {
    const lastVisit = localStorage.getItem('jm_last_visit');
    const today = new Date().toISOString().split('T')[0];
    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split('T')[0];
      if (lastVisit === yStr) {
        this.streak++;
      } else if (lastVisit !== today) {
        this.streak = 1;
      }
      localStorage.setItem('jm_last_visit', today);
      localStorage.setItem('jm_streak', this.streak);
    }
  },

  updateHeader() {
    document.getElementById('xpValue').textContent = this.xp;
    document.getElementById('levelBadge').textContent = `Lvl ${this.level}`;
    document.getElementById('streakValue').textContent = this.streak;
  },

  saveQuizHistory(result) {
    this.quizHistory.push(result);
    if (result.pct === 100) this.perfectQuizzes++;
    this.saveState();
  },

  updateMastery(topicId, correct) {
    if (!this.mastery[topicId]) this.mastery[topicId] = { correct: 0, total: 0 };
    this.mastery[topicId].total++;
    if (correct) this.mastery[topicId].correct++;
    this.saveState();
  },

  getMastery() { return this.mastery; },

  getStats() {
    return {
      xp: this.xp,
      streak: this.streak,
      level: this.level,
      quizzesTaken: this.quizHistory.length,
      perfectQuizzes: this.perfectQuizzes,
      flashcardReviews: this.flashcardReviews,
      topicsStarted: this.topicsStarted.size,
    };
  },

  getQuizHistory() { return this.quizHistory; },

  renderAll() {
    Dashboard.render();
    Grades.render();
    Stats.render();
  },

  renderDashboard() { Dashboard.render(); },
};

document.addEventListener('DOMContentLoaded', () => App.init());
if (typeof window !== 'undefined') window.App = App;
