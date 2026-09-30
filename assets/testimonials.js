/**
 * Nova Commerce Framework (NCF) - Premium Testimonials JS
 * File: assets/testimonials.js
 * Sprint: 2.9 – Premium Testimonials
 * Architecture: Touch-Friendly Testimonials Carousel & Autoplay Engine
 */

(function () {
  'use strict';

  class NCFTestimonialsCarousel {
    constructor(container) {
      this.container = container;
      this.track = container.querySelector('[data-testimonials-carousel-track]');
      if (!this.track) return;

      this.autoplay = container.dataset.autoplay === 'true';
      this.speed = parseInt(container.dataset.autoplaySpeed || '5000', 10);
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
          const itemWidth = this.track.querySelector('.ncf-testimonials-carousel-item')?.clientWidth || 300;
          this.track.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
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

  function initTestimonialsSections() {
    document.querySelectorAll('[data-testimonials-section]').forEach((container) => {
      new NCFTestimonialsCarousel(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsSections);
  } else {
    initTestimonialsSections();
  }
})();
