import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = [
  "E-commerce & D2C",
  "Voice AI",
  "Conversational & Support",
  "Sales & Lead Gen",
  "Marketing & Content",
  "Visual & Multimodal AI",
  "Operations & Back Office",
  "HR & Recruiting",
  "Industry Package",
  "Web / Design",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...form };
      if (!payload.company) delete payload.company;
      if (!payload.interest) delete payload.interest;
      await axios.post(`${API}/contact`, payload);
      setSuccess(true);
      toast.success("Thanks — we'll be in touch shortly.");
      setForm({ name: "", email: "", company: "", interest: "", message: "" });
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail || "Could not send. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Could not send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={SITE.contactSection}
      className="relative bg-[#080808] text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[#e8702a]/10 blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              04 &nbsp;— &nbsp; Start Digging
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.05em] mb-8">
              <span className="font-playfair italic">Let&apos;s ship</span>
              <br />
              <span className="font-normal">your first agent.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-white/70 text-base leading-relaxed max-w-md mb-10">
              Tell us what busywork is stealing your team&apos;s time. We&apos;ll
              scope, design and deploy an agent that behaves like it&apos;s
              always worked there.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <a
                href="mailto:hello@augstudios.ai"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#e8702a] transition-colors group"
              >
                <Mail size={16} className="text-[#e8702a]" />
                hello@augstudios.ai
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
              <a
                href="https://wa.me/15550102025"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#e8702a] transition-colors group"
              >
                <MessageCircle size={16} className="text-[#e8702a]" />
                WhatsApp +1 (555) 010-2025
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={100}>
            {success ? (
              <div
                data-testid={SITE.contactSuccess}
                className="rounded-2xl border border-[#e8702a]/40 bg-[#e8702a]/5 p-10 flex flex-col gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-[#e8702a]/15 border border-[#e8702a]/40 flex items-center justify-center text-[#e8702a]">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="font-playfair italic text-3xl mb-3 tracking-[-0.02em]">
                    Message received.
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-md">
                    Thanks for reaching out. A studio partner will reply within
                    one business day. In the meantime, browse the capability
                    stack above.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm text-[#e8702a] hover:text-white transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                data-testid={SITE.contactForm}
                onSubmit={submit}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name">
                    <input
                      data-testid={SITE.contactName}
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Ada Lovelace"
                      className="input"
                      autoComplete="name"
                      required
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      data-testid={SITE.contactEmail}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@brand.co"
                      className="input"
                      autoComplete="email"
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Company">
                    <input
                      data-testid={SITE.contactCompany}
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      placeholder="Optional"
                      className="input"
                    />
                  </Field>
                  <Field label="I&apos;m interested in">
                    <select
                      data-testid={SITE.contactInterest}
                      name="interest"
                      value={form.interest}
                      onChange={onChange}
                      className="input appearance-none pr-10"
                    >
                      <option value="">Pick a capability</option>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="What should we automate?">
                  <textarea
                    data-testid={SITE.contactMessage}
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="Tell us about the workflow, tools, and volume you'd like to hand off."
                    className="input resize-none"
                    required
                  />
                </Field>

                <button
                  data-testid={SITE.contactSubmit}
                  type="submit"
                  disabled={submitting}
                  className="mt-2 self-start bg-[#e8702a] hover:bg-[#d2611f] disabled:opacity-70 text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send request <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color .2s, background .2s;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus {
          border-color: rgba(232,112,42,0.6);
          background: rgba(255,255,255,0.05);
        }
        select.input option { background: #0a0a0a; color: #fff; }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] uppercase tracking-[0.22em] text-white/50"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {children}
    </label>
  );
}
