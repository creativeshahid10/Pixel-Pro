import { createClient } from '@supabase/supabase-js';

// Configuration for Pixel Pro (Project: fvvznnjhwaztqekohzpk)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fvvznnjhwaztqekohzpk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safely initialize Supabase client
export const isSupabaseConfigured = Boolean(
  supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_public_key_here'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all Premiere Pro plugins from Supabase
 */
export async function getPremierePlugins() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('premiere_plugins')
      .select('*')
      .eq('is_active', true)
      .order('price_inr', { ascending: false });

    if (error) {
      console.warn('Supabase fetch plugins error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch plugins failed:', err);
    return null;
  }
}

/**
 * Fetch Premiere Pro subscription plans
 */
export async function getSubscriptionPlans() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_inr', { ascending: true });

    if (error) {
      console.warn('Supabase fetch plans error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch plans failed:', err);
    return null;
  }
}

/**
 * Record a new subscription purchase in Supabase
 */
export async function recordSubscription({
  email,
  fullName,
  phone,
  planId,
  amountPaid,
  currency = 'INR',
  paymentId,
  orderId,
  billingCycle = 'monthly'
}) {
  if (!supabase) return { success: true, simulated: true };

  try {
    // 1. Calculate end date
    const now = new Date();
    let currentPeriodEnd = null;
    if (billingCycle === 'monthly') {
      currentPeriodEnd = new Date(now.setMonth(now.getMonth() + 1)).toISOString();
    } else if (billingCycle === 'yearly') {
      currentPeriodEnd = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
    } // lifetime remains null

    // 2. Insert subscription
    const { data: subData, error: subError } = await supabase
      .from('user_subscriptions')
      .insert({
        email,
        full_name: fullName,
        plan_id: planId,
        status: 'active',
        payment_gateway: 'razorpay',
        payment_id: paymentId,
        order_id: orderId,
        amount_paid: amountPaid,
        currency,
        current_period_start: new Date().toISOString(),
        current_period_end: currentPeriodEnd
      })
      .select()
      .single();

    if (subError) throw subError;

    // 3. Generate universal license key for subscription
    const licenseKey = generateFormattedKey('PXSUB');
    const { data: licData, error: licError } = await supabase
      .from('plugin_licenses')
      .insert({
        license_key: licenseKey,
        email,
        full_name: fullName,
        phone,
        plugin_id: 'all_premiere_plugins',
        license_type: 'subscription',
        subscription_id: subData.id,
        max_devices: billingCycle === 'yearly' || billingCycle === 'lifetime' ? 3 : 2,
        is_active: true,
        expires_at: currentPeriodEnd
      })
      .select()
      .single();

    if (licError) throw licError;

    return {
      success: true,
      subscription: subData,
      license: licData,
      licenseKey: licenseKey
    };
  } catch (err) {
    console.error('Failed to record subscription in Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Record a standalone plugin purchase in Supabase
 */
export async function recordPluginPurchase({
  email,
  fullName,
  phone,
  pluginId,
  amountPaid,
  currency = 'INR',
  paymentId,
  orderId,
  devices = 1
}) {
  if (!supabase) return { success: true, simulated: true };

  try {
    const licenseKey = generateFormattedKey('PXPRO');
    const { data, error } = await supabase
      .from('plugin_licenses')
      .insert({
        license_key: licenseKey,
        email,
        full_name: fullName,
        phone,
        plugin_id: pluginId,
        license_type: 'standalone',
        max_devices: devices,
        is_active: true,
        expires_at: null // Lifetime for standalone
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      license: data,
      licenseKey: licenseKey
    };
  } catch (err) {
    console.error('Failed to record plugin purchase in Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Query customer licenses and subscriptions by email
 */
export async function getCustomerDataByEmail(email) {
  if (!supabase) return { licenses: [], subscriptions: [] };

  try {
    const cleanEmail = email.trim().toLowerCase();

    const [licensesRes, subsRes] = await Promise.all([
      supabase
        .from('plugin_licenses')
        .select('*, license_activations(*)')
        .eq('email', cleanEmail)
        .order('created_at', { ascending: false }),
      supabase
        .from('user_subscriptions')
        .select('*, subscription_plans(*)')
        .eq('email', cleanEmail)
        .order('created_at', { ascending: false })
    ]);

    return {
      licenses: licensesRes.data || [],
      subscriptions: subsRes.data || []
    };
  } catch (err) {
    console.error('Failed to query customer data:', err);
    return { licenses: [], subscriptions: [], error: err.message };
  }
}

/**
 * Helper to generate random readable license key
 */
export function generateFormattedKey(prefix = 'PXPRO') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const block = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${prefix}-${block()}-${block()}-${block()}`;
}
