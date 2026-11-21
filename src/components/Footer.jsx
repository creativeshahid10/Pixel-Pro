import React from 'react';
import { CONFIG } from '../config';
import { Zap, ShieldCheck, ExternalLink, Key, Database } from 'lucide-react';

export default function Footer({ navigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-extrabold text-lg text-slate-900">{CONFIG.brandName}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Professional extensions and offline AI speech tools built exclusively for Adobe Premiere Pro editors.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Offline AI &amp; Supabase Cloud Sync</span>
            </div>
          </div>

          {/* Column 1: Premiere Pro Plugins */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Premiere Pro Plugins</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('pixel-ultimate')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Pixel Pro Ultimate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pixel-autocut')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Auto-Cut Silence Cutter
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pixel-subtitles')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  AI Auto-Captions (Offline)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pixel-transitions')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Transitions &amp; Motion Pack
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pixel-speeddial')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Speed Dial Wheel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Subscriptions & Portal */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Subscriptions &amp; Access</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('subscriptions')} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                  <span>Premiere All-Access Pass</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('portal')} className="text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <Key className="w-3 h-3 text-emerald-600" />
                  <span>Customer License Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('free-plugins')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Free Community Extensions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('pixel-cache-cleaner')} className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Cache &amp; Disk Cleaner
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & GitHub */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4">Repo &amp; Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={CONFIG.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium">
                  <span>GitHub: creativeshahid10/Pixel-Pro</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href={CONFIG.supabase.dashboardUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors">
                  <span>Supabase: {CONFIG.supabase.projectId}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a href={CONFIG.discordUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors">
                  <span>Discord Community</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">Contact: {CONFIG.supportEmail}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {CONFIG.brandName} Suite. Built exclusively for Adobe Premiere Pro.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Only Premiere Pro Plugins</span>
            <span>•</span>
            <span>Separate Subscriptions</span>
            <span>•</span>
            <span>Supabase Auth &amp; Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
