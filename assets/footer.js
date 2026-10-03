/**
 * Nova Commerce Framework (NCF) - Enterprise Footer JS
 * File: assets/footer.js
 * Sprint: 3.0 – Enterprise Footer System
 * Architecture: Mobile Accordions, Keyboard Navigation & Interactive Footers
 */

(function () {
  'use strict';

  class NCFFooterAccordion {
    constructor(footerElement) {
      this.footer = footerElement;
      this.columns = Array.from(footerElement.querySelectorAll('.ncf-footer-col[data-collapsible]'));
      this.init();
    }

    init() {
      this.bindAccordionEvents();
    }

    bindAccordionEvents() {
      this.columns.forEach((col) => {
        const titleBtn = col.querySelector('.ncf-footer-col__title-btn');
        if (!titleBtn) return;

        titleBtn.addEventListener('click', () => {
          // Toggle accordion only on mobile screens (<768px)
          if (window.innerWidth >= 768) return;

          const isExpanded = col.getAttribute('aria-expanded') === 'true';
          col.setAttribute('aria-expanded', !isExpanded);
          titleBtn.setAttribute('aria-expanded', !isExpanded);
        });
      });
    }
  }

  function initFooter() {
    document.querySelectorAll('[data-enterprise-footer]').forEach((footer) => {
      new NCFFooterAccordion(footer);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
