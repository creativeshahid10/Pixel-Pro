import React from 'react';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { Sparkles, Layers, Check, ArrowRight, Zap, Play, Eye } from 'lucide-react';

export default function TransitionsPage({ navigate, currency, onSelectProduct, onSelectPlan }) {
  const product = PRODUCTS.find(p => p.id === 'pixel-transitions');
  const yearlyPlan = SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly');
  const price = currency === 'INR' ? `₹${product.salePriceInr || product.priceInr}` : `$${product.salePriceUsd || product.priceUsd}`;

  const categories = [
    { name: "Whip Zooms & Pans", count: "84 Presets", desc: "Dynamic motion blur directional whips with sound effects" },
    { name: "Glitch & Distortion", count: "62 Presets", desc: "Digital artifacts, RGB split, analog VHS, pixelation" },
    { name: "Cinematic Light Leaks", count: "55 Presets", desc: "Warm film burns, anamorphic flares, optical flashes" },
    { name: "Camera Shakes & Hits", count: "78 Presets", desc: "Action impacts, earthquake shakes, subtle handheld wobble" },
    { name: "Split Screen & Grids", count: "45 Presets", desc: "2-way, 3-way, 4-way dynamic layout wipes for reels" },
    { name: "Film Textures & Grain", count: "126 Presets", desc: "16mm/35mm Kodak look, halation, dust, and gate weave" }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>450+ Native GPU Presets for Premiere Pro</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro Transitions Pack
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Drag-and-drop transitions with zero rendering lag. Built natively inside Premiere Pro using Mercury Playback GPU acceleration.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-base transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buy Transitions Pack ({price})</span>
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

      {/* Preset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {cat.count}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-3 mb-1.5">{cat.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
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
