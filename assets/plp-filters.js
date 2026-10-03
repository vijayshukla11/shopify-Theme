/*
  ==============================================================================
  NOVA COMMERCE FRAMEWORK (NCF) - PLP FILTER SYSTEM INTERACTION CONTROLLER
  File: assets/plp-filters.js
  Sprint: 4.1 – Filter Sidebar & Mobile Filter Drawer
  Architecture: Lightweight Vanilla JS Component for Mobile Drawer & Accordion Filters
  ==============================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  const NCF_Filters = {
    init() {
      this.initAccordions();
      this.initMobileDrawer();
      this.initFilterSearch();
      this.initShowMore();
      this.initPriceSliders();
      this.updateActiveFacetCounts();
    },

    /* -------------------------------------------------------------------------
       1. ACCORDION TOGGLING
       ------------------------------------------------------------------------- */
    initAccordions() {
      document.addEventListener('click', (e) => {
        const headerBtn = e.target.closest('.ncf-filter-group__header');
        if (!headerBtn) return;

        const isExpanded = headerBtn.getAttribute('aria-expanded') === 'true';
        const bodyId = headerBtn.getAttribute('aria-controls');
        const bodyEl = document.getElementById(bodyId);

        if (bodyEl) {
          headerBtn.setAttribute('aria-expanded', !isExpanded);
          if (isExpanded) {
            bodyEl.classList.add('ncf-filter-group__body--collapsed');
          } else {
            bodyEl.classList.remove('ncf-filter-group__body--collapsed');
          }
        }
      });
    },

    /* -------------------------------------------------------------------------
       2. MOBILE DRAWER CONTROLLER WITH FOCUS TRAP & ACCESSIBILITY
       ------------------------------------------------------------------------- */
    initMobileDrawer() {
      const drawer = document.getElementById('ncf-filter-drawer');
      const overlay = document.getElementById('ncf-filter-drawer-overlay');
      const closeBtn = document.getElementById('ncf-filter-drawer-close');
      const applyBtn = document.getElementById('ncf-drawer-apply');

      if (!drawer) return;

      let lastActiveElement = null;

      const openDrawer = () => {
        lastActiveElement = document.activeElement;
        drawer.classList.add('ncf-filter-drawer--active');
        if (overlay) overlay.classList.add('ncf-filter-drawer-overlay--active');
        drawer.setAttribute('aria-hidden', 'false');
        if (overlay) overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (closeBtn) closeBtn.focus();
      };

      const closeDrawer = () => {
        drawer.classList.remove('ncf-filter-drawer--active');
        if (overlay) overlay.classList.remove('ncf-filter-drawer-overlay--active');
        drawer.setAttribute('aria-hidden', 'true');
        if (overlay) overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
          lastActiveElement.focus();
        }
      };

      // Delegated listener for open triggers
      document.addEventListener('click', (e) => {
        if (e.target.closest('[data-filter-drawer-trigger]') || e.target.closest('#ncf-mobile-filter-trigger')) {
          e.preventDefault();
          openDrawer();
        }
      });

      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
      if (overlay) overlay.addEventListener('click', closeDrawer);
      if (applyBtn) applyBtn.addEventListener('click', closeDrawer);

      // ESC key handler
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('ncf-filter-drawer--active')) {
          closeDrawer();
        }
      });
    },

    /* -------------------------------------------------------------------------
       3. SEARCH INSIDE LONG FILTER LISTS
       ------------------------------------------------------------------------- */
    initFilterSearch() {
      document.addEventListener('input', (e) => {
        if (!e.target.matches('[data-filter-search-input]')) return;

        const query = e.target.value.toLowerCase().trim();
        const groupEl = e.target.closest('.ncf-filter-group');
        if (!groupEl) return;

        const items = groupEl.querySelectorAll('[data-filter-value-label]');
        items.forEach((item) => {
          const label = item.getAttribute('data-filter-value-label') || '';
          if (label.includes(query)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    },

    /* -------------------------------------------------------------------------
       4. SHOW MORE / SHOW LESS TOGGLE
       ------------------------------------------------------------------------- */
    initShowMore() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter-show-more]');
        if (!btn) return;

        const groupEl = btn.closest('.ncf-filter-group');
        if (!groupEl) return;

        const hiddenItems = groupEl.querySelectorAll('.ncf-filter-item--overflow');
        const textSpan = btn.querySelector('.ncf-filter-show-more__text');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        hiddenItems.forEach((item) => {
          item.classList.toggle('hidden', isExpanded);
        });

        btn.setAttribute('aria-expanded', !isExpanded);
        if (textSpan) {
          textSpan.textContent = isExpanded ? '+ Show More' : '- Show Less';
        }
      });
    },

    /* -------------------------------------------------------------------------
       5. PRICE RANGE SLIDER SYNCHRONIZATION
       ------------------------------------------------------------------------- */
    initPriceSliders() {
      document.querySelectorAll('.ncf-filter-price').forEach((priceContainer) => {
        const minThumb = priceContainer.querySelector('.ncf-filter-price__range-thumb--min');
        const maxThumb = priceContainer.querySelector('.ncf-filter-price__range-thumb--max');
        const minInput = priceContainer.querySelectorAll('.ncf-filter-price__input')[0];
        const maxInput = priceContainer.querySelectorAll('.ncf-filter-price__input')[1];
        const bar = priceContainer.querySelector('.ncf-filter-price__bar');

        if (!minThumb || !maxThumb || !minInput || !maxInput || !bar) return;

        const updateBar = () => {
          const maxVal = parseFloat(minThumb.max) || 1000;
          const minPercent = (parseFloat(minThumb.value) / maxVal) * 100;
          const maxPercent = (parseFloat(maxThumb.value) / maxVal) * 100;

          bar.style.left = `${minPercent}%`;
          bar.style.right = `${100 - maxPercent}%`;
        };

        minThumb.addEventListener('input', () => {
          if (parseFloat(minThumb.value) > parseFloat(maxThumb.value)) {
            minThumb.value = maxThumb.value;
          }
          minInput.value = minThumb.value;
          updateBar();
        });

        maxThumb.addEventListener('input', () => {
          if (parseFloat(maxThumb.value) < parseFloat(minThumb.value)) {
            maxThumb.value = minThumb.value;
          }
          maxInput.value = maxThumb.value;
          updateBar();
        });

        minInput.addEventListener('input', () => {
          minThumb.value = minInput.value;
          updateBar();
        });

        maxInput.addEventListener('input', () => {
          maxThumb.value = maxInput.value;
          updateBar();
        });

        updateBar();
      });
    },

    /* -------------------------------------------------------------------------
       6. ACTIVE FACET COUNTER & BADGE UPDATES
       ------------------------------------------------------------------------- */
    updateActiveFacetCounts() {
      const activeFacets = document.querySelectorAll('.ncf-active-facet').length;
      const sidebarBadge = document.getElementById('ncf-active-filters-count');
      const drawerBadge = document.getElementById('ncf-drawer-active-count');
      const clearAllBtn = document.getElementById('ncf-plp-clear-all');

      if (sidebarBadge) {
        sidebarBadge.textContent = activeFacets;
        sidebarBadge.hidden = activeFacets === 0;
      }
      if (drawerBadge) {
        drawerBadge.textContent = activeFacets;
        drawerBadge.hidden = activeFacets === 0;
      }
      if (clearAllBtn) {
        clearAllBtn.hidden = activeFacets === 0;
      }
    }
  };

  NCF_Filters.init();
});
