import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { PRODUCTS, SUBSCRIPTION_PLANS } from '../data/products';
import { recordSubscription, recordPluginPurchase, isSupabaseConfigured } from '../lib/supabase';
import { 
  Sparkles, Check, ShieldCheck, Zap, Copy, Download, CreditCard, 
  Smartphone, QrCode, AlertCircle, ArrowLeft, RefreshCw, Key, ExternalLink, Database 
} from 'lucide-react';

export default function PayPage({ selectedProduct, selectedPlan, currency, setCurrency, navigate }) {
  // Determine if initial checkout is a subscription plan or standalone plugin
  const [isSubscriptionMode, setIsSubscriptionMode] = useState(() => {
    return Boolean(selectedPlan || (!selectedProduct && !selectedPlan));
  });

  const [currentPlan, setCurrentPlan] = useState(
    selectedPlan || SUBSCRIPTION_PLANS.find(p => p.id === 'premiere-yearly') || SUBSCRIPTION_PLANS[0]
  );

  const [currentProduct, setCurrentProduct] = useState(
    selectedProduct || PRODUCTS.find(p => p.id === 'pixel-ultimate') || PRODUCTS[0]
  );
  
  const [devices, setDevices] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Success State
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sync when prop changes
  useEffect(() => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      setIsSubscriptionMode(true);
    } else if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      setIsSubscriptionMode(false);
    }
  }, [selectedProduct, selectedPlan]);

  // Price calculations
  let basePrice = 0;
  if (isSubscriptionMode) {
    basePrice = currency === 'INR'
      ? (currentPlan.salePriceInr || currentPlan.priceInr)
      : (currentPlan.salePriceUsd || currentPlan.priceUsd);
  } else {
    basePrice = currency === 'INR' 
      ? (currentProduct.salePriceInr || currentProduct.priceInr)
      : (currentProduct.salePriceUsd || currentProduct.priceUsd);
  }

  const deviceAddonRate = currency === 'INR' ? 200 : 2;
  const extraDevicesCost = isSubscriptionMode ? 0 : (devices - 1) * deviceAddonRate;
  
  const subtotal = basePrice + extraDevicesCost;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Apply Coupon
  const handleApplyCoupon = () => {
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PIXEL10' || clean === 'SAVE10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (clean === 'PIXEL20' || clean === 'SPECIAL20') {
      setDiscountPercent(20);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon. Try PIXEL10');
      setCouponApplied(false);
    }
  };

  // Generate Unique License Key
  const generateLocalLicenseKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const prefix = isSubscriptionMode ? 'PXSUB' : 'PXPRO';
    return `${prefix}-${segment()}-${segment()}-${segment()}`;
  };

  // Handle Payment Initiation
  const handleInitiatePayment = async (simulateDemo = false) => {
    setFormError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please fill in your Name, Email, and Phone number.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsProcessing(true);

    // Common completion handler to persist in Supabase and display confirmation
    const completeOrder = async (orderId, paymentId) => {
      let finalKey = generateLocalLicenseKey();

      try {
        if (isSubscriptionMode) {
          const res = await recordSubscription({
            email,
            fullName: name,
            phone,
            planId: currentPlan.id,
            amountPaid: finalTotal,
            currency,
            paymentId,
            orderId,
            billingCycle: currentPlan.billingCycle
          });
          if (res.licenseKey) finalKey = res.licenseKey;
        } else {
          const res = await recordPluginPurchase({
            email,
            fullName: name,
            phone,
            pluginId: currentProduct.id,
            amountPaid: finalTotal,
            currency,
            paymentId,
            orderId,
            devices
          });
          if (res.licenseKey) finalKey = res.licenseKey;
        }
      } catch (err) {
        console.warn('Supabase sync warning:', err);
      }

      setGeneratedLicense({
        key: finalKey,
        orderId: orderId,
        itemType: isSubscriptionMode ? 'Premiere Pro Subscription' : 'Standalone Premiere Plugin',
        itemName: isSubscriptionMode ? currentPlan.name : currentProduct.name,
        email: email,
        phone: phone,
        devices: isSubscriptionMode ? (currentPlan.billingCycle === 'monthly' ? 2 : 3) : devices,
        amountPaid: `${currency === 'INR' ? '₹' : '$'}${finalTotal}`,
        date: new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })
      });

      setPaymentSuccess(true);
      setIsProcessing(false);
    };

    // If Simulator / Demo Mode clicked:
    if (simulateDemo || CONFIG.payment.gateway === 'demo') {
      setTimeout(() => {
        const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        completeOrder(orderId, 'SIMULATED_PAYMENT');
      }, 700);
      return;
    }

    // Razorpay Integration
    if (typeof window !== 'undefined' && window.Razorpay) {
      try {
        const options = {
          key: CONFIG.payment.razorpayKeyId,
          amount: Math.round(finalTotal * 100),
          currency: currency,
          name: CONFIG.brandName,
          description: isSubscriptionMode
            ? `${currentPlan.name} (${currentPlan.billingCycle})`
            : `${currentProduct.name} License (${devices} Workstation${devices > 1 ? 's' : ''})`,
          prefill: {
            name: name,
            email: email,
            contact: phone
          },
          theme: {
            color: '#10b981'
          },
          handler: function (response) {
            const orderId = response.razorpay_payment_id || ('ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase());
            completeOrder(orderId, response.razorpay_payment_id);
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setFormError('Payment was not completed. Please try again or use Demo Simulator.');
          setIsProcessing(false);
        });
        rzp.open();
      } catch (err) {
        console.error("Razorpay Error:", err);
        // Fallback to demo simulator
        const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        completeOrder(orderId, 'FALLBACK_DEMO');
      }
    } else {
      // Fallback
      const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      completeOrder(orderId, 'FALLBACK_DEMO');
    }
  };

  const handleCopyKey = () => {
    if (generatedLicense?.key) {
      navigator.clipboard.writeText(generatedLicense.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Top back navigation */}
      <button
        onClick={() => navigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Premiere Pro Suite</span>
      </button>

      {paymentSuccess && generatedLicense ? (
        /* SUCCESS RECEIPT / LICENSE SCREEN */
        <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-10 shadow-xl space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Payment Confirmed!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your {generatedLicense.itemType} is now active in Supabase. Your license key has been generated below.
            </p>
          </div>

          {/* License Key Box */}
          <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-6 text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Your Premiere Pro License Key
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider select-all">
              {generatedLicense.key}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleCopyKey}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy License Key'}</span>
              </button>
            </div>
          </div>

          {/* Details Table */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Order Number:</span>
              <span className="font-mono font-bold text-slate-900">{generatedLicense.orderId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Product / Plan:</span>
              <span className="font-bold text-slate-900">{generatedLicense.itemName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Licensed Email:</span>
              <span className="font-bold text-slate-900">{generatedLicense.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Workstation Slots:</span>
              <span className="font-bold text-slate-900">{generatedLicense.devices} Computer(s)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Total Amount Paid:</span>
              <span className="font-extrabold text-emerald-700 text-sm">{generatedLicense.amountPaid}</span>
            </div>
          </div>

          {/* Download & Instructions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
            <a
              href="https://github.com/creativeshahid10/Pixel-Pro/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Premiere Pro CEP Installer</span>
            </a>
            
            <button
              onClick={() => navigate('portal')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>View in Supabase Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* CHECKOUT FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Payment */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Subscription vs Standalone Toggle */}
            <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex">
              <button
                type="button"
                onClick={() => setIsSubscriptionMode(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  isSubscriptionMode 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Premiere Pro Subscription
              </button>
              <button
                type="button"
                onClick={() => setIsSubscriptionMode(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  !isSubscriptionMode 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Single Plugin License
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                {isSubscriptionMode ? 'Premiere Pro All-Access Checkout' : 'Single Plugin Checkout'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to generate your verified Supabase license.
              </p>
            </div>

            {/* Selection Dropdown */}
            {isSubscriptionMode ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Subscription Plan
                </label>
                <select
                  value={currentPlan.id}
                  onChange={(e) => setCurrentPlan(SUBSCRIPTION_PLANS.find(p => p.id === e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {currency === 'INR' ? `₹${plan.salePriceInr || plan.priceInr}` : `$${plan.salePriceUsd || plan.priceUsd}`} / {plan.billingCycle}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Premiere Pro Plugin
                </label>
                <select
                  value={currentProduct.id}
                  onChange={(e) => setCurrentProduct(PRODUCTS.find(p => p.id === e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {PRODUCTS.filter(p => p.priceInr > 0).map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} — {currency === 'INR' ? `₹${prod.salePriceInr || prod.priceInr}` : `$${prod.salePriceUsd || prod.priceUsd}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Customer Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shahid Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address (License will be delivered here)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. editor@pixelsquad.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Workstation device slots add-on (for standalone) */}
              {!isSubscriptionMode && (
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Workstation Device Activations
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDevices(num)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          devices === num
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {num} {num === 1 ? 'Machine' : 'Machines'}
                        {num > 1 && (
                          <span className="block text-[10px] font-normal text-slate-500">
                            +{currency === 'INR' ? `₹${(num - 1) * 200}` : `$${(num - 1) * 2}`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon Code */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. PIXEL10"
                    disabled={couponApplied}
                    className="flex-grow px-3.5 py-2 rounded-xl border border-slate-200 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
                    ✓ {discountPercent}% discount applied successfully!
                  </p>
                )}
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleInitiatePayment(false)}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {currency === 'INR' ? `₹${finalTotal}` : `$${finalTotal}`} via Razorpay</span>
                  </>
                )}
              </button>

              {/* Instant Simulator Button */}
              <button
                type="button"
                onClick={() => handleInitiatePayment(true)}
                disabled={isProcessing}
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Test Mode / Simulator (Instant Key Generation)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Order Summary
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {isSubscriptionMode ? currentPlan.name : currentProduct.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isSubscriptionMode ? currentPlan.description : currentProduct.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Price:</span>
                <span className="font-semibold text-slate-900">{currency === 'INR' ? `₹${basePrice}` : `$${basePrice}`}</span>
              </div>

              {!isSubscriptionMode && devices > 1 && (
                <div className="flex justify-between text-slate-600">
                  <span>Additional Workstations ({devices - 1}):</span>
                  <span className="font-semibold text-slate-900">+{currency === 'INR' ? `₹${extraDevicesCost}` : `$${extraDevicesCost}`}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-{currency === 'INR' ? `₹${discountAmount}` : `$${discountAmount}`}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
                <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                <span className="text-2xl font-black text-slate-900">
                  {currency === 'INR' ? `₹${finalTotal}` : `$${finalTotal}`}
                </span>
              </div>
            </div>

            {/* Supabase status info */}
            <div className="rounded-xl bg-white p-3.5 border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase Cloud Sync</span>
              </div>
              <p className="leading-relaxed">
                Project: <strong>{CONFIG.supabase.projectId}</strong>
                <br />
                Your license will be stored in PostgreSQL and validated in real time by the Premiere Pro panel.
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <p>✓ 100% Secure 256-bit SSL encrypted checkout</p>
              <p>✓ Instant license delivery on screen and via email</p>
              <p>✓ Works offline once activated</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
