import { NCFPlugin } from './types';
import { eventBus } from './EventBus';
import { hookRegistry } from './HookRegistry';
import { componentRegistry } from './ComponentRegistry';

export class NCFPluginManager {
  private plugins: Map<string, NCFPlugin> = new Map();
  private listeners: Set<() => void> = new Set();

  /**
   * Register and initialize a new third-party NCF plugin
   */
  public registerPlugin(plugin: NCFPlugin, sdkInstance: any): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[NCF PluginManager] Plugin with ID ${plugin.id} is already registered.`);
      return;
    }

    this.plugins.set(plugin.id, { ...plugin, enabled: true });

    try {
      plugin.init(sdkInstance);
      console.log(`[NCF PluginManager] Plugin "${plugin.name}" v${plugin.version} initialized successfully.`);
    } catch (err) {
      console.error(`[NCF PluginManager] Failed to initialize plugin "${plugin.name}":`, err);
    }

    this.notify();
  }

  /**
   * Enable an existing plugin
   */
  public enablePlugin(id: string, sdkInstance: any): void {
    const plugin = this.plugins.get(id);
    if (!plugin) return;

    if (!plugin.enabled) {
      plugin.enabled = true;
      try {
        plugin.init(sdkInstance);
      } catch (err) {
        console.error(`[NCF PluginManager] Error enabling plugin ${id}:`, err);
      }
      this.notify();
    }
  }

  /**
   * Disable an existing plugin and run cleanup hooks
   */
  public disablePlugin(id: string): void {
    const plugin = this.plugins.get(id);
    if (!plugin) return;

    if (plugin.enabled) {
      plugin.enabled = false;
      try {
        if (plugin.destroy) {
          plugin.destroy();
        }
      } catch (err) {
        console.error(`[NCF PluginManager] Error destroying plugin ${id}:`, err);
      }
      this.notify();
    }
  }

  /**
   * Get all registered plugins
   */
  public getPlugins(): NCFPlugin[] {
    return Array.from(this.plugins.values());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }
}

export const pluginManager = new NCFPluginManager();
