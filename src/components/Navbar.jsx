import React, { useState } from 'react';
import { CONFIG } from '../config';
import { Zap, Menu, X, Sparkles, ChevronDown, Key, Database } from 'lucide-react';

export default function Navbar({ currentRoute, navigate, currency, setCurrency }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pluginsDropdown, setPluginsDropdown] = useState(false);

  const pluginLinks = [
    { label: "Pixel Pro Ultimate", route: "pixel-ultimate", badge: "Flagship" },
    { label: "Auto-Cut & Silence", route: "pixel-autocut", badge: "Cutter" },
    { label: "AI Auto-Captions", route: "pixel-subtitles", badge: "Whisper" },
    { label: "Transitions & Presets", route: "pixel-transitions", badge: "450+" },
    { label: "Speed Dial Wheel", route: "pixel-speeddial", badge: "Radial" },
  ];

  const handleNav = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
    setPluginsDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                {CONFIG.brandName}
              </span>
              <span className="ml-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Premiere Pro
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentRoute === 'home' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            {/* Subscriptions Tab */}
            <button
              onClick={() => handleNav('subscriptions')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentRoute === 'subscriptions' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Subscriptions</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                All-Access
              </span>
            </button>

            {/* Plugins Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPluginsDropdown(!pluginsDropdown)}
                onMouseEnter={() => setPluginsDropdown(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  pluginLinks.some(p => p.route === currentRoute)
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <span>Premiere Plugins</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {pluginsDropdown && (
                <div 
                  onMouseLeave={() => setPluginsDropdown(false)}
                  className="absolute left-0 mt-1 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  {pluginLinks.map((p) => (
                    <button
                      key={p.route}
                      onClick={() => handleNav(p.route)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 flex items-center justify-between"
                    >
                      <span>{p.label}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {p.badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Free Tools */}
            <button
              onClick={() => handleNav('free-plugins')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentRoute === 'free-plugins' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Free Tools
            </button>

            {/* Cache Cleaner */}
            <button
              onClick={() => handleNav('pixel-cache-cleaner')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentRoute === 'pixel-cache-cleaner' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Cache Cleaner
            </button>

            {/* License Portal */}
            <button
              onClick={() => handleNav('portal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                currentRoute === 'portal' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>License Portal</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currency === 'INR' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currency === 'USD' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Quick CTA button */}
            <button
              onClick={() => handleNav('subscriptions')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Get Pass</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className="px-2 py-1 rounded border border-slate-200 text-[11px] font-bold text-slate-700"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('subscriptions')}
            className="w-full text-left px-3 py-2 text-sm font-bold text-emerald-700 rounded-lg bg-emerald-50 flex items-center justify-between"
          >
            <span>Premiere Pro Subscriptions</span>
            <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">All-Access</span>
          </button>

          <div className="pt-2 pb-1 text-[11px] font-bold uppercase text-slate-400 px-3">
            Premiere Pro Plugins
          </div>
          {pluginLinks.map((p) => (
            <button
              key={p.route}
              onClick={() => handleNav(p.route)}
              className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{p.label}</span>
              <span className="text-[10px] text-slate-400">{p.badge}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleNav('free-plugins')}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Free Community Tools
            </button>
            <button
              onClick={() => handleNav('pixel-cache-cleaner')}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cache &amp; Disk Cleaner
            </button>
            <button
              onClick={() => handleNav('portal')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-900 bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer License Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
