import React from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import WorkScroll from "@/components/site/WorkScroll";
import About from "@/components/site/About";
import Testimonials from "@/components/site/Testimonials";
import Pricing from "@/components/site/Pricing";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-[#06110b] text-[var(--bone-100)] tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Nav />
      <Hero />
      <FeatureShowcase />
      <WorkScroll />
      <About />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
