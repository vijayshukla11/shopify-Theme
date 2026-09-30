/**
 * Nova Commerce Framework (NCF) - Premium Brand Showcase JS
 * File: assets/brand-showcase.js
 * Sprint: 2.8 – Premium Brand Showcase
 * Architecture: Accessible Brand Carousel Track & Autoplay Engine
 */

(function () {
  'use strict';

  class NCFBrandCarousel {
    constructor(container) {
      this.container = container;
      this.track = container.querySelector('[data-brand-carousel-track]');
      if (!this.track) return;

      this.autoplay = container.dataset.autoplay === 'true';
      this.speed = parseInt(container.dataset.autoplaySpeed || '4000', 10);
      this.timer = null;

      this.init();
    }

    init() {
      if (this.autoplay) {
        this.startAutoplay();
        this.bindHoverEvents();
      }
    }

    startAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.stopAutoplay();
      this.timer = setInterval(() => {
        if (!this.track) return;
        const maxScroll = this.track.scrollWidth - this.track.clientWidth;
        if (this.track.scrollLeft >= maxScroll - 10) {
          this.track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          this.track.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }, this.speed);
    }

    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    bindHoverEvents() {
      this.container.addEventListener('mouseenter', () => this.stopAutoplay());
      this.container.addEventListener('mouseleave', () => this.startAutoplay());
      this.container.addEventListener('touchstart', () => this.stopAutoplay(), { passive: true });
    }
  }

  function initBrandShowcaseSections() {
    document.querySelectorAll('[data-brand-showcase-section]').forEach((container) => {
      new NCFBrandCarousel(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandShowcaseSections);
  } else {
    initBrandShowcaseSections();
  }
})();
