// Sector images (Unsplash — nature-forward, forest/Himalayan mood).
// Each capability includes: agents (with a "how it works" detail), workflow,
// testimonial, and a set of real-looking projects.

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
      {
        title: "Cart Recovery Agent",
        detail:
          "Watches for abandoned checkouts in real time, waits a natural beat, then reaches out on WhatsApp or email in your tone. It references the exact items left behind, answers hesitation (size, shipping, returns), and can offer a rule-based nudge only when it makes margin sense — never a blanket discount.",
      },
      {
        title: "AI Stylist / Virtual Try-On",
        detail:
          "A shopper uploads a photo or picks a model; the agent previews how a product looks on them and suggests complete outfits. It reads your catalogue tags, occasion and past purchases to style head-to-toe, then drops the whole look into the cart in one tap.",
      },
      {
        title: "Product Recommendation Engine",
        detail:
          "Blends behavioural signals (views, dwell time, add-to-cart) with look-alike modelling across your customer base. It re-ranks PDP, cart and email modules live, so each shopper sees the next best product instead of a generic bestsellers grid.",
      },
      {
        title: "Dynamic Pricing Agent",
        detail:
          "Monitors competitor prices, stock levels and your margin floor, then proposes price moves inside guardrails you set. Nothing goes live without your rules — it simply keeps you competitive without a human refreshing spreadsheets all day.",
      },
      {
        title: "Review & UGC Collection",
        detail:
          "Detects the moment of delight — a delivered order, a repeat purchase — and asks for a review or photo when goodwill is highest. It routes 5-star moments to public reviews and quietly flags unhappy notes to your team before they become a rating.",
      },
      {
        title: "Restock / Inventory Alerts",
        detail:
          "Remembers who wishlisted or viewed a sold-out SKU and pings them the minute it returns, in the channel they prefer. It also warns your ops team when a hero product is about to run dry so you never lose a launch to stockouts.",
      },
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
    projects: [
      {
        title: "Alpine Apparel — Cart recovery on WhatsApp",
        client: "Alpine Apparel",
        outcome: "+38% recovered revenue",
        summary:
          "A brand-voice cart-recovery + stylist agent for a Himalayan outerwear label. Recovered abandoned checkouts in 60 days and lifted repeat purchase rate by 21%.",
      },
      {
        title: "Sattva Skincare — AI stylist & bundles",
        client: "Sattva Skincare",
        outcome: "+19% AOV",
        summary:
          "A routine-builder agent that recommends product bundles by skin type and season. Average order value climbed 19% while returns from wrong-product purchases fell.",
      },
      {
        title: "Loomcraft Home — Restock & wishlist alerts",
        client: "Loomcraft Home",
        outcome: "27% of drops sell out",
        summary:
          "Wishlist-aware restock alerts for a handwoven textiles D2C brand. Limited drops now sell out in hours instead of days, with zero paid retargeting spend.",
      },
    ],
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
      {
        title: "AI Receptionist",
        detail:
          "Answers every call on the first ring, greets in your brand voice, and books, transfers or takes a message. It checks your live calendar, understands intent (‘I want to reschedule’), and only escalates to a human when the situation truly needs one.",
      },
      {
        title: "Outbound Voice Agent",
        detail:
          "Places appointment reminders, gentle payment follow-ups, feedback surveys and warm outreach. It respects do-not-disturb windows, records consent, logs the outcome of every call, and retries at smarter times instead of hammering a number.",
      },
      {
        title: "WhatsApp / Instagram Voice-Reply",
        detail:
          "Listens to inbound voice notes, understands them, and replies with a natural voice note of its own. Customers who prefer talking over typing get a real conversation — no ‘please type your query’ friction.",
      },
      {
        title: "Multilingual Voice",
        detail:
          "Speaks Hindi, English, Hinglish and regional accents, and switches mid-call to match the caller. Pronunciation of local names and places is tuned so it sounds like it actually belongs to your region.",
      },
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
    projects: [
      {
        title: "Rawat Wellness — 24/7 clinic receptionist",
        client: "Rawat Wellness, Dehradun",
        outcome: "340 calls / week answered",
        summary:
          "A bilingual voice receptionist that books appointments and sends reminders. Captured 340 previously-missed calls in week one and lifted appointment show-up rate by 22%.",
      },
      {
        title: "Himgiri Motors — Service booking line",
        client: "Himgiri Motors",
        outcome: "-64% missed bookings",
        summary:
          "An outbound + inbound voice agent for a car service centre that schedules slots and confirms pickups. Missed service bookings dropped 64% across three branches.",
      },
      {
        title: "Deodar Realty — After-hours enquiry desk",
        client: "Deodar Realty",
        outcome: "+31% qualified site visits",
        summary:
          "A voice agent that qualifies property enquiries after office hours and books site visits. Weekend leads that used to go cold now convert into 31% more qualified visits.",
      },
    ],
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
      {
        title: "Website Live Chat Agent",
        detail:
          "Ingests your docs, help centre and past chats to answer instantly with citations. It knows order status, policies and product specs, and hands off to a human with the full conversation summary the moment things get complex.",
      },
      {
        title: "Multilingual Support",
        detail:
          "Understands 12+ languages and code-mixed messages (Hinglish, Tanglish). It detects the customer’s language automatically and replies in kind, so you support a wider audience without hiring for every language.",
      },
      {
        title: "WhatsApp / Instagram DM Agent",
        detail:
          "Handles DMs and comments where your customers already are, keeping context across the thread. It resolves routine questions, collects order details, and pulls in a teammate with a clean handoff when needed.",
      },
      {
        title: "Ticket Triage + CRM Sync",
        detail:
          "Reads every incoming message, tags intent and urgency, and routes it to the right queue or person. It writes a summary and the resolution back to your CRM/helpdesk so nothing is retyped and reporting stays clean.",
      },
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
    projects: [
      {
        title: "Ridge & Route — Multilingual travel support",
        client: "Ridge & Route Travel",
        outcome: "61% ticket deflection",
        summary:
          "A three-language chat agent for a Himalayan travel company handling itineraries, refunds and FAQs. Deflected 61% of tickets while holding CSAT steady at 4.7/5.",
      },
      {
        title: "Pahadi Pantry — WhatsApp order support",
        client: "Pahadi Pantry",
        outcome: "8s median reply",
        summary:
          "A WhatsApp DM agent for a specialty foods brand that answers order and delivery questions instantly. Median first-response time dropped from 40 minutes to 8 seconds.",
      },
      {
        title: "Tarai Finance — Support triage & CRM sync",
        client: "Tarai Finance",
        outcome: "-52% resolution time",
        summary:
          "A triage agent that classifies and routes support requests, syncing summaries into their CRM. Average resolution time fell 52% and agents stopped retyping context.",
      },
    ],
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
      {
        title: "Lead Qualification Bot",
        detail:
          "Engages every inbound lead in seconds and scores them against your rubric (BANT or MEDDIC, your choice). It asks the right qualifying questions conversationally, so reps inherit context instead of a bare name and email.",
      },
      {
        title: "Appointment / Demo Booking Agent",
        detail:
          "Reads live calendar availability across your team and books the meeting inside the chat — no back-and-forth. It sends invites, reminders and reschedule links, and quietly fills cancellations from a waitlist.",
      },
      {
        title: "Nurture / Follow-up Agent",
        detail:
          "Runs multi-touch follow-up across email and WhatsApp, adapting cadence to how each lead engages. It knows when to keep going, when to pause, and when to hand a warmed-up lead back to a rep.",
      },
      {
        title: "CRM Auto-Updater",
        detail:
          "Logs every interaction, updates stages and fills fields in HubSpot, Salesforce, Zoho or Pipedrive automatically. Your pipeline stays accurate without reps doing data-entry after every call.",
      },
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
    projects: [
      {
        title: "Deodar Cloud — Inbound qualification + booking",
        client: "Deodar Cloud",
        outcome: "3.2× meetings / SDR",
        summary:
          "A qualification and demo-booking agent for a B2B SaaS team. Reps stopped chasing cold leads and walked into pre-qualified meetings, cutting the sales cycle 47%.",
      },
      {
        title: "Shivalik Interiors — Lead nurture across WhatsApp",
        client: "Shivalik Interiors",
        outcome: "+44% consult bookings",
        summary:
          "A follow-up agent for an interior-design studio that nurtures enquiries until they book a consult. Booked consultations rose 44% without adding sales headcount.",
      },
      {
        title: "Nanda EdTech — Admissions counsellor bot",
        client: "Nanda EdTech",
        outcome: "12k leads / month qualified",
        summary:
          "A qualification agent that handles admission enquiries at scale and books counsellor calls. Now qualifies 12,000 leads a month and syncs every stage into their CRM.",
      },
    ],
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
      {
        title: "Social Caption / Content Generator",
        detail:
          "Writes platform-native captions and posts per persona, trained on your brand book and best-performing content. It keeps hooks, hashtags and tone consistent while you approve, tweak or schedule in a click.",
      },
      {
        title: "Ad Creative Testing Agent",
        detail:
          "Generates fresh ad variants, launches them into structured tests, and reads the results. It rotates in winners and retires fatigued creative automatically, so your spend always sits behind what’s working.",
      },
      {
        title: "Email / SMS Campaign Agent",
        detail:
          "Builds lifecycle journeys — welcome, win-back, post-purchase — segmented by behaviour. It drafts the copy, sets the timing, and tunes send-times per subscriber for higher opens without spamming.",
      },
      {
        title: "Brand-Voice Enforcement Layer",
        detail:
          "Sits over every output as a final check, scoring copy against your voice rules and flagging anything off-brand. It’s the reason automated content still sounds unmistakably like you.",
      },
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
    projects: [
      {
        title: "Bhoj Foods — Always-on content engine",
        client: "Bhoj Foods",
        outcome: "4× content volume",
        summary:
          "A brand-voice content engine for a regional food brand producing captions, reels scripts and emails. Quadrupled output with a smaller team; engagement up 58%, CAC down 24%.",
      },
      {
        title: "Trailhead Gear — Ad creative testing",
        client: "Trailhead Gear",
        outcome: "-31% CPA",
        summary:
          "A creative-testing agent that generates and rotates ad variants for an outdoor gear brand. Cost per acquisition fell 31% as fatigued creative got retired automatically.",
      },
      {
        title: "Sanjhi — Lifecycle email & SMS",
        client: "Sanjhi",
        outcome: "+2.7× email revenue",
        summary:
          "Behaviour-based welcome, win-back and post-purchase journeys for a wellness brand. Email-attributed revenue grew 2.7× within one quarter of launch.",
      },
    ],
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
      {
        title: "Virtual Try-On",
        detail:
          "Lets shoppers see apparel, eyewear or jewellery on themselves from a single selfie. It fits the product to their proportions and lighting, so the preview looks believable enough to buy with confidence.",
      },
      {
        title: "See It In My Space",
        detail:
          "Customers point their camera at a room and the agent places furniture, decor or plants to scale. It removes the guesswork of ‘will this fit and match?’, which is where most homeware returns come from.",
      },
      {
        title: "AI Product Photography",
        detail:
          "Turns one plain phone photo into studio-grade shots across backgrounds and angles. Small brands get a consistent catalogue look without booking a shoot for every new SKU.",
      },
      {
        title: "Before / After Visualizer",
        detail:
          "Shows likely outcomes for services — a haircut, a dental result, a home renovation. It sets honest expectations up front, which lifts booking confidence and cuts disappointed follow-ups.",
      },
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
    projects: [
      {
        title: "Kaal Studio — Apparel virtual try-on",
        client: "Kaal Studio",
        outcome: "-27% returns",
        summary:
          "A PDP try-on widget for a contemporary apparel label letting shoppers preview fit from a selfie. Returns fell 27% and average order value rose 18%.",
      },
      {
        title: "Devbhoomi Decor — ‘See it in my space’",
        client: "Devbhoomi Decor",
        outcome: "-33% furniture returns",
        summary:
          "An AR-style room visualiser for a furniture and decor brand. Shoppers place items to scale before buying, cutting size- and style-mismatch returns by a third.",
      },
      {
        title: "Bloom & Co — AI product photography",
        client: "Bloom & Co",
        outcome: "90% lower shoot cost",
        summary:
          "Studio-grade product images generated from single phone photos for a fast-moving accessories brand. New SKUs go live same-day at a fraction of shoot cost.",
      },
    ],
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
      {
        title: "Document Processing Agent",
        detail:
          "Reads invoices, KYC documents and contracts, extracts the fields you care about, and files them where they belong. It flags anything unusual for a human rather than silently guessing, so accuracy stays high.",
      },
      {
        title: "Scheduling Agent",
        detail:
          "Coordinates people, rooms and assets across calendars, resolving clashes before they happen. It handles reschedules and reminders automatically so your team stops playing calendar Tetris.",
      },
      {
        title: "Reporting Agent",
        detail:
          "Pulls numbers from your tools and assembles weekly digests, board decks or ad-hoc answers on request. Ask it a plain-English question and it returns the chart and the caption, not just raw rows.",
      },
      {
        title: "Finance / Reconciliation Agent",
        detail:
          "Matches payments, invoices and statements, surfacing mismatches for review. It turns hours of month-end reconciliation into a short list of genuine exceptions to check.",
      },
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
    projects: [
      {
        title: "Chir Pine Holdings — Finance reporting & recon",
        client: "Chir Pine Holdings",
        outcome: "12 hrs/week saved",
        summary:
          "Reporting and reconciliation agents for a holding company’s finance team. Freed 12 hours a week and closed Q4 with zero reconciliation errors.",
      },
      {
        title: "Mussoorie Hospitality — Document processing",
        client: "Mussoorie Hospitality Group",
        outcome: "5× faster invoicing",
        summary:
          "An invoice- and KYC-processing agent across a hotel group’s back office. Vendor invoicing runs 5× faster with human review only on flagged exceptions.",
      },
      {
        title: "Ganga Logistics — Cross-team scheduling",
        client: "Ganga Logistics",
        outcome: "-70% scheduling conflicts",
        summary:
          "A scheduling agent coordinating drivers, docks and maintenance windows. Scheduling conflicts dropped 70% and dispatch stopped living in spreadsheets.",
      },
    ],
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
      {
        title: "Resume Screening Agent",
        detail:
          "Scores applicants against your definition of a great hire, with bias controls you can inspect. It explains why a candidate ranks where they do, so recruiters review a shortlist with reasoning instead of a black box.",
      },
      {
        title: "Interview Scheduling Agent",
        detail:
          "Finds slots across panellists and time zones and books them without the email ping-pong. It handles reschedules, sends prep materials, and keeps candidates warm with timely, human-sounding updates.",
      },
      {
        title: "Candidate Nurture",
        detail:
          "Keeps promising candidates engaged between stages and re-activates silver-medallists for new roles. Good people stop going cold in your inbox while you decide.",
      },
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
    projects: [
      {
        title: "Tarai Labs — Screening & scheduling",
        client: "Tarai Labs",
        outcome: "14 days → 2 days",
        summary:
          "Resume-screening and interview-scheduling agents for a fast-growing tech team. Time from application to first interview shrank 7×, with recruiters reviewing reasoned shortlists.",
      },
      {
        title: "Kosi Retail — High-volume seasonal hiring",
        client: "Kosi Retail",
        outcome: "1,800 hires / season",
        summary:
          "A screening and nurture agent for seasonal retail hiring across 40 stores. Handled 1,800 hires a season while keeping candidate response times under an hour.",
      },
      {
        title: "Aster Health — Clinical scheduling coordinator",
        client: "Aster Health Network",
        outcome: "-58% scheduling load",
        summary:
          "An interview-coordination agent for a healthcare network hiring nurses and technicians. Cut recruiter scheduling workload 58% and reduced candidate drop-off.",
      },
    ],
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
      {
        title: "Marketing & Portfolio Sites",
        detail:
          "Fast, accessible sites on Next.js, Astro or a Framer-hybrid, built around your story. Performance budgets and clean components mean they stay quick and easy to edit long after launch.",
      },
      {
        title: "Headless Commerce",
        detail:
          "Storefronts on Shopify Hydrogen, Medusa or a custom stack, wired to your catalogue and payments. You get a boutique front-end without giving up the tooling your ops team relies on.",
      },
      {
        title: "Custom Admin Dashboards",
        detail:
          "Internal tools and dashboards designed with the same care as the public site. Your team gets software that’s actually pleasant to use, not a bolted-on afterthought.",
      },
      {
        title: "Motion, 3D & Interactive",
        detail:
          "Parallax, scroll-driven scenes and tasteful 3D that serve the story rather than showing off. We keep it smooth on real devices, not just a designer’s laptop.",
      },
      {
        title: "AI Built In",
        detail:
          "Every site ships with at least one AI touch — a concierge, a search, a recommender — designed into the experience from day one rather than pasted on later.",
      },
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
    projects: [
      {
        title: "Meraki Retreats — Direct booking site",
        client: "Meraki Retreats",
        outcome: "+64% direct bookings",
        summary:
          "A parallax storytelling and booking site for a boutique retreat brand, with an AI concierge built in. Direct bookings rose 64%, cutting reliance on OTA commissions.",
      },
      {
        title: "Deodar Cloud — Headless marketing site",
        client: "Deodar Cloud",
        outcome: "98 Lighthouse score",
        summary:
          "A Next.js marketing site with a built-in qualification chat for a B2B SaaS company. Ships a 98 performance score and doubled demo-request conversion.",
      },
      {
        title: "Loomcraft Home — Headless commerce",
        client: "Loomcraft Home",
        outcome: "2.4s → 0.9s LCP",
        summary:
          "A Shopify Hydrogen storefront for a handwoven textiles brand with visual merchandising. Largest-contentful-paint fell from 2.4s to 0.9s and conversion improved 22%.",
      },
    ],
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
      {
        title: "Brand Identity Systems",
        detail:
          "Logo, type, colour and motion built as a coherent system, not a single logo file. You leave with rules and assets that keep everything on-brand as you grow.",
      },
      {
        title: "Campaign Creative",
        detail:
          "Social, print and out-of-home creative designed around one clear idea. We adapt the concept cleanly across every format so the campaign feels unified everywhere it appears.",
      },
      {
        title: "Collateral",
        detail:
          "Decks, pitch documents and packaging crafted to the same standard as the brand. The materials your team sends out finally match the quality of the work inside.",
      },
      {
        title: "Editorial & Print Craft",
        detail:
          "Layouts with real typographic care and print-ready precision. Whether it’s a lookbook or a report, it reads beautifully and prints exactly as intended.",
      },
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
    projects: [
      {
        title: "Sanjhi — Full brand identity & packaging",
        client: "Sanjhi",
        outcome: "Sold out in 11 days",
        summary:
          "A complete identity, packaging and web system for a wellness brand rooted in forest calm. The first product drop sold out in 11 days on launch buzz alone.",
      },
      {
        title: "Himalayan Brew — Café rebrand",
        client: "Himalayan Brew",
        outcome: "+40% footfall",
        summary:
          "A rebrand and signage system for a specialty coffee chain, from logo to cup sleeves. Refreshed identity contributed to a 40% lift in footfall across flagship stores.",
      },
      {
        title: "Nanda Foundation — Annual report & campaign",
        client: "Nanda Foundation",
        outcome: "2× donor engagement",
        summary:
          "An editorial annual report and fundraising campaign identity for a non-profit. The redesign doubled donor engagement with the report over the prior year.",
      },
    ],
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
