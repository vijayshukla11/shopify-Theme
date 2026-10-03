/**
 * Nova Commerce Framework (NCF) - Enterprise Product Card JS
 * File: assets/product-card.js
 * Sprint: 2.4 - Enterprise Product Card System
 */

(function () {
  'use strict';

  class NCFProductCardEngine {
    constructor() {
      this.init();
    }

    init() {
      this.bindEvents();
      this.restoreWishlistStates();
      this.restoreCompareStates();
    }

    bindEvents() {
      // Global Event Delegation for Product Cards
      document.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('[data-wishlist-toggle]');
        if (wishlistBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleWishlist(wishlistBtn);
          return;
        }

        const compareBtn = e.target.closest('[data-compare-toggle]');
        if (compareBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleCompare(compareBtn);
          return;
        }

        const quickviewBtn = e.target.closest('[data-quickview-trigger]');
        if (quickviewBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.triggerQuickView(quickviewBtn);
          return;
        }
      });

      // AJAX Form Submission for Card Add-To-Cart
      document.addEventListener('submit', (e) => {
        const form = e.target.closest('[data-product-form]');
        if (form) {
          e.preventDefault();
          this.handleQuickAddToCart(form);
        }
      });
    }

    // --- WISHLIST PERSISTENCE ---
    getWishlist() {
      try {
        return JSON.parse(localStorage.getItem('ncf_wishlist') || '[]');
      } catch (e) {
        return [];
      }
    }

    toggleWishlist(btn) {
      const handle = btn.getAttribute('data-product-handle');
      if (!handle) return;

      let wishlist = this.getWishlist();
      const index = wishlist.indexOf(handle);

      if (index > -1) {
        wishlist.splice(index, 1);
        btn.classList.remove('is-active');
        btn.setAttribute('aria-label', 'Add to Wishlist');
      } else {
        wishlist.push(handle);
        btn.classList.add('is-active');
        btn.setAttribute('aria-label', 'Remove from Wishlist');
      }

      localStorage.setItem('ncf_wishlist', JSON.stringify(wishlist));
      document.dispatchEvent(new CustomEvent('ncf:wishlist-updated', { detail: { wishlist } }));
    }

    restoreWishlistStates() {
      const wishlist = this.getWishlist();
      if (!wishlist.length) return;

      document.querySelectorAll('[data-wishlist-toggle]').forEach((btn) => {
        const handle = btn.getAttribute('data-product-handle');
        if (wishlist.includes(handle)) {
          btn.classList.add('is-active');
        }
      });
    }

    // --- COMPARE PERSISTENCE ---
    getCompareList() {
      try {
        return JSON.parse(localStorage.getItem('ncf_compare') || '[]');
      } catch (e) {
        return [];
      }
    }

    toggleCompare(btn) {
      const handle = btn.getAttribute('data-product-handle');
      if (!handle) return;

      let compareList = this.getCompareList();
      const index = compareList.indexOf(handle);

      if (index > -1) {
        compareList.splice(index, 1);
        btn.classList.remove('is-active');
      } else {
        if (compareList.length >= 4) {
          alert('You can compare up to 4 products at a time.');
          return;
        }
        compareList.push(handle);
        btn.classList.add('is-active');
      }

      localStorage.setItem('ncf_compare', JSON.stringify(compareList));
      document.dispatchEvent(new CustomEvent('ncf:compare-updated', { detail: { compareList } }));
    }

    restoreCompareStates() {
      const compareList = this.getCompareList();
      if (!compareList.length) return;

      document.querySelectorAll('[data-compare-toggle]').forEach((btn) => {
        const handle = btn.getAttribute('data-product-handle');
        if (compareList.includes(handle)) {
          btn.classList.add('is-active');
        }
      });
    }

    // --- QUICK VIEW TRIGGER ---
    triggerQuickView(btn) {
      const handle = btn.getAttribute('data-product-handle');
      if (!handle) return;

      document.dispatchEvent(
        new CustomEvent('ncf:quickview-open', {
          detail: { handle },
        })
      );
    }

    // --- QUICK AJAX ADD TO CART ---
    async handleQuickAddToCart(form) {
      const submitBtn = form.querySelector('[data-add-to-cart-btn]');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Adding...</span>';

      try {
        const formData = new FormData(form);
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        if (response.ok) {
          const item = await response.json();
          submitBtn.innerHTML = '<span>✓ Added!</span>';
          
          // Trigger Cart Updated Notification Event
          document.dispatchEvent(new CustomEvent('ncf:cart-updated', { detail: { item } }));

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }, 2000);
        } else {
          throw new Error('Failed to add item to cart');
        }
      } catch (err) {
        console.warn('Cart Add Error:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  }

  // Initialize Engine when DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NCFProductCardEngine());
  } else {
    new NCFProductCardEngine();
  }
})();
