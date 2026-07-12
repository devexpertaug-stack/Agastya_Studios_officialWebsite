// Sector images (Unsplash — nature-forward, forest/Himalayan mood).
// Each capability includes: features, workflow, testimonial, case study, and a "web extension" (web-development angle).

import {
  ShoppingBag, PhoneCall, MessageSquare, Target, Megaphone, Sparkles,
  Cog, Users, Layout, PenTool, Home, Stethoscope, UtensilsCrossed, Scissors,
} from "lucide-react";

const IMG = {
  ecom: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80&auto=format&fit=crop",
  voice: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1400&q=80&auto=format&fit=crop",
  chat: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80&auto=format&fit=crop",
  sales: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&auto=format&fit=crop",
  marketing: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=1400&q=80&auto=format&fit=crop",
  visual: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&q=80&auto=format&fit=crop",
  ops: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
  hr: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&auto=format&fit=crop",
  web: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80&auto=format&fit=crop",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1400&q=80&auto=format&fit=crop",
};

export const SERVICE_CATEGORIES = [
  {
    slug: "ecommerce",
    number: "01",
    title: "E-commerce & D2C",
    icon: ShoppingBag,
    image: IMG.ecom,
    blurb:
      "Recover carts, style customers, and merchandise in real time — agents that speak in your brand voice.",
    features: [
      "Cart Recovery Agent — recover abandoned carts on WhatsApp/email in your tone",
      "AI Stylist / Virtual Try-On — photo-based outfit and product previews",
      "Product Recommendation Engine — behavioural + look-alike suggestions",
      "Dynamic Pricing Agent — competitor + margin aware price tuning",
      "Review & UGC Collection — moment-of-delight review capture",
      "Restock / Inventory Alerts — proactive notifications for wishlisted stock",
    ],
    workflow: [
      "Audit your storefront + funnel gaps",
      "Design a brand-voice conversation library",
      "Ship agent, integrate PSP + inventory, monitor first 30 days",
    ],
    web: "We also build the storefront: headless commerce on Shopify Hydrogen or a bespoke Next.js stack, with the agents wired straight into the checkout.",
    testimonial: {
      quote:
        "Cart-recovery agent alone paid for the studio inside 6 weeks. It doesn't sound like a bot — it sounds like our brand.",
      author: "Meera Bhatt",
      role: "Head of Growth, Alpine Apparel",
    },
    caseStudy: {
      title: "+38% recovered revenue in 60 days",
      client: "Alpine Apparel",
      outcome: "Cart-recovery + stylist agent → +38% recovered checkout revenue.",
    },
  },
  {
    slug: "voice",
    number: "02",
    title: "Voice AI",
    icon: PhoneCall,
    image: IMG.voice,
    blurb:
      "Human-sounding voice agents that answer, qualify and follow up — day or night, in Hindi + English.",
    features: [
      "AI Receptionist — answers calls, books, transfers, takes messages",
      "Outbound Voice Agent — appointment reminders, cold outreach, surveys",
      "WhatsApp / Instagram Voice-Reply — reply to voice notes with voice notes",
      "Multilingual — Hindi, English, Hinglish, regional accents",
    ],
    workflow: [
      "Record 90-second brand voice sample",
      "Design call flows + escalation to human",
      "Go live on a dedicated number, listen-in for the first week",
    ],
    web: "Bundled with a live-call dashboard we design and host — transcripts, sentiment, and follow-ups in one place.",
    testimonial: {
      quote:
        "Our clinic was drowning in missed calls. Rishi (that's what we named the agent) picked up 340 in the first week.",
      author: "Dr. Anil Rawat",
      role: "Rawat Wellness, Dehradun",
    },
    caseStudy: {
      title: "0 → 340 answered calls / week",
      client: "Rawat Wellness",
      outcome: "24/7 receptionist + reminder bot, resulting in +22% show-up rate.",
    },
  },
  {
    slug: "conversational",
    number: "03",
    title: "Conversational & Support",
    icon: MessageSquare,
    image: IMG.chat,
    blurb:
      "Live chat, DMs, and multilingual support that reads like your best rep on their best day.",
    features: [
      "Website Live Chat Agent with knowledge base ingestion",
      "Multilingual Support (12+ languages, code-mix aware)",
      "WhatsApp / Instagram DM Agent with human handoff",
      "Ticket triage + CRM sync",
    ],
    workflow: [
      "Ingest docs, FAQs and 90 days of past chats",
      "Tune tone, guardrails, escalation",
      "Ship widget + monitor deflection rate weekly",
    ],
    web: "We ship the widget as part of a wider web refresh — same fonts, same rhythm, no bolted-on look.",
    testimonial: {
      quote:
        "Support tickets down 61%. Our human team finally handles only the hard, interesting ones.",
      author: "Kabir Sethi",
      role: "COO, Ridge & Route",
    },
    caseStudy: {
      title: "61% ticket deflection",
      client: "Ridge & Route Travel",
      outcome: "3-language chat agent → 61% deflection, CSAT unchanged at 4.7/5.",
    },
  },
  {
    slug: "sales",
    number: "04",
    title: "Sales & Lead Gen",
    icon: Target,
    image: IMG.sales,
    blurb:
      "Qualify, book, follow up and update the CRM automatically — so reps only touch warm pipeline.",
    features: [
      "Lead Qualification Bot (BANT / MEDDIC configurable)",
      "Appointment / Demo Booking Agent with calendar sync",
      "Nurture / Follow-up Agent across email + WhatsApp",
      "CRM Auto-Updater (HubSpot, Salesforce, Zoho, Pipedrive)",
    ],
    workflow: [
      "Map ICP + qualification rubric",
      "Wire to CRM + calendar + comms",
      "Weekly tuning of scoring + follow-up cadence",
    ],
    web: "Landing pages designed to feed the funnel — every headline A/B tested by the agent itself.",
    testimonial: {
      quote:
        "SDRs no longer chase cold leads. They walk into meetings the agent already qualified.",
      author: "Ishita Sharma",
      role: "VP Sales, Deodar Cloud",
    },
    caseStudy: {
      title: "3.2× SDR productivity",
      client: "Deodar Cloud",
      outcome: "Qualification + booking agent → 3.2× meetings-per-SDR, 47% shorter sales cycle.",
    },
  },
  {
    slug: "marketing",
    number: "05",
    title: "Marketing & Content",
    icon: Megaphone,
    image: IMG.marketing,
    blurb:
      "Ship on-brand captions, ad variants and lifecycle campaigns at a pace your team can't match alone.",
    features: [
      "Social Caption / Content Generator (per platform, per persona)",
      "Ad Creative Testing Agent — auto-generates + rotates variants",
      "Email / SMS Campaign Agent with lifecycle segments",
      "Brand-voice enforcement layer across every output",
    ],
    workflow: [
      "Ingest brand book + past 500 posts",
      "Approve first 20 outputs collaboratively",
      "Ship an autonomous weekly content engine",
    ],
    web: "Marketing microsites and campaign landing pages designed and shipped in days, not sprints.",
    testimonial: {
      quote:
        "We now publish 4× the volume with a smaller team. And it still feels like us.",
      author: "Neha Rana",
      role: "Marketing Lead, Bhoj Foods",
    },
    caseStudy: {
      title: "4× content volume, same team",
      client: "Bhoj Foods",
      outcome: "Content engine + creative testing → +58% engagement, CAC down 24%.",
    },
  },
  {
    slug: "visual",
    number: "06",
    title: "Visual & Multimodal AI",
    icon: Sparkles,
    image: IMG.visual,
    blurb:
      "Turn a phone photo into a try-on, a room preview, or a full product shoot — instantly.",
    features: [
      "Virtual Try-On for apparel, eyewear, jewellery",
      "How Would This Look in My Space (furniture, decor, plants)",
      "AI Product Photography — studio-grade shots from a single phone image",
      "Before / After Visualizer for services (salon, dental, home reno)",
    ],
    workflow: [
      "Train on 200 reference images of your products",
      "Ship a visual widget on PDPs + Instagram",
      "Continuously refine on real user photos",
    ],
    web: "Deep-integrated on your PDP + a standalone showcase site so this becomes a marketing moment.",
    testimonial: {
      quote:
        "Return rate dropped 27%. Customers already know how it looks on them before hitting buy.",
      author: "Aarav Menon",
      role: "Founder, Kaal Studio",
    },
    caseStudy: {
      title: "-27% return rate",
      client: "Kaal Studio (apparel)",
      outcome: "Visual try-on on PDPs → -27% returns, +18% AOV.",
    },
  },
  {
    slug: "operations",
    number: "07",
    title: "Operations & Back Office",
    icon: Cog,
    image: IMG.ops,
    blurb:
      "Paperwork, scheduling, reporting and reconciliation — quietly handled in the background.",
    features: [
      "Document Processing Agent (invoices, KYC, contracts)",
      "Scheduling Agent across teams + rooms + assets",
      "Reporting Agent — weekly digests, board decks, ad-hoc queries",
      "Finance / Reconciliation Agent",
    ],
    workflow: [
      "Shadow the ops team for a week",
      "Automate the top 5 repetitive workflows",
      "Compound gains monthly",
    ],
    web: "Custom internal dashboards designed with the same craft as our public sites.",
    testimonial: {
      quote:
        "The reporting agent alone freed 12 hours a week for the finance team. We turned that into strategy time.",
      author: "Rhea Kapoor",
      role: "CFO, Chir Pine Holdings",
    },
    caseStudy: {
      title: "12 hrs / week back to finance",
      client: "Chir Pine Holdings",
      outcome: "Reporting + reconciliation agents → 12 hrs/wk saved, 0 reconciliation errors in Q4.",
    },
  },
  {
    slug: "hr",
    number: "08",
    title: "HR & Recruiting",
    icon: Users,
    image: IMG.hr,
    blurb:
      "Screen, schedule and coordinate candidates without losing the human touch.",
    features: [
      "Resume Screening Agent — role-fit scoring, bias controls",
      "Interview Scheduling Agent across panellists + time zones",
      "Candidate Nurture — keeps warm hires warm",
    ],
    workflow: [
      "Codify what a great hire looks like at your company",
      "Wire to ATS + calendar",
      "Review weekly hire-quality dashboard",
    ],
    web: "Beautiful careers page + application flow, designed to convert great candidates.",
    testimonial: {
      quote:
        "We went from 2 weeks to 2 days between application and first interview.",
      author: "Sara D'Souza",
      role: "People Ops, Tarai Labs",
    },
    caseStudy: {
      title: "14 days → 2 days to first interview",
      client: "Tarai Labs",
      outcome: "Screening + scheduling agents cut time-to-first-interview 7×.",
    },
  },
  {
    slug: "web",
    number: "09",
    title: "Web Development",
    icon: Layout,
    image: IMG.web,
    blurb:
      "Portfolio, showcase and commerce sites built as beautifully as our agents behave.",
    features: [
      "Marketing & portfolio sites (Next.js, Astro, Framer-hybrid)",
      "Headless commerce (Shopify Hydrogen, Medusa, custom)",
      "Custom admin dashboards + internal tools",
      "Motion, 3D, parallax and interactive experiences",
      "Every site ships with at least one AI touch built-in",
    ],
    workflow: [
      "1-week discovery + design sprint",
      "2-4 weeks build with weekly reviews",
      "Handover + a 90-day care plan",
    ],
    web: "This is our home turf. Every project ships with performance budgets, accessible components, and a taste for restraint.",
    testimonial: {
      quote:
        "It looks like a magazine and behaves like a Swiss watch. Best money we've spent this year.",
      author: "Vikrant Shah",
      role: "Founder, Meraki Retreats",
    },
    caseStudy: {
      title: "Meraki Retreats — a booking site people bookmark",
      client: "Meraki Retreats",
      outcome: "Custom booking site + parallax storytelling → +64% direct bookings.",
    },
  },
  {
    slug: "design",
    number: "10",
    title: "Graphic Design",
    icon: PenTool,
    image: IMG.design,
    blurb:
      "Brand identity, campaign creative and collateral — because automation deserves great design.",
    features: [
      "Brand Identity systems (logo, type, colour, motion)",
      "Campaign Creative — social, print, out-of-home",
      "Collateral — decks, pitch docs, packaging",
      "Editorial layouts and print-quality craft",
    ],
    workflow: [
      "Strategy → moodboards → identity",
      "Roll-out kit + guidelines",
      "Ongoing creative retainer optional",
    ],
    web: "Design and web ship together — the wordmark you approve on Tuesday is animating on your homepage by Friday.",
    testimonial: {
      quote:
        "Agastya sees the brand before we can articulate it. Every deliverable feels inevitable.",
      author: "Priya Nair",
      role: "Founder, Sanjhi",
    },
    caseStudy: {
      title: "Sanjhi — a wellness brand that feels like a forest",
      client: "Sanjhi",
      outcome: "Full identity + packaging + web → sold out first drop in 11 days.",
    },
  },
];

export const INDUSTRY_PACKAGES = [
  { slug: "real-estate", title: "Real Estate", icon: Home, items: ["Lead capture", "Property matching", "Viewing scheduler"] },
  { slug: "healthcare", title: "Healthcare / Clinics", icon: Stethoscope, items: ["Appointment booking", "Reminders", "Intake forms"] },
  { slug: "restaurants", title: "Restaurants / Hospitality", icon: UtensilsCrossed, items: ["Reservation bot", "Order-taking bot", "Concierge"] },
  { slug: "salons", title: "Salons / Spas", icon: Scissors, items: ["Booking", "Recommendations", "Retention flows"] },
];

export const GLOBAL_TESTIMONIALS = [
  {
    quote:
      "Agastya feels like hiring a small, quiet team of geniuses that already understand your brand.",
    author: "Meera Bhatt",
    role: "Head of Growth, Alpine Apparel",
  },
  {
    quote:
      "They ship faster than any studio I've worked with, without a drop in craft. Rare combination.",
    author: "Kabir Sethi",
    role: "COO, Ridge & Route",
  },
  {
    quote:
      "The voice agent sounds like Dehradun. Like home. Customers keep asking if she's a real person.",
    author: "Dr. Anil Rawat",
    role: "Rawat Wellness",
  },
  {
    quote:
      "Every touchpoint feels considered. It's clear these people love their craft.",
    author: "Priya Nair",
    role: "Founder, Sanjhi",
  },
];

export const PRICING_TIERS = [
  {
    tier: "seed",
    name: "Seed",
    price: "₹1.2L",
    cadence: "one-time",
    tagline: "One agent, shipped in 2 weeks.",
    bullets: [
      "1 AI agent of your choice",
      "Brand-voice tuning",
      "Basic dashboard + analytics",
      "2 weeks build + 30-day care",
    ],
    highlighted: false,
    cta: "Start with Seed",
  },
  {
    tier: "grove",
    name: "Grove",
    price: "₹3.6L",
    cadence: "quarterly",
    tagline: "A small stack of agents + a website.",
    bullets: [
      "Up to 3 agents wired together",
      "Custom marketing website (Web Dev)",
      "Design system + brand kit",
      "Weekly optimisation calls",
      "Chatbot with LLM (Claude / GPT / Gemini)",
    ],
    highlighted: true,
    cta: "Plant a Grove",
  },
  {
    tier: "forest",
    name: "Forest",
    price: "Custom",
    cadence: "retained",
    tagline: "End-to-end studio partner. Everything, always on.",
    bullets: [
      "Unlimited agents across your funnel",
      "Full web dev + design retainer",
      "Voice + visual + multimodal AI",
      "Dedicated studio partner",
      "Priority SLA + monthly strategy",
    ],
    highlighted: false,
    cta: "Design a Forest",
  },
];
