-- ================================================================
-- Pixel Pro (fvvznnjhwaztqekohzpk) - Premiere Pro Plugins & Subscriptions
-- Region: ap-northeast-1
-- ================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked with Supabase Auth or direct customer checkout)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Premiere Pro Plugins Master Table (ONLY Premiere Pro)
create table if not exists public.premiere_plugins (
  id text primary key,
  name text not null,
  slug text not null unique,
  badge text,
  category text default 'plugin',
  version text default '1.0.0',
  description text,
  compatibility text[] default array['Premiere Pro 2021+', 'Windows 10/11 & macOS'],
  highlights text[],
  price_inr numeric default 0,
  sale_price_inr numeric,
  price_usd numeric default 0,
  sale_price_usd numeric,
  download_url text,
  is_active boolean default true,
  is_free boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Premiere Pro Dedicated Subscription Plans Table
create table if not exists public.subscription_plans (
  id text primary key,
  name text not null,
  billing_cycle text not null check (billing_cycle in ('monthly', 'yearly', 'lifetime')),
  badge text,
  description text,
  price_inr numeric not null,
  sale_price_inr numeric,
  price_usd numeric not null,
  sale_price_usd numeric,
  features text[],
  is_popular boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. User Subscriptions Table (Separate Subscription Track)
create table if not exists public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  full_name text,
  plan_id text references public.subscription_plans(id) on delete set null,
  status text default 'active' check (status in ('active', 'cancelled', 'expired', 'trialing')),
  payment_gateway text default 'razorpay',
  payment_id text,
  order_id text,
  amount_paid numeric not null,
  currency text default 'INR',
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Plugin Licenses Table (For both Individual Plugins & All-Access Subscriptions)
create table if not exists public.plugin_licenses (
  id uuid default gen_random_uuid() primary key,
  license_key text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  full_name text,
  phone text,
  plugin_id text default 'all_premiere_plugins', -- 'all_premiere_plugins' for subscription, or specific plugin id
  license_type text default 'standalone' check (license_type in ('standalone', 'subscription')),
  subscription_id uuid references public.user_subscriptions(id) on delete set null,
  max_devices integer default 2,
  active_devices_count integer default 0,
  is_active boolean default true,
  expires_at timestamp with time zone, -- null indicates lifetime
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. License Device Activations Table (CEP / Premiere Pro workstation locking)
create table if not exists public.license_activations (
  id uuid default gen_random_uuid() primary key,
  license_id uuid references public.plugin_licenses(id) on delete cascade not null,
  machine_id text not null,
  machine_name text,
  os_platform text,
  premiere_version text,
  last_validated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(license_id, machine_id)
);

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================

alter table public.profiles enable row level security;
alter table public.premiere_plugins enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.plugin_licenses enable row level security;
alter table public.license_activations enable row level security;

-- Public can read active plugins and active subscription plans
create policy "Allow public read active plugins"
  on public.premiere_plugins for select
  using (is_active = true);

create policy "Allow public read active plans"
  on public.subscription_plans for select
  using (is_active = true);

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can read their own subscriptions
create policy "Users can view own subscriptions"
  on public.user_subscriptions for select
  using (auth.uid() = user_id or auth.jwt()->>'email' = email);

-- Users can read their own licenses
create policy "Users can view own licenses"
  on public.plugin_licenses for select
  using (auth.uid() = user_id or auth.jwt()->>'email' = email);

-- Allow public license verification RPC (no auth required for Premiere plugin to check key)
-- ================================================================
-- STORED FUNCTION: VERIFY PREMIERE LICENSE
-- ================================================================

create or replace function public.verify_premiere_license(
  p_license_key text,
  p_machine_id text,
  p_machine_name text default 'Workstation',
  p_os_platform text default 'Windows',
  p_premiere_version text default '2024'
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_lic record;
  v_act record;
  v_current_count integer;
begin
  -- Find license
  select * into v_lic from public.plugin_licenses
  where license_key = p_license_key and is_active = true;

  if not found then
    return jsonb_build_object('valid', false, 'error', 'INVALID_KEY', 'message', 'License key is invalid or deactivated.');
  end if;

  -- Check expiration
  if v_lic.expires_at is not null and v_lic.expires_at < now() then
    return jsonb_build_object('valid', false, 'error', 'EXPIRED', 'message', 'This Premiere Pro subscription/license has expired.');
  end if;

  -- Check if machine is already registered
  select * into v_act from public.license_activations
  where license_id = v_lic.id and machine_id = p_machine_id;

  if found then
    -- Update last validated
    update public.license_activations
    set last_validated_at = now(), machine_name = p_machine_name
    where id = v_act.id;

    return jsonb_build_object(
      'valid', true,
      'license_type', v_lic.license_type,
      'plugin_id', v_lic.plugin_id,
      'expires_at', v_lic.expires_at,
      'device_status', 'ALREADY_ACTIVATED'
    );
  end if;

  -- Check device count
  select count(*) into v_current_count from public.license_activations where license_id = v_lic.id;
  if v_current_count >= v_lic.max_devices then
    return jsonb_build_object(
      'valid', false,
      'error', 'DEVICE_LIMIT_REACHED',
      'message', format('Device limit reached (%s of %s slots used). Deactivate a machine or upgrade devices.', v_current_count, v_lic.max_devices)
    );
  end if;

  -- Register new machine
  insert into public.license_activations (license_id, machine_id, machine_name, os_platform, premiere_version)
  values (v_lic.id, p_machine_id, p_machine_name, p_os_platform, p_premiere_version);

  update public.plugin_licenses
  set active_devices_count = v_current_count + 1
  where id = v_lic.id;

  return jsonb_build_object(
    'valid', true,
    'license_type', v_lic.license_type,
    'plugin_id', v_lic.plugin_id,
    'expires_at', v_lic.expires_at,
    'device_status', 'NEW_DEVICE_ACTIVATED'
  );
end;
$$;

-- ================================================================
-- INITIAL SEED DATA: PREMIERE PRO PLUGINS & SUBSCRIPTION PLANS
-- ================================================================

-- Premiere Pro Plugins (ONLY Premiere Pro)
insert into public.premiere_plugins (id, name, slug, badge, category, version, description, compatibility, highlights, price_inr, sale_price_inr, price_usd, sale_price_usd, is_active, is_free)
values
(
  'pixel-ultimate',
  'Pixel Pro Ultimate for Premiere Pro',
  'pixel-ultimate',
  'Flagship All-In-One',
  'flagship',
  '2.5.0',
  'The flagship dockable extension panel for Adobe Premiere Pro. Instant silence removal, 99-language offline AI subtitles, 1-click multicam switching, and instant cinematic adjustment layers.',
  array['Premiere Pro 2021 to 2026', 'Windows 10/11 & macOS Intel/Apple Silicon'],
  array[
    'Smart Silence Removal (Cut dead air automatically)',
    'Offline AI Subtitles in 99+ Languages with dynamic word highlights',
    'One-click Multicam sync and audio waveform alignment',
    'Instant Cinematic Adjustment Layers & 1-click Color Grading',
    'Batch Sequence & Timeline Utilities'
  ],
  500, 300, 5, 3, true, false
),
(
  'pixel-autocut',
  'Pixel Pro Auto-Cut & Silence Cutter',
  'pixel-autocut',
  'Fast Podcast & Vlog Tool',
  'utility',
  '1.8.0',
  'Automated dead air, pause, and breath removal tool for Premiere Pro sequences. Cuts hours of manual editing down to 5 seconds.',
  array['Premiere Pro 2021 to 2026', 'Windows & Mac'],
  array[
    'Zero latency ripple delete across audio/video tracks',
    'Custom threshold, padding, and min-silence duration',
    'Preserves background music while cutting speech gaps',
    'Batch process multiple multi-track sequences'
  ],
  350, 199, 4, 2.5, true, false
),
(
  'pixel-subtitles',
  'Pixel Pro AI Auto-Captions Pro',
  'pixel-subtitles',
  'Offline Whisper AI',
  'ai_tool',
  '2.1.0',
  'Offline AI speech-to-text captions running directly on your GPU/CPU in Premiere Pro. Generates animated word-by-word highlighted subtitles with zero cloud credits.',
  array['Premiere Pro 2022 to 2026', 'Windows 10/11 & macOS M1/M2/M3/M4/Intel'],
  array[
    '99+ languages supported locally',
    'Hormozi, MrBeast, and Viral TikTok caption animations',
    'Automatic emoji insertion and keyword styling',
    '100% offline security - your audio never leaves your machine'
  ],
  400, 249, 5, 3, true, false
),
(
  'pixel-transitions',
  'Pixel Pro Transitions & Motion Pack',
  'pixel-transitions',
  '450+ Native Presets',
  'presets',
  '3.0.0',
  'Over 450 native GPU-accelerated Premiere Pro transitions and effects: seamless whip zooms, glitch, light leaks, camera shakes, and optical warps.',
  array['Premiere Pro 2020 to 2026', 'Cross-Platform'],
  array[
    '450+ drag-and-drop transitions with audio sound effects',
    'Native Premiere Pro effect line (zero third-party dependencies)',
    'Real-time playback with GPU acceleration',
    'Customizable speeds, directions, and color tones'
  ],
  250, 149, 3, 2, true, false
),
(
  'pixel-speeddial',
  'Pixel Pro Speed Dial (Wheel for Premiere)',
  'pixel-speeddial',
  'Radial Hotkey Wheel',
  'utility',
  '1.4.0',
  'A rapid-fire radial speed wheel pinned directly to your mouse cursor in Premiere Pro. Execute ripple cuts, slip edits, razor cuts, and color labels in 0.1s.',
  array['Premiere Pro 2020 to 2026', 'Windows & Mac'],
  array[
    'Radial menu activates right at your mouse cursor',
    '8 to 16 customizable quick slots for top Premiere actions',
    'Eliminates keyboard gymnastics and menu hunting',
    'Smooth fluid gestures with haptic visual cues'
  ],
  200, 120, 2.5, 1.5, true, false
),
(
  'pixel-cache-cleaner',
  'Pixel Pro Premiere Cache Cleaner',
  'pixel-cache-cleaner',
  '100% Free Utility',
  'free_utility',
  '1.2.0',
  'Analyze and purge bloated Premiere Pro media cache files, .pek audio peaks, conforming temporary buffers, and scratch disk clutter safely in seconds.',
  array['Windows 10/11 & macOS'],
  array[
    'Visual tree-map of Adobe media cache sizes',
    'One-click purge for stale audio conforming buffers',
    'Reclaims 50-200 GB of SSD space instantly',
    '100% safe, verified local utility'
  ],
  0, 0, 0, 0, true, true
),
(
  'pixel-free-pack',
  'Pixel Pro Community Free Premiere Tools',
  'pixel-free-pack',
  '100% Free Bundle',
  'free_bundle',
  '1.5.0',
  'Curated set of 6 essential free Premiere Pro extensions and preset scripts: Social Safe Guides (9:16 / 1:1), Timecode Burn-In, Quick Adjustment Layer, and Aspect Ratios.',
  array['Premiere Pro 2020 to 2026', 'Windows & Mac'],
  array[
    'Social Safe Frame Margins (Instagram, TikTok, YouTube Shorts)',
    'Broadcast Timecode Burn-In Overlay',
    'Quick Adjustment Layer creator hotkey',
    'Audio Visualizer bars for music tracks',
    'Free forever with no watermarks'
  ],
  0, 0, 0, 0, true, true
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price_inr = excluded.price_inr,
  sale_price_inr = excluded.sale_price_inr,
  price_usd = excluded.price_usd,
  sale_price_usd = excluded.sale_price_usd,
  highlights = excluded.highlights;

-- Dedicated Premiere Pro Subscription Plans
insert into public.subscription_plans (id, name, billing_cycle, badge, description, price_inr, sale_price_inr, price_usd, sale_price_usd, features, is_popular, is_active)
values
(
  'premiere-monthly',
  'Premiere Pro All-Access (Monthly)',
  'monthly',
  'Flexible',
  'Full recurring access to every Premiere Pro plugin, AI captions, silence cutter, and all future updates.',
  399, 299, 5, 3.99,
  array[
    'All Premiere Pro plugins unlocked immediately',
    'Offline AI Subtitles & Captions engine',
    'Automated Silence Cutter tool',
    '450+ Transition and Motion presets',
    '2 Workstation activations simultaneously',
    'Cancel or pause anytime with 1-click'
  ],
  false, true
),
(
  'premiere-yearly',
  'Premiere Pro All-Access (Yearly)',
  'yearly',
  'Best Value • Save 45%',
  'Our most popular plan. 1 full year of all Premiere Pro plugins, priority support, and all upcoming AI releases.',
  3588, 1999, 45, 24.99,
  array[
    'All Premiere Pro plugins & tools included',
    'Priority offline AI processing features',
    'All new Premiere Pro releases & monthly preset drops',
    '3 Workstation activations simultaneously',
    'VIP Discord community & developer support',
    'Save 45% compared to monthly'
  ],
  true, true
),
(
  'premiere-lifetime',
  'Premiere Pro Lifetime Access Pass',
  'lifetime',
  'Pay Once, Own Forever',
  'Single payment for lifetime access to the entire Pixel Pro Premiere Pro suite. No recurring subscription fees ever.',
  5000, 3499, 65, 44.99,
  array[
    'Lifetime license for all current & future Premiere Pro plugins',
    'Zero recurring fees - pay once and keep forever',
    'Offline AI Subtitles with no cloud token limits',
    '3 Workstation device activations',
    'Commercial client usage license included',
    'Lifetime updates guarantee'
  ],
  false, true
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price_inr = excluded.price_inr,
  sale_price_inr = excluded.sale_price_inr,
  price_usd = excluded.price_usd,
  sale_price_usd = excluded.sale_price_usd,
  features = excluded.features;
