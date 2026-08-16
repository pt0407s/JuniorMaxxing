// ===== FLASHCARD ENGINE (SM-2 Spaced Repetition) =====
// Research: Spaced repetition is the #2 most effective learning technique
// (Dunlosky et al. 2013, meta-analysis d=0.56+). SM-2 algorithm powers Anki.

const Flashcards = {
  deck: [],
  index: 0,
  currentCard: null,
  isFlipped: false,

  start(topicId) {
    const allCards = SRS.getAllCards();
    let dueCards = [];

    if (topicId === 'all') {
      dueCards = Object.values(allCards).filter(c => SRS.isDue(c));
    } else {
      dueCards = Object.values(allCards).filter(c => {
        if (!SRS.isDue(c)) return false;
        const q = QUESTIONS.find(q => q.id === c.id);
        return q && q.topic === topicId;
      });
    }

    // If no due cards, show all from topic (new cards)
    if (dueCards.length === 0) {
      const newQuestions = topicId === 'all'
        ? QUESTIONS
        : QUESTIONS.filter(q => q.topic === topicId);
      dueCards = newQuestions.map(q => allCards[q.id]).filter(Boolean).slice(0, 20);
    }

    if (dueCards.length === 0) {
      alert('No cards available. Take a quiz first to generate cards.');
      return;
    }

    this.deck = dueCards;
    this.index = 0;
    this.showCard();
  },

  showCard() {
    if (this.index >= this.deck.length) {
      this.showComplete();
      return;
    }

    this.currentCard = this.deck[this.index];
    this.isFlipped = false;

    const question = QUESTIONS.find(q => q.id === this.currentCard.id);
    if (!question) { this.index++; this.showCard(); return; }

    document.getElementById('flashcardSetup').style.display = 'none';
    document.getElementById('flashcardActive').style.display = 'block';

    document.getElementById('flashcardProgress').textContent =
      `Card ${this.index + 1} of ${this.deck.length}`;

    const card = document.getElementById('flashcardCard');
    card.classList.remove('flipped');

    document.getElementById('flashcardFront').textContent = question.q;
    document.getElementById('flashcardFront').style.display = 'block';
    document.getElementById('flashcardBack').style.display = 'none';
    document.getElementById('flashcardBack').textContent = question.options[question.correct];

    document.getElementById('flipCardBtn').style.display = 'inline-block';
    document.getElementById('flashcardRating').style.display = 'none';
  },

  flip() {
    this.isFlipped = true;
    const card = document.getElementById('flashcardCard');
    card.classList.add('flipped');
    // Swap content at the midpoint of the flip animation
    setTimeout(() => {
      document.getElementById('flashcardFront').style.display = 'none';
      document.getElementById('flashcardBack').style.display = 'block';
    }, 200);
    document.getElementById('flipCardBtn').style.display = 'none';
    setTimeout(() => {
      document.getElementById('flashcardRating').style.display = 'block';
    }, 300);
  },

  rate(rating) {
    if (!this.currentCard) return;
    SRS.updateCard(this.currentCard, rating);
    SRS.saveCard(this.currentCard);

    // XP for reviewing
    App.addXP(rating === 1 ? 2 : 5);

    this.index++;
    this.showCard();
  },

  showComplete() {
    document.getElementById('flashcardActive').style.display = 'none';
    document.getElementById('flashcardSetup').style.display = 'block';

    const stats = this.deck.length;
    alert(`Review complete! ${stats} cards reviewed. Come back when cards are due.`);
    App.renderDashboard();
  },

  getStats(topicId) {
    const allCards = Object.values(SRS.getAllCards());
    const relevant = topicId === 'all' ? allCards : allCards.filter(c => {
      const q = QUESTIONS.find(q => q.id === c.id);
      return q && q.topic === topicId;
    });
    const due = relevant.filter(c => SRS.isDue(c)).length;
    const total = relevant.length;
    return { due, total, new: total - relevant.filter(c => c.repetitions > 0).length };
  },
};

if (typeof window !== 'undefined') window.Flashcards = Flashcards;
