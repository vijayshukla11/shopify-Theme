import { NCFEventMap, NCFEventName, NCFEventListener, NCFEventLog } from './types';

export class NCFEventBus {
  private listeners: Map<string, Set<Function>> = new Map();
  private eventHistory: NCFEventLog[] = [];
  private maxHistorySize = 100;

  /**
   * Subscribe to a strongly-typed NCF Event
   */
  public on<T extends NCFEventName>(event: T, listener: NCFEventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    // Return unbind function
    return () => this.off(event, listener);
  }

  /**
   * Unsubscribe from an NCF Event
   */
  public off<T extends NCFEventName>(event: T, listener: NCFEventListener<T>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(listener);
    }
  }

  /**
   * Emit an NCF Event to all subscribers
   */
  public emit<T extends NCFEventName>(event: T, payload: NCFEventMap[T]): void {
    const logEntry: NCFEventLog = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      eventName: event,
      payload,
      timestamp: new Date().toLocaleTimeString()
    };

    this.eventHistory.unshift(logEntry);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.pop();
    }

    const set = this.listeners.get(event);
    if (set) {
      set.forEach((listener) => {
        try {
          listener(payload);
        } catch (err) {
          console.error(`[NCF EventBus Error] Failed listener for event ${event}:`, err);
        }
      });
    }
  }

  /**
   * Retrieve recent event log history for developer inspection
   */
  public getHistory(): NCFEventLog[] {
    return [...this.eventHistory];
  }

  /**
   * Clear recorded event log history
   */
  public clearHistory(): void {
    this.eventHistory = [];
  }
}

export const eventBus = new NCFEventBus();
