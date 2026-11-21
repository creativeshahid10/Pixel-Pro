import React from 'react';
import { CONFIG } from '../config';
import { PRODUCTS, SUBSCRIPTION_PLANS, COMPARISON_FEATURES, FAQS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ComparisonTable from '../components/ComparisonTable';
import FaqSection from '../components/FaqSection';
import { 
  Zap, Sparkles, ArrowRight, Shield, Cpu, Layers, Scissors, Mic, 
  Database, Check, ExternalLink, Key 
} from 'lucide-react';

export default function HomePage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const paidProducts = PRODUCTS.filter(p => p.priceInr > 0);
  const freeProducts = PRODUCTS.filter(p => p.priceInr === 0);
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');

  return (
    <div className="space-y-20 py-8">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-8 pb-12 px-4">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pixel Pro 2.5 for Adobe Premiere Pro is Live</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
          Plugins &amp; AI tools that make{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Premiere Pro 3x faster.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Exclusively designed for <strong>Adobe Premiere Pro</strong>. Automatic silence removal, offline AI captions, 450+ native transitions, and mouse-pinned speed dials. Available via <strong>All-Access Subscription</strong> or <strong>Single Plugin Licenses</strong>.
        </p>

        {/* Hero Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => onSelectPlan(yearlyPlan)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md shadow-slate-900/10 hover:shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Get All-Access Subscription</span>
            <span className="text-xs font-normal opacity-80">(₹1,999/yr)</span>
          </button>
          
          <button
            onClick={() => navigate('subscriptions')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Compare Plans &amp; Standalone</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-600 text-xs font-semibold">
          <div className="flex items-center justify-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>100% Offline AI Whisper</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Supabase Cloud Sync</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Instant License Activation</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Premiere Pro 2021-2026</span>
          </div>
        </div>
      </section>

      {/* Premiere Pro Extension Panel Mockup Visual */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                Adobe Premiere Pro 2024 • Pixel Pro Suite CEP Extension
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Supabase Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">Silence Auto-Cutter</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scans timeline waveforms and executes zero-latency ripple delete across speech pauses automatically.
              </p>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">Offline AI Captions</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Word-by-word animated captions with Hormozi and MrBeast styles. Generates locally on GPU with no cloud bills.
              </p>
            </div>

            {/* Box 3 */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">450+ Native Presets</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                GPU-accelerated whip pans, glitch, camera shakes, and light leaks applied straight onto your video cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED PREMIERE SUBSCRIPTIONS HIGHLIGHT */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
              Subscription Option • Separate Track
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Pixel Pro Premiere All-Access Pass
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Prefer an all-in-one membership instead of individual licenses? The Premiere Pro Subscription unlocks every single plugin, offline AI transcription models, and future version drops under one license.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  plan.isPopular
                    ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-400'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm text-white">{plan.name}</h4>
                  {plan.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-emerald-400 my-2">
                  {currency === 'INR' ? `₹${plan.salePriceInr || plan.priceInr}` : `$${plan.salePriceUsd || plan.priceUsd}`}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {plan.billingCycle}</span>
                </div>
                <p className="text-[11px] text-slate-300">{plan.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-xs text-slate-400">
            <span>Powered by Supabase Database Authentication (Project: {CONFIG.supabase.projectId})</span>
            <button
              onClick={() => navigate('subscriptions')}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
            >
              <span>Explore all subscription features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* STANDALONE PREMIERE PRO PLUGINS CATALOG */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Standalone Plugins
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              Buy Individual Premiere Pro Plugins
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Want only one tool? Every Premiere Pro plugin can be purchased standalone with a lifetime license.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paidProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onSelect={() => onSelectProduct(product)}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

      {/* FREE PREMIERE TOOLS */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Free Utilities for Premiere Pro</h2>
            <p className="text-slate-600 text-xs mt-1">Essential tools for timeline management and cache optimization</p>
          </div>
          <button
            onClick={() => navigate('free-plugins')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All Free Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {freeProducts.map((tool) => (
            <div key={tool.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900">{tool.name}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Free
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{tool.description}</p>
              </div>
              <button
                onClick={() => navigate(tool.id === 'pixel-cache-cleaner' ? 'pixel-cache-cleaner' : 'free-plugins')}
                className="w-full py-2 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-all"
              >
                Download Free Utility
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-5xl mx-auto px-4">
        <ComparisonTable />
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4">
        <FaqSection />
      </section>

    </div>
  );
}
