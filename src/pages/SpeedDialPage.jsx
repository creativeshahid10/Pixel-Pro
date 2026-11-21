import React from 'react';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { Zap, Sparkles, Check, ArrowRight, MousePointer, LayoutGrid, Clock } from 'lucide-react';

export default function SpeedDialPage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const product = PRODUCTS.find(p => p.id === 'pixel-speeddial');
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');
  const price = currency === 'INR' ? `₹${product.salePriceInr || product.priceInr}` : `$${product.salePriceUsd || product.priceUsd}`;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Premiere Pro Radial Speed Menu</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro Speed Dial
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Your most-used Premiere actions right under your cursor. Hold middle-click or a custom key, flick towards an action, release, and keep your focus on the edit.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buy Speed Dial ({price})</span>
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

      {/* Speed Dial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <MousePointer className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Cursor Pinned</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The radial dial pops up exactly where your mouse is. No eye shifting to distant panels or menus.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Customizable Slots</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Configure 8 or 16 slices: Ripple Delete, Split at Playhead, Add Marker, Rate Stretch, or Apply Default Transition.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Muscle Memory</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Once memorized, directional gestures take under 100 milliseconds, boosting cut speed by 3x.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Plugin Features</h3>
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
