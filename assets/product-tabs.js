/**
 * Nova Commerce Framework (NCF) - Product Tabs & Accordion Controller
 * File: assets/product-tabs.js
 * Sprint: 4.5 – Product Information, Specifications & Trust Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabsWrapper = document.querySelector('[data-pdp-tabs-wrapper]');
  if (!tabsWrapper) return;

  const tabButtons = Array.from(tabsWrapper.querySelectorAll('.ncf-pdp-tab-btn'));
  const accordionTriggers = Array.from(tabsWrapper.querySelectorAll('[data-pdp-accordion-trigger]'));
  const panels = Array.from(tabsWrapper.querySelectorAll('.ncf-pdp-tab-panel'));

  /**
   * Activate Tab on Desktop
   */
  function activateTab(targetId) {
    tabButtons.forEach((btn) => {
      const isTarget = btn.getAttribute('data-tab-target') === targetId;
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (isTarget) {
        btn.classList.add('border-sky-600', 'text-sky-600', 'dark:border-sky-400', 'dark:text-sky-400');
        btn.classList.remove('border-transparent', 'text-slate-500', 'dark:text-slate-400');
      } else {
        btn.classList.remove('border-sky-600', 'text-sky-600', 'dark:border-sky-400', 'dark:text-sky-400');
        btn.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');
      }
    });

    panels.forEach((panel) => {
      const parentAccordion = panel.closest('[data-panel-id]');
      const panelId = parentAccordion ? parentAccordion.getAttribute('data-panel-id') : '';
      if (panelId === targetId) {
        panel.classList.remove('hidden', 'md:hidden');
        panel.classList.add('block', 'md:block');
      } else {
        panel.classList.add('hidden', 'md:hidden');
        panel.classList.remove('block', 'md:block');
      }
    });
  }

  // Desktop tab click listener
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      if (targetId) activateTab(targetId);
    });

    // Keyboard navigation (WCAG 2.2 AA)
    btn.addEventListener('keydown', (e) => {
      let index = tabButtons.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = tabButtons[(index + 1) % tabButtons.length];
        nextBtn.focus();
        nextBtn.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length];
        prevBtn.focus();
        prevBtn.click();
      }
    });
  });

  /**
   * Mobile Accordion Toggle
   */
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const targetPanel = document.getElementById(panelId);
      const icon = trigger.querySelector('[data-accordion-icon]');

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (targetPanel) {
          targetPanel.classList.add('hidden');
          targetPanel.classList.remove('block');
        }
        if (icon) icon.classList.remove('rotate-180');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
          targetPanel.classList.add('block');
        }
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
});
