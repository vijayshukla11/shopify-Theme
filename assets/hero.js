/*
  ==============================================================================
  NOVA COMMERCE FRAMEWORK (NCF) - HERO BANNER INTERACTIVE CAROUSEL JS
  File: assets/hero.js
  Sprint: 2.1 - Premium Hero Banner
  Architecture: Lightweight Vanilla JS ES6 Class Module
  ==============================================================================
*/

(function () {
  'use strict';

  window.NCF = window.NCF || {};

  class NCFHeroBanner {
    constructor(container) {
      this.container = container;
      if (!this.container) return;

      this.track = this.container.querySelector('[data-hero-track]');
      this.slides = Array.from(this.container.querySelectorAll('[data-hero-slide]'));
      if (this.slides.length === 0) return;

      this.prevBtn = this.container.querySelector('[data-hero-prev]');
      this.nextBtn = this.container.querySelector('[data-hero-next]');
      this.dots = Array.from(this.container.querySelectorAll('[data-hero-dot]'));
      this.playPauseBtn = this.container.querySelector('[data-hero-toggle-play]');

      this.effect = this.container.dataset.effect || 'slide';
      this.autoPlay = this.container.dataset.autoplay === 'true';
      this.pauseOnHover = this.container.dataset.pauseOnHover === 'true';
      this.speed = parseInt(this.container.dataset.speed || '5', 10) * 1000;

      this.currentIndex = 0;
      this.isPlaying = this.autoPlay;
      this.timer = null;

      // Touch Swipe Tracking Variables
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.isDragging = false;

      this.init();
    }

    init() {
      // Setup Initial Active State
      this.goTo(0);

      // Event Listeners
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.prev();
          this.resetTimer();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.next();
          this.resetTimer();
        });
      }

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.goTo(index);
          this.resetTimer();
        });
      });

      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      }

      // Hover / Focus Pause Logic
      if (this.pauseOnHover) {
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => {
          if (this.isPlaying) this.startAutoplay();
        });
        this.container.addEventListener('focusin', () => this.stopAutoplay());
        this.container.addEventListener('focusout', () => {
          if (this.isPlaying) this.startAutoplay();
        });
      }

      // Keyboard Arrow Navigation
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.prev();
          this.resetTimer();
        } else if (e.key === 'ArrowRight') {
          this.next();
          this.resetTimer();
        }
      });

      // Touch & Swipe Event Support
      this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

      // Autoplay Initializer
      if (this.autoPlay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.startAutoplay();
      }
    }

    goTo(index) {
      if (index < 0) index = this.slides.length - 1;
      if (index >= this.slides.length) index = 0;

      this.currentIndex = index;

      // Update Track Position for Slide Effect
      if (this.effect === 'slide' && this.track) {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }

      // Update Active Slide Attributes
      this.slides.forEach((slide, idx) => {
        const isActive = idx === this.currentIndex;
        if (isActive) {
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('is-active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update Dot Indicators
      this.dots.forEach((dot, idx) => {
        const isActive = idx === this.currentIndex;
        if (isActive) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    next() {
      this.goTo(this.currentIndex + 1);
    }

    prev() {
      this.goTo(this.currentIndex - 1);
    }

    startAutoplay() {
      this.stopAutoplay();
      if (this.slides.length <= 1) return;
      this.timer = setInterval(() => this.next(), this.speed);
    }

    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    resetTimer() {
      if (this.isPlaying) {
        this.startAutoplay();
      }
    }

    togglePlayPause() {
      if (this.isPlaying) {
        this.stopAutoplay();
        this.isPlaying = false;
        if (this.playPauseBtn) {
          this.playPauseBtn.setAttribute('aria-label', 'Play slide rotation');
          this.playPauseBtn.innerHTML = `<span>▶ PLAY</span>`;
        }
      } else {
        this.isPlaying = true;
        this.startAutoplay();
        if (this.playPauseBtn) {
          this.playPauseBtn.setAttribute('aria-label', 'Pause slide rotation');
          this.playPauseBtn.innerHTML = `<span>❚❚ PAUSE</span>`;
        }
      }
    }

    handleTouchStart(e) {
      if (e.touches && e.touches.length > 0) {
        this.touchStartX = e.touches[0].clientX;
      }
    }

    handleTouchEnd(e) {
      if (e.changedTouches && e.changedTouches.length > 0) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      }
    }

    handleSwipe() {
      const swipeDistance = this.touchEndX - this.touchStartX;
      const threshold = 40; // Minimum swipe distance in px

      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance < 0) {
          // Swiped Left -> Next Slide
          this.next();
        } else {
          // Swiped Right -> Prev Slide
          this.prev();
        }
        this.resetTimer();
      }
    }
  }

  // Expose Class to Global NCF Namespace
  window.NCF.NCFHeroBanner = NCFHeroBanner;

  // Auto Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('[data-ncf-hero]');
    heroElements.forEach((hero) => new NCFHeroBanner(hero));
    console.log('Nova Commerce Framework (NCF) Hero Banner Loaded [Sprint 2.1]');
  });
})();
