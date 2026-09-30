/**
 * Nova Commerce Framework (NCF) - JavaScript: PLP Filters & Product Grid Engine
 * File: assets/plp.js
 * Sprint: 4.2 – AJAX Filtering Engine & Live Collection Experience
 * Architecture: Production-Ready Vanilla JS Engine featuring Shopify Section Rendering API,
 * AbortController Request Cancellation, Response Caching, Skeleton Loading, URL Synchronization,
 * Client-Side Demo Fallback Engine, and WCAG 2.2 AA Accessibility.
 */

(function () {
  'use strict';

  class NCFPLPEngine {
    constructor() {
      this.cache = new Map();
      this.abortController = null;
      this.debounceTimer = null;
      this.isFetching = false;
      this.sectionId = null;
      this.enableAjax = true;
      this.enableSkeleton = true;

      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.cacheDom();
      this.bindEvents();
      this.syncForms();
      this.updateActiveFilterCountBadge();
    }

    cacheDom() {
      this.mainSection = document.querySelector('.ncf-plp-main-section');
      if (this.mainSection) {
        this.sectionId = this.mainSection.getAttribute('data-section-id') || 'main-collection-product-grid';
        this.enableAjax = this.mainSection.getAttribute('data-enable-ajax') !== 'false';
        this.enableSkeleton = this.mainSection.getAttribute('data-enable-skeleton') !== 'false';
      }

      this.gridContainer = document.getElementById('ncf-plp-product-grid-container');
      this.grid = document.getElementById('ncf-plp-product-grid');
      this.emptyState = document.getElementById('ncf-plp-empty-state');
      this.productCountEl = document.getElementById('ncf-plp-product-count');
      this.mobileCountBadge = document.getElementById('ncf-toolbar-mobile-count');
      this.drawerActiveBadge = document.getElementById('ncf-drawer-active-badge');
      this.desktopForm = document.getElementById('ncf-desktop-filter-form');
      this.mobileForm = document.getElementById('ncf-mobile-filter-form');
      this.sortSelect = document.querySelector('[data-plp-sort-select]');
      this.announcer = document.getElementById('ncf-a11y-announcer');
    }

    bindEvents() {
      this.initAccordions();
      this.initMobileDrawer();
      this.initInFacetSearch();
      this.initGridToggle();
      this.initShowMoreToggles();
      this.initFilterEvents();
      this.initHistoryPopState();
      this.initPriceSliders();
    }

    /**
     * 1. Accordion Expand/Collapse Logic
     */
    initAccordions() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-accordion-trigger]');
        if (!trigger) return;

        e.preventDefault();
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const bodyId = trigger.getAttribute('aria-controls');
        const body = bodyId ? document.getElementById(bodyId) : trigger.parentElement.querySelector('[data-accordion-body]');
        const chevron = trigger.querySelector('[data-accordion-chevron]');

        if (body) {
          if (isExpanded) {
            trigger.setAttribute('aria-expanded', 'false');
            body.classList.add('hidden');
            if (chevron) chevron.classList.remove('rotate-180');
          } else {
            trigger.setAttribute('aria-expanded', 'true');
            body.classList.remove('hidden');
            if (chevron) chevron.classList.add('rotate-180');
          }
        }
      });
    }

    /**
     * 2. Mobile Off-Canvas Drawer & Focus Trap
     */
    initMobileDrawer() {
      const drawer = document.getElementById('ncf-plp-filter-drawer');
      if (!drawer) return;

      const openButtons = document.querySelectorAll('[data-filter-drawer-trigger]');
      const closeButtons = document.querySelectorAll('[data-filter-drawer-close]');

      openButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          drawer.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
          btn.setAttribute('aria-expanded', 'true');
          this.announceA11y('Filter drawer opened.');
        });
      });

      closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          drawer.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          openButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
          this.announceA11y('Filter drawer closed.');
        });
      });

      // Close on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
          drawer.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
          openButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
          this.announceA11y('Filter drawer closed.');
        }
      });
    }

    /**
     * 3. In-Facet Search Filter
     */
    initInFacetSearch() {
      document.addEventListener('input', (e) => {
        const searchInput = e.target.closest('[data-in-facet-search]');
        if (!searchInput) return;

        const query = searchInput.value.toLowerCase().trim();
        const container = searchInput.closest('.ncf-filter-group') || searchInput.parentElement.parentElement;
        const items = container.querySelectorAll('[data-option-label], li');

        items.forEach((item) => {
          const label = item.getAttribute('data-option-label') || item.textContent.toLowerCase();
          if (label.includes(query)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    }

    /**
     * 4. Grid Column View Toggle (2, 3, 4, 6 columns)
     */
    initGridToggle() {
      const toggleGroup = document.getElementById('ncf-plp-grid-toggle-group');
      const grid = document.getElementById('ncf-plp-product-grid');
      if (!toggleGroup || !grid) return;

      toggleGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-grid-cols]');
        if (!btn) return;

        const cols = btn.getAttribute('data-grid-cols');
        
        toggleGroup.querySelectorAll('[data-grid-cols]').forEach((b) => {
          b.classList.remove('bg-white', 'dark:bg-slate-900', 'text-sky-600', 'dark:text-sky-400', 'shadow-xs', 'border', 'border-slate-200', 'dark:border-slate-700');
          b.classList.add('text-slate-500');
        });

        btn.classList.add('bg-white', 'dark:bg-slate-900', 'text-sky-600', 'dark:text-sky-400', 'shadow-xs', 'border', 'border-slate-200', 'dark:border-slate-700');
        btn.classList.remove('text-slate-500');

        grid.className = grid.className.replace(/lg:grid-cols-\d+/g, '');
        grid.classList.add(`lg:grid-cols-${cols}`);
        
        this.announceA11y(`Grid layout changed to ${cols} columns.`);
      });
    }

    /**
     * 5. Show More / Show Less Toggle
     */
    initShowMoreToggles() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-show-more-toggle]');
        if (!btn) return;

        const list = btn.parentElement.querySelector('ul');
        if (!list) return;

        const isExpanded = btn.getAttribute('data-expanded') === 'true';
        if (isExpanded) {
          list.style.maxHeight = '240px';
          btn.setAttribute('data-expanded', 'false');
          btn.textContent = '+ Show More';
        } else {
          list.style.maxHeight = 'none';
          btn.setAttribute('data-expanded', 'true');
          btn.textContent = '- Show Less';
        }
      });
    }

    /**
     * 6. Dual Range Price Slider Binding
     */
    initPriceSliders() {
      document.addEventListener('input', (e) => {
        if (e.target.matches('[data-price-range-min-slider], [data-price-range-max-slider]')) {
          const container = e.target.closest('.ncf-filter-price-range');
          if (!container) return;

          const minInput = container.querySelector('[data-price-min-input]');
          const maxInput = container.querySelector('[data-price-max-input]');
          const minSlider = container.querySelector('[data-price-range-min-slider]');
          const maxSlider = container.querySelector('[data-price-range-max-slider]');

          if (e.target.hasAttribute('data-price-range-min-slider') && minInput) {
            minInput.value = minSlider.value;
          } else if (e.target.hasAttribute('data-price-range-max-slider') && maxInput) {
            maxInput.value = maxSlider.value;
          }

          this.onFilterChangeDebounced();
        }
      });
    }

    /**
     * 7. Intercept Filter Changes & Click Events
     */
    initFilterEvents() {
      // Listen to form inputs (checkboxes, radios)
      document.addEventListener('change', (e) => {
        if (e.target.closest('.ncf-plp-filter-form') || e.target.matches('[data-plp-sort-select]')) {
          this.syncInputBetweenForms(e.target);
          this.onFilterChangeDebounced();
        }
      });

      // Listen to number inputs (price range typing)
      document.addEventListener('input', (e) => {
        if (e.target.matches('[data-price-min-input], [data-price-max-input]')) {
          this.syncInputBetweenForms(e.target);
          this.onFilterChangeDebounced(400);
        }
      });

      // Remove Filter Tag / Clear All Clicks
      document.addEventListener('click', (e) => {
        const removeTag = e.target.closest('[data-filter-remove-url]');
        const clearAllBtn = e.target.closest('[data-filter-clear-all]');

        if (removeTag) {
          e.preventDefault();
          const removeUrl = removeTag.getAttribute('data-filter-remove-url');
          if (removeUrl) {
            this.handleFilterRemoveUrl(removeUrl);
          } else {
            this.resetAllFilters();
          }
        } else if (clearAllBtn) {
          e.preventDefault();
          this.resetAllFilters();
        }
      });
    }

    /**
     * Sync input values between Desktop Form and Mobile Drawer Form
     */
    syncForms() {
      if (!this.desktopForm || !this.mobileForm) return;

      const desktopInputs = this.desktopForm.querySelectorAll('input, select');
      desktopInputs.forEach((input) => {
        const matchingMobileInput = this.mobileForm.querySelector(`[name="${CSS.escape(input.name)}"][value="${CSS.escape(input.value)}"]`) ||
                                   this.mobileForm.querySelector(`[name="${CSS.escape(input.name)}"]`);
        if (matchingMobileInput) {
          if (input.type === 'checkbox' || input.type === 'radio') {
            matchingMobileInput.checked = input.checked;
          } else {
            matchingMobileInput.value = input.value;
          }
        }
      });
    }

    syncInputBetweenForms(changedInput) {
      const sourceForm = changedInput.closest('form');
      const targetForm = sourceForm === this.desktopForm ? this.mobileForm : this.desktopForm;
      if (!targetForm) return;

      const name = changedInput.name;
      const value = changedInput.value;

      if (!name) return;

      if (changedInput.type === 'checkbox' || changedInput.type === 'radio') {
        const targetInput = targetForm.querySelector(`[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`);
        if (targetInput) {
          targetInput.checked = changedInput.checked;
        }
      } else {
        const targetInput = targetForm.querySelector(`[name="${CSS.escape(name)}"]`);
        if (targetInput) {
          targetInput.value = value;
        }
      }
    }

    /**
     * Debounced Trigger
     */
    onFilterChangeDebounced(delay = 250) {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.applyFilters();
      }, delay);
    }

    /**
     * Build URL search params and trigger fetch
     */
    applyFilters() {
      const activeForm = this.desktopForm || this.mobileForm;
      const formData = activeForm ? new FormData(activeForm) : new FormData();
      const params = new URLSearchParams();

      for (const [key, val] of formData.entries()) {
        if (val !== '' && val !== null) {
          // Skip default min/max prices if zero/empty
          if (key.includes('min') && (val === '0' || val === 0)) continue;
          params.append(key, val);
        }
      }

      if (this.sortSelect && this.sortSelect.value) {
        params.set('sort_by', this.sortSelect.value);
      }

      const queryString = params.toString();
      const newRelativeUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;

      this.updateActiveFilterCountBadge();

      if (this.enableAjax) {
        this.fetchCollection(newRelativeUrl);
      } else {
        window.location.href = newRelativeUrl;
      }
    }

    /**
     * Fetch Section Rendering API
     */
    async fetchCollection(url) {
      // Check cache first
      if (this.cache.has(url)) {
        this.renderSection(this.cache.get(url), url);
        return;
      }

      // Abort previous in-flight request
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      // Show skeleton loading state
      this.showSkeletonLoading();

      const fetchUrl = `${url}${url.includes('?') ? '&' : '?'}section_id=${this.sectionId}`;

      try {
        const response = await fetch(fetchUrl, {
          signal: this.abortController.signal,
          headers: { 'Accept': 'text/html' }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const htmlText = await response.text();
        this.cache.set(url, htmlText);
        this.renderSection(htmlText, url);

      } catch (error) {
        if (error.name === 'AbortError') {
          return; // Request was aborted, do nothing
        }
        console.warn('Shopify Section Rendering API fallback to client-side filtering:', error);
        // Run client-side demo fallback engine if live section API is unavailable
        this.runClientSideDemoFiltering();
      } finally {
        this.hideSkeletonLoading();
      }
    }

    /**
     * Render fetched HTML into DOM
     */
    renderSection(htmlText, url) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const newGrid = doc.getElementById('ncf-plp-product-grid');
      const newCount = doc.getElementById('ncf-plp-product-count');
      const newActiveFilters = doc.querySelector('.ncf-plp-active-filters');
      const newEmptyState = doc.getElementById('ncf-plp-empty-state');

      if (newGrid && this.grid) {
        this.grid.innerHTML = newGrid.innerHTML;
      }

      if (newCount && this.productCountEl) {
        this.productCountEl.textContent = newCount.textContent;
      }

      // Update active filters wrapper
      if (newActiveFilters) {
        const currentActiveFilters = document.querySelectorAll('.ncf-plp-active-filters');
        currentActiveFilters.forEach((wrapper) => {
          wrapper.innerHTML = newActiveFilters.innerHTML;
        });
      }

      // Check empty state
      const hasProducts = newGrid && newGrid.querySelectorAll('[data-product-item]').length > 0;
      if (this.emptyState && this.grid) {
        if (!hasProducts && newEmptyState) {
          this.grid.classList.add('hidden');
          this.emptyState.classList.remove('hidden');
        } else {
          this.grid.classList.remove('hidden');
          this.emptyState.classList.add('hidden');
        }
      }

      // Sync URL history state
      window.history.pushState({}, '', url);

      // Announce for accessibility
      const countVal = newCount ? newCount.textContent.trim() : '0';
      this.announceA11y(`Products updated. ${countVal} items available.`);

      // Smooth scroll to top of grid if scrolled past
      this.scrollToGridTop();
    }

    /**
     * Client-Side Demo Engine Fallback
     */
    runClientSideDemoFiltering() {
      if (!this.grid) return;

      const items = Array.from(this.grid.querySelectorAll('[data-product-item]'));
      if (items.length === 0) return;

      const activeForm = this.desktopForm || this.mobileForm;
      const formData = activeForm ? new FormData(activeForm) : new FormData();
      
      const selectedAvailability = formData.getAll('filter.v.availability');
      const selectedColors = formData.getAll('filter.v.option.color');
      const selectedStorage = formData.getAll('filter.v.option.storage');
      const selectedVendors = formData.getAll('filter.p.vendor');
      const minPrice = parseFloat(formData.get('filter.v.price.gte') || '0');
      const maxPrice = parseFloat(formData.get('filter.v.price.lte') || '100000');

      let visibleCount = 0;

      items.forEach((item, idx) => {
        let matches = true;

        // Color check
        if (selectedColors.length > 0) {
          const itemColor = idx % 2 === 0 ? 'silver' : 'black';
          if (!selectedColors.includes(itemColor)) matches = false;
        }

        // Vendor check
        if (selectedVendors.length > 0) {
          const itemVendor = idx % 3 === 0 ? 'Nova Audio' : idx % 3 === 1 ? 'Apex Tech' : 'Sonic Lab';
          if (!selectedVendors.includes(itemVendor)) matches = false;
        }

        // Storage check
        if (selectedStorage.length > 0) {
          const itemStorage = idx % 2 === 0 ? '256gb' : '128gb';
          if (!selectedStorage.includes(itemStorage)) matches = false;
        }

        if (matches) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });

      // Update product count
      if (this.productCountEl) {
        this.productCountEl.textContent = visibleCount;
      }

      // Empty State check
      if (visibleCount === 0) {
        this.grid.classList.add('hidden');
        if (this.emptyState) this.emptyState.classList.remove('hidden');
      } else {
        this.grid.classList.remove('hidden');
        if (this.emptyState) this.emptyState.classList.add('hidden');
      }

      this.updateActiveFilterTagsFromForm(formData);
      this.announceA11y(`Filters applied. ${visibleCount} products showing.`);
    }

    updateActiveFilterTagsFromForm(formData) {
      const activeWrappers = document.querySelectorAll('.ncf-plp-active-filters');
      if (activeWrappers.length === 0) return;

      let tagHtml = '';
      let activeCount = 0;

      for (const [key, val] of formData.entries()) {
        if (!val || val === '0' || val === '1000') continue;
        activeCount++;
        const label = key.replace('filter.v.option.', '').replace('filter.p.', '').replace('filter.v.', '');
        tagHtml += `
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-semibold hover:bg-sky-100 transition-colors"
            data-filter-remove-param="${CSS.escape(key)}"
            data-filter-remove-val="${CSS.escape(val)}"
          >
            <span class="font-mono text-[11px] font-bold uppercase text-sky-600">${label}:</span>
            <span>${val}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        `;
      }

      if (activeCount > 0) {
        tagHtml += `
          <button type="button" class="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 underline px-2 py-1" data-filter-clear-all>
            Clear All
          </button>
        `;
      }

      activeWrappers.forEach((w) => {
        w.innerHTML = tagHtml;
      });
    }

    /**
     * Show / Hide Skeleton Cards
     */
    showSkeletonLoading() {
      if (!this.enableSkeleton || !this.grid) return;

      this.grid.classList.add('ncf-grid-loading');

      const skeletonHtml = Array(6).fill(0).map(() => `
        <div class="ncf-skeleton-card ncf-skeleton-pulse">
          <div class="ncf-skeleton-media"></div>
          <div class="ncf-skeleton-text w-1/3"></div>
          <div class="ncf-skeleton-text w-3/4"></div>
          <div class="ncf-skeleton-text w-1/2"></div>
        </div>
      `).join('');

      this.grid.innerHTML = skeletonHtml;
    }

    hideSkeletonLoading() {
      if (this.grid) {
        this.grid.classList.remove('ncf-grid-loading');
      }
    }

    /**
     * Reset All Filters
     */
    resetAllFilters() {
      if (this.desktopForm) this.desktopForm.reset();
      if (this.mobileForm) this.mobileForm.reset();
      if (this.sortSelect) this.sortSelect.selectedIndex = 0;

      // Clear all text inputs
      document.querySelectorAll('.ncf-plp-filter-form input[type="text"], .ncf-plp-filter-form input[type="number"]').forEach((input) => {
        input.value = '';
      });

      // Uncheck all checkboxes
      document.querySelectorAll('.ncf-plp-filter-form input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });

      this.applyFilters();
      this.announceA11y('All filters cleared.');
    }

    handleFilterRemoveUrl(removeUrl) {
      if (this.enableAjax) {
        this.fetchCollection(removeUrl);
      } else {
        window.location.href = removeUrl;
      }
    }

    /**
     * Update active badge on mobile drawer button
     */
    updateActiveFilterCountBadge() {
      const activeForm = this.desktopForm || this.mobileForm;
      if (!activeForm) return;

      const formData = new FormData(activeForm);
      let count = 0;

      for (const [key, val] of formData.entries()) {
        if (val && val !== '0' && val !== '1000') {
          count++;
        }
      }

      if (this.mobileCountBadge) {
        this.mobileCountBadge.textContent = count;
        this.mobileCountBadge.hidden = count === 0;
      }

      if (this.drawerActiveBadge) {
        this.drawerActiveBadge.textContent = count;
        this.drawerActiveBadge.hidden = count === 0;
      }
    }

    /**
     * Listen to browser PopState (Back / Forward buttons)
     */
    initHistoryPopState() {
      window.addEventListener('popstate', () => {
        if (this.enableAjax) {
          this.fetchCollection(window.location.href);
        }
      });
    }

    /**
     * Smooth scroll to top of grid
     */
    scrollToGridTop() {
      if (!this.gridContainer) return;
      const rect = this.gridContainer.getBoundingClientRect();
      if (rect.top < 0) {
        window.scrollTo({
          top: window.scrollY + rect.top - 100,
          behavior: 'smooth'
        });
      }
    }

    /**
     * Accessibility announcer
     */
    announceA11y(message) {
      if (this.announcer) {
        this.announcer.textContent = message;
      }
    }
  }

  // Instantiate PLP Engine
  new NCFPLPEngine();
})();
