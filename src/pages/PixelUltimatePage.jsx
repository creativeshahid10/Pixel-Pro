import React from 'react';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { Sparkles, Check, ArrowRight, Scissors, Mic, Film, Clock, Zap, Database } from 'lucide-react';

export default function PixelUltimatePage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const product = PRODUCTS.find(p => p.id === 'pixel-ultimate');
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');
  const price = currency === 'INR' ? `₹${product.salePriceInr || product.priceInr}` : `$${product.salePriceUsd || product.priceUsd}`;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Adobe Premiere Pro Extension Panel</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro Ultimate
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          The all-in-one dockable extension panel for Adobe Premiere Pro. Automatic silence removal, 99-language offline AI subtitles, one-click multicam switching, and instant cinematic adjustment layers.
        </p>

        {/* Dual Actions: Standalone vs Subscription */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buy Standalone License ({price})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onSelectPlan(yearlyPlan)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Or Get All-Access Subscription</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span>Premiere Pro 2021 to 2026</span>
          <span>•</span>
          <span>Windows 10/11 &amp; macOS Intel/M-Series</span>
          <span>•</span>
          <span>Supabase License Sync</span>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Silence Removal</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Scan your audio track, preview silence thresholds, and ripple-delete pauses across multi-track sequences with a single click.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Offline AI Subtitles</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generate precise word-by-word highlighted captions in Hindi, English, and 97 other languages without cloud credits or per-minute fees.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Film className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">One-Click Multicam Sync</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sync multiple angles via audio waveforms and switch active camera angles using simple number keys or radial gestures.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-emerald-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Adjustment Layers</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Drop pre-configured adjustment layers with LUTs, letterbox ratios (2.35:1), and color grades over your entire sequence instantly.
          </p>
        </div>
      </div>

      {/* Feature List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Complete Feature Breakdown</h3>
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
