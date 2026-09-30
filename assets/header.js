/*
  ==============================================================================
  NOVA COMMERCE FRAMEWORK (NCF) - HEADER & ANNOUNCEMENT INTERACTIVE JS
  File: assets/header.js
  Sprint: 2.0 - Premium Announcement Bar & Enterprise Header
  ==============================================================================
*/

(function () {
  'use strict';

  // Global Theme NCF Initialization
  window.NCF = window.NCF || {};

  /* ---------------------------------------------------------------------------
     1. ANNOUNCEMENT BAR CONTROLLER
     --------------------------------------------------------------------------- */
  class NCFAnnouncementBar {
    constructor(container) {
      this.container = container;
      if (!this.container) return;

      this.items = Array.from(this.container.querySelectorAll('[data-announcement-item]'));
      this.prevBtn = this.container.querySelector('[data-announcement-prev]');
      this.nextBtn = this.container.querySelector('[data-announcement-next]');
      this.closeBtn = this.container.querySelector('[data-announcement-close]');
      this.autoRotate = this.container.dataset.autoRotate === 'true';
      this.rotationSpeed = parseInt(this.container.dataset.rotationSpeed || '5', 10) * 1000;

      this.currentIndex = 0;
      this.timer = null;

      this.init();
    }

    init() {
      // Check if user dismissed announcement
      if (sessionStorage.getItem('ncf_announcement_dismissed') === 'true') {
        this.container.classList.add('ncf-announcement-bar--hidden');
        return;
      }

      if (this.items.length > 1) {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        if (this.autoRotate) this.startAutoRotate();

        // Pause auto-rotation on hover / focus
        this.container.addEventListener('mouseenter', () => this.stopAutoRotate());
        this.container.addEventListener('mouseleave', () => this.startAutoRotate());
      }

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => {
          this.container.classList.add('ncf-announcement-bar--hidden');
          sessionStorage.setItem('ncf_announcement_dismissed', 'true');
        });
      }
    }

    showSlide(index) {
      this.items.forEach((item, i) => {
        if (i === index) {
          item.classList.add('is-active');
          item.setAttribute('aria-hidden', 'false');
        } else {
          item.classList.remove('is-active');
          item.setAttribute('aria-hidden', 'true');
        }
      });
      this.currentIndex = index;
    }

    next() {
      const nextIndex = (this.currentIndex + 1) % this.items.length;
      this.showSlide(nextIndex);
    }

    prev() {
      const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.showSlide(prevIndex);
    }

    startAutoRotate() {
      if (!this.autoRotate || this.items.length <= 1) return;
      this.stopAutoRotate();
      this.timer = setInterval(() => this.next(), this.rotationSpeed);
    }

    stopAutoRotate() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  /* ---------------------------------------------------------------------------
     2. ENTERPRISE STICKY HEADER CONTROLLER
     --------------------------------------------------------------------------- */
  class NCFHeader {
    constructor(headerElement) {
      this.header = headerElement;
      if (!this.header) return;

      this.isSticky = this.header.dataset.sticky === 'true' || this.header.classList.contains('ncf-header-wrapper--sticky');
      this.lastScrollY = window.scrollY;
      this.scrollThreshold = 80;

      this.mobileToggle = document.querySelector('[data-mobile-menu-toggle]');
      this.mobileDrawer = document.querySelector('[data-mobile-drawer]');
      this.drawerOverlay = document.querySelector('[data-mobile-drawer-overlay]');
      this.drawerClose = document.querySelector('[data-mobile-drawer-close]');

      this.init();
    }

    init() {
      if (this.isSticky) {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll(); // Initial position check
      }

      // Mobile Menu Drawer Triggers
      if (this.mobileToggle && this.mobileDrawer) {
        this.mobileToggle.addEventListener('click', () => this.openMobileMenu());
      }
      if (this.drawerClose) {
        this.drawerClose.addEventListener('click', () => this.closeMobileMenu());
      }
      if (this.drawerOverlay) {
        this.drawerOverlay.addEventListener('click', () => this.closeMobileMenu());
      }

      // Keyboard Accessibility
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
          this.closeAllDropdowns();
        }
      });

      this.initMegaMenuHover();
    }

    handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY >= this.scrollThreshold) {
        this.header.classList.add('is-scrolled');
        this.header.classList.add('is-sticky-active');

        const announcementBar = document.querySelector('[data-ncf-announcement-bar]');
        if (announcementBar) {
          announcementBar.classList.add('is-scrolled-hidden');
        }
      } else {
        this.header.classList.remove('is-scrolled');
        this.header.classList.remove('is-sticky-active');

        const announcementBar = document.querySelector('[data-ncf-announcement-bar]');
        if (announcementBar) {
          announcementBar.classList.remove('is-scrolled-hidden');
        }
      }

      this.lastScrollY = currentScrollY;
    }

    openMobileMenu() {
      if (!this.mobileDrawer) return;
      this.mobileDrawer.classList.add('is-open');
      this.mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'true');
    }

    closeMobileMenu() {
      if (!this.mobileDrawer) return;
      this.mobileDrawer.classList.remove('is-open');
      this.mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (this.mobileToggle) this.mobileToggle.setAttribute('aria-expanded', 'false');
    }

    initMegaMenuHover() {
      const navItems = this.header.querySelectorAll('.ncf-nav__item');

      navItems.forEach((item) => {
        const link = item.querySelector('.ncf-nav__link');
        const dropdown = item.querySelector('.ncf-dropdown, .ncf-mega-menu');

        if (link && dropdown) {
          link.addEventListener('focus', () => {
            this.closeAllDropdowns();
            link.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('is-open');
          });

          // Toggle click for touch devices
          link.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) return;
            if (dropdown) {
              const isOpen = link.getAttribute('aria-expanded') === 'true';
              this.closeAllDropdowns();
              if (!isOpen) {
                link.setAttribute('aria-expanded', 'true');
                dropdown.classList.add('is-open');
              }
            }
          });
        }
      });
    }

    closeAllDropdowns() {
      const links = this.header.querySelectorAll('.ncf-nav__link');
      const dropdowns = this.header.querySelectorAll('.ncf-dropdown, .ncf-mega-menu');

      links.forEach((l) => l.setAttribute('aria-expanded', 'false'));
      dropdowns.forEach((d) => d.classList.remove('is-open'));
    }
  }

  /* ---------------------------------------------------------------------------
     3. PREDICTIVE SEARCH DROPDOWN HELPER
     --------------------------------------------------------------------------- */
  class NCFSearch {
    constructor(searchWrapper) {
      this.wrapper = searchWrapper;
      if (!this.wrapper) return;

      this.input = this.wrapper.querySelector('input[type="search"]');
      this.results = this.wrapper.querySelector('[data-search-results]');

      if (this.input && this.results) {
        this.input.addEventListener('focus', () => {
          this.results.classList.add('is-open');
        });

        document.addEventListener('click', (e) => {
          if (!this.wrapper.contains(e.target)) {
            this.results.classList.remove('is-open');
          }
        });
      }
    }
  }

  // Auto-Initialize Components on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    const announcementEl = document.querySelector('[data-ncf-announcement-bar]');
    if (announcementEl) new NCFAnnouncementBar(announcementEl);

    const headerEl = document.querySelector('[data-ncf-header]');
    if (headerEl) new NCFHeader(headerEl);

    const searchEl = document.querySelector('.ncf-header-search');
    if (searchEl) new NCFSearch(searchEl);

    console.log('Nova Commerce Framework (NCF) Header & Announcement Bar Loaded [v2.0.0]');
  });
})();
