import React from 'react';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { Mic, Sparkles, Check, ArrowRight, Globe, Lock, Cpu, Palette } from 'lucide-react';

export default function AiSubtitlesPage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const product = PRODUCTS.find(p => p.id === 'pixel-subtitles');
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');
  const price = currency === 'INR' ? `₹${product.salePriceInr || product.priceInr}` : `$${product.salePriceUsd || product.priceUsd}`;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Mic className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local Whisper AI Engine for Premiere Pro</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro AI Subtitles
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Generate dynamic, word-by-word highlighted captions right inside Premiere Pro. Runs 100% offline on your local GPU/CPU with zero per-minute cloud costs.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buy AI Subtitles License ({price})</span>
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

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">99+ Languages Offline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Local Whisper models transcribe Hindi, English, Hinglish, Spanish, French, and 95+ other languages with high accuracy.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Viral Animation Styles</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hormozi text pop, MrBeast kinetic animations, neon glows, emoji auto-matching, and karaoke word highlights in one click.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">100% Private &amp; Offline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your client footage and confidential audio never leave your local workstation. Zero risk of data leaks or cloud outages.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Highlights &amp; Specifications</h3>
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
