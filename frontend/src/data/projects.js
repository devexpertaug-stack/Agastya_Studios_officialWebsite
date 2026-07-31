// Static mirror of the real client projects (kept in sync with backend SEED_PROJECTS).
// Used as a fallback so the site shows real work even before the backend/API is
// connected. When the backend IS reachable, live data from /api/projects wins.

export const REAL_PROJECTS = [
  {
    id: "web-development-portfolio",
    title: "Web Development — sites that do the selling",
    sector: "Web Development",
    summary:
      "Fast, hand-built marketing sites, storefronts and dashboards — each shipped with at least one AI touch wired in.",
    outcome: "Our home turf",
    client_name: "Agastya Studios",
    description:
      "Web development is where the studio started and where everything else plugs in. We design and build marketing sites, headless storefronts, booking flows and custom dashboards — on React/Next.js, Shopify, or Wix when it fits the client. Every build ships with performance budgets, accessible components, and a taste for restraint, plus a small AI touch (a concierge, a lead capture agent, a smart search) so the site works even when you're asleep.",
    image_data_url:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "kk-lee",
    title: "KK LEE — a home for handcrafted leather",
    sector: "E-commerce & D2C",
    summary:
      "A quiet, editorial storefront for a made-to-order leather footwear house — built to let the craft speak.",
    outcome: "Live at kklee.in",
    client_name: "KK LEE",
    liveUrl: "https://www.kklee.in/",
    description:
      "KK LEE is a leather-goods house that makes footwear and accessories slowly, in small batches, one pair at a time. We designed and built an editorial storefront that leads with the craft: a made-to-order journey, the 'Crafted for Him' and 'Crafted for Her' collections, and a short journal on materials and making. The layout leaves room to breathe so the product photography carries the story.",
    image_data_url:
      "https://static.wixstatic.com/media/d2d0db_20c0eb8601a743a19f529ed7b32af660~mv2.jpeg/v1/fill/w_1200,h_1600,al_c,q_85/kklee.jpeg",
  },
  {
    id: "maruti-complete-eye-care",
    title: "Maruti Complete Eye Care — Dehradun",
    sector: "Web Development",
    summary:
      "A warm, trustworthy clinic site for a Dehradun eye-care practice specialising in children's vision.",
    outcome: "Live at maruticompleteeyecare.com",
    client_name: "Dr. Swati Uniyal, Dehradun",
    liveUrl: "https://maruticompleteeyecare.com",
    description:
      "Maruti Complete Eye Care is a Dehradun practice led by Dr. Swati Uniyal, focused on pediatric eye care, vision therapy and neuro-vision rehabilitation. The brief was reassurance first: plain-language explanations of each therapy, an approachable tone, and an obvious way to book. We built a calm, mobile-first site that puts the doctor and her services front and centre — a home-turf project, a short drive from the studio.",
    image_data_url: "https://maruticompleteeyecare.com/DoctorSwati.jpeg",
  },
  {
    id: "mimaansa",
    title: "Mimaansa — ethical sourcing, told honestly",
    sector: "Web Development",
    summary:
      "A B2B site for an India-based ethical sourcing and export partner working with global brands.",
    outcome: "Live at mimaansa.com",
    client_name: "Mimaansa",
    liveUrl: "https://mimaansa.com/",
    description:
      "Mimaansa is an India-based sourcing agency and export partner for apparel, home furnishings, fabrics and lifestyle accessories. The site had to earn trust from buyers who've never met the team, so we built it around credibility: a clear five-step sourcing process, the full set of services, and the ethics underneath it all. It reads like 'your on-ground team in India' — professional, transparent, and easy to enquire through.",
    image_data_url:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "saluja-realtors",
    title: "Saluja Realtors — property, without the noise",
    sector: "Web Development",
    summary:
      "A clean brokerage site that turns property browsing into simple, direct enquiries.",
    outcome: "Real-estate brokerage site",
    client_name: "Saluja Realtors",
    description:
      "Saluja Realtors is a property brokerage that needed a website to match how they actually work — personal, responsive and no-nonsense. We built a straightforward site that presents listings clearly, makes it effortless to enquire, and behaves well on a phone, where most property browsing really happens. A credible online front door that lets the team spend time on conversations instead of chasing cold leads.",
    image_data_url:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "google-maps-lead-scraper",
    title: "Google Maps Lead Scraper — leads on tap",
    sector: "Sales & Lead Gen",
    summary:
      "An in-house Python + Selenium tool that turns any Google Maps search into a clean, deduped lead list, exported straight to Google Sheets.",
    outcome: "In-house lead-generation tool",
    client_name: "Agastya Studios — in-house tool",
    description:
      "Cold outreach usually starts with the same tedious chore: hunting down businesses one Google Maps pin at a time. So we built a scraper that does it in the background. Give it a search term and a location and it walks the Maps results, pulls each listing's name, phone, website, rating and address, removes duplicates, and drops a tidy sheet into Google Sheets ready for outreach. Built with Python and Selenium with polite rate-limiting and resume-on-failure.",
    image_data_url:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85&auto=format&fit=crop",
  },
];

export const getRealProject = (id) => REAL_PROJECTS.find((p) => p.id === id) || null;
