/*
  ==============================================================================
  NOVA COMMERCE FRAMEWORK (NCF) - CATEGORY COLLECTION SLIDER JS
  File: assets/category-slider.js
  Sprint: 2.2 - Premium Category Collection Slider
  Architecture: Native ES6 Class Slider with Touch, Drag & Accessibility
  ==============================================================================
*/

(function () {
  'use strict';

  window.NCF = window.NCF || {};

  class NCFCategorySlider {
    constructor(container) {
      this.container = container;
      if (!this.container) return;

      this.viewport = this.container.querySelector('[data-category-viewport]');
      this.track = this.container.querySelector('[data-category-track]');
      this.slides = Array.from(this.container.querySelectorAll('[data-category-slide]'));
      if (!this.viewport || this.slides.length === 0) return;

      this.prevBtn = this.container.querySelector('[data-category-prev]');
      this.nextBtn = this.container.querySelector('[data-category-next]');
      this.dots = Array.from(this.container.querySelectorAll('[data-category-dot]'));

      this.autoPlay = this.container.dataset.autoplay === 'true';
      this.loop = this.container.dataset.loop === 'true';
      this.speed = parseInt(this.container.dataset.speed || '4', 10) * 1000;

      this.isMouseDown = false;
      this.startX = 0;
      this.scrollLeft = 0;
      this.autoPlayTimer = null;

      this.init();
    }

    init() {
      // Button Nav Listeners
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.scrollPrev();
          this.resetAutoplay();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.scrollNext();
          this.resetAutoplay();
        });
      }

      // Dot Nav Listeners
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.scrollToSlide(index);
          this.resetAutoplay();
        });
      });

      // Mouse Drag to Scroll (Desktop UX)
      this.viewport.addEventListener('mousedown', (e) => {
        this.isMouseDown = true;
        this.viewport.classList.add('is-dragging');
        this.startX = e.pageX - this.viewport.offsetLeft;
        this.scrollLeft = this.viewport.scrollLeft;
        this.stopAutoplay();
      });

      this.viewport.addEventListener('mouseleave', () => {
        this.isMouseDown = false;
        this.viewport.classList.remove('is-dragging');
        if (this.autoPlay) this.startAutoplay();
      });

      this.viewport.addEventListener('mouseup', () => {
        this.isMouseDown = false;
        this.viewport.classList.remove('is-dragging');
        if (this.autoPlay) this.startAutoplay();
      });

      this.viewport.addEventListener('mousemove', (e) => {
        if (!this.isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - this.viewport.offsetLeft;
        const walk = (x - this.startX) * 1.5;
        this.viewport.scrollLeft = this.scrollLeft - walk;
      });

      // Scroll Event for Nav State & Pagination Dots Update
      this.viewport.addEventListener('scroll', () => {
        this.updateControlsState();
      });

      // Keyboard Arrow Navigation when viewport or section focused
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.scrollPrev();
          this.resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          this.scrollNext();
          this.resetAutoplay();
        }
      });

      // Autoplay
      if (this.autoPlay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.startAutoplay();
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
      }

      this.updateControlsState();
    }

    getSlideWidth() {
      const firstSlide = this.slides[0];
      if (!firstSlide) return 240;
      const style = window.getComputedStyle(firstSlide);
      const gap = parseInt(window.getComputedStyle(this.track).gap || '20', 10);
      return firstSlide.offsetWidth + gap;
    }

    scrollNext() {
      const slideWidth = this.getSlideWidth();
      const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
      
      if (this.viewport.scrollLeft >= maxScroll - 10) {
        if (this.loop) {
          this.viewport.scrollTo({ left: 0, behavior: 'smooth' });
        }
      } else {
        this.viewport.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    }

    scrollPrev() {
      const slideWidth = this.getSlideWidth();
      
      if (this.viewport.scrollLeft <= 10) {
        if (this.loop) {
          const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
          this.viewport.scrollTo({ left: maxScroll, behavior: 'smooth' });
        }
      } else {
        this.viewport.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      }
    }

    scrollToSlide(index) {
      const slideWidth = this.getSlideWidth();
      this.viewport.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    }

    updateControlsState() {
      const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
      const currentScroll = this.viewport.scrollLeft;

      if (!this.loop) {
        if (this.prevBtn) this.prevBtn.disabled = currentScroll <= 5;
        if (this.nextBtn) this.nextBtn.disabled = currentScroll >= maxScroll - 5;
      }

      // Update Dot Indicators
      if (this.dots.length > 0) {
        const slideWidth = this.getSlideWidth();
        const activeIndex = Math.min(
          this.dots.length - 1,
          Math.round(currentScroll / slideWidth)
        );

        this.dots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('is-active');
            dot.setAttribute('aria-selected', 'true');
          } else {
            dot.classList.remove('is-active');
            dot.setAttribute('aria-selected', 'false');
          }
        });
      }
    }

    startAutoplay() {
      this.stopAutoplay();
      this.autoPlayTimer = setInterval(() => {
        this.scrollNext();
      }, this.speed);
    }

    stopAutoplay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    }

    resetAutoplay() {
      if (this.autoPlay) {
        this.startAutoplay();
      }
    }
  }

  // Expose Class to Global NCF Namespace
  window.NCF.NCFCategorySlider = NCFCategorySlider;

  // Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-ncf-category-slider]');
    sliders.forEach((slider) => new NCFCategorySlider(slider));
    console.log('Nova Commerce Framework (NCF) Category Slider Loaded [Sprint 2.2]');
  });

  // Shopify Theme Editor Live Event Support
  document.addEventListener('shopify:section:load', (e) => {
    const slider = e.target.querySelector('[data-ncf-category-slider]');
    if (slider) new NCFCategorySlider(slider);
  });
})();
