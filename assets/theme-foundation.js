/*
  Nova Commerce Framework (NCF) - Foundation JS
  File: assets/theme-foundation.js
  Sprint: 1.5 - Form System & Interactive Controls
*/

(function () {
  'use strict';

  // Global Theme Namespace Initialization
  window.NCF = window.NCF || {};
  window.NCF.version = '1.5.0';
  window.NCF.sprint = '1.5 - Form System & Interactive Controls';

  // Accessibility Announcer Utility
  window.NCF.announce = function (message) {
    const announcer = document.getElementById('ncf-a11y-announcer');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(function () {
        announcer.textContent = message;
      }, 50);
    }
  };

  // Base Web Component Class Shell
  if (!window.customElements.get('ncf-base-element')) {
    class NCFBaseElement extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        // Base lifecycle hook
      }
    }
    window.customElements.define('ncf-base-element', NCFBaseElement);
  }

  // Button UI Element Web Component Helper
  if (!window.customElements.get('ncf-button')) {
    class NCFButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        const btn = this.querySelector('button, a');
        if (btn) {
          this.setAttribute('role', 'presentation');
        }
      }
      setLoading(isLoading) {
        const btn = this.querySelector('button, a');
        if (btn) {
          if (isLoading) {
            btn.classList.add('btn--loading');
            btn.setAttribute('aria-busy', 'true');
            btn.setAttribute('disabled', 'true');
          } else {
            btn.classList.remove('btn--loading');
            btn.removeAttribute('aria-busy');
            btn.removeAttribute('disabled');
          }
        }
      }
    }
    window.customElements.define('ncf-button', NCFButton);
  }

  // ---------------------------------------------------------------------------
  // FORM INTERACTION HELPERS (Sprint 1.5)
  // ---------------------------------------------------------------------------

  // Password Visibility Toggle Helper
  window.NCF.initPasswordToggles = function () {
    document.querySelectorAll('[data-ncf-password-toggle]').forEach(function (button) {
      if (button.dataset.ncfInitialized) return;
      button.dataset.ncfInitialized = 'true';

      button.addEventListener('click', function (e) {
        e.preventDefault();
        const wrapper = button.closest('.form-input-password-wrapper');
        if (!wrapper) return;
        const input = wrapper.querySelector('input');
        if (!input) return;

        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        button.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
      });
    });
  };

  // Character Counter Helper
  window.NCF.initCharCounters = function () {
    document.querySelectorAll('[data-ncf-char-counter]').forEach(function (input) {
      if (input.dataset.ncfInitialized) return;
      input.dataset.ncfInitialized = 'true';

      const max = parseInt(input.getAttribute('maxlength') || '100', 10);
      const targetId = input.getAttribute('data-ncf-char-counter');
      const counterEl = targetId ? document.getElementById(targetId) : input.nextElementSibling;

      function updateCount() {
        const currentLength = input.value.length;
        if (counterEl) {
          counterEl.textContent = currentLength + ' / ' + max;
          if (currentLength >= max) {
            counterEl.classList.add('form-char-counter--limit');
          } else {
            counterEl.classList.remove('form-char-counter--limit');
          }
        }
      }

      input.addEventListener('input', updateCount);
      updateCount();
    });
  };

  // Number Input Stepper Helper
  window.NCF.initNumberSteppers = function () {
    document.querySelectorAll('.form-input-number-wrapper').forEach(function (wrapper) {
      if (wrapper.dataset.ncfInitialized) return;
      wrapper.dataset.ncfInitialized = 'true';

      const input = wrapper.querySelector('input[type="number"]');
      const minusBtn = wrapper.querySelector('.form-number-btn--minus');
      const plusBtn = wrapper.querySelector('.form-number-btn--plus');
      if (!input) return;

      if (minusBtn) {
        minusBtn.addEventListener('click', function () {
          const min = parseFloat(input.getAttribute('min') || '-Infinity');
          const step = parseFloat(input.getAttribute('step') || '1');
          const currentVal = parseFloat(input.value || '0');
          if (currentVal - step >= min) {
            input.value = currentVal - step;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      if (plusBtn) {
        plusBtn.addEventListener('click', function () {
          const max = parseFloat(input.getAttribute('max') || 'Infinity');
          const step = parseFloat(input.getAttribute('step') || '1');
          const currentVal = parseFloat(input.value || '0');
          if (currentVal + step <= max) {
            input.value = currentVal + step;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }
    });
  };

  // Auto-Initialize Interactive Form Controls on DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function () {
    window.NCF.initPasswordToggles();
    window.NCF.initCharCounters();
    window.NCF.initNumberSteppers();
  });

  // Responsive Breakpoint Observer
  window.NCF.breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    isMobile: function () {
      return window.innerWidth < this.md;
    },
    isTablet: function () {
      return window.innerWidth >= this.md && window.innerWidth < this.lg;
    },
    isDesktop: function () {
      return window.innerWidth >= this.lg;
    }
  };

  console.log('NCF Theme Foundation & Form System Loaded [v1.5.0]');
})();

