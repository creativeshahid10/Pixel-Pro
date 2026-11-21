import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../data/products';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function SubscriptionsPage({ navigate, currency, setCurrency, onSelectPlan }) {
  const [billingFilter, setBillingFilter] = useState('all'); // 'all', 'monthly', 'yearly', 'lifetime'

  const filteredPlans = SUBSCRIPTION_PLANS.filter(plan => {
    if (billingFilter === 'all') return true;
    return plan.billingCycle === billingFilter;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Premiere Pro Exclusive Subscription • Powered by Supabase</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          One Subscription.{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Every Premiere Pro Plugin.
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Unlock the complete Pixel Pro suite for Adobe Premiere Pro. Get offline AI auto-captions, automated silence removal, 450+ native transitions, and priority updates under one unified license.
        </p>

        {/* Filter / Toggle */}
        <div className="pt-4 flex items-center justify-center gap-2">
          {['all', 'monthly', 'yearly', 'lifetime'].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingFilter(cycle)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                billingFilter === cycle
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cycle === 'all' ? 'All Plans' : cycle}
            </button>
          ))}
        </div>
      </div>

      {/* Subscription Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {filteredPlans.map((plan) => {
          const price = currency === 'INR' 
            ? `₹${plan.salePriceInr || plan.priceInr}`
            : `$${plan.salePriceUsd || plan.priceUsd}`;

          const regularPrice = currency === 'INR'
            ? `₹${plan.priceInr}`
            : `$${plan.priceUsd}`;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl bg-white border p-8 flex flex-col justify-between relative transition-all duration-200 ${
                plan.isPopular
                  ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm ${
                    plan.isPopular
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                </div>

                <div className="my-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{price}</span>
                    {plan.salePriceInr && (
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        {regularPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      / {plan.billingCycle}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1.5">
                    <Zap className="w-3 h-3 fill-current" /> Instant Supabase License Key
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What's included:
                  </p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                    plan.isPopular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                  {plan.billingCycle === 'lifetime' ? 'One-time payment • Own forever' : 'Billed securely via Razorpay • Cancel anytime'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Supabase Integration Note */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Supabase Real-Time License Database Active
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              Every subscription creates an encrypted universal key in our Supabase database (Project ID: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-emerald-700 font-bold border">fvvznnjhwaztqekohzpk</code>). Activate on up to 3 machines simultaneously.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('portal')}
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 shadow-sm transition-all flex items-center gap-2"
        >
          <span>Manage Existing License</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

    </div>
  );
}
