import React from 'react';
import { NCFComponentRegistryEntry } from './types';

export class NCFComponentRegistry {
  private components: Map<string, NCFComponentRegistryEntry> = new Map();
  private listeners: Set<() => void> = new Set();

  /**
   * Register a custom reusable component in the NCF ecosystem
   */
  public register(entry: NCFComponentRegistryEntry): () => void {
    this.components.set(entry.id, entry);
    this.notify();
    return () => this.unregister(entry.id);
  }

  /**
   * Unregister a custom component
   */
  public unregister(id: string): void {
    this.components.delete(id);
    this.notify();
  }

  /**
   * Get a registered component by ID
   */
  public get(id: string): NCFComponentRegistryEntry | undefined {
    return this.components.get(id);
  }

  /**
   * List all registered components or filter by type
   */
  public list(type?: NCFComponentRegistryEntry['type']): NCFComponentRegistryEntry[] {
    const all = Array.from(this.components.values());
    if (type) {
      return all.filter((c) => c.type === type);
    }
    return all;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }
}

export const componentRegistry = new NCFComponentRegistry();
