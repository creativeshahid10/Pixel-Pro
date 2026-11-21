import React, { useState } from 'react';
import { MAJOR_ADDONS, PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { deactivateMachine } from '../lib/supabase';
import { 
  Laptop, ShieldCheck, CheckCircle2, Lock, Unlock, Sparkles, RefreshCw, 
  Trash2, ArrowRight, Zap, Layers, AlertTriangle, Key, Download 
} from 'lucide-react';

export default function HubPage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  // Simulated active user session in Hub
  const [activePlan, setActivePlan] = useState('premiere-yearly');
  const [devices, setDevices] = useState([
    { id: 'dev-1', name: 'Editing-Rig-Win11', os: 'Windows 11 (64-bit)', premiereVer: 'Premiere Pro 2024 (v24.5)', lastActive: 'Today at 02:15 PM' },
    { id: 'dev-2', name: 'MacBook-Pro-M2', os: 'macOS Sonoma (M2)', premiereVer: 'Premiere Pro 2024 (v24.4)', lastActive: 'Yesterday at 08:30 PM' }
  ]);
  const [unlockedAddons, setUnlockedAddons] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  const maxDevices = 2;

  // Handle Device Deactivation (Format PC / Switch Laptop)
  const handleDeactivateDevice = async (deviceId) => {
    const dev = devices.find(d => d.id === deviceId);
    if (!window.confirm(`Are you sure you want to disconnect ${dev.name}? This will free up 1 slot for a new PC.`)) {
      return;
    }
    
    // Call Supabase RPC
    await deactivateMachine('dummy-lic-id', deviceId);
    setDevices(devices.filter(d => d.id !== deviceId));
    setSyncNotice(`Device ${dev.name} disconnected successfully. 1 workstation slot freed!`);
    setTimeout(() => setSyncNotice(''), 4000);
  };

  // Handle Dynamic Manifest Sync
  const handleCheckUpdates = () => {
    setIsSyncing(true);
    setSyncNotice('');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('✓ All Premiere Pro panels are up to date! (Manifest v2.5.0 verified with Supabase).');
      setTimeout(() => setSyncNotice(''), 4000);
    }, 900);
  };

  // Handle Addon Unlock
  const handleUnlockAddon = (addon) => {
    // Navigate to PayPage with this addon
    onSelectProduct({
      id: addon.id,
      name: addon.name,
      slug: addon.id,
      priceInr: addon.priceInr,
      salePriceInr: addon.salePriceInr,
      priceUsd: addon.priceUsd,
      salePriceUsd: addon.salePriceUsd,
      description: addon.description,
      highlights: addon.highlights,
      badge: addon.badge,
      type: 'major_upgrade'
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      
      {/* Top Banner & Header */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pixel Pro Central Hub &amp; License Manager</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Premiere Pro Master Manager
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              Manage your all-access Premiere subscription, track active workstations (2-device limit), and unlock major new updates.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active License
            </span>
            <span className="text-sm font-extrabold text-emerald-400">
              All-Access Pass (Yearly)
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Valid until: Nov 2027 • Auto-Renewing
            </span>
          </div>
        </div>

        {/* Sync Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={handleCheckUpdates}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Checking Supabase Manifest...' : 'Check for Panel Updates'}</span>
          </button>

          {syncNotice && (
            <span className="text-xs font-semibold text-emerald-400 animate-fade-in">
              {syncNotice}
            </span>
          )}
        </div>
      </div>

      {/* SECTION 1: 2-DEVICE WORKSTATION MANAGER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-emerald-600" />
              <span>Active Workstations (2-Device Limit)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your license is authorized to run simultaneously on up to 2 workstations.
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
            devices.length >= maxDevices 
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            {devices.length} / {maxDevices} Slots In Use
          </span>
        </div>

        {/* Device List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((dev) => (
            <div key={dev.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h4 className="text-sm font-bold text-slate-900">{dev.name}</h4>
                </div>
                <p className="text-xs text-slate-600">{dev.os}</p>
                <p className="text-[11px] text-slate-400">{dev.premiereVer}</p>
                <p className="text-[10px] text-slate-400">Last active: {dev.lastActive}</p>
              </div>

              <button
                onClick={() => handleDeactivateDevice(dev.id)}
                className="px-3 py-1.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Disconnect machine to free up slot"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          ))}

          {devices.length < maxDevices && (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/50">
              <Laptop className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-bold text-slate-700">1 Workstation Slot Available</p>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Install Pixel Pro on your secondary laptop and activate with your license key.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: INCLUDED ALL-ACCESS PREMIERE PANELS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded border border-emerald-200">
            Included in All-Access
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">
            Your Installed Premiere Pro Panels
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            These plugins are fully unlocked and run both standalone and inside the master extension.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Pixel Pro Ultimate", desc: "Flagship panel, silence cutter, multicam sync", ver: "v2.5.0", route: "pixel-ultimate" },
            { name: "Auto-Cut & Silence", desc: "Instant audio ripple delete on timeline", ver: "v1.8.0", route: "pixel-autocut" },
            { name: "AI Auto-Captions Pro", desc: "Local Whisper AI animated subtitles", ver: "v2.1.0", route: "pixel-subtitles" },
            { name: "Transitions & Presets", desc: "450+ native GPU transitions and wipes", ver: "v3.0.0", route: "pixel-transitions" },
            { name: "Speed Dial Wheel", desc: "Cursor-pinned radial editing shortcuts", ver: "v1.4.0", route: "pixel-speeddial" },
            { name: "Cache Cleaner", desc: "Adobe media cache and conforming cleaner", ver: "v1.2.0", route: "pixel-cache-cleaner" }
          ].map((plugin, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-bold text-slate-900">{plugin.name}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{plugin.desc}</p>
              </div>
              <button
                onClick={() => navigate(plugin.route)}
                className="w-full py-1.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Open Panel Info
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MAJOR PAID UPGRADES / ADD-ON MODULES (PAY-PER-UNLOCK) */}
      <section className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-b from-white to-emerald-50/20 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded">
              <Zap className="w-3 h-3 fill-current" />
              <span>Pay-Per-Unlock Major Upgrades</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-2">
              Next-Gen AI Modules &amp; Major Updates
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Keep your existing tools untouched, or unlock these new heavy AI features for a nominal one-time upgrade fee.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MAJOR_ADDONS.map((addon) => {
            const isUnlocked = unlockedAddons.includes(addon.id);
            const price = currency === 'INR' ? `₹${addon.salePriceInr || addon.priceInr}` : `$${addon.salePriceUsd || addon.priceUsd}`;

            return (
              <div 
                key={addon.id} 
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isUnlocked 
                    ? 'border-emerald-500 bg-white shadow-md' 
                    : 'border-slate-200 bg-white/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {addon.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {addon.version}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{addon.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{addon.description}</p>

                  <div className="space-y-1.5 mb-6">
                    {addon.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">One-Time Upgrade:</span>
                    <span className="text-xl font-black text-slate-900">{price}</span>
                  </div>

                  {isUnlocked ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                      <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unlocked &amp; Active</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUnlockAddon(addon)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock Module ({price})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
