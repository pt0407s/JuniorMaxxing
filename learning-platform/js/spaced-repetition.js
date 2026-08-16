// ===== SM-2 SPACED REPETITION ALGORITHM =====
// Based on SuperMemo-2 algorithm (Piotr Wozniak, 1987)
// Research: SM-2 is the foundation of Anki's scheduler.
// FSRS-6 is newer (22% better predictive accuracy) but SM-2 is
// simpler, dependency-free, and proven over 35+ years.

// Rating scale: 1=Again, 2=Hard, 3=Good, 4=Easy

function createCard(questionId) {
  return {
    id: questionId,
    // SM-2 state
    easeFactor: 2.5,    // Start at 2.5 (SM-2 default)
    interval: 0,         // Days until next review
    repetitions: 0,      // Number of successful reviews
    nextReview: Date.now(), // When to review next
    lastReview: null,    // When last reviewed
    // Stats
    totalReviews: 0,
    correctReviews: 0,
  };
}

function updateCard(card, rating) {
  const now = Date.now();
  card.lastReview = now;
  card.totalReviews++;

  // Rating 1 = "Again" — failed, reset
  if (rating === 1) {
    card.repetitions = 0;
    card.interval = 1; // Review again tomorrow (simplified from minutes)
    card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
    card.nextReview = now + 1 * 24 * 60 * 60 * 1000;
  } else {
    // Successful recall
    card.correctReviews++;
    card.repetitions++;

    if (card.repetitions === 1) {
      card.interval = 1;
    } else if (card.repetitions === 2) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }

    // Update ease factor (SM-2 formula)
    // EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    // q maps: Hard=4, Good=4, Easy=5 in original SM-2
    const q = rating === 2 ? 3 : rating === 3 ? 4 : 5;
    card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    // Adjust interval based on rating
    if (rating === 2) card.interval = Math.max(1, Math.round(card.interval * 0.8));
    if (rating === 4) card.interval = Math.round(card.interval * 1.3);

    card.nextReview = now + card.interval * 24 * 60 * 60 * 1000;
  }

  return card;
}

function isDue(card) {
  return Date.now() >= card.nextReview;
}

function getDueCards(allCards) {
  return allCards.filter(c => isDue(c));
}

function getCardStats(card) {
  const accuracy = card.totalReviews > 0 ? card.correctReviews / card.totalReviews : 0;
  return {
    accuracy: Math.round(accuracy * 100),
    interval: card.interval,
    repetitions: card.repetitions,
    easeFactor: card.easeFactor,
    due: isDue(card),
    nextReviewDate: new Date(card.nextReview),
  };
}

// Initialize cards for all questions if not already in storage
function initCards(questionIds) {
  const stored = JSON.parse(localStorage.getItem('jm_srs_cards') || '{}');
  questionIds.forEach(id => {
    if (!stored[id]) {
      stored[id] = createCard(id);
    }
  });
  localStorage.setItem('jm_srs_cards', JSON.stringify(stored));
  return stored;
}

function saveCard(card) {
  const stored = JSON.parse(localStorage.getItem('jm_srs_cards') || '{}');
  stored[card.id] = card;
  localStorage.setItem('jm_srs_cards', JSON.stringify(stored));
}

function getAllCards() {
  return JSON.parse(localStorage.getItem('jm_srs_cards') || '{}');
}

// Export for use
if (typeof window !== 'undefined') {
  window.SRS = {
    createCard, updateCard, isDue, getDueCards, getCardStats,
    initCards, saveCard, getAllCards,
  };
}
