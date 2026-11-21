import React from 'react';
import { HardDrive, Sparkles, Download, CheckCircle, ShieldAlert } from 'lucide-react';

export default function DiskCleanerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Premiere Pro Cache Optimizer</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pixel Pro Cache Cleaner
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          Reclaim 100+ GB of hidden Adobe Premiere Pro media cache files, .pek audio waveform files, and temporary conforming buffers safely in seconds.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="https://github.com/creativeshahid10/Pixel-Pro/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download for Windows (.exe)</span>
          </a>
          <a
            href="https://github.com/creativeshahid10/Pixel-Pro/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download for macOS (.dmg)</span>
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900">What does it clean?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>Common Adobe Media Cache Database &amp; Peak (.pek) files</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>Premiere Pro conforming audio buffer (.cfa) and temporary scratch files</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>Orphaned preview render files from old archived project sequences</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>Crash diagnostic dumps and stale Adobe logs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
