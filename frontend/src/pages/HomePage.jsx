import React from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Testimonials from "@/components/site/Testimonials";
import Pricing from "@/components/site/Pricing";
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
      <About />
      <Services />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
