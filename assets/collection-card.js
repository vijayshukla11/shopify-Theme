/**
 * Nova Commerce Framework (NCF) - Featured Collections JS
 * File: assets/collection-card.js
 * Sprint: 2.7 – Premium Featured Collections
 * Architecture: Progressive Enhancement & Touch Feedback Engine
 */

(function () {
  'use strict';

  class NCFCollectionCardEngine {
    constructor(container) {
      this.container = container;
      this.cards = Array.from(container.querySelectorAll('.ncf-collection-card'));
      this.init();
    }

    init() {
      this.bindTouchFeedback();
    }

    bindTouchFeedback() {
      this.cards.forEach((card) => {
        card.addEventListener('touchstart', () => {
          card.classList.add('is-touched');
        }, { passive: true });

        card.addEventListener('touchend', () => {
          setTimeout(() => card.classList.remove('is-touched'), 300);
        }, { passive: true });
      });
    }
  }

  function initCollectionCards() {
    document.querySelectorAll('[data-featured-collections-section]').forEach((container) => {
      new NCFCollectionCardEngine(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollectionCards);
  } else {
    initCollectionCards();
  }
})();
