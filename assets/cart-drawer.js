/**
 * Nova Commerce Framework (NCF) - Live AJAX Cart Drawer Engine
 * File: assets/cart-drawer.js
 * Sprint: 5.0 – Production Shopify Live Cart Drawer Engine
 * Standard: Pure Vanilla JS, WCAG 2.2 AA Focus Trap, Real /cart.js & /cart/change.js Integration
 */

(function () {
  'use strict';

  class NCFCartDrawerEngine {
    constructor() {
      this.drawer = document.querySelector('[data-cart-drawer]');
      if (!this.drawer) return;

      this.panel = this.drawer.querySelector('[data-cart-drawer-panel]');
      this.backdrop = this.drawer.querySelector('[data-cart-drawer-backdrop]');
      this.closeBtns = this.drawer.querySelectorAll('[data-cart-drawer-close]');
      this.itemsContainer = this.drawer.querySelector('[data-cart-drawer-items]');
      this.emptyContainer = this.drawer.querySelector('[data-cart-drawer-empty]');
      this.footerContainer = this.drawer.querySelector('[data-cart-drawer-footer]');
      this.subtotalEl = this.drawer.querySelector('[data-cart-drawer-subtotal]');
      this.countEl = this.drawer.querySelector('[data-cart-drawer-count]');
      this.freeShippingBar = this.drawer.querySelector('[data-cart-free-shipping-bar]');
      this.freeShippingText = this.drawer.querySelector('[data-cart-free-shipping-text]');
      
      this.freeShippingThreshold = 99900; // ₹999.00 in paise / cents
      this.isOpen = false;
      this.lastFocusedElement = null;

      this.init();
    }

    init() {
      this.bindEvents();
      // Synchronize initial cart on page load
      this.refreshCart(false);
    }

    bindEvents() {
      // Global click handler for cart drawer triggers
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-cart-icon], [data-cart-drawer-trigger], a[href="/cart"], a[href="{{ routes.cart_url }}"]');
        if (trigger && !e.defaultPrevented && window.location.pathname !== '/cart') {
          // If customer is on cart page, let it navigate; otherwise open AJAX drawer
          e.preventDefault();
          this.open(trigger);
          return;
        }

        // Close triggers
        const closeBtn = e.target.closest('[data-cart-drawer-close]');
        if (closeBtn && this.isOpen) {
          e.preventDefault();
          this.close();
          return;
        }

        // Quantity Decrease
        const decreaseBtn = e.target.closest('[data-cart-qty-decrease]');
        if (decreaseBtn) {
          e.preventDefault();
          const lineKey = decreaseBtn.getAttribute('data-line-key');
          const input = decreaseBtn.parentElement?.querySelector('[data-cart-qty-input]');
          const currentQty = parseInt(input?.value || '1', 10);
          this.updateItemQuantity(lineKey, Math.max(0, currentQty - 1));
          return;
        }

        // Quantity Increase
        const increaseBtn = e.target.closest('[data-cart-qty-increase]');
        if (increaseBtn) {
          e.preventDefault();
          const lineKey = increaseBtn.getAttribute('data-line-key');
          const input = increaseBtn.parentElement?.querySelector('[data-cart-qty-input]');
          const currentQty = parseInt(input?.value || '1', 10);
          this.updateItemQuantity(lineKey, currentQty + 1);
          return;
        }

        // Remove Item
        const removeBtn = e.target.closest('[data-cart-item-remove]');
        if (removeBtn) {
          e.preventDefault();
          const lineKey = removeBtn.getAttribute('data-line-key');
          this.updateItemQuantity(lineKey, 0);
          return;
        }
      });

      // Quantity Direct Input Change
      document.addEventListener('change', (e) => {
        const qtyInput = e.target.closest('[data-cart-qty-input]');
        if (qtyInput) {
          const lineKey = qtyInput.getAttribute('data-line-key');
          const val = parseInt(qtyInput.value, 10);
          if (!isNaN(val) && val >= 0) {
            this.updateItemQuantity(lineKey, val);
          } else {
            this.refreshCart(false);
          }
        }
      });

      // Keyboard Escape Listener
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Listen for Cart Added Custom Events from Product Page / Cards
      document.addEventListener('ncf:cart:item-added', (e) => {
        this.refreshCart(true);
      });

      document.addEventListener('cart:updated', () => {
        this.refreshCart(true);
      });

      document.addEventListener('ncf:cart-updated', () => {
        this.refreshCart(true);
      });
    }

    open(triggerElement = null) {
      if (this.isOpen) return;
      this.lastFocusedElement = triggerElement || document.activeElement;
      this.isOpen = true;

      this.drawer.classList.add('is-open');
      this.drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Always fetch latest cart when opening
      this.refreshCart(false);

      // Focus close button for accessibility
      const closeBtn = this.drawer.querySelector('[data-cart-drawer-close]');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
      }
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.drawer.classList.remove('is-open');
      this.drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
        this.lastFocusedElement.focus();
      }
    }

    async refreshCart(openAfterRefresh = false) {
      try {
        const res = await fetch('/cart.js', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        if (res.ok) {
          const cart = await res.json();
          this.renderCart(cart);
          if (openAfterRefresh) {
            this.open();
          }
        }
      } catch (err) {
        console.warn('NCF Cart Drawer: Failed to fetch live /cart.js', err);
      }
    }

    async updateItemQuantity(lineKey, quantity) {
      if (!lineKey) return;

      // Mark row as loading
      const row = this.drawer.querySelector(`[data-line-item-key="${lineKey}"]`);
      if (row) row.classList.add('is-loading');

      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            id: lineKey,
            quantity: quantity
          })
        });

        if (response.ok) {
          const cart = await response.json();
          this.renderCart(cart);

          // Dispatch event for any other subscribers
          document.dispatchEvent(new CustomEvent('cart:mutated', { detail: { cart } }));
        } else {
          const errorData = await response.json();
          console.error('Cart quantity change error:', errorData);
          this.refreshCart(false);
        }
      } catch (err) {
        console.warn('Cart quantity mutation failed:', err);
        this.refreshCart(false);
      }
    }

    renderCart(cart) {
      if (!cart) return;

      // 1. Synchronize All Global Cart Count Badges
      const countBadges = document.querySelectorAll('[data-cart-count], .ncf-header__badge--cart');
      countBadges.forEach((badge) => {
        badge.textContent = cart.item_count;
        if (cart.item_count > 0) {
          badge.classList.remove('hidden');
        }
      });

      if (this.countEl) {
        this.countEl.textContent = cart.item_count;
      }

      // 2. Format Money Utility
      const formattedTotal = this.formatMoney(cart.total_price);

      // 3. Update Subtotal
      if (this.subtotalEl) {
        this.subtotalEl.textContent = formattedTotal;
      }

      // 4. Update Free Shipping Bar
      if (this.freeShippingBar && this.freeShippingText) {
        const progress = Math.min(100, Math.round((cart.total_price / this.freeShippingThreshold) * 100));
        this.freeShippingBar.style.width = `${progress}%`;

        if (cart.total_price >= this.freeShippingThreshold) {
          this.freeShippingText.innerHTML = `
            <span class="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>You've unlocked <strong>FREE Express Shipping</strong>!</span>
            </span>
          `;
        } else {
          const remaining = this.freeShippingThreshold - cart.total_price;
          this.freeShippingText.innerHTML = `
            <span class="text-slate-600 dark:text-slate-300">
              Add <strong class="text-sky-600 dark:text-sky-400 font-mono">${this.formatMoney(remaining)}</strong> more for <strong>FREE Express Shipping</strong>
            </span>
          `;
        }
      }

      // 5. Toggle Empty vs Populated States
      if (cart.item_count === 0) {
        if (this.emptyContainer) this.emptyContainer.classList.remove('hidden');
        if (this.footerContainer) this.footerContainer.classList.add('hidden');
        if (this.itemsContainer) this.itemsContainer.innerHTML = '';
        return;
      }

      if (this.emptyContainer) this.emptyContainer.classList.add('hidden');
      if (this.footerContainer) this.footerContainer.classList.remove('hidden');

      // 6. Build Live Line Items HTML
      if (this.itemsContainer && Array.isArray(cart.items)) {
        let itemsHTML = '';

        cart.items.forEach((item, index) => {
          const itemImg = item.image ? `<img src="${item.image}" alt="${this.escapeHtml(item.title)}" loading="lazy" class="w-full h-full object-contain" width="80" height="80" />` : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-slate-400">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            </svg>
          `;

          const variantTitle = item.variant_title && item.variant_title !== 'Default Title' ? `
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              ${this.escapeHtml(item.variant_title)}
            </p>
          ` : '';

          const priceFormatted = this.formatMoney(item.final_line_price);
          const originalPriceFormatted = item.original_line_price > item.final_line_price ? `
            <span class="text-xs text-slate-400 line-through block font-mono">
              ${this.formatMoney(item.original_line_price)}
            </span>
          ` : '';

          itemsHTML += `
            <div
              class="pt-4 first:pt-0 flex gap-4 items-start group relative transition-opacity duration-200"
              data-cart-item-row
              data-line-item-key="${item.key}"
              data-line-item-index="${index + 1}"
            >
              <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0 flex items-center justify-center p-1.5">
                ${itemImg}
              </div>

              <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                      <a href="${item.url}" class="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                        ${this.escapeHtml(item.product_title || item.title)}
                      </a>
                    </h3>
                    
                    <button
                      type="button"
                      class="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 -mr-1 rounded-lg transition-colors cursor-pointer"
                      data-cart-item-remove
                      data-line-key="${item.key}"
                      aria-label="Remove ${this.escapeHtml(item.title)} from cart"
                      title="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>

                  ${variantTitle}
                </div>

                <div class="flex items-center justify-between pt-2 mt-auto">
                  <div class="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5">
                    <button
                      type="button"
                      class="w-7 h-7 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                      data-cart-qty-decrease
                      data-line-key="${item.key}"
                      aria-label="Decrease quantity for ${this.escapeHtml(item.title)}"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value="${item.quantity}"
                      min="0"
                      max="99"
                      class="w-8 text-center text-xs font-bold font-mono bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      data-cart-qty-input
                      data-line-key="${item.key}"
                      aria-label="Quantity for ${this.escapeHtml(item.title)}"
                    />
                    <button
                      type="button"
                      class="w-7 h-7 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                      data-cart-qty-increase
                      data-line-key="${item.key}"
                      aria-label="Increase quantity for ${this.escapeHtml(item.title)}"
                    >
                      +
                    </button>
                  </div>

                  <div class="text-right">
                    <span class="text-sm font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                      ${priceFormatted}
                    </span>
                    ${originalPriceFormatted}
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        this.itemsContainer.innerHTML = itemsHTML;
      }
    }

    formatMoney(cents) {
      if (typeof cents !== 'number') cents = parseInt(cents, 10) || 0;
      const rupees = (cents / 100).toLocaleString('en-IN', {
        maximumFractionDigits: 0
      });
      return `₹${rupees}`;
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Initialize Cart Drawer Engine
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NCFCartDrawerEngine());
  } else {
    new NCFCartDrawerEngine();
  }
})();
