// ===== SKILLS MASTERY ENGINE =====
// Concept-application practice with timer, difficulty levels, step-by-step solutions, AI tutor

const Skills = {
  currentSkill: null,
  currentDifficulty: 'easy',
  currentProblem: null,
  problemQueue: [],
  problemIndex: 0,
  score: 0,
  total: 0,
  startTime: 0,
  timerInterval: null,
  questionStartTime: 0,
  solvedProblems: {}, // { skillId: { easy: [], medium: [], hard: [] } }

  init() {
    // Restore solved state
    const saved = localStorage.getItem('jm_skills_solved');
    if (saved) this.solvedProblems = JSON.parse(saved);

    // Exit button
    document.getElementById('skillExitBtn').addEventListener('click', () => this.exitSkill());

    // Difficulty buttons
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentDifficulty = btn.dataset.difficulty;
        document.querySelectorAll('.btn-difficulty').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.showProblem();
      });
    });

    // AI tutor close
    document.getElementById('aiTutorCloseBtn').addEventListener('click', () => {
      document.getElementById('aiTutor').style.display = 'none';
    });

    // AI tutor send
    document.getElementById('aiTutorSendBtn').addEventListener('click', () => this.sendAIMessage());
    document.getElementById('aiTutorInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendAIMessage();
    });

    this.renderSkillStats();
  },

  renderSkillStats() {
    const skills = ['balancing', 'conversions', 'sohcahtoa', 'algebra'];
    skills.forEach(id => {
      const el = document.getElementById('skillStats' + id.charAt(0).toUpperCase() + id.slice(1));
      if (!el) return;
      const solved = this.solvedProblems[id] || {};
      const total = Object.values(solved).flat().length;
      const easy = (solved.easy || []).length;
      const med = (solved.medium || []).length;
      const hard = (solved.hard || []).length;
      el.innerHTML = `<span class="skill-stat-badge easy">${easy} easy</span> <span class="skill-stat-badge medium">${med} med</span> <span class="skill-stat-badge hard">${hard} hard</span>`;
    });
  },

  startSkill(skillId) {
    this.currentSkill = skillId;
    this.currentDifficulty = 'easy';
    this.score = 0;
    this.total = 0;
    document.querySelectorAll('.btn-difficulty').forEach(b => {
      b.classList.toggle('active', b.dataset.difficulty === 'easy');
    });
    document.getElementById('skillsSetup').style.display = 'none';
    document.getElementById('skillPractice').style.display = 'block';
    document.getElementById('aiTutor').style.display = 'none';
    const data = SKILLS_DATA[skillId];
    document.getElementById('skillPracticeTitle').textContent = data.icon + ' ' + data.title;
    this.startTimer();
    this.showProblem();
  },

  exitSkill() {
    this.stopTimer();
    document.getElementById('skillPractice').style.display = 'none';
    document.getElementById('skillsSetup').style.display = 'block';
    document.getElementById('aiTutor').style.display = 'none';
    this.renderSkillStats();
  },

  showProblem() {
    // Generate a new problem on the fly — infinite supply
    const skillData = SKILLS_DATA[this.currentSkill];
    this.currentProblem = skillData.generate(this.currentDifficulty);
    this.questionStartTime = Date.now();

    const container = document.getElementById('skillQuestionContainer');
    const solved = this.isSolved(this.currentProblem.id);
    container.innerHTML = `
      <div class="skill-question-card ${solved ? 'solved' : ''}">
        <div class="skill-question-prompt">${this.currentProblem.prompt}</div>
        <div class="skill-answer-area">
          <input type="text" class="skill-answer-input" id="skillAnswerInput"
            placeholder="Type your answer..." autocomplete="off" spellcheck="false">
          <button class="btn btn-primary" id="skillSubmitBtn">Check</button>
        </div>
        <div class="skill-feedback" id="skillFeedback"></div>
        <div class="skill-actions" id="skillActions">
          <button class="btn btn-secondary btn-sm" id="skillHintBtn">💡 Hint</button>
          <button class="btn btn-secondary btn-sm" id="skillSolutionBtn">📝 Show Solution</button>
          <button class="btn btn-secondary btn-sm" id="skillAskAIBtn">🤖 Ask AI Tutor</button>
        </div>
        <div class="skill-hint" id="skillHint" style="display:none"></div>
        <div class="skill-solution" id="skillSolution" style="display:none"></div>
      </div>
    `;

    // Wire up
    document.getElementById('skillSubmitBtn').addEventListener('click', () => this.checkAnswer());
    document.getElementById('skillAnswerInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.checkAnswer();
    });
    document.getElementById('skillHintBtn').addEventListener('click', () => {
      const h = document.getElementById('skillHint');
      h.style.display = h.style.display === 'none' ? 'block' : 'none';
      h.innerHTML = `<strong>💡 Hint:</strong> ${this.currentProblem.hint}`;
    });
    document.getElementById('skillSolutionBtn').addEventListener('click', () => this.showSolution());
    document.getElementById('skillAskAIBtn').addEventListener('click', () => this.openAITutor());

    // Focus input
    setTimeout(() => document.getElementById('skillAnswerInput').focus(), 50);

    this.updateScoreDisplay();
  },

  checkAnswer() {
    const input = document.getElementById('skillAnswerInput');
    const userAns = input.value.trim();
    if (!userAns) return;

    const correct = this.normalizeAnswer(userAns) === this.normalizeAnswer(this.currentProblem.answer);
    const feedback = document.getElementById('skillFeedback');
    const timeMs = Date.now() - this.questionStartTime;

    if (correct) {
      this.score++;
      this.total++;
      this.markSolved(this.currentProblem.id);
      const timeStr = (timeMs / 1000).toFixed(1);
      feedback.innerHTML = `<div class="skill-correct">✓ Correct! (${timeStr}s) — Answer: ${this.currentProblem.answer}</div>`;
      input.disabled = true;
      document.getElementById('skillSubmitBtn').disabled = true;
      // Auto-advance after 1.5s — generates a fresh problem
      setTimeout(() => {
        this.showProblem();
      }, 1500);
    } else {
      this.total++;
      feedback.innerHTML = `<div class="skill-wrong">✗ Not quite. Try again, or use the hint/solution.</div>`;
      input.select();
    }
    this.updateScoreDisplay();
  },

  normalizeAnswer(s) {
    const SUBSCRIPTS = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9' };
    return s.toLowerCase()
      .replace(/\s+/g, '')           // remove all whitespace
      .replace(/→|-->|->|⇒|⟶/g, '=') // all arrow variants → =
      .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => SUBSCRIPTS[c] || c) // subscripts → digits
      .replace(/⁻/g, '-');           // superscript minus → minus
  },

  showSolution() {
    const div = document.getElementById('skillSolution');
    div.style.display = 'block';
    div.innerHTML = '<div class="skill-solution-title">📝 Step-by-Step Solution</div>' +
      this.currentProblem.steps.map((s, i) => `<div class="skill-solution-step">${s}</div>`).join('');
  },

  openAITutor() {
    const tutor = document.getElementById('aiTutor');
    tutor.style.display = 'block';
    AITutor.start(this.currentSkill, this.currentProblem);
  },

  isSolved(problemId) {
    const solved = this.solvedProblems[this.currentSkill] || {};
    return Object.values(solved).flat().includes(problemId);
  },

  markSolved(problemId) {
    if (!this.solvedProblems[this.currentSkill]) this.solvedProblems[this.currentSkill] = {};
    if (!this.solvedProblems[this.currentSkill][this.currentDifficulty]) {
      this.solvedProblems[this.currentSkill][this.currentDifficulty] = [];
    }
    const arr = this.solvedProblems[this.currentSkill][this.currentDifficulty];
    if (!arr.includes(problemId)) arr.push(problemId);
    localStorage.setItem('jm_skills_solved', JSON.stringify(this.solvedProblems));
  },

  updateScoreDisplay() {
    document.getElementById('skillScoreDisplay').textContent = `Score: ${this.score}/${this.total}`;
  },

  startTimer() {
    this.startTime = Date.now();
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      const elapsed = (Date.now() - this.startTime) / 1000;
      const timerEl = document.getElementById('skillTimer');
      if (timerEl) {
        timerEl.textContent = `⏱ ${elapsed.toFixed(1)}s`;
        if (elapsed > 60) timerEl.classList.add('urgent');
        else timerEl.classList.remove('urgent');
      }
    }, 100);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
};

if (typeof window !== 'undefined') window.Skills = Skills;
