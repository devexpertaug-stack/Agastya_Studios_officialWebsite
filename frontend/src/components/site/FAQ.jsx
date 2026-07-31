import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What does Agastya Studios actually do?",
    a: "We design, build and run the digital layer behind modern businesses — AI agents (chat, voice, lead-gen), websites and storefronts, and brand/graphic design. Most projects blend all three, because leverage compounds when they're built together.",
  },
  {
    q: "Do you only build AI agents, or full websites too?",
    a: "Both. Every capability ships with a web-development layer — a marketing site, storefront, or dashboard — so the agent has a beautiful, fast place to live. We also take on pure web and design projects.",
  },
  {
    q: "How long does a typical project take?",
    a: "A single agent or a focused website usually ships in about two weeks. A larger multi-agent build with a custom site runs three to six weeks, with weekly reviews so you're never surprised.",
  },
  {
    q: "What does it cost?",
    a: "Every quote is bespoke — your context shapes the number more than a price tag could. We share pricing after a free 30-minute scoping call. Engagements start from a single-agent build and scale to a full studio retainer.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "We're rooted in Garhwal, Uttarakhand, and work with clients everywhere. Most collaboration happens over calls and a very human WhatsApp line.",
  },
  {
    q: "Do you maintain things after launch?",
    a: "Yes. Every build includes a care window, and most clients stay on a light retainer for tuning, monitoring and the occasional new agent as they grow.",
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-[#0a1810] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
            06 — Questions
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.92]">
            Good to <span className="text-lime">know.</span>
          </h2>
          <p className="mt-6 text-[var(--bone-100)]/70 leading-relaxed max-w-sm">
            Can't find what you're looking for? Ask Rishi in the corner, or start
            a conversation with us directly.
          </p>
          <button onClick={() => scrollToId("contact")} className="btn-pill magnetic mt-8">
            Talk to us
          </button>
        </div>

        <div className="md:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[rgba(240,234,214,0.12)]"
              >
                <AccordionTrigger className="py-6 text-lg md:text-xl font-medium text-[var(--bone-100)] hover:no-underline hover:text-[var(--lime-400)] [&>svg]:text-[var(--lime-400)] [&>svg]:h-5 [&>svg]:w-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-6 text-[15px] leading-relaxed text-[var(--bone-100)]/70">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
