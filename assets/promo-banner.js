/**
 * Nova Commerce Framework (NCF) - Premium Promotional Banner JS
 * File: assets/promo-banner.js
 * Sprint: 2.6 – Premium Promotional Banner System
 * Architecture: Countdown Timer Engine & Video/Media Auto Engine
 */

(function () {
  'use strict';

  class NCFPromoCountdown {
    constructor(element) {
      this.element = element;
      this.targetDateStr = element.getAttribute('data-countdown-target');
      if (!this.targetDateStr) return;

      this.targetDate = new Date(this.targetDateStr).getTime();
      if (isNaN(this.targetDate)) return;

      this.daysEl = element.querySelector('[data-countdown-days]');
      this.hoursEl = element.querySelector('[data-countdown-hours]');
      this.minsEl = element.querySelector('[data-countdown-minutes]');
      this.secsEl = element.querySelector('[data-countdown-seconds]');

      this.start();
    }

    start() {
      this.update();
      this.timer = setInterval(() => this.update(), 1000);
    }

    update() {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      if (distance < 0) {
        clearInterval(this.timer);
        this.element.classList.add('is-expired');
        if (this.daysEl) this.daysEl.textContent = '00';
        if (this.hoursEl) this.hoursEl.textContent = '00';
        if (this.minsEl) this.minsEl.textContent = '00';
        if (this.secsEl) this.secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (this.daysEl) this.daysEl.textContent = this.pad(days);
      if (this.hoursEl) this.hoursEl.textContent = this.pad(hours);
      if (this.minsEl) this.minsEl.textContent = this.pad(minutes);
      if (this.secsEl) this.secsEl.textContent = this.pad(seconds);
    }

    pad(num) {
      return num < 10 ? `0${num}` : num;
    }
  }

  function initPromoBanners() {
    document.querySelectorAll('[data-promo-countdown]').forEach((timerEl) => {
      new NCFPromoCountdown(timerEl);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPromoBanners);
  } else {
    initPromoBanners();
  }
})();
