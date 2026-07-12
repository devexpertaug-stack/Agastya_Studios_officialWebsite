import {
  ShoppingBag,
  PhoneCall,
  MessageSquare,
  Target,
  Megaphone,
  Sparkles,
  Cog,
  Users,
  Layout,
  PenTool,
  Home,
  Stethoscope,
  UtensilsCrossed,
  Scissors,
} from "lucide-react";

export const SERVICE_CATEGORIES = [
  {
    slug: "ecommerce",
    number: "04",
    title: "E-commerce & D2C",
    icon: ShoppingBag,
    blurb:
      "Recover carts, style customers, and merchandise in real time — with agents that speak in your brand voice.",
    items: [
      "Cart Recovery Agent",
      "AI Stylist / Virtual Try-On",
      "Photo-Based Style Advisor",
      "Product Recommendation Engine",
      "Dynamic Pricing Agent",
      "Review & UGC Collection",
      "Restock / Inventory Alerts",
    ],
  },
  {
    slug: "voice",
    number: "05",
    title: "Voice AI",
    icon: PhoneCall,
    blurb:
      "Human-sounding voice agents that answer, qualify and follow up — day or night.",
    items: [
      "AI Receptionist / Call Answering",
      "Outbound Voice Agent",
      "WhatsApp / Instagram Voice-Reply",
    ],
  },
  {
    slug: "conversational",
    number: "06",
    title: "Conversational & Support",
    icon: MessageSquare,
    blurb:
      "Live chat, DMs, and multilingual support that reads like your best rep on their best day.",
    items: [
      "Website Live Chat Agent",
      "Multilingual Support Agent",
      "WhatsApp / Instagram DM Agent",
    ],
  },
  {
    slug: "sales",
    number: "07",
    title: "Sales & Lead Gen",
    icon: Target,
    blurb:
      "Qualify, book, follow up and update the CRM automatically — so reps only touch warm pipeline.",
    items: [
      "Lead Qualification Bot",
      "Appointment / Demo Booking",
      "Nurture / Follow-up Agent",
      "CRM Auto-Updater",
    ],
  },
  {
    slug: "marketing",
    number: "08",
    title: "Marketing & Content",
    icon: Megaphone,
    blurb:
      "Ship on-brand captions, ad variants and lifecycle campaigns at a pace your team can't match alone.",
    items: [
      "Social Caption Generator",
      "Ad Creative Testing Agent",
      "Email / SMS Campaign Agent",
    ],
  },
  {
    slug: "visual",
    number: "09",
    title: "Visual & Multimodal AI",
    icon: Sparkles,
    blurb:
      "Turn a phone photo into a try-on, a room preview, or a full product shoot — instantly.",
    items: [
      "Virtual Try-On",
      "How Would This Look in My Space",
      "AI Product Photography",
      "Before / After Visualizer",
    ],
  },
  {
    slug: "operations",
    number: "10",
    title: "Operations & Back Office",
    icon: Cog,
    blurb:
      "Paperwork, scheduling, reporting and reconciliation — quietly handled in the background.",
    items: [
      "Document Processing",
      "Scheduling Agent",
      "Reporting Agent",
      "Finance / Reconciliation",
    ],
  },
  {
    slug: "hr",
    number: "11",
    title: "HR & Recruiting",
    icon: Users,
    blurb:
      "Screen, schedule and coordinate candidates without losing the human touch.",
    items: ["Resume Screening", "Interview Scheduling"],
  },
  {
    slug: "web",
    number: "13",
    title: "Web Development",
    icon: Layout,
    blurb:
      "Portfolio, showcase and commerce sites built as beautifully as our agents behave.",
    items: ["Portfolio Websites", "Showcase Websites", "E-commerce Stores"],
  },
  {
    slug: "design",
    number: "14",
    title: "Graphic Design",
    icon: PenTool,
    blurb:
      "Brand identity, campaign creative and collateral — because automation deserves great design.",
    items: ["Brand Identity", "Campaign Creative", "Collateral"],
  },
];

export const INDUSTRY_PACKAGES = [
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: Home,
    items: ["Lead capture", "Property matching", "Viewing scheduler"],
  },
  {
    slug: "healthcare",
    title: "Healthcare / Clinics",
    icon: Stethoscope,
    items: ["Appointment booking", "Reminders", "Intake form collection"],
  },
  {
    slug: "restaurants",
    title: "Restaurants / Hospitality",
    icon: UtensilsCrossed,
    items: ["Reservation bot", "Order-taking bot", "Concierge WhatsApp"],
  },
  {
    slug: "salons",
    title: "Salons / Spas",
    icon: Scissors,
    items: ["Booking", "Personalized recommendations", "Retention flows"],
  },
];
