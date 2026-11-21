import React, { useState } from 'react';
import { getCustomerDataByEmail, isSupabaseConfigured } from '../lib/supabase';
import { CONFIG } from '../config';
import { Key, Search, CheckCircle, AlertCircle, Copy, Download, ShieldCheck, Database, Laptop } from 'lucide-react';

export default function PortalPage({ navigate }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [customerData, setCustomerData] = useState({ licenses: [], subscriptions: [] });
  const [copiedKey, setCopiedKey] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await getCustomerDataByEmail(email);
      setCustomerData(data);
    } catch (err) {
      setErrorMsg('Error querying database. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase Customer Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Manage Your Premiere Pro Licenses
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Enter the email address you used during checkout to retrieve your active Premiere Pro subscriptions, universal license keys, and workstation slots.
        </p>
      </div>

      {/* Supabase status badge */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
          <span>Supabase Project: <strong>{CONFIG.supabase.projectId}</strong> ({CONFIG.supabase.region})</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {isSupabaseConfigured ? 'Live Supabase Connected' : 'Demo / Sandbox Mode'}
        </span>
      </div>

      {/* Lookup Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleLookup} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Account Email Address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. editor@pixelsquad.in"
              required
              className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Checking Database...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Look Up Account</span>
                </>
              )}
            </button>
          </div>
          {errorMsg && (
            <p className="text-xs text-red-600 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
            </p>
          )}
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-600" />
            <span>Active Licenses &amp; Subscriptions</span>
          </h2>

          {customerData.licenses.length === 0 && customerData.subscriptions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3 bg-white">
              <Key className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No active licenses found for {email}</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                If you just made a purchase, please allow a moment for the transaction to sync. You can also purchase a new Premiere Pro subscription or individual plugin below.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => navigate('subscriptions')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  View Subscriptions
                </button>
                <button
                  onClick={() => navigate('home')}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Explore Plugins
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Render Subscriptions */}
              {customerData.subscriptions.map((sub) => (
                <div key={sub.id} className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Active Subscription
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{sub.plan_id || 'Premiere Pro All-Access'}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Valid until: {sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'Lifetime Access'}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200">
                    Active &amp; Verified
                  </span>
                </div>
              ))}

              {/* Render Licenses */}
              {customerData.licenses.map((lic) => (
                <div key={lic.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{lic.plugin_id === 'all_premiere_plugins' ? 'All Premiere Pro Plugins Access' : lic.plugin_id}</h4>
                      <p className="text-xs text-slate-500">License Type: {lic.license_type}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lic.active_devices_count || 0} / {lic.max_devices || 2} Workstations Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs">
                    <span className="font-bold text-slate-900 select-all">{lic.license_key}</span>
                    <button
                      onClick={() => copyToClipboard(lic.license_key)}
                      className="px-3 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-sans font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === lic.license_key ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Key</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      Issued: {new Date(lic.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href="https://github.com/creativeshahid10/Pixel-Pro/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Premiere CEP Extension</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Help Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
        <h4 className="text-sm font-bold text-slate-900">How to activate in Adobe Premiere Pro</h4>
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 leading-relaxed">
          <li>Download and install the Pixel Pro extension (.zxp) into Premiere Pro.</li>
          <li>Open Premiere Pro, go to <strong>Window &gt; Extensions &gt; Pixel Pro</strong>.</li>
          <li>Paste your license key in the activation prompt and click <strong>Activate Machine</strong>.</li>
          <li>The panel will verify with Supabase and unlock immediately for offline use.</li>
        </ol>
      </div>

    </div>
  );
}
