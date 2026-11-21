import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, currency, onSelect, navigate, onLearnMore }) {
  const isFree = product.priceInr === 0;
  const isSale = product.salePriceInr && product.salePriceInr < product.priceInr;

  const displayPrice = () => {
    if (isFree) return "FREE";
    if (currency === 'INR') {
      return isSale ? `₹${product.salePriceInr}` : `₹${product.priceInr}`;
    } else {
      return isSale ? `$${product.salePriceUsd}` : `$${product.priceUsd}`;
    }
  };

  const originalPrice = () => {
    if (isFree || !isSale) return null;
    return currency === 'INR' ? `₹${product.priceInr}` : `$${product.priceUsd}`;
  };

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore(product.slug);
    } else if (navigate) {
      navigate(product.slug);
    }
  };

  return (
    <div className={`relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-300 border ${
      product.isFeatured 
        ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20' 
        : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
    }`}>
      
      {/* Top Badge */}
      {product.badge && (
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            product.isFeatured 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' 
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {product.isFeatured && <Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Title & Description */}
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed flex-grow">
        {product.description}
      </p>

      {/* Pricing display */}
      <div className="my-6 pt-5 border-t border-slate-100 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">{displayPrice()}</span>
        {originalPrice() && (
          <span className="text-sm font-semibold text-slate-400 line-through">
            {originalPrice()}
          </span>
        )}
        {!isFree && (
          <span className="text-xs font-medium text-slate-500">
            / lifetime license
          </span>
        )}
      </div>

      {/* Feature bullet list */}
      <ul className="space-y-2.5 mb-7 text-sm text-slate-600">
        {product.highlights.slice(0, 4).map((feat, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="space-y-2.5 mt-auto">
        <button
          onClick={() => onSelect(product)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            product.isFeatured
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/25 active:scale-98'
              : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-98'
          }`}
        >
          <span>{product.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleLearnMore}
          className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors text-center"
        >
          View details &amp; features →
        </button>
      </div>

    </div>
  );
}
