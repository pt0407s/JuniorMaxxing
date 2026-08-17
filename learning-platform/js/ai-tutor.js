// ===== AI TUTOR =====
// Uses HackClub AI proxy with Claude Sonnet 5
// Walks students through problems step-by-step (Socratic method, not direct answers)

const AITutor = {
  apiUrl: '/api/chat',
  model: 'anthropic/claude-sonnet-5',
  messages: [],
  currentSkill: null,
  currentProblem: null,
  loading: false,

  start(skillId, problem) {
    this.currentSkill = skillId;
    this.currentProblem = problem;
    this.messages = [];
    const skillData = SKILLS_DATA[skillId];

    // System prompt: Socratic tutor, not answer-giver
    const systemPrompt = `You are a patient, encouraging chemistry tutor helping a high school student.

Current skill: ${skillData.title}
Current problem: "${problem.prompt}"
Correct answer: ${problem.answer}
Step-by-step solution: ${problem.steps.join(' | ')}

RULES:
1. NEVER give the direct answer. Guide the student to find it themselves.
2. Use the Socratic method — ask leading questions, give hints, check understanding.
3. Walk through problems step-by-step. Ask "What do you think the next step is?" before explaining.
4. If the student is stuck, give a small hint, not the full solution.
5. If the student asks for the answer, say "I'll help you figure it out — let's start with what you know."
6. Keep responses concise (2-4 sentences). This is a chat, not a lecture.
7. Use chemistry notation (subscripts like H₂O, arrows like →).
8. Be encouraging. Celebrate when they get a step right.
9. If they're confused about a concept, explain it simply with an analogy.
10. Adapt to their level — if they keep getting stuck, simplify further.`;

    this.messages = [{ role: 'system', content: systemPrompt }];

    const msgDiv = document.getElementById('aiTutorMessages');
    msgDiv.innerHTML = '';

    // Auto-send a greeting that contextualizes the problem
    this.addMessage('assistant', `Hi! I see you're working on: **${problem.prompt}**\n\nI can walk you through this step-by-step. What have you tried so far? Or want me to start with the first step?`);
  },

  async send(userText) {
    if (!userText || this.loading) return;
    this.addMessage('user', userText);
    this.messages.push({ role: 'user', content: userText });

    // Show typing indicator
    this.showTyping();

    try {
      this.loading = true;
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.messages,
        }),
      });

      const data = await response.json();
      this.hideTyping();

      if (data.error) {
        this.addMessage('assistant', 'Sorry, I had trouble connecting. Try again in a moment.');
        console.error('AI Tutor error:', data.error);
      } else {
        const reply = data.choices[0].message.content;
        this.addMessage('assistant', reply);
        this.messages.push({ role: 'assistant', content: reply });
      }
    } catch (err) {
      this.hideTyping();
      this.addMessage('assistant', 'Connection error. Please try again.');
      console.error('AI Tutor fetch error:', err);
    } finally {
      this.loading = false;
    }
  },

  addMessage(role, text) {
    const msgDiv = document.getElementById('aiTutorMessages');
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-message ' + (role === 'user' ? 'ai-message-user' : 'ai-message-bot');

    // Simple markdown: bold, code, line breaks
    const formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');

    msgEl.innerHTML = formatted;
    msgDiv.appendChild(msgEl);
    msgDiv.scrollTop = msgDiv.scrollHeight;
  },

  showTyping() {
    const msgDiv = document.getElementById('aiTutorMessages');
    const el = document.createElement('div');
    el.className = 'ai-message ai-message-bot ai-typing';
    el.id = 'aiTypingIndicator';
    el.innerHTML = '<span class="ai-typing-dot"></span><span class="ai-typing-dot"></span><span class="ai-typing-dot"></span>';
    msgDiv.appendChild(el);
    msgDiv.scrollTop = msgDiv.scrollHeight;
  },

  hideTyping() {
    const el = document.getElementById('aiTypingIndicator');
    if (el) el.remove();
  },
};

// Wire up from Skills.js
if (typeof window !== 'undefined') {
  window.AITutor = AITutor;

  // Attach send handler (called from Skills.js)
  Skills.sendAIMessage = function() {
    const input = document.getElementById('aiTutorInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    AITutor.send(text);
  };
}
