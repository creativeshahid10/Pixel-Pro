import React from 'react';
import { COMPARISON_FEATURES } from '../data/products';
import { Check } from 'lucide-react';

export default function ComparisonTable() {
  return (
    <section className="my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Why editors choose Pixel Pro
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Built exclusively for Adobe Premiere Pro. Instant offline AI, real-time Supabase licensing, and zero cloud rental lock-in.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="py-4 px-6 font-bold text-slate-700">Capabilities</th>
              <th className="py-4 px-6 font-bold text-emerald-700 bg-emerald-50/50">Pixel Pro Suite</th>
              <th className="py-4 px-6 font-bold text-slate-500">Other Scripts &amp; Cloud Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COMPARISON_FEATURES.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">{item.feature}</td>
                <td className="py-4 px-6 font-semibold text-emerald-700 bg-emerald-50/30">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{item.pixel}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-500">{item.competitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
