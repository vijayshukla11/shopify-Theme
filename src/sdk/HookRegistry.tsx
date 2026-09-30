import React, { useState, useEffect } from 'react';
import { NCFHookName, NCFHookEntry } from './types';

export class NCFHookRegistry {
  private hooks: Map<NCFHookName, NCFHookEntry[]> = new Map();
  private listeners: Set<() => void> = new Set();

  /**
   * Register a custom extension component at a specific storefront hook location
   */
  public register(entry: NCFHookEntry): () => void {
    const list = this.hooks.get(entry.location) || [];
    // Maintain sorted by priority descending (highest priority first)
    const updated = [...list, entry].sort((a, b) => (b.priority || 0) - (a.priority || 0));
    this.hooks.set(entry.location, updated);

    this.notifyListeners();

    return () => this.unregister(entry.id, entry.location);
  }

  /**
   * Unregister an extension hook
   */
  public unregister(id: string, location?: NCFHookName): void {
    if (location) {
      const list = this.hooks.get(location) || [];
      this.hooks.set(location, list.filter((h) => h.id !== id));
    } else {
      this.hooks.forEach((list, loc) => {
        this.hooks.set(loc, list.filter((h) => h.id !== id));
      });
    }
    this.notifyListeners();
  }

  /**
   * Get all registered hook entries for a given location
   */
  public getHooks(location: NCFHookName): NCFHookEntry[] {
    return this.hooks.get(location) || [];
  }

  /**
   * Get all registered hooks across all locations
   */
  public getAllHooks(): Record<NCFHookName, NCFHookEntry[]> {
    const result: Partial<Record<NCFHookName, NCFHookEntry[]>> = {};
    this.hooks.forEach((entries, loc) => {
      result[loc] = entries;
    });
    return result as Record<NCFHookName, NCFHookEntry[]>;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((fn) => fn());
  }
}

export const hookRegistry = new NCFHookRegistry();

/**
 * React Component rendered inside storefront templates at hook locations
 */
export const NCFHookLocation: React.FC<{
  name: NCFHookName;
  context?: Record<string, any>;
  className?: string;
}> = ({ name, context, className }) => {
  const [entries, setEntries] = useState<NCFHookEntry[]>(() => hookRegistry.getHooks(name));

  useEffect(() => {
    const unsubscribe = hookRegistry.subscribe(() => {
      setEntries(hookRegistry.getHooks(name));
    });
    return unsubscribe;
  }, [name]);

  if (entries.length === 0) return null;

  return (
    <div className={`ncf-hook-location ncf-hook-${name} ${className || ''}`} data-ncf-hook={name}>
      {entries.map((entry) => (
        <React.Fragment key={entry.id}>
          {entry.render(context)}
        </React.Fragment>
      ))}
    </div>
  );
};
