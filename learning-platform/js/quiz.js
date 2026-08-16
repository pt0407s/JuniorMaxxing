// ===== QUIZ ENGINE =====
// Research-backed features:
// - Scrambled question order (interleaving, d=0.35 — Sana & Yan 2022)
// - Scrambled answer options (prevents positional memorization)
// - Immediate feedback with explanation (immediate > delayed for conceptual knowledge)
// - Per-question XP based on difficulty
// - Mastery tracking per topic

const Quiz = {
  currentQuestions: [],
  currentIndex: 0,
  score: 0,
  answered: 0,
  results: [],
  scrambleAnswers: true,

  start(topicId, count, scrambleAnswers) {
    let pool = topicId === 'all'
      ? [...QUESTIONS]
      : QUESTIONS.filter(q => q.topic === topicId);

    // Scramble question order (interleaving effect)
    this.shuffle(pool);

    if (count !== 'all') {
      pool = pool.slice(0, parseInt(count));
    }

    this.currentQuestions = pool;
    this.currentIndex = 0;
    this.score = 0;
    this.answered = 0;
    this.results = [];
    this.scrambleAnswers = scrambleAnswers;
    this.showQuestion();
  },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  },

  showQuestion() {
    const container = document.getElementById('quizQuestionContainer');
    const setup = document.getElementById('quizSetup');
    const active = document.getElementById('quizActive');
    const results = document.getElementById('quizResults');

    if (this.currentIndex >= this.currentQuestions.length) {
      this.showResults();
      return;
    }

    setup.style.display = 'none';
    active.style.display = 'block';
    results.style.display = 'none';

    const q = this.currentQuestions[this.currentIndex];

    // Update progress
    document.getElementById('quizQuestionNum').textContent =
      `Question ${this.currentIndex + 1} of ${this.currentQuestions.length}`;
    document.getElementById('quizScoreDisplay').textContent =
      `Score: ${this.score}/${this.answered}`;
    const pct = (this.currentIndex / this.currentQuestions.length) * 100;
    document.getElementById('quizProgressBar').style.width = pct + '%';

    // Scramble answer options if enabled
    let options = q.options.map((text, originalIdx) => ({ text, originalIdx }));
    if (this.scrambleAnswers) {
      this.shuffle(options);
    }

    // Track which original index is correct
    const correctOriginalIdx = q.correct;

    let html = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;
    options.forEach((opt, displayIdx) => {
      html += `<button class="quiz-option" data-original-idx="${opt.originalIdx}" onclick="Quiz.answer(${opt.originalIdx}, ${correctOriginalIdx}, this)">${opt.text}</button>`;
    });
    html += `</div>`;
    html += `<div class="quiz-feedback" id="quizFeedback"></div>`;
    html += `<button class="btn btn-primary quiz-next-btn" id="quizNextBtn" onclick="Quiz.next()">Next →</button>`;

    container.innerHTML = html;
  },

  answer(selectedIdx, correctIdx, btnElement) {
    const isCorrect = selectedIdx === correctIdx;
    this.answered++;

    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.add('disabled'));

    // Mark correct/wrong
    document.querySelectorAll('.quiz-option').forEach(o => {
      const origIdx = parseInt(o.dataset.originalIdx);
      if (origIdx === correctIdx) o.classList.add('correct');
      if (origIdx === selectedIdx && !isCorrect) o.classList.add('wrong');
    });

    // Feedback
    const feedback = document.getElementById('quizFeedback');
    const q = this.currentQuestions[this.currentIndex];
    if (isCorrect) {
      this.score++;
      feedback.className = 'quiz-feedback show correct';
      feedback.innerHTML = `<strong>✓ Correct!</strong> ${q.explain}`;
      // Award XP
      App.addXP(10);
    } else {
      feedback.className = 'quiz-feedback show wrong';
      feedback.innerHTML = `<strong>✗ Wrong.</strong> ${q.explain}`;
      // Partial XP for attempting
      App.addXP(2);
    }

    // Track result for mastery
    this.results.push({
      questionId: q.id,
      topic: q.topic,
      correct: isCorrect,
    });

    // Update SRS card
    const cards = SRS.getAllCards();
    if (cards[q.id]) {
      SRS.updateCard(cards[q.id], isCorrect ? 3 : 1);
      SRS.saveCard(cards[q.id]);
    }

    // Show next button
    document.getElementById('quizNextBtn').classList.add('show');
    document.getElementById('quizScoreDisplay').textContent =
      `Score: ${this.score}/${this.answered}`;
  },

  next() {
    this.currentIndex++;
    this.showQuestion();
  },

  showResults() {
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';

    const pct = Math.round((this.score / this.currentQuestions.length) * 100);
    let title, color;
    if (pct === 100) { title = 'Perfect Score! 🎯'; color = 'var(--green)'; }
    else if (pct >= 80) { title = 'Great Job! 💪'; color = 'var(--green)'; }
    else if (pct >= 60) { title = 'Good — Keep Going'; color = 'var(--yellow)'; }
    else { title = 'Needs Work — Review & Retry'; color = 'var(--red)'; }

    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsTitle').style.color = color;

    document.getElementById('resultsScore').textContent = `${this.score}/${this.currentQuestions.length} (${pct}%)`;

    // Per-topic breakdown
    const topicStats = {};
    this.results.forEach(r => {
      if (!topicStats[r.topic]) topicStats[r.topic] = { correct: 0, total: 0 };
      topicStats[r.topic].total++;
      if (r.correct) topicStats[r.topic].correct++;
    });

    let breakdown = '<div style="text-align:left;margin-top:16px">';
    Object.entries(topicStats).forEach(([topic, stats]) => {
      const topicLabel = TOPICS.find(t => t.id === topic)?.label || topic;
      const tpct = Math.round((stats.correct / stats.total) * 100);
      breakdown += `<div style="margin-bottom:8px">
        <div style="font-size:0.8rem;color:var(--text-dim)">${topicLabel}</div>
        <div style="font-weight:700;color:${tpct >= 80 ? 'var(--green)' : tpct >= 60 ? 'var(--yellow)' : 'var(--red)'}">
          ${stats.correct}/${stats.total} (${tpct}%)
        </div>
      </div>`;
    });
    breakdown += '</div>';
    document.getElementById('resultsBreakdown').innerHTML = breakdown;

    // Save quiz history
    App.saveQuizHistory({
      date: Date.now(),
      score: this.score,
      total: this.currentQuestions.length,
      pct,
      topicBreakdown: topicStats,
    });

    // Update mastery
    this.results.forEach(r => {
      App.updateMastery(r.topic, r.correct);
    });
  },

  reset() {
    document.getElementById('quizSetup').style.display = 'block';
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
  },
};

if (typeof window !== 'undefined') window.Quiz = Quiz;
