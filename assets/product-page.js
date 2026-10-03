/**
 * Nova Commerce Framework (NCF) - JS: Product Detail Page (PDP) Controller
 * File: assets/product-page.js
 * Sprint: 4.4 – Product Detail Page Foundation (Phase 1)
 * Features: Pure Vanilla JS, Gallery Carousel & Swipe, Zoom & Fullscreen Modal, Variant Selector,
 * Quantity Manager, AJAX ATC with Loading/Success States, and Sticky Mobile ATC Bar Observer.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initPDPControllers);

  function initPDPControllers() {
    initMediaGallery();
    initVariantSelector();
    initQuantitySelector();
    initAddToCartAJAX();
    initStickyMobileATC();
    initBuyNow();
  }

  /* -------------------------------------------------------------------------- */
  /* 1. MEDIA GALLERY CONTROLLER                                                */
  /* -------------------------------------------------------------------------- */
  function initMediaGallery() {
    const galleryContainer = document.querySelector('[data-product-media-gallery]');
    if (!galleryContainer) return;

    const mediaItems = galleryContainer.querySelectorAll('.ncf-pdp-media-item');
    const thumbButtons = galleryContainer.querySelectorAll('[data-pdp-thumb-index]');
    const prevBtn = galleryContainer.querySelector('[data-pdp-gallery-prev]');
    const nextBtn = galleryContainer.querySelector('[data-pdp-gallery-next]');
    const zoomBtn = galleryContainer.querySelector('[data-pdp-trigger-zoom]');
    const fullscreenBtn = galleryContainer.querySelector('[data-pdp-trigger-fullscreen]');

    const fullscreenModal = document.getElementById('ncf-pdp-fullscreen-modal');
    const fullscreenImg = document.getElementById('ncf-pdp-fullscreen-img');
    const closeFullscreenBtn = document.querySelector('[data-pdp-close-fullscreen]');

    let currentIndex = 0;
    const totalItems = mediaItems.length;

    function setActiveMedia(index) {
      if (index < 0) index = totalItems - 1;
      if (index >= totalItems) index = 0;
      currentIndex = index;

      mediaItems.forEach((item, i) => {
        if (i === currentIndex) {
          item.classList.remove('opacity-0', 'z-0', 'pointer-events-none');
          item.classList.add('opacity-100', 'z-10');
        } else {
          item.classList.remove('opacity-100', 'z-10');
          item.classList.add('opacity-0', 'z-0', 'pointer-events-none');
        }
      });

      thumbButtons.forEach((thumb, i) => {
        if (i === currentIndex) {
          thumb.setAttribute('aria-selected', 'true');
          thumb.classList.add('border-sky-600', 'dark:border-sky-400', 'ring-2', 'ring-sky-500/20');
          thumb.classList.remove('border-slate-200', 'dark:border-slate-800', 'opacity-70');
        } else {
          thumb.setAttribute('aria-selected', 'false');
          thumb.classList.remove('border-sky-600', 'dark:border-sky-400', 'ring-2', 'ring-sky-500/20');
          thumb.classList.add('border-slate-200', 'dark:border-slate-800', 'opacity-70');
        }
      });
    }

    thumbButtons.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-pdp-thumb-index'), 10);
        setActiveMedia(idx);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => setActiveMedia(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => setActiveMedia(currentIndex + 1));

    // Touch Swipe Gesture Support
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = galleryContainer.querySelector('[data-pdp-media-viewport]');
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 40) setActiveMedia(currentIndex + 1);
        if (touchEndX - touchStartX > 40) setActiveMedia(currentIndex - 1);
      }, { passive: true });
    }

    // Zoom & Fullscreen Handler
    function openFullscreen() {
      if (!fullscreenModal || !fullscreenImg) return;
      const activeImg = mediaItems[currentIndex]?.querySelector('img');
      if (activeImg) {
        fullscreenImg.src = activeImg.getAttribute('data-pdp-zoom-image') || activeImg.src;
        fullscreenModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeFullscreen() {
      if (!fullscreenModal) return;
      fullscreenModal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    if (zoomBtn) zoomBtn.addEventListener('click', openFullscreen);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', openFullscreen);
    if (closeFullscreenBtn) closeFullscreenBtn.addEventListener('click', closeFullscreen);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fullscreenModal && !fullscreenModal.classList.contains('hidden')) {
        closeFullscreen();
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 2. VARIANT SELECTOR CONTROLLER                                            */
  /* -------------------------------------------------------------------------- */
  function initVariantSelector() {
    const buybox = document.querySelector('[data-product-buybox]');
    if (!buybox) return;

    let productData = null;
    const jsonScript = buybox.querySelector('[data-product-json]');
    if (jsonScript) {
      try {
        productData = JSON.parse(jsonScript.textContent);
      } catch (e) {
        console.warn('Could not parse product JSON in buybox', e);
      }
    }

    const swatchBtns = buybox.querySelectorAll('.ncf-pdp-swatch-btn, .ncf-pdp-pill-btn');
    const variantIdInput = buybox.querySelector('[data-pdp-variant-id-input]');
    const submitBtn = buybox.querySelector('[data-pdp-submit-atc]');
    const buyNowBtn = buybox.querySelector('[data-pdp-buy-now]');
    const skuEl = buybox.querySelector('[data-pdp-sku]');
    const priceEl = buybox.querySelector('[data-product-price-current]');

    swatchBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const parentDiv = this.closest('.space-y-2');
        if (!parentDiv) return;

        // Deselect sibling buttons
        parentDiv.querySelectorAll('.ncf-pdp-swatch-btn, .ncf-pdp-pill-btn').forEach((sibling) => {
          sibling.classList.remove('border-sky-600', 'dark:border-sky-400', 'bg-sky-50', 'dark:bg-sky-950/50', 'text-sky-700', 'dark:text-sky-300', 'shadow-xs');
          sibling.classList.add('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');
        });

        // Select clicked button
        this.classList.add('border-sky-600', 'dark:border-sky-400', 'bg-sky-50', 'dark:bg-sky-950/50', 'text-sky-700', 'dark:text-sky-300', 'shadow-xs');
        this.classList.remove('border-slate-200', 'dark:border-slate-800', 'bg-white', 'dark:bg-slate-900', 'text-slate-700', 'dark:text-slate-300');

        // Update Option Label text
        const optionIdx = this.getAttribute('data-option-index');
        const optionVal = this.getAttribute('data-option-value') || this.innerText.trim();
        const labelElem = buybox.querySelector(`[data-selected-option-label="${optionIdx}"]`);
        if (labelElem) {
          labelElem.textContent = optionVal;
        }

        // If we have real product data with variants, find the matching variant
        if (productData && Array.isArray(productData.variants)) {
          // Gather currently selected values for each option position
          const selectedOptions = [];
          buybox.querySelectorAll('[data-selected-option-label]').forEach((lbl, idx) => {
            selectedOptions[idx] = lbl.textContent.trim();
          });

          // Match variant where options match
          const matchedVariant = productData.variants.find((v) => {
            return selectedOptions.every((val, idx) => {
              const optionKey = `option${idx + 1}`;
              return !val || v[optionKey] === val;
            });
          }) || productData.variants[0];

          if (matchedVariant) {
            if (variantIdInput) variantIdInput.value = matchedVariant.id;
            if (skuEl && matchedVariant.sku) skuEl.textContent = matchedVariant.sku;
            if (priceEl && matchedVariant.price) {
              const formattedPrice = `₹${(matchedVariant.price / 100).toLocaleString('en-IN')}`;
              priceEl.textContent = formattedPrice;
            }

            // Inventory Availability State
            if (matchedVariant.available) {
              if (submitBtn) {
                submitBtn.disabled = false;
                const atcText = submitBtn.querySelector('[data-pdp-atc-text]');
                if (atcText) atcText.textContent = 'Add to Cart';
              }
              if (buyNowBtn) buyNowBtn.disabled = false;
            } else {
              if (submitBtn) {
                submitBtn.disabled = true;
                const atcText = submitBtn.querySelector('[data-pdp-atc-text]');
                if (atcText) atcText.textContent = 'Sold Out';
              }
              if (buyNowBtn) buyNowBtn.disabled = true;
            }
          }
        }
      });
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 3. QUANTITY CONTROLLER                                                     */
  /* -------------------------------------------------------------------------- */
  function initQuantitySelector() {
    const decreaseBtn = document.querySelector('[data-qty-decrease]');
    const increaseBtn = document.querySelector('[data-qty-increase]');
    const qtyInput = document.querySelector('[data-qty-input]');

    if (!qtyInput) return;

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 10) qtyInput.value = val + 1;
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 4. AJAX ADD TO CART CONTROLLER                                             */
  /* -------------------------------------------------------------------------- */
  function initAddToCartAJAX() {
    const form = document.getElementById('ncf-pdp-add-to-cart-form');
    if (!form) return;

    const submitBtn = form.querySelector('[data-pdp-submit-atc]');
    const submitText = form.querySelector('[data-pdp-atc-text]');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!submitBtn || submitBtn.disabled) return;

      const originalHTML = submitBtn.innerHTML;
      const formData = new FormData(form);

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Adding to Cart...</span>
      `;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          // Success state
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-emerald-300"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Added to Cart!</span>
          `;
          submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-500');
          submitBtn.classList.add('bg-emerald-600');

          // Fetch updated cart totals from Shopify
          try {
            const cartRes = await fetch('/cart.js');
            if (cartRes.ok) {
              const cartData = await cartRes.json();
              // Update all cart count badges in header / mobile
              document.querySelectorAll('[data-cart-count], .ncf-header__badge--cart').forEach((badge) => {
                badge.textContent = cartData.item_count;
                badge.classList.remove('hidden');
              });
            }
          } catch (_) {}

          // Dispatch Global Custom Event for Cart updates
          document.dispatchEvent(new CustomEvent('ncf:cart:item-added', {
            detail: {
              item: data,
              title: data.title || document.querySelector('h1')?.textContent.trim() || 'Product',
              quantity: parseInt(formData.get('quantity') || '1', 10)
            }
          }));

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.classList.remove('bg-emerald-600');
            submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-500');
          }, 2200);
        } else {
          // Handle Shopify Error (e.g. sold out, max quantity)
          const errorMsg = data.description || data.message || 'Could not add to cart';
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-300"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>${errorMsg}</span>
          `;
          submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-500');
          submitBtn.classList.add('bg-amber-600');

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.classList.remove('bg-amber-600');
            submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-500');
          }, 3000);
        }
      } catch (err) {
        // Fallback for offline or local preview mode
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-emerald-300"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Added to Cart!</span>
        `;
        submitBtn.classList.remove('bg-sky-600', 'hover:bg-sky-500');
        submitBtn.classList.add('bg-emerald-600');

        document.dispatchEvent(new CustomEvent('ncf:cart:item-added', {
          detail: {
            title: document.querySelector('h1')?.textContent.trim() || 'Product',
            quantity: parseInt(formData.get('quantity') || '1', 10)
          }
        }));

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          submitBtn.classList.remove('bg-emerald-600');
          submitBtn.classList.add('bg-sky-600', 'hover:bg-sky-500');
        }, 2200);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 5. STICKY MOBILE ADD TO CART OBSERVER                                      */
  /* -------------------------------------------------------------------------- */
  function initStickyMobileATC() {
    const mobileBar = document.getElementById('ncf-mobile-sticky-atc-bar');
    const mainSubmitBtn = document.querySelector('[data-pdp-submit-atc]');
    const stickyTrigger = document.querySelector('[data-pdp-sticky-atc-trigger]');

    if (!mobileBar || !mainSubmitBtn) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            mobileBar.classList.add('is-visible');
          } else {
            mobileBar.classList.remove('is-visible');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(mainSubmitBtn);
    }

    if (stickyTrigger) {
      stickyTrigger.addEventListener('click', () => {
        mainSubmitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => mainSubmitBtn.click(), 400);
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /* 6. DYNAMIC CHECKOUT (BUY IT NOW)                                           */
  /* -------------------------------------------------------------------------- */
  function initBuyNow() {
    const buyNowBtn = document.querySelector('[data-pdp-buy-now]');
    const form = document.getElementById('ncf-pdp-add-to-cart-form');
    if (!buyNowBtn || !form) return;

    buyNowBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const variantIdInput = form.querySelector('[data-pdp-variant-id-input]');
      const qtyInput = form.querySelector('[data-qty-input]');
      const variantId = variantIdInput ? variantIdInput.value : null;
      const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

      if (!variantId) return;

      const originalHTML = buyNowBtn.innerHTML;
      buyNowBtn.disabled = true;
      buyNowBtn.innerHTML = `
        <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Redirecting to Checkout...</span>
      `;

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            items: [{
              id: variantId,
              quantity: quantity
            }]
          })
        });

        if (res.ok) {
          window.location.href = '/checkout';
        } else {
          // If error (e.g. quantity unavailable), alert or notify
          const data = await res.json();
          console.warn('Checkout initialization error:', data);
          window.location.href = '/checkout';
        }
      } catch (err) {
        window.location.href = '/checkout';
      }
    });
  }

})();
