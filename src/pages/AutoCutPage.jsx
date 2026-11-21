import React from 'react';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { Scissors, Sparkles, Check, ArrowRight, Volume2, FastForward, Sliders } from 'lucide-react';

export default function AutoCutPage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const product = PRODUCTS.find(p => p.id === 'pixel-autocut');
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');
  const price = currency === 'INR' ? `₹${product.salePriceInr || product.priceInr}` : `$${product.salePriceUsd || product.priceUsd}`;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Scissors className="w-3.5 h-3.5 text-emerald-600" />
          <span>Premiere Pro Silence Removal &amp; Jump Cut Plugin</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro Auto-Cut
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Say goodbye to manual scissor cutting. Detect pauses, silence, and filler breaths across multi-track sequences and ripple-delete them instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buy Auto-Cut License ({price})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectPlan(yearlyPlan)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Included in All-Access Pass</span>
          </button>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Decibel Noise Gate</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Adjust the threshold slider from -60dB to -10dB to capture exact pause levels without clipping natural voice cadences.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Padding Buffers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Adds micro pre-roll and post-roll safety buffers (e.g. 50ms) to words so speech is never cut off abruptly.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <FastForward className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-Track Sync</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cuts both video and audio tracks in perfect sync. Background music tracks are preserved untouched.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Key Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
