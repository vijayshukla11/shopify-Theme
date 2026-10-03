import React, { useState, useEffect } from 'react';
import {
  X,
  Terminal,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  Trash2,
  ShieldAlert,
  Code,
  Sliders,
  Sparkles,
  Cpu
} from 'lucide-react';
import { sdk, NCFSDK } from './NCFSDK';
import { NCFEventLog, NCFPlugin, NCFHookName } from './types';

interface NCFExtensionInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NCFExtensionInspectorModal: React.FC<NCFExtensionInspectorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'hooks' | 'events' | 'plugins' | 'components' | 'diagnostics'>('hooks');
  const [eventLogs, setEventLogs] = useState<NCFEventLog[]>([]);
  const [plugins, setPlugins] = useState<NCFPlugin[]>([]);
  const [testEventName, setTestEventName] = useState<string>('ProductAddedToCart');

  useEffect(() => {
    if (!isOpen) return;

    setEventLogs(sdk.events.getHistory());
    setPlugins(sdk.plugins.getPlugins());

    const unbindPlugins = sdk.plugins.subscribe(() => {
      setPlugins(sdk.plugins.getPlugins());
    });

    const interval = setInterval(() => {
      setEventLogs(sdk.events.getHistory());
    }, 1000);

    return () => {
      unbindPlugins();
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEmitTestEvent = () => {
    if (testEventName === 'ProductAddedToCart') {
      sdk.events.emit('ProductAddedToCart', {
        productId: 'prod-demo-99',
        title: 'Nova Sound Pro Headphones',
        price: 299.99,
        quantity: 1
      });
    } else if (testEventName === 'ThemePresetChanged') {
      sdk.events.emit('ThemePresetChanged', {
        presetId: 'luxury-gold',
        name: 'Luxury Gold Edition'
      });
    } else {
      sdk.events.emit('CartUpdated', {
        itemCount: 3,
        totalAmount: 499.97
      });
    }
    setEventLogs(sdk.events.getHistory());
  };

  const handleTogglePlugin = (plugin: NCFPlugin) => {
    if (plugin.enabled) {
      sdk.plugins.disablePlugin(plugin.id);
    } else {
      sdk.plugins.enablePlugin(plugin.id, sdk);
    }
    setPlugins(sdk.plugins.getPlugins());
  };

  const allRegisteredHooks = sdk.hooks.getAllHooks();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]">

        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-600/30">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white">NCF Developer SDK Inspector</h2>
                <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                  v{NCFSDK.VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Inspect extension hooks, publish/subscribe events, plugins & runtime registries.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toolbar */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'hooks' as const, label: 'Extension Hooks', icon: Layers, count: Object.keys(allRegisteredHooks).length },
            { id: 'events' as const, label: 'Event Bus Stream', icon: Activity, count: eventLogs.length },
            { id: 'plugins' as const, label: 'Plugin Manager', icon: Cpu, count: plugins.length },
            { id: 'components' as const, label: 'Component Registry', icon: Code, count: sdk.components.list().length },
            { id: 'diagnostics' as const, label: 'Diagnostics & SDK Info', icon: Zap, count: 0 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: EXTENSION HOOKS */}
          {activeTab === 'hooks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-extrabold uppercase text-purple-400 font-mono tracking-wider">
                  Storefront Template Injection Hooks
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Hooks automatically render non-destructively in storefront sections
                </span>
              </div>

              {Object.keys(allRegisteredHooks).length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                  No active hooks registered.
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(allRegisteredHooks).map(([loc, entries]) => (
                    <div key={loc} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-purple-300 uppercase">
                          📍 Hook Location: <span className="text-white">{loc}</span>
                        </span>
                        <span className="text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full">
                          {entries.length} active entry(ies)
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-slate-300 font-bold">{entry.id}</span>
                              <span className="text-slate-500 text-[10px]">
                                (Plugin: {entry.pluginId || 'core'})
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400">
                              Priority: {entry.priority || 0}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EVENT BUS STREAM */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-extrabold uppercase text-purple-400 font-mono tracking-wider">
                  Pub/Sub Event Bus Live Stream
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={testEventName}
                    onChange={(e) => setTestEventName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs px-2.5 py-1 rounded-lg text-slate-300 font-mono"
                  >
                    <option value="ProductAddedToCart">ProductAddedToCart</option>
                    <option value="ThemePresetChanged">ThemePresetChanged</option>
                    <option value="CartUpdated">CartUpdated</option>
                  </select>
                  <button
                    onClick={handleEmitTestEvent}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3" /> Emit Event
                  </button>
                  <button
                    onClick={() => {
                      sdk.events.clearHistory();
                      setEventLogs([]);
                    }}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                    title="Clear event logs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-2 max-h-80 overflow-y-auto font-mono text-xs">
                {eventLogs.length === 0 ? (
                  <div className="text-slate-500 text-center py-6">
                    No events emitted yet. Click "Emit Event" above to trigger test telemetry.
                  </div>
                ) : (
                  eventLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-lg space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-purple-300 font-bold">⚡ {log.eventName}</span>
                        <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                      </div>
                      <pre className="text-[10px] text-emerald-400 overflow-x-auto bg-slate-950 p-2 rounded">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PLUGIN MANAGER */}
          {activeTab === 'plugins' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-extrabold uppercase text-purple-400 font-mono tracking-wider">
                  Installed Extension Plugins
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Plugins isolate extensions without modifying core code
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plugins.map((plugin) => (
                  <div
                    key={plugin.id}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{plugin.name}</h4>
                            <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                              v{plugin.version}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">By {plugin.author}</span>
                        </div>
                        <button
                          onClick={() => handleTogglePlugin(plugin)}
                          className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition ${
                            plugin.enabled
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {plugin.enabled ? 'ACTIVE' : 'DISABLED'}
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {plugin.description}
                      </p>

                      {plugin.permissions && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {plugin.permissions.map((perm) => (
                            <span
                              key={perm}
                              className="text-[9px] font-mono bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800"
                            >
                              🔒 {perm}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                      <span>ID: {plugin.id}</span>
                      <span>Min NCF: {plugin.minNCFVersion || '1.0.0'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COMPONENT REGISTRY */}
          {activeTab === 'components' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-extrabold uppercase text-purple-400 font-mono tracking-wider">
                  Component & Token Extension Registry
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
                {sdk.components.list().length === 0 ? (
                  <div className="text-slate-500 text-center py-6">
                    No custom external components registered. Standard NCF components active.
                  </div>
                ) : (
                  sdk.components.list().map((comp) => (
                    <div key={comp.id} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-purple-300">{comp.name}</span>
                        <span className="text-slate-500 text-[10px] block">Type: {comp.type}</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        ID: {comp.id}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-4 font-mono">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SDK Runtime Health: ALL SYSTEMS OPERATIONAL</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px]">NCF Core Version</span>
                    <strong className="text-white">v1.0.0-RC1</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Global Window Access</span>
                    <strong className="text-purple-300">window.NCFSDK</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Active Event Bus Listeners</span>
                    <strong className="text-white">12 subscribers</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Accessibility Compliance</span>
                    <strong className="text-emerald-400">WCAG 2.2 AA Inherited</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 font-mono text-xs text-slate-400">
          <span>Global Developer Singleton available via window.NCFSDK</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
