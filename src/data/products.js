// ================================================================
// PIXEL PRO - PREMIERE PRO EXCLUSIVE PLUGINS & SUBSCRIPTIONS
// ================================================================

// 1. DEDICATED PREMIERE PRO SUBSCRIPTIONS (Separate Subscription Track)
export const SUBSCRIPTION_PLANS = [
  {
    id: "premiere-monthly",
    name: "Premiere All-Access (Monthly)",
    billingCycle: "monthly",
    badge: "Flexible Access",
    description: "Full access to every Premiere Pro plugin, offline AI models, and monthly updates. Cancel anytime.",
    priceInr: 399,
    salePriceInr: 299,
    priceUsd: 5,
    salePriceUsd: 3.99,
    features: [
      "All Premiere Pro plugins unlocked immediately",
      "Offline AI Subtitles & Captions engine (99+ languages)",
      "Automated Silence Cutter & Jump Cut tool",
      "450+ Transitions & Cinematic Motion Presets",
      "2 Workstations simultaneous activation",
      "Cancel, pause or restart anytime"
    ],
    isPopular: false,
    ctaText: "Start Monthly Pro"
  },
  {
    id: "premiere-yearly",
    name: "Premiere All-Access (Yearly)",
    billingCycle: "yearly",
    badge: "Most Popular • Save 45%",
    description: "The complete Premiere Pro editing powerhouse. Priority AI models, all future plugin updates, and VIP support.",
    priceInr: 3588,
    salePriceInr: 1999,
    priceUsd: 45,
    salePriceUsd: 24.99,
    features: [
      "All Premiere Pro plugins & future releases included",
      "Priority GPU AI transcription models",
      "Monthly new transition & audio presets drops",
      "3 Workstations simultaneous activation",
      "Priority VIP Discord & developer support",
      "Save 45% compared to monthly plan"
    ],
    isPopular: true,
    ctaText: "Get Yearly All-Access"
  },
  {
    id: "premiere-lifetime",
    name: "Premiere Pro Lifetime Pass",
    billingCycle: "lifetime",
    badge: "Pay Once, Own Forever",
    description: "Permanent license to the full Premiere Pro suite. Zero monthly fees. All future plugin versions included.",
    priceInr: 5000,
    salePriceInr: 3499,
    priceUsd: 65,
    salePriceUsd: 44.99,
    features: [
      "Permanent lifetime license for all Premiere Pro tools",
      "Never pay another subscription or renewal fee",
      "Offline AI Subtitles with no token limits forever",
      "3 Workstations device activations",
      "Commercial client & studio rights included",
      "Lifetime updates guarantee"
    ],
    isPopular: false,
    ctaText: "Get Lifetime License"
  }
];

// 2. STANDALONE PREMIERE PRO PLUGINS (Individual Plugins Track)
export const PRODUCTS = [
  {
    id: "pixel-ultimate",
    name: "Pixel Pro Ultimate",
    slug: "pixel-ultimate",
    badge: "Flagship All-In-One Premiere Panel",
    description: "The flagship Premiere Pro dockable extension panel. Smart silence removal, 99-language offline AI subtitles, 1-click multicam switching, and instant cinematic adjustment layers.",
    priceInr: 500,
    salePriceInr: 300,
    priceUsd: 5,
    salePriceUsd: 3,
    type: "plugin",
    compatibility: ["Premiere Pro 2021 to 2026", "Windows 10/11 & macOS (Apple Silicon + Intel)"],
    highlights: [
      "Smart Silence Removal (Cut dead air instantly across multi-tracks)",
      "Offline AI Subtitles in 99+ Languages (No cloud credits)",
      "One-click Multicam sync and audio waveform alignment",
      "Instant Cinematic Adjustment Layers & 1-click LUT applicator",
      "Batch Sequence & Timeline Utilities",
      "Standalone lifetime license or included in All-Access subscription"
    ],
    ctaText: "Get Pixel Pro Ultimate",
    isFeatured: true
  },
  {
    id: "pixel-autocut",
    name: "Pixel Pro Auto-Cut & Silence Cutter",
    slug: "pixel-autocut",
    badge: "Fast Podcast & Vlog Tool",
    description: "Automated silence and breath removal for Premiere Pro sequences. Cuts hours of manual editing down to seconds.",
    priceInr: 350,
    salePriceInr: 199,
    priceUsd: 4,
    salePriceUsd: 2.5,
    type: "plugin",
    compatibility: ["Premiere Pro 2021 to 2026", "Windows & Mac"],
    highlights: [
      "Zero latency ripple delete across audio/video tracks",
      "Custom decibel threshold, padding, and min-silence duration",
      "Preserves background audio while cutting speech pauses",
      "Batch process multiple multi-track sequences"
    ],
    ctaText: "Get Auto-Cut Pro",
    isFeatured: false
  },
  {
    id: "pixel-subtitles",
    name: "Pixel Pro AI Auto-Captions Pro",
    slug: "pixel-subtitles",
    badge: "Offline Whisper AI",
    description: "Offline AI speech-to-text captions running directly on your GPU/CPU in Premiere Pro. Generates animated word-by-word highlighted subtitles with zero cloud fees.",
    priceInr: 400,
    salePriceInr: 249,
    priceUsd: 5,
    salePriceUsd: 3,
    type: "plugin",
    compatibility: ["Premiere Pro 2022 to 2026", "Windows 10/11 & macOS M1-M4/Intel"],
    highlights: [
      "99+ languages supported offline (Hindi, English, Spanish, etc.)",
      "Hormozi, MrBeast, and Viral Reels caption animation presets",
      "Automatic dynamic emojis & keyword highlight styling",
      "100% offline privacy - audio never leaves your machine"
    ],
    ctaText: "Get AI Captions Pro",
    isFeatured: false
  },
  {
    id: "pixel-transitions",
    name: "Pixel Pro Transitions & Motion Pack",
    slug: "pixel-transitions",
    badge: "450+ Native Presets",
    description: "Over 450 native GPU-accelerated Premiere Pro transitions and effects: seamless whip zooms, glitch, light leaks, camera shakes, and optical warps.",
    priceInr: 250,
    salePriceInr: 149,
    priceUsd: 3,
    salePriceUsd: 2,
    type: "plugin",
    compatibility: ["Premiere Pro 2020 to 2026", "GPU Accelerated"],
    highlights: [
      "450+ drag-and-drop transitions with audio sound effects",
      "Native Premiere Pro effect line (zero third-party dependencies)",
      "Real-time playback with GPU acceleration",
      "Customizable speeds, directions, and color tones"
    ],
    ctaText: "Get Transitions Pack",
    isFeatured: false
  },
  {
    id: "pixel-speeddial",
    name: "Pixel Pro Speed Dial (Wheel for Premiere)",
    slug: "pixel-speeddial",
    badge: "Radial Hotkey Wheel",
    description: "A rapid-fire radial speed wheel pinned directly to your mouse cursor in Premiere Pro. Execute ripple cuts, slip edits, razor cuts, and color labels in 0.1s.",
    priceInr: 200,
    salePriceInr: 120,
    priceUsd: 2.5,
    salePriceUsd: 1.5,
    type: "plugin",
    compatibility: ["Premiere Pro 2020 to 2026", "Windows & Mac"],
    highlights: [
      "Radial menu activates right at your mouse cursor",
      "8 to 16 customizable quick slots for top Premiere actions",
      "Eliminates keyboard gymnastics and menu hunting",
      "Smooth fluid gestures with haptic visual cues"
    ],
    ctaText: "Get Speed Dial",
    isFeatured: false
  },
  {
    id: "pixel-cache-cleaner",
    name: "Pixel Pro Premiere Cache Cleaner",
    slug: "pixel-cache-cleaner",
    badge: "Free Utility",
    description: "Analyze and purge bloated Premiere Pro media cache files, .pek audio peaks, conforming temporary buffers, and scratch disk clutter safely in seconds.",
    priceInr: 0,
    priceUsd: 0,
    type: "free_tool",
    compatibility: ["Windows 10/11 & macOS"],
    highlights: [
      "Visual tree-map of Adobe Premiere media cache sizes",
      "One-click purge for stale audio conforming buffers",
      "Reclaims 50-200 GB of SSD space instantly",
      "100% safe, verified local utility"
    ],
    ctaText: "Download Free Utility",
    isFeatured: false
  },
  {
    id: "pixel-free-pack",
    name: "Pixel Pro Free Premiere Tools",
    slug: "pixel-free-pack",
    badge: "100% Free Bundle",
    description: "Curated set of 6 essential free Premiere Pro extensions and preset scripts: Social Safe Guides (9:16 / 1:1), Timecode Burn-In, Quick Adjustment Layer, and Aspect Ratios.",
    priceInr: 0,
    priceUsd: 0,
    type: "free_tool",
    compatibility: ["Premiere Pro 2020 to 2026", "Cross-Platform"],
    highlights: [
      "Social Safe Frame Margins (Instagram, TikTok, YouTube Shorts)",
      "Broadcast Timecode Burn-In Overlay",
      "Quick Adjustment Layer creator hotkey",
      "Audio Visualizer bars for music tracks",
      "Free forever with no watermarks"
    ],
    ctaText: "Download Free Tools",
    isFeatured: false
  }
];

export const COMPARISON_FEATURES = [
  { feature: "Target Software", pixel: "Dedicated Premiere Pro Only", competitors: "Bloated multi-app or generic" },
  { feature: "AI Subtitles (Offline)", pixel: "Included (Local GPU / 99 Langs)", competitors: "$15-$30/mo Cloud API" },
  { feature: "Silence Cutting Speed", pixel: "1-Click Ripple Delete", competitors: "Manual scissor cuts" },
  { feature: "Subscription vs Standalone", pixel: "Both Available (Separate Choice)", competitors: "Forced recurring subscription" },
  { feature: "Supabase License Sync", pixel: "Instant Real-time Cloud Auth", competitors: "Slow manual email licenses" },
  { feature: "Internet Requirement", pixel: "100% Works Offline Once Activated", competitors: "Always-online DRM" }
];

export const FAQS = [
  {
    q: "Are these plugins only for Adobe Premiere Pro?",
    a: "Yes! Pixel Pro is built exclusively for Adobe Premiere Pro (versions 2021 through 2026). Every feature, timeline shortcut, and AI tool is tailored specifically to Premiere Pro's engine."
  },
  {
    q: "How does the Premiere Pro Subscription differ from individual plugin purchases?",
    a: "You have complete freedom! If you only want a single tool (like Auto-Cut or AI Subtitles), you can buy a standalone lifetime license. If you want full access to all Premiere Pro plugins, AI features, and all future updates, you can choose the Premiere All-Access Subscription (Monthly, Yearly, or Lifetime)."
  },
  {
    q: "How is my license tracked with Supabase?",
    a: "Pixel Pro uses our secure Supabase database to verify license keys, track multi-device workstation slots, and manage active subscriptions instantly. You can check your status anytime in the customer portal."
  },
  {
    q: "Do the AI captions and silence removal require an internet connection?",
    a: "No! The AI models run directly on your workstation's local GPU/CPU. Once downloaded, you can edit in flight mode or with zero internet access, with zero per-minute transcription costs."
  },
  {
    q: "How many computers can I activate with my license?",
    a: "Standalone licenses support 1 to 2 workstations. Subscription passes include 2 to 3 simultaneous workstations. You can manage or deactivate devices anytime from your portal."
  },
  {
    q: "Which operating systems are supported?",
    a: "Both Windows 10/11 (64-bit) and macOS (including native Apple Silicon M1, M2, M3, M4, and Intel) are fully supported."
  }
];
