import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { SITE } from "@/constants/testIds/site";
import { api } from "@/lib/api";

const INTERESTS = [
  "E-commerce & D2C",
  "Voice AI",
  "Conversational & Support",
  "Sales & Lead Gen",
  "Marketing & Content",
  "Visual & Multimodal AI",
  "Operations & Back Office",
  "HR & Recruiting",
  "Web Development",
  "Graphic Design",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("/settings").then((r) => setSettings(r.data)).catch(() => {});
  }, []);

  const email = settings?.contact_email || "devexpertaug@gmail.com";
  const whatsapp = settings?.contact_whatsapp || "+917906411716";
  const waNum = whatsapp.replace(/[^0-9]/g, "");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
      await api.post("/contact", payload);
      setSuccess(true);
      toast.success("Received. A studio partner will reply within a day.");
      setForm({ name: "", email: "", company: "", interest: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={SITE.contactSection}
      className="relative bg-[#0a1810] text-[var(--bone-100)] py-28 md:py-40 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[var(--dawn-500)]/10 blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--mist)] mb-6">
              06 &nbsp;— &nbsp; Come sit by the fire
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.04em] mb-8">
              <span className="font-serif-italic">Let&apos;s ship</span>
              <br />
              <span className="font-normal">your first agent.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-[var(--bone-100)]/70 text-base leading-relaxed max-w-md mb-10">
              Tell us the busywork stealing your team&apos;s time. We&apos;ll
              scope, design and deploy an agent that behaves like it&apos;s
              always worked there.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col gap-4 pt-6 border-t border-[rgba(168,192,144,0.15)]">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm text-[var(--bone-100)]/85 hover:text-[var(--dawn-500)] transition-colors group"
              >
                <Mail size={16} className="text-[var(--dawn-500)]" />
                {email}
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </a>
              <a
                href={`https://wa.me/${waNum}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--bone-100)]/85 hover:text-[var(--dawn-500)] transition-colors group"
              >
                <MessageCircle size={16} className="text-[var(--dawn-500)]" />
                WhatsApp {whatsapp}
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
                className="rounded-2xl border border-[var(--dawn-500)]/40 bg-[var(--dawn-500)]/5 p-10 flex flex-col gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--dawn-500)]/15 border border-[var(--dawn-500)]/40 flex items-center justify-center text-[var(--dawn-500)]">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="font-serif-italic text-3xl mb-3 tracking-[-0.02em]">
                    Message received.
                  </h3>
                  <p className="text-[var(--bone-100)]/75 text-sm leading-relaxed max-w-md">
                    Thanks for reaching out. A studio partner will reply within
                    a day. Meanwhile — feel free to ask our chat concierge
                    anything (bottom-right).
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-sm text-[var(--dawn-500)] hover:text-[var(--bone-100)] transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                data-testid={SITE.contactForm}
                onSubmit={submit}
                className="rounded-2xl border border-[rgba(168,192,144,0.15)] bg-[rgba(255,255,255,0.02)] p-6 md:p-10 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name">
                    <input
                      data-testid={SITE.contactName}
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Ada Devi"
                      className="field-input"
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
                      className="field-input"
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
                      className="field-input"
                    />
                  </Field>
                  <Field label="I&apos;m interested in">
                    <select
                      data-testid={SITE.contactInterest}
                      name="interest"
                      value={form.interest}
                      onChange={onChange}
                      className="field-input appearance-none pr-10"
                    >
                      <option value="">Pick a capability</option>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>{i}</option>
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
                    className="field-input resize-none"
                    required
                  />
                </Field>

                <button
                  data-testid={SITE.contactSubmit}
                  type="submit"
                  disabled={submitting}
                  className="mt-2 self-start btn-forest disabled:opacity-70 flex items-center gap-2"
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
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] uppercase tracking-[0.24em] text-[var(--mist)]"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      {children}
    </label>
  );
}
