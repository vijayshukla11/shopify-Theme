import React from 'react';
import { eventBus } from './EventBus';
import { hookRegistry } from './HookRegistry';
import { componentRegistry } from './ComponentRegistry';
import { pluginManager } from './PluginManager';

export class NCFSDK {
  public static readonly VERSION = '1.0.0-RC1';
  public static readonly MIN_COMPATIBLE_VERSION = '1.0.0';

  public events = eventBus;
  public hooks = hookRegistry;
  public components = componentRegistry;
  public plugins = pluginManager;

  constructor() {
    this.registerSamplePlugins();
  }

  /**
   * Check framework compatibility
   */
  public checkCompatibility(requiredVersion: string): boolean {
    return requiredVersion <= NCFSDK.VERSION;
  }

  /**
   * Register default sample enterprise plugins
   */
  private registerSamplePlugins(): void {
    // Plugin 2: Real-time Express Free Shipping Counter
    this.plugins.registerPlugin(
      {
        id: 'ncf-express-shipping-extension',
        name: 'Express Shipping Progress Widget',
        version: '1.0.4',
        author: 'Nova Merchant Tools',
        description: 'Adds dynamic free shipping status indicator above cart drawer.',
        permissions: ['read_cart', 'render_hooks'],
        enabled: true,
        init: (sdk) => {
          sdk.hooks.register({
            id: 'express-shipping-cart-hook',
            pluginId: 'ncf-express-shipping-extension',
            location: 'beforeCart',
            priority: 20,
            render: () => React.createElement(
              'div',
              {
                className: 'p-3 bg-sky-500/10 border border-sky-500/30 rounded-xl mb-3 text-xs font-bold text-sky-400 flex items-center justify-between'
              },
              React.createElement('span', null, '🚀 Add $25.01 more to unlock FREE Express Air Delivery!'),
              React.createElement('span', { className: 'font-mono text-[10px] bg-sky-500 text-slate-950 px-2 py-0.5 rounded-full font-extrabold' }, 'QUALIFIED')
            )
          });
        }
      },
      this
    );
  }
}

// Global Singleton Instance
export const sdk = new NCFSDK();

// Attach to window for runtime browser console developer access
if (typeof window !== 'undefined') {
  (window as any).NCFSDK = NCFSDK;
  (window as any).NCFSDK.instance = sdk;
  (window as any).ncfSDK = sdk;
  (window as any).NCF = (window as any).NCF || {};
  (window as any).NCF.sdk = sdk;
}
