# Lithos × Aug Studios — PRD

## Original Problem Statement
Build a website that includes all the services from the Aug Studios brochure PDF plus an "about me" section. Hero must be a full-screen, dark, cursor-following spotlight reveal (Lithos geology), matching the exact spec: two-line Playfair italic + sans headings, base image + reveal image via canvas radial-gradient mask, fixed pill nav, orange Start Digging CTA, staggered hero animations.

## Architecture
- Frontend: React 19 + CRA + Tailwind + shadcn/ui + lucide-react + sonner
- Backend: FastAPI + Motor (MongoDB)
- Sections: Hero → About → Services (10 capability categories) → Industry Packages (4) → Contact form → Footer

## Implemented (Dec 2025)
- Cursor-following spotlight reveal hero exactly per spec (BG_IMAGE_1/2, SPOTLIGHT_R=260, RAF lerp smoothing 0.1, canvas radial gradient mask)
- Fixed nav (logo, pill: Course/Field Guides/Geology/Plans/Live Tour, Sign Up)
- Staggered hero animations (hero-reveal 0.25/0.42s, hero-fade 0.7/0.85s, hero-zoom Ken Burns)
- About section (studio bio, 24/7 / 10+ / Design-led stats)
- Services grid: 10 capability categories from PDF with lucide icons
- Industry Packages: Real Estate, Healthcare, Restaurants, Salons
- Contact form → POST /api/contact → MongoDB `contact_requests`
- Footer with brand, links, socials
- Reveal-on-scroll observer + sonner toasts + full data-testid coverage

## Backlog (P1/P2)
- Case studies / testimonials section
- Pricing / packages tier detail
- Blog / journal
- Real email delivery (Resend) for contact submissions
- CMS-driven services list

## Iteration 2 — Rebrand & Expansion (Dec 2025)
- Rebrand: Lithos → **Agastya Studios** (Uttarakhand/Himalayan-forest identity)
- Theme: dark orange → **deep forest greens + Himalayan dawn amber** with Cormorant Garamond italic + Inter
- Removed all geology copy; hero content now forest/Uttarakhand-themed while keeping the cursor-spotlight reveal mechanic (misty pine forest → sunlit forest reveal)
- New pages/routes:
  - `/` HomePage with Nav + Hero + About + Services + Testimonials + Work + Pricing + Contact + Footer
  - `/services/:slug` ServiceDetail — features, workflow, web-development layer, testimonial + case-study, related capabilities
  - `/login` Admin login
  - `/admin` Admin dashboard (Projects + About/Contact settings)
- Testimonials + Case Studies sections
- Pricing (Seed / Grove / Forest tiers)
- Chatbot floating widget powered by Claude Sonnet 4.5 via Emergent Universal Key (session-persistent in Mongo)
- Backend:
  - JWT auth (bcrypt), seeded admin (`admin@agastyastudios.com`), `Authorization: Bearer` scheme
  - CRUD `/api/projects` (base64 images in Mongo)
  - `/api/settings` for founder photo/bio + contact info (base64 photo upload)
  - `/api/chat` streaming to Claude via emergentintegrations, session history in Mongo
- Parallax base image + ridge silhouette in hero, scroll-reveal everywhere, hover states on every interactive
- Contact: **devexpertaug@gmail.com**, **+91 7906411716**

### Known / Ops
- **Emergent LLM key balance is 0** — chat endpoint returns a graceful "chat offline while studio tops up credits" message. Ask user to top up Universal Key at Profile → Universal Key → Add Balance.

### Backlog
- Streaming SSE for chatbot (currently non-streaming with typing dots)
- Case-study detail pages (individual `/work/:slug`)
- Blog / journal
- Public projects filter by sector on `/work`
- Resend email delivery for contact form
