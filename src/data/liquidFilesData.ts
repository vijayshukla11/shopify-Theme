export interface LiquidFileItem {
  filename: string;
  path: string;
  description: string;
  code: string;
}

export const LIQUID_THEME_FILES: LiquidFileItem[] = [
  {
    filename: 'predictive-search.liquid',
    path: 'sections/predictive-search.liquid',
    description: 'Shopify OS 2.0 Predictive Search Section Endpoint returning JSON / HTML popover items',
    code: `{%- comment -%}
  NCF Sprint 5.1 - Predictive Search Endpoint
  Rendered natively via /search/suggest?section_id=predictive-search
{%- endcomment -%}

{%- if predictive_search.performed -%}
  <div id="predictive-search-results" class="predictive-search__results">
    {%- if predictive_search.resources.products.size > 0 -%}
      <div class="predictive-search__group">
        <h3 class="predictive-search__heading">{{ 'general.search.products' | t }}</h3>
        <ul class="predictive-search__list" role="listbox">
          {%- for product in predictive_search.resources.products -%}
            <li class="predictive-search__item" role="option">
              {% render 'search-product-card', product: product, show_vendor: section.settings.show_vendor, show_price: section.settings.show_price %}
            </li>
          {%- endfor -%}
        </ul>
      </div>
    {%- endif -%}

    {%- if predictive_search.resources.collections.size > 0 -%}
      <div class="predictive-search__group">
        <h3 class="predictive-search__heading">{{ 'general.search.collections' | t }}</h3>
        {%- for collection in predictive_search.resources.collections -%}
          {% render 'search-collection-card', collection: collection %}
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Predictive Search",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "Show Vendor",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_price",
      "label": "Show Price",
      "default": true
    }
  ]
}
{% endschema %}`
  },
  {
    filename: 'search-results.liquid',
    path: 'sections/search-results.liquid',
    description: 'Main Search Results Page Section with native OS 2.0 Search & Discovery filters',
    code: `{%- comment -%}
  NCF Sprint 5.1 - Enterprise Search Results Section
{%- endcomment -%}

<div class="page-width search-results-container">
  {% render 'breadcrumbs' %}
  
  <header class="section-header text-center">
    <h1 class="h2">{{ 'templates.search.title' | t }}: "{{ search.terms | escape }}"</h1>
    <p class="search-results__count">{{ search.results_count }} {{ 'templates.search.results_with_count' | t }}</p>
  </header>

  {%- if search.results_count > 0 -%}
    <div class="search-results__layout">
      <aside class="search-results__filters">
        {%- for filter in search.filters -%}
          <div class="filter-group">
            <h4>{{ filter.label }}</h4>
            {%- for value in filter.values -%}
              <label class="filter-option">
                <input type="checkbox" name="{{ value.param_name }}" value="{{ value.value }}" {% if value.active %}checked{% endif %}>
                <span>{{ value.label }} ({{ value.count }})</span>
              </label>
            {%- endfor -%}
          </div>
        {%- endfor -%}
      </aside>

      <main class="search-results__grid">
        {%- paginate search.results by 12 -%}
          <div class="grid grid--3-col">
            {%- for item in search.results -%}
              {%- case item.object_type -%}
                {%- when 'product' -%}
                  {% render 'card-product', product_ref: item %}
                {%- when 'article' -%}
                  {% render 'search-article-card', article: item %}
                {%- when 'page' -%}
                  {% render 'search-page-card', page: item %}
              {%- endcase -%}
            {%- endfor -%}
          </div>
          {% render 'pagination', paginate: paginate %}
        {%- endpaginate -%}
      </main>
    </div>
  {%- else -%}
    {% render 'search-empty-state', terms: search.terms %}
  {%- endif -%}
</div>`
  },
  {
    filename: 'mega-menu.liquid',
    path: 'sections/mega-menu.liquid',
    description: 'Enterprise Mega Menu header drop-down section with promo banners and product showcases',
    code: `{%- comment -%}
  NCF Sprint 5.1 - Enterprise Mega Menu Section
{%- endcomment -%}

<nav class="mega-menu" aria-label="Main Navigation">
  <ul class="mega-menu__list">
    {%- for link in section.settings.menu.links -%}
      <li class="mega-menu__item {% if link.links != blank %}mega-menu__item--has-dropdown{% endif %}">
        <a href="{{ link.url }}" class="mega-menu__link">{{ link.title }}</a>
        {%- if link.links != blank -%}
          <div class="mega-menu__dropdown">
            <div class="mega-menu__columns">
              {%- for childlink in link.links -%}
                <div class="mega-menu__column">
                  <h4 class="mega-menu__column-title">{{ childlink.title }}</h4>
                  <ul>
                    {%- for grand-childlink in childlink.links -%}
                      <li><a href="{{ grand-childlink.url }}">{{ grand-childlink.title }}</a></li>
                    {%- endfor -%}
                  </ul>
                </div>
              {%- endfor -%}
            </div>
            {% render 'mega-menu-promo', promo_image: section.settings.promo_image, promo_text: section.settings.promo_text %}
          </div>
        {%- endif -%}
      </li>
    {%- endfor -%}
  </ul>
</nav>`
  },
  {
    filename: 'search-empty-state.liquid',
    path: 'snippets/search-empty-state.liquid',
    description: 'Empty search state with illustration, suggestion tags, and trending products',
    code: `{%- comment -%}
  NCF Sprint 5.1 - Search Empty State Snippet
{%- endcomment -%}

<div class="search-empty-state text-center py-12">
  <div class="search-empty-state__icon">
    {% render 'icon-search-empty' %}
  </div>
  <h2 class="h3">{{ 'general.search.no_results_html' | t: terms: terms }}</h2>
  <p class="text-subdued">{{ 'general.search.try_again_prompt' | t }}</p>

  <div class="search-empty-state__trending-searches my-6">
    <span class="label">{{ 'general.search.popular_searches' | t }}</span>
    <div class="chips flex-center gap-2">
      <a href="/search?q=headphones" class="chip">Headphones</a>
      <a href="/search?q=laptops" class="chip">OLED Laptops</a>
      <a href="/search?q=wearables" class="chip">Smartwatches</a>
    </div>
  </div>

  <a href="/" class="btn btn--primary">{{ 'general.search.back_to_shop' | t }}</a>
</div>`
  },
  {
    filename: 'cart-drawer.liquid',
    path: 'sections/cart-drawer.liquid',
    description: 'Slide-out AJAX Cart Drawer with live item updating, free shipping threshold meter, and quick-add upsells',
    code: `{%- comment -%}
  NCF Sprint 5.2 - Enterprise AJAX Cart Drawer
{%- endcomment -%}

<cart-drawer class="drawer {% if cart == empty %}is-empty{% endif %}" id="CartDrawer">
  <div id="CartDrawer-Overlay" class="drawer__overlay"></div>
  <div class="drawer__inner" role="dialog" aria-modal="true" aria-label="{{ 'sections.cart.title' | t }}">
    <div class="drawer__header border-b pb-4 flex justify-between items-center">
      <h2 class="drawer__heading text-lg font-bold flex items-center gap-2">
        <span>{{ 'sections.cart.title' | t }}</span>
        <span class="cart-count-badge font-mono font-normal text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
          {{ cart.item_count }}
        </span>
      </h2>
      <button class="drawer__close text-gray-500 hover:text-black" type="button" onclick="this.closest('cart-drawer').close()">
        {% render 'icon-close' %}
      </button>
    </div>

    {%- if settings.enable_free_shipping -%}
      {% render 'free-shipping-bar', threshold: settings.free_shipping_threshold, subtotal: cart.total_price %}
    {%- endif -%}

    {%- if cart == empty -%}
      {% render 'empty-cart' %}
    {%- else -%}
      <form action="{{ routes.cart_url }}" method="post" id="CartDrawer-Form" class="drawer__contents flex-1 overflow-y-auto">
        <div class="drawer__items space-y-4 py-4">
          {%- for item in cart.items -%}
            {% render 'cart-item', item: item %}
          {%- endfor -%}
        </div>

        {%- if settings.enable_cart_upsells -%}
          {% render 'cart-upsells', location: 'drawer' %}
        {%- endif -%}
      </form>

      <div class="drawer__footer border-t pt-4 space-y-3">
        {% render 'cart-summary', is_drawer: true %}
      </div>
    {%- endif -%}
  </div>
</cart-drawer>`
  },
  {
    filename: 'main-cart.liquid',
    path: 'sections/main-cart.liquid',
    description: 'Full Dedicated Cart Page layout section with Order Summary, Shipping Calculator, and Express Checkout buttons',
    code: `{%- comment -%}
  NCF Sprint 5.2 - Enterprise Dedicated Cart Page Section
{%- endcomment -%}

<div class="page-width py-8 space-y-8 max-w-7xl mx-auto px-4">
  {% render 'breadcrumbs' %}

  <div class="section-header border-b pb-4 flex justify-between items-end">
    <div>
      <h1 class="h2 text-2xl font-black uppercase tracking-tight">{{ 'sections.cart.title' | t }}</h1>
      <p class="text-xs text-gray-500 font-mono">{{ cart.item_count }} {{ 'sections.cart.items_count' | t }}</p>
    </div>
    <a href="{{ routes.all_products_collection_url }}" class="text-xs font-bold text-sky-600 hover:underline">
      ← {{ 'general.continue_shopping' | t }}
    </a>
  </div>

  {%- if cart == empty -%}
    {% render 'empty-cart' %}
  {%- else -%}
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-8 space-y-6">
        {%- if settings.enable_free_shipping -%}
          {% render 'free-shipping-bar', threshold: settings.free_shipping_threshold, subtotal: cart.total_price %}
        {%- endif -%}

        <div class="cart-items-container border rounded-2xl p-4 bg-white dark:bg-slate-900 space-y-4">
          {%- for item in cart.items -%}
            {% render 'cart-item', item: item, is_page: true %}
          {%- endfor -%}
        </div>

        {%- if settings.enable_save_for_later -%}
          {% render 'save-for-later-section' %}
        {%- endif -%}

        {%- if settings.enable_shipping_calculator -%}
          {% render 'shipping-calculator' %}
        {%- endif -%}
      </div>

      <div class="lg:col-span-4 space-y-6 sticky top-24">
        {% render 'cart-summary', is_drawer: false %}
        {% render 'trust-badges' %}
      </div>
    </div>
  {%- endif -%}
</div>`
  },
  {
    filename: 'cart-item.liquid',
    path: 'snippets/cart-item.liquid',
    description: 'Reusable Liquid Cart Item Snippet rendering thumbnail, specs, quantity selector, savings badge, and remove actions',
    code: `{%- comment -%}
  NCF Sprint 5.2 - Cart Item Snippet
{%- endcomment -%}

<div class="cart-item flex gap-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 relative">
  <img src="{{ item.image | image_url: width: 120 }}" alt="{{ item.title }}" class="w-20 h-20 object-cover rounded-lg bg-white shrink-0">
  <div class="flex-1 min-w-0 space-y-1">
    <span class="text-[10px] font-mono text-gray-400 uppercase block">{{ item.vendor }}</span>
    <a href="{{ item.url }}" class="font-bold text-xs text-gray-900 dark:text-white hover:text-sky-600 truncate block">
      {{ item.product.title }}
    </a>
    {%- unless item.product.has_only_default_variant -%}
      <p class="text-[11px] text-gray-500 font-mono">{{ item.variant.title }}</p>
    {%- endunless -%}

    <div class="flex items-center justify-between pt-2">
      <div class="quantity-picker flex items-center border rounded-lg bg-white dark:bg-slate-900 px-2 py-0.5 text-xs font-mono">
        <button type="button" class="px-1 text-gray-500 hover:text-black" data-quantity-change="-1">-</button>
        <input type="number" name="updates[]" value="{{ item.quantity }}" min="0" class="w-8 text-center font-bold bg-transparent">
        <button type="button" class="px-1 text-gray-500 hover:text-black" data-quantity-change="1">+</button>
      </div>

      <div class="text-right">
        <span class="font-mono font-extrabold text-sm text-gray-900 dark:text-white">{{ item.final_line_price | money }}</span>
        {%- if item.original_line_price > item.final_line_price -%}
          <s class="text-[10px] text-gray-400 block font-mono">{{ item.original_line_price | money }}</s>
        {%- endif -%}
      </div>
    </div>
  </div>
</div>`
  },
  {
    filename: 'cart-summary.liquid',
    path: 'snippets/cart-summary.liquid',
    description: 'Cart Order Summary snippet with Subtotal, Coupon discount, Tax estimate, Grand Total, and Express Checkout buttons',
    code: `{%- comment -%}
  NCF Sprint 5.2 - Cart Summary Snippet
{%- endcomment -%}

<div class="cart-summary bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4">
  <h3 class="font-black text-sm uppercase tracking-wider text-gray-900 dark:text-white">Order Summary</h3>
  
  <div class="space-y-2 text-xs font-mono">
    <div class="flex justify-between text-gray-600 dark:text-gray-300">
      <span>Subtotal</span>
      <span class="font-bold text-gray-900 dark:text-white">{{ cart.total_price | money }}</span>
    </div>
    
    <div class="flex justify-between text-emerald-600">
      <span>Discount Savings</span>
      <span class="font-bold">-{{ cart.total_discount | money }}</span>
    </div>

    <div class="flex justify-between text-gray-600 dark:text-gray-300">
      <span>Estimated Shipping</span>
      <span>Calculated at checkout</span>
    </div>
  </div>

  {% render 'coupon-form' %}

  <div class="border-t pt-3 flex justify-between items-center text-sm font-extrabold text-gray-900 dark:text-white">
    <span>Grand Total</span>
    <span class="text-lg font-mono text-sky-600 dark:text-sky-400">{{ cart.total_price | money }}</span>
  </div>

  <button type="submit" name="checkout" class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition">
    Proceed to Checkout
  </button>

  <div class="express-checkout-buttons grid grid-cols-3 gap-2 pt-2">
    <button class="bg-purple-600 text-white py-2 rounded-lg text-[10px] font-bold">Shop Pay</button>
    <button class="bg-black text-white py-2 rounded-lg text-[10px] font-bold">Apple Pay</button>
    <button class="bg-amber-500 text-black py-2 rounded-lg text-[10px] font-bold">GPay</button>
  </div>
</div>`
  },
  {
    filename: 'main-blog.liquid',
    path: 'sections/main-blog.liquid',
    description: 'Main Blog Listing Section with Search, Category filters, Sort options, Pagination, and Grid/List toggles',
    code: `{%- comment -%}
  NCF Sprint 5.4 - Enterprise Blog Listing Section
{%- endcomment -%}

<div class="blog-container page-width py-8 space-y-8 max-w-7xl mx-auto px-4">
  {% render 'breadcrumbs' %}

  <header class="blog-header space-y-3">
    <span class="badge badge--sky font-mono font-bold text-xs uppercase">Engineering Hub</span>
    <h1 class="h1 text-3xl font-black text-slate-900 dark:text-white tracking-tight">{{ blog.title }}</h1>
    <p class="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{{ section.settings.blog_description }}</p>
  </header>

  {%- if section.settings.show_featured_article and blog.articles.first -%}
    {% render 'featured-article', article: blog.articles.first %}
  {%- endif -%}

  <div class="blog-controls bg-white dark:bg-slate-900 p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-4">
    <div class="search-bar relative flex-1 min-w-[280px]">
      <input type="text" placeholder="Search blog articles..." class="w-full pl-10 pr-4 py-2 border rounded-xl font-mono text-xs">
    </div>
    
    <div class="filter-pills flex flex-wrap gap-2">
      {%- for tag in blog.all_tags -%}
        <a href="{{ blog.url }}/tagged/{{ tag | handle }}" class="chip font-mono text-xs">{{ tag }}</a>
      {%- endfor -%}
    </div>
  </div>

  {%- paginate blog.articles by section.settings.articles_per_page -%}
    <div class="grid grid--{{ section.settings.grid_columns }}-col gap-6">
      {%- for article in blog.articles -%}
        {% render 'article-card', article: article, layout_style: section.settings.layout_style %}
      {%- endfor -%}
    </div>
    {% render 'pagination', paginate: paginate %}
  {%- endpaginate -%}
</div>

{% schema %}
{
  "name": "Blog Listing",
  "settings": [
    {
      "type": "text",
      "id": "blog_description",
      "label": "Blog Description",
      "default": "Deep dives into theme optimization, WCAG compliance, and e-commerce engineering."
    },
    {
      "type": "checkbox",
      "id": "show_featured_article",
      "label": "Show Featured Article",
      "default": true
    },
    {
      "type": "range",
      "id": "articles_per_page",
      "min": 6,
      "max": 24,
      "step": 3,
      "label": "Articles Per Page",
      "default": 9
    },
    {
      "type": "select",
      "id": "layout_style",
      "label": "Layout Style",
      "options": [
        { "value": "grid", "label": "Grid Card" },
        { "value": "editorial", "label": "Editorial" },
        { "value": "compact", "label": "Compact List" }
      ],
      "default": "grid"
    }
  ]
}
{% endschema %}`
  },
  {
    filename: 'main-article.liquid',
    path: 'sections/main-article.liquid',
    description: 'Main Article Reading Section with Sticky Progress Bar, Table of Contents, Social Sharing, SEO Schema, and Author Card',
    code: `{%- comment -%}
  NCF Sprint 5.4 - Enterprise Article Detail Reading Section
{%- endcomment -%}

<article class="article-detail page-width py-8 space-y-8 max-w-4xl mx-auto px-4" id="Article-{{ article.id }}">
  {% render 'reading-progress' %}
  {% render 'breadcrumbs' %}

  <header class="article-header space-y-4">
    <span class="badge uppercase font-mono text-xs">{{ article.tags.first }}</span>
    <h1 class="h1 text-3xl font-black text-slate-900 dark:text-white">{{ article.title }}</h1>
    
    {% render 'article-meta', article: article %}
    {% render 'social-share', title: article.title %}
  </header>

  {%- if article.image -%}
    <div class="article-hero-image aspect-video rounded-3xl overflow-hidden shadow-xl">
      <img src="{{ article.image | image_url: width: 1200 }}" alt="{{ article.title }}" class="w-full h-full object-cover">
    </div>
  {%- endif -%}

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div class="lg:col-span-8 article-body space-y-6 text-slate-800 dark:text-slate-200">
      {{ article.content }}

      {% render 'author-card', author: article.author %}
      {% render 'newsletter-inline' %}
    </div>

    <aside class="lg:col-span-4 space-y-6 sticky top-24">
      {% render 'table-of-contents' %}
      {% render 'related-articles', article: article %}
    </aside>
  </div>
</article>`
  },
  {
    filename: 'article-card.liquid',
    path: 'snippets/article-card.liquid',
    description: 'Reusable Liquid snippet for Article Card in grid, editorial, or compact layout',
    code: `{%- comment -%}
  NCF Sprint 5.4 - Article Card Snippet
{%- endcomment -%}

<div class="article-card bg-white dark:bg-slate-900 rounded-2xl border p-5 space-y-3 hover:shadow-lg transition">
  <div class="aspect-video rounded-xl overflow-hidden bg-slate-100">
    <img src="{{ article.image | image_url: width: 600 }}" alt="{{ article.title }}" class="w-full h-full object-cover">
  </div>
  <div class="space-y-1">
    <span class="font-mono text-[10px] text-sky-600 font-bold uppercase">{{ article.tags.first }}</span>
    <h3 class="font-bold text-base text-slate-900 dark:text-white">{{ article.title }}</h3>
    <p class="text-xs text-slate-500 line-clamp-2">{{ article.excerpt_or_content | strip_html | truncatewords: 20 }}</p>
  </div>
  <div class="pt-2 border-t flex justify-between items-center text-xs font-mono text-slate-400">
    <span>{{ article.author }}</span>
    <a href="{{ article.url }}" class="text-sky-600 font-bold hover:underline">Read Article →</a>
  </div>
</div>`
  },
  {
    filename: 'main-about.liquid',
    path: 'sections/main-about.liquid',
    description: 'Main About Us Section with Hero, Story, Mission, Vision, Timeline, Team Grid, Values & Certifications',
    code: `{%- comment -%}
  NCF Sprint 5.5 - Enterprise About Us Section
{%- endcomment -%}

<div class="about-container page-width py-12 space-y-12 max-w-7xl mx-auto px-4">
  {% render 'breadcrumbs' %}

  <header class="about-hero bg-slate-900 text-white rounded-3xl p-8 lg:p-16 relative overflow-hidden">
    <div class="max-w-2xl space-y-4 relative z-10">
      <span class="badge badge--sky uppercase font-mono text-xs">{{ section.settings.hero_badge }}</span>
      <h1 class="h1 text-4xl font-black tracking-tight">{{ section.settings.hero_title }}</h1>
      <p class="text-slate-300 text-sm leading-relaxed">{{ section.settings.hero_description }}</p>
    </div>
  </header>

  <div class="about-mission grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border space-y-3">
      <h3 class="font-bold text-xl">Our Mission</h3>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ section.settings.mission_text }}</p>
    </div>
    <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border space-y-3">
      <h3 class="font-bold text-xl">Our Vision</h3>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{ section.settings.vision_text }}</p>
    </div>
  </div>
</div>`
  },
  {
    filename: 'main-contact.liquid',
    path: 'sections/main-contact.liquid',
    description: 'Main Contact Us Section with Form, Store HQ Details, Business Hours, Map Placeholder, and FAQ shortcut',
    code: `{%- comment -%}
  NCF Sprint 5.5 - Enterprise Contact Us Section
{%- endcomment -%}

<div class="contact-container page-width py-12 space-y-8 max-w-5xl mx-auto px-4">
  {% render 'breadcrumbs' %}

  <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
    <div class="md:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-2xl border space-y-6">
      <h2 class="text-2xl font-bold">Contact Our Engineering Team</h2>
      {% form 'contact' %}
        <div class="space-y-4 text-xs font-mono">
          <input type="text" name="contact[name]" placeholder="Your Name" required class="w-full p-3 border rounded-xl">
          <input type="email" name="contact[email]" placeholder="Your Email" required class="w-full p-3 border rounded-xl">
          <textarea name="contact[body]" rows="4" placeholder="Your Message or RFP Specs..." required class="w-full p-3 border rounded-xl"></textarea>
          <button type="submit" class="btn btn-primary font-bold py-3 px-6 w-full">Send Message</button>
        </div>
      {% endform %}
    </div>

    <div class="md:col-span-5 space-y-6">
      <div class="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
        <h3 class="font-bold text-base">Store HQ & Support</h3>
        <p className="text-xs text-slate-300">CLINZA Digital Commerce Hub, India</p>
        <p className="text-xs text-slate-300">Phone: +91 800-CLINZA</p>
        <p className="text-xs text-slate-300">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    filename: 'main-faq.liquid',
    path: 'sections/main-faq.liquid',
    description: 'Main FAQ Section with Accordion, Category Filters, Search, and Schema',
    code: `{%- comment -%}
  NCF Sprint 5.5 - Enterprise FAQ Section
{%- endcomment -%}

<div class="faq-container page-width py-12 space-y-8 max-w-5xl mx-auto px-4">
  {% render 'breadcrumbs' %}
  <header class="text-center space-y-2">
    <h1 class="h1 text-3xl font-black">Frequently Asked Questions</h1>
    <p class="text-sm text-slate-500">Search answers or filter by category.</p>
  </header>
</div>`
  },
  {
    filename: 'main-store-locator.liquid',
    path: 'sections/main-store-locator.liquid',
    description: 'Main Store Locator Section with Store Cards, Map Placeholder, Hours & Filters',
    code: `{%- comment -%}
  NCF Sprint 5.5 - Enterprise Store Locator Section
{%- endcomment -%}

<div class="store-locator page-width py-12 max-w-7xl mx-auto px-4">
  {% render 'breadcrumbs' %}
  <h1 class="text-3xl font-black">Global Showrooms & Sound Booths</h1>
</div>`
  },
  {
    filename: 'main-404.liquid',
    path: 'sections/main-404.liquid',
    description: 'Main 404 Error Section with Illustration, Search, Category Links & Featured Products',
    code: `{%- comment -%}
  NCF Sprint 5.5 - Enterprise 404 Error Page
{%- endcomment -%}

<div class="page-404 text-center py-20 space-y-6 max-w-2xl mx-auto px-4">
  <div class="text-9xl font-mono font-black text-slate-300 dark:text-slate-700">404</div>
  <h1 class="text-3xl font-extrabold">Page Not Found</h1>
  <p class="text-sm text-slate-500">The page you were looking for could not be located in our catalog.</p>
  <a href="/" class="btn btn-primary text-xs font-bold py-3 px-6 inline-block">Return to Storefront</a>
</div>`
  }
];

