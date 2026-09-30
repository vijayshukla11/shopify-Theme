# Nova Commerce Framework (NCF) SDK API Reference

## Classes & Singletons

### `NCFSDK`
Main entry singleton managing all subsystems.

#### Properties
- `events`: `NCFEventBus`
- `hooks`: `NCFHookRegistry`
- `components`: `NCFComponentRegistry`
- `plugins`: `NCFPluginManager`
- `static VERSION`: `'1.0.0-RC1'`

#### Methods
- `checkCompatibility(requiredVersion: string): boolean`

---

### `NCFEventBus`
Pub/Sub event system for NCF telemetry and cross-module reactivity.

#### Methods
- `on<T extends NCFEventName>(event: T, listener: NCFEventListener<T>): () => void`
  - Subscribes to an event. Returns an unbind function.
- `off<T extends NCFEventName>(event: T, listener: NCFEventListener<T>): void`
  - Unsubscribes from an event.
- `emit<T extends NCFEventName>(event: T, payload: NCFEventMap[T]): void`
  - Emits an event with strongly typed payload.
- `getHistory(): NCFEventLog[]`
  - Returns recent recorded event history.
- `clearHistory(): void`
  - Clears recorded history.

---

### `NCFHookRegistry`
Registers non-destructive template injection hooks.

#### Methods
- `register(entry: NCFHookEntry): () => void`
  - Registers an extension entry. Returns unbind function.
- `unregister(id: string, location?: NCFHookName): void`
- `getHooks(location: NCFHookName): NCFHookEntry[]`
- `getAllHooks(): Record<NCFHookName, NCFHookEntry[]>`

---

### `NCFPluginManager`
Manages plugin metadata, lifecycle, enabling/disabling, and cleanup.

#### Methods
- `registerPlugin(plugin: NCFPlugin, sdkInstance: any): void`
- `enablePlugin(id: string, sdkInstance: any): void`
- `disablePlugin(id: string): void`
- `getPlugins(): NCFPlugin[]`
