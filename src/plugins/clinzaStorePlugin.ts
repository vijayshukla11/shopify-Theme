import React from 'react';
import { NCFPlugin } from '../sdk/types';

export const ClinzaStorePlugin: NCFPlugin = {
  id: 'clinza-mens-fashion-extension',
  name: 'Clinza Men\'s Fashion Store Experience',
  version: '1.0.0',
  author: 'Clinza E-commerce Architecture Team',
  description: 'Extends Nova Commerce Framework for Clinza Premium Men\'s Apparel (India Market, INR pricing, Fit Guides).',
  permissions: ['render_hooks', 'read_cart'],
  enabled: true,
  init: (sdk) => {
    // 1. Hook: Size Guide & Fabric Care Banner above product info
    sdk.hooks.register({
      id: 'clinza-fabric-care-hook',
      pluginId: 'clinza-mens-fashion-extension',
      location: 'beforeProductInfo',
      priority: 15,
      render: () =>
        React.createElement(
          'div',
          {
            className: 'p-3 bg-slate-900 text-white rounded-xl text-xs flex items-center justify-between mb-3 border border-slate-800 font-mono'
          },
          React.createElement('span', { className: 'flex items-center gap-1.5' }, '👕 100% Premium Egyptian Cotton • Tailored Modern Fit'),
          React.createElement('span', { className: 'text-amber-400 font-bold uppercase underline cursor-pointer' }, 'Size & Fit Chart →')
        )
    });

    // 2. Hook: Express India COD & Delivery Status in Cart
    sdk.hooks.register({
      id: 'clinza-india-cod-hook',
      pluginId: 'clinza-mens-fashion-extension',
      location: 'beforeCart',
      priority: 25,
      render: () =>
        React.createElement(
          'div',
          {
            className: 'p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl mb-3 text-xs font-bold text-emerald-300 flex items-center justify-between font-sans'
          },
          React.createElement('span', null, '🇮🇳 Free Express Shipping Across India on orders over ₹1,499'),
          React.createElement('span', { className: 'text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-mono font-extrabold' }, 'COD AVAILABLE')
        )
    });

    // Listen to cart events for Clinza telemetry
    sdk.events.on('ProductAddedToCart', (payload) => {
      console.log('[Clinza Analytics] Product added to cart:', payload);
    });
  }
};
