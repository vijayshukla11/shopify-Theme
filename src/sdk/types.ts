import React from 'react';

export type NCFHookName =
  | 'beforeHeader'
  | 'afterHeader'
  | 'beforeHero'
  | 'afterHero'
  | 'beforeCollectionGrid'
  | 'afterCollectionGrid'
  | 'beforeProductInfo'
  | 'afterProductInfo'
  | 'beforeCart'
  | 'afterCart'
  | 'beforeFooter'
  | 'afterFooter';

export interface NCFEventMap {
  ProductAddedToCart: { productId: string; title: string; price: number; quantity: number };
  CartUpdated: { itemCount: number; totalAmount: number };
  SearchOpened: { query?: string };
  SearchClosed: { durationMs?: number };
  WishlistUpdated: { count: number; items: string[] };
  VariantChanged: { productId: string; variantId: string; price: number };
  CollectionFiltered: { category: string; count: number };
  ThemePresetChanged: { presetId: string; name: string };
  CustomerLoggedIn: { customerId: string; email: string };
  CustomerLoggedOut: { timestamp: string };
}

export type NCFEventName = keyof NCFEventMap;

export type NCFEventListener<T extends NCFEventName> = (payload: NCFEventMap[T]) => void;

export interface NCFHookEntry {
  id: string;
  pluginId?: string;
  location: NCFHookName;
  priority?: number;
  render: (context?: Record<string, any>) => React.ReactNode;
}

export interface NCFComponentRegistryEntry {
  id: string;
  type: 'card' | 'button' | 'section' | 'block' | 'input' | 'badge';
  name: string;
  pluginId?: string;
  component: React.ComponentType<any>;
}

export interface NCFPluginMetadata {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  permissions?: string[];
  dependencies?: Record<string, string>;
  minNCFVersion?: string;
}

export interface NCFPlugin extends NCFPluginMetadata {
  enabled: boolean;
  init: (sdk: any) => void;
  destroy?: () => void;
}

export interface NCFEventLog {
  id: string;
  eventName: string;
  payload: any;
  timestamp: string;
}
