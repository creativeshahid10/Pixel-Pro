# Pixel Pro — Premiere Pro Exclusive Suite & AI Tools

Production-grade web portal and licensing system for **Pixel Pro**, built exclusively for **Adobe Premiere Pro** editors.

- **GitHub Repository**: [creativeshahid10/Pixel-Pro](https://github.com/creativeshahid10/Pixel-Pro)
- **Supabase Project**: `Pixel Pro` (`fvvznnjhwaztqekohzpk`)
- **Supabase Region**: `ap-northeast-1`
- **Supabase URL**: `https://fvvznnjhwaztqekohzpk.supabase.co`

---

## 💎 Architecture & Separation: Only Premiere Pro

In this repository, **all tools, plugins, and AI utilities are 100% exclusive to Adobe Premiere Pro** (all After Effects elements have been completely removed).

### 1. Dual Tracks: Plugins vs. Subscriptions
- **Standalone Plugins Track**:
  - **Pixel Pro Ultimate**: All-in-one Premiere Pro dockable extension panel.
  - **Pixel Pro Auto-Cut**: Automated silence and breath removal for timelines.
  - **Pixel Pro AI Subtitles**: Offline Whisper AI speech-to-text captions (99+ languages, kinetic word highlighting).
  - **Pixel Pro Transitions**: 450+ GPU-accelerated native Premiere transitions & effects.
  - **Pixel Pro Speed Dial**: Cursor-pinned radial action menu.
  - **Pixel Pro Cache Cleaner**: Free Premiere cache and conforming buffer cleanup utility.
  - **Community Free Tools**: Free overlay guides, aspect ratios, and adjustment layer tools.

- **Dedicated Subscription Track (All-Access Pass)**:
  - **Monthly Pro Pass** (`₹299 / $3.99 / mo`): Full access to all Premiere plugins + monthly updates.
  - **Yearly Pro Pass** (`₹1,999 / $24.99 / yr`): Save 45%, 3 device activations, priority AI models.
  - **Lifetime Access Pass** (`₹3,499 / $44.99`): Single payment, permanent lifetime access.

---

## ⚡ Supabase Setup & Database Migration

All database tables, Row-Level Security (RLS) policies, and the license verification RPC function are pre-built in `supabase/schema.sql`.

### To apply the database schema:
1. Open your Supabase Dashboard:
   [https://supabase.com/dashboard/project/fvvznnjhwaztqekohzpk/sql](https://supabase.com/dashboard/project/fvvznnjhwaztqekohzpk/sql)
2. Copy the entire contents of `supabase/schema.sql`.
3. Paste into the SQL Editor and click **Run**.
4. The following tables and policies will be active:
   - `profiles`
   - `premiere_plugins`
   - `subscription_plans`
   - `user_subscriptions`
   - `plugin_licenses`
   - `license_activations`
   - `verify_premiere_license()` (RPC function for Premiere Pro panel activation)

---

## ⚙️ Environment Variables

Create `.env` in the root directory (or copy from `.env.example`):

```env
VITE_SUPABASE_URL=https://fvvznnjhwaztqekohzpk.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
VITE_PROJECT_NAME="Pixel Pro"
VITE_PROJECT_ID="fvvznnjhwaztqekohzpk"
VITE_PROJECT_REGION="ap-northeast-1"
VITE_RAZORPAY_KEY_ID="rzp_test_1DP5mmOlF5G5ag"
```

> **Note**: You can copy your Supabase Anon/Public Key from:
> [https://supabase.com/dashboard/project/fvvznnjhwaztqekohzpk/settings/api](https://supabase.com/dashboard/project/fvvznnjhwaztqekohzpk/settings/api)

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build for production
npm run build
```
