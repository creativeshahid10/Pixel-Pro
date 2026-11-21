import React from 'react';
import { Download, Sparkles, Check, ExternalLink } from 'lucide-react';

export default function FreePluginsPage({ navigate }) {
  const freeTools = [
    { name: "Social Safe Margins (9:16 & 1:1)", desc: "Interactive overlay guides for Instagram Reels, YouTube Shorts, and TikTok UI boundaries in Premiere Pro." },
    { name: "Instant Anchor Center", desc: "Instantly center anchor points on title graphics and clips without shifting their timeline position." },
    { name: "Broadcast Timecode Burn-In", desc: "Clean studio timecode overlay generator with drop frame detection for client review cuts." },
    { name: "Quick Adjustment Layer", desc: "One-click hotkey to create and place an adjustment layer trimmed to sequence bounds." },
    { name: "Podcast Audio Visualizer", desc: "Auto-reactive soundwave visualizer bars for social video clips and audiograms." },
    { name: "Premiere Cache Optimizer", desc: "Free disk space map to clear heavy Adobe cache and temp conforming audio buffers." }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Free Premiere Pro Extensions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Free Premiere Pro Tools
        </h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          Open tools crafted for Premiere Pro video editors. No watermarks, no account required. Download and drop directly into Premiere Pro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeTools.map((tool, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900">{tool.name}</h3>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Free
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {tool.desc}
              </p>
            </div>
            <a
              href="https://github.com/creativeshahid10/Pixel-Pro/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.zxp / preset)</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
