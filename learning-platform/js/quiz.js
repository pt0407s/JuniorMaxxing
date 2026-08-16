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
  timedMode: true,
  pretestMode: false,
  confidenceMode: true,
  elaborationMode: true,
  questionStartTime: 0,
  quizStartTime: 0,
  timerInterval: null,
  questionTimes: [],
  confidenceRatings: [],
  studyQueue: [],
  studyIndex: 0,

  start(topicId, count, scrambleAnswers, timedMode, pretestMode, confidenceMode, elaborationMode) {
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
    this.confidenceRatings = [];
    this.studyQueue = [];
    this.scrambleAnswers = scrambleAnswers;
    this.timedMode = timedMode !== false;
    this.pretestMode = pretestMode === true;
    this.confidenceMode = confidenceMode !== false;
    this.elaborationMode = elaborationMode !== false;
    this.questionTimes = [];
    this.quizStartTime = Date.now();

    // Hide study mode if visible
    document.getElementById('studyMode').style.display = 'none';
    document.getElementById('quizSetup').style.display = 'none';
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

    // Start per-question timer
    this.startTimer();

    // Pretest mode: show question with a "guess" input, no options visible
    if (this.pretestMode) {
      let html = `<div class="quiz-question">${q.q}</div>`;
      html += `<div class="pretest-notice">⚠️ Pretest mode: Try to answer before seeing options. Wrong guesses help you learn (g=0.54).</div>`;
      html += `<input type="text" id="pretestInput" class="pretest-input" placeholder="Type your best guess..." autocomplete="off">`;
      html += `<button class="btn btn-primary" id="pretestSubmitBtn" onclick="Quiz.pretestReveal()">Reveal Options & Answer →</button>`;
      html += `<div class="quiz-feedback" id="quizFeedback"></div>`;
      html += `<div class="quiz-options" id="quizOptions" style="display:none"></div>`;
      html += `<button class="btn btn-primary quiz-next-btn" id="quizNextBtn" onclick="Quiz.next()">Next →</button>`;
      container.innerHTML = html;
      document.getElementById('pretestInput').focus();
      document.getElementById('pretestInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') Quiz.pretestReveal();
      });
      return;
    }

    // Normal mode: show options
    this.renderOptions(container, q);
  },

  renderOptions(container, q) {
    // Scramble answer options if enabled
    let options = q.options.map((text, originalIdx) => ({ text, originalIdx }));
    if (this.scrambleAnswers) {
      this.shuffle(options);
    }

    const correctOriginalIdx = q.correct;

    let html = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;
    options.forEach((opt, displayIdx) => {
      html += `<button class="quiz-option" data-original-idx="${opt.originalIdx}" onclick="Quiz.answer(${opt.originalIdx}, ${correctOriginalIdx}, this)">${opt.text}</button>`;
    });
    html += `</div>`;
    html += `<div class="quiz-feedback" id="quizFeedback"></div>`;

    // Confidence rating (shown after answering)
    if (this.confidenceMode) {
      html += `<div class="confidence-rating" id="confidenceRating" style="display:none">
        <p class="rating-prompt">How confident were you in your answer?</p>
        <div class="rating-buttons">
          <button class="btn btn-rate btn-conf-1" onclick="Quiz.rateConfidence(1)">1 — Guessed</button>
          <button class="btn btn-rate btn-conf-2" onclick="Quiz.rateConfidence(2)">2 — Unsure</button>
          <button class="btn btn-rate btn-conf-3" onclick="Quiz.rateConfidence(3)">3 — Fairly sure</button>
          <button class="btn btn-rate btn-conf-4" onclick="Quiz.rateConfidence(4)">4 — Certain</button>
        </div>
      </div>`;
    }

    html += `<button class="btn btn-primary quiz-next-btn" id="quizNextBtn" onclick="Quiz.next()">Next →</button>`;
    container.innerHTML = html;
  },

  pretestReveal() {
    const input = document.getElementById('pretestInput');
    const guess = input ? input.value.trim() : '';
    const q = this.currentQuestions[this.currentIndex];

    // Show options now
    const optionsDiv = document.getElementById('quizOptions');
    let options = q.options.map((text, originalIdx) => ({ text, originalIdx }));
    if (this.scrambleAnswers) this.shuffle(options);
    const correctOriginalIdx = q.correct;

    let optHtml = '';
    options.forEach(opt => {
      optHtml += `<button class="quiz-option" data-original-idx="${opt.originalIdx}" onclick="Quiz.answer(${opt.originalIdx}, ${correctOriginalIdx}, this)">${opt.text}</button>`;
    });
    optionsDiv.innerHTML = optHtml;
    optionsDiv.style.display = 'flex';

    // Disable input
    input.disabled = true;
    document.getElementById('pretestSubmitBtn').style.display = 'none';

    // Show what they guessed
    if (guess) {
      const feedback = document.getElementById('quizFeedback');
      feedback.className = 'quiz-feedback show';
      feedback.style.background = 'var(--bg-elevated)';
      feedback.style.borderColor = 'var(--border-light)';
      feedback.innerHTML = `<strong>Your guess:</strong> "${guess}" — Now select the correct answer from the options below.`;
    }
  },

  answer(selectedIdx, correctIdx, btnElement) {
    const isCorrect = selectedIdx === correctIdx;
    this.answered++;

    // Stop timer and record time
    const elapsed = this.stopTimer();

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
      // Award XP — speed bonus if answered in <10s
      let xp = 10;
      if (this.timedMode && elapsed < 10000) xp += 5;
      App.addXP(xp);
      if (this.timedMode && elapsed < 10000) {
        feedback.innerHTML += ` <span style="color:var(--green);font-weight:700">⚡ Speed bonus +5 XP!</span>`;
      }
      // Elaboration prompt (constructive retrieval, 2024)
      if (this.elaborationMode) {
        const prompts = ELABORATION_PROMPTS[q.topic] || [];
        if (prompts.length > 0) {
          const prompt = prompts[Math.floor(Math.random() * prompts.length)];
          feedback.innerHTML += `<div class="elaboration-prompt"><strong>🧠 Elaborate:</strong> ${prompt} <span style="color:var(--text-dim);font-size:0.78rem">(think about it — self-generated examples boost comprehension)</span></div>`;
          App.addXP(3);
        }
      }
    } else {
      feedback.className = 'quiz-feedback show wrong';
      feedback.innerHTML = `<strong>✗ Wrong.</strong> ${q.explain}`;
      // Partial XP for attempting
      App.addXP(2);
      // Add to study queue for worked examples
      if (WORKED_EXAMPLES[q.id]) {
        this.studyQueue.push(q);
      }
    }

    // Track result for mastery
    this.results.push({
      questionId: q.id,
      topic: q.topic,
      correct: isCorrect,
      timeMs: elapsed,
    });
    this.questionTimes.push(elapsed);

    // Update SRS card
    const cards = SRS.getAllCards();
    if (cards[q.id]) {
      SRS.updateCard(cards[q.id], isCorrect ? 3 : 1);
      SRS.saveCard(cards[q.id]);
    }

    // Show confidence rating if enabled
    if (this.confidenceMode) {
      const confDiv = document.getElementById('confidenceRating');
      if (confDiv) confDiv.style.display = 'block';
      // Don't show next button until confidence is rated (or if confidence mode is off)
    } else {
      document.getElementById('quizNextBtn').classList.add('show');
    }

    document.getElementById('quizScoreDisplay').textContent =
      `Score: ${this.score}/${this.answered}`;
  },

  rateConfidence(rating) {
    const q = this.currentQuestions[this.currentIndex];
    const lastResult = this.results[this.results.length - 1];
    if (lastResult) {
      lastResult.confidence = rating;
      this.confidenceRatings.push({ questionId: q.id, confidence: rating, correct: lastResult.correct });
    }

    // Hide confidence rating, show next button
    document.getElementById('confidenceRating').style.display = 'none';
    document.getElementById('quizNextBtn').classList.add('show');

    // Bonus XP for high confidence + correct (rewards calibrated confidence)
    if (rating === 4 && lastResult && lastResult.correct) {
      App.addXP(2);
    }
  },

  next() {
    this.currentIndex++;
    this.showQuestion();
  },

  startTimer() {
    this.stopTimer();
    this.questionStartTime = Date.now();
    const display = document.getElementById('quizTimerDisplay');
    if (!display) return;
    display.className = 'quiz-timer';
    display.textContent = '⏱ 0.0s';
    this.timerInterval = setInterval(() => {
      const elapsed = (Date.now() - this.questionStartTime) / 1000;
      display.textContent = `⏱ ${elapsed.toFixed(1)}s`;
      if (elapsed > 30) display.className = 'quiz-timer very-slow';
      else if (elapsed > 15) display.className = 'quiz-timer slow';
    }, 100);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    const elapsed = this.questionStartTime > 0 ? Date.now() - this.questionStartTime : 0;
    this.questionStartTime = 0;
    return elapsed;
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

    const scoreEl = document.getElementById('resultsScore');
    scoreEl.textContent = `${this.score}/${this.currentQuestions.length} (${pct}%)`;
    if (pct === 100) {
      scoreEl.classList.add('perfect');
      this.fireConfetti();
    } else {
      scoreEl.classList.remove('perfect');
    }

    // Timing stats
    const timingDiv = document.getElementById('resultsTiming');
    if (this.timedMode && this.questionTimes.length > 0) {
      const totalTime = this.questionTimes.reduce((a, b) => a + b, 0);
      const avgTime = totalTime / this.questionTimes.length;
      const bestTime = Math.min(...this.questionTimes);
      const worstTime = Math.max(...this.questionTimes);
      const fmt = ms => (ms / 1000).toFixed(1) + 's';
      timingDiv.innerHTML = `
        <span class="timing-stat">Total: <span class="timing-value">${fmt(totalTime)}</span></span>
        <span class="timing-stat">Avg: <span class="timing-value">${fmt(avgTime)}</span></span>
        <span class="timing-stat">Best: <span class="timing-value timing-best">${fmt(bestTime)}</span></span>
        <span class="timing-stat">Slowest: <span class="timing-value timing-worst">${fmt(worstTime)}</span></span>
      `;
    } else {
      timingDiv.innerHTML = '';
    }

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

    // Metacognitive calibration stats
    const calibDiv = document.getElementById('resultsCalibration');
    if (this.confidenceMode && this.confidenceRatings.length > 0) {
      const calib = this.computeCalibration();
      calibDiv.innerHTML = `
        <div class="calibration-section">
          <strong>🧠 Metacognitive Calibration</strong>
          <div class="calibration-grid">
            <div class="calib-stat">
              <span class="calib-value" style="color:${calib.accuracy >= 75 ? 'var(--green)' : calib.accuracy >= 50 ? 'var(--yellow)' : 'var(--red)'}">${calib.accuracy}%</span>
              <span class="calib-label">Calibration Accuracy</span>
            </div>
            <div class="calib-stat">
              <span class="calib-value">${calib.overconfident ? 'Overconfident ⚠️' : 'Well-calibrated ✓'}</span>
              <span class="calib-label">${calib.avgConfidence.toFixed(1)}/4 avg confidence vs ${calib.avgCorrect.toFixed(1)}/1 accuracy</span>
            </div>
          </div>
          <div class="calibration-matrix">
            ${this.renderCalibrationMatrix()}
          </div>
        </div>
      `;
    } else {
      calibDiv.innerHTML = '';
    }

    // Show "Study Wrong Answers" button if there are worked examples for wrong questions
    const studyBtn = document.getElementById('studyWrongBtn');
    if (this.studyQueue.length > 0) {
      studyBtn.style.display = 'inline-block';
      studyBtn.textContent = `Study ${this.studyQueue.length} Wrong Answer${this.studyQueue.length > 1 ? 's' : ''} →`;
    } else {
      studyBtn.style.display = 'none';
    }

    // Save quiz history
    App.saveQuizHistory({
      date: Date.now(),
      score: this.score,
      total: this.currentQuestions.length,
      pct,
      topicBreakdown: topicStats,
      calibration: this.confidenceMode ? this.computeCalibration() : null,
    });

    // Update mastery
    this.results.forEach(r => {
      App.updateMastery(r.topic, r.correct);
    });
  },

  computeCalibration() {
    const total = this.confidenceRatings.length;
    const avgConfidence = this.confidenceRatings.reduce((s, r) => s + r.confidence, 0) / total;
    const avgCorrect = this.confidenceRatings.filter(r => r.correct).length / total;
    // Calibration: how well does confidence predict correctness?
    // Perfect calibration: avg confidence / 4 == avg correct
    const expected = avgConfidence / 4;
    const accuracy = Math.round((1 - Math.abs(expected - avgCorrect)) * 100);
    const overconfident = expected > avgCorrect + 0.1;
    return { accuracy, overconfident, avgConfidence, avgCorrect };
  },

  renderCalibrationMatrix() {
    // 4 confidence levels × 2 outcomes
    const matrix = {};
    this.confidenceRatings.forEach(r => {
      const key = r.confidence;
      if (!matrix[key]) matrix[key] = { correct: 0, wrong: 0 };
      if (r.correct) matrix[key].correct++; else matrix[key].wrong++;
    });

    let html = '<table class="calib-table"><tr><th>Confidence</th><th>Correct</th><th>Wrong</th><th>% Right</th></tr>';
    for (let c = 4; c >= 1; c--) {
      const m = matrix[c] || { correct: 0, wrong: 0 };
      const total = m.correct + m.wrong;
      const pct = total > 0 ? Math.round((m.correct / total) * 100) : '—';
      const labels = { 4: '4 — Certain', 3: '3 — Fairly sure', 2: '2 — Unsure', 1: '1 — Guessed' };
      html += `<tr><td>${labels[c]}</td><td>${m.correct}</td><td>${m.wrong}</td><td style="font-weight:700;color:${pct === '—' ? 'var(--text-dim)' : pct >= 75 ? 'var(--green)' : pct >= 50 ? 'var(--yellow)' : 'var(--red)'}">${pct}${pct !== '—' ? '%' : ''}</td></tr>`;
    }
    html += '</table>';
    html += '<p style="font-size:0.75rem;color:var(--text-dim);margin-top:8px">Ideal: higher confidence → higher % right. If "Certain" answers are often wrong, you\'re overconfident.</p>';
    return html;
  },

  // ===== STUDY MODE (Worked Examples with Fading) =====
  startStudyMode() {
    if (this.studyQueue.length === 0) return;
    this.studyIndex = 0;
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('studyMode').style.display = 'block';
    this.showStudyCard();
  },

  showStudyCard() {
    if (this.studyIndex >= this.studyQueue.length) {
      document.getElementById('studyContent').innerHTML = `
        <div style="text-align:center;padding:30px">
          <h3>✅ All worked examples reviewed!</h3>
          <p style="color:var(--text-dim);margin:12px 0">Now retry the quiz to lock in your learning.</p>
          <button class="btn btn-primary" onclick="Quiz.reset()">Back to Quiz Setup</button>
        </div>`;
      return;
    }

    const q = this.studyQueue[this.studyIndex];
    const example = WORKED_EXAMPLES[q.id];
    if (!example) { this.studyIndex++; this.showStudyCard(); return; }

    // Check mastery for fading (expertise reversal effect)
    const mastery = App.getMastery();
    const topicMastery = mastery[q.topic] || { correct: 0, total: 0 };
    const masteryPct = topicMastery.total > 0 ? topicMastery.correct / topicMastery.total : 0;

    // Fading: high mastery → show fewer steps (expertise reversal)
    let stepsToShow = example.steps;
    let fadeLevel = 0;
    if (masteryPct > 0.8) {
      // High mastery: only show first and last step (max fading)
      stepsToShow = [example.steps[0], '... (solve the middle steps yourself) ...', example.steps[example.steps.length - 1]];
      fadeLevel = 2;
    } else if (masteryPct > 0.6) {
      // Moderate mastery: hide every other step (partial fading)
      stepsToShow = example.steps.filter((_, i) => i % 2 === 0 || i === example.steps.length - 1);
      fadeLevel = 1;
    }

    let html = `<div class="study-card">
      <div class="study-question">${q.q}</div>
      <div class="study-fade-level">Fading level: ${fadeLevel === 0 ? 'Full steps (novice)' : fadeLevel === 1 ? 'Partial (intermediate)' : 'Minimal (advanced)'} — mastery: ${Math.round(masteryPct * 100)}%</div>
      <div class="study-steps">
        <strong>Step-by-step solution:</strong>
        <ol>`;
    stepsToShow.forEach(step => {
      html += `<li>${step}</li>`;
    });
    html += `</ol></div>
      <div class="study-answer"><strong>Answer:</strong> ${q.options[q.correct]}</div>
      <div class="study-explanation"><strong>Why:</strong> ${q.explain}</div>
    </div>`;

    document.getElementById('studyContent').innerHTML = html;
  },

  studyNext() {
    this.studyIndex++;
    this.showStudyCard();
  },

  studyPrev() {
    if (this.studyIndex > 0) this.studyIndex--;
    this.showStudyCard();
  },

  studyExit() {
    document.getElementById('studyMode').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
  },

  reset() {
    document.getElementById('quizSetup').style.display = 'block';
    document.getElementById('quizActive').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    document.body.classList.remove('focus-mode');
  },

  fireConfetti() {
    const colors = ['#3b82f6', '#00d68f', '#ffc107', '#a78bfa', '#60a5fa', '#ff8a65'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      c.style.width = (6 + Math.random() * 6) + 'px';
      c.style.height = (10 + Math.random() * 10) + 'px';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  },
};

if (typeof window !== 'undefined') window.Quiz = Quiz;
