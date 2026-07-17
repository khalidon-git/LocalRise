"use client";

import { useState } from "react";
import { brand, industries } from "@/lib/data";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ConsultScene } from "@/components/illustrations/SpotScenes";

const methods: { icon: IconName; label: string; value: string; href: string; grad: string }[] = [
  { icon: "whatsapp", label: "WhatsApp", value: "Chat with us instantly", href: `https://wa.me/${brand.whatsappHref}`, grad: "from-[#25D366] to-[#4ADE9E]" },
  { icon: "phone", label: "Call us", value: brand.phoneDisplay, href: `tel:${brand.phoneHref}`, grad: "from-[#2f5bff] to-[#5b84ff]" },
  { icon: "phone", label: "Or call us", value: brand.phoneAltDisplay, href: `tel:${brand.phoneAltHref}`, grad: "from-[#06b6d4] to-[#22d3ee]" },
  { icon: "mail", label: "Email", value: brand.email, href: `mailto:${brand.email}`, grad: "from-[#9b5bff] to-[#c79bff]" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", type: "", message: "" });

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Hi LocalRise! I'd like a free consultation.`,
      ``,
      `Name: ${form.name}`,
      form.business && `Business: ${form.business}`,
      form.type && `Type: ${form.type}`,
      form.phone && `Phone: ${form.phone}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${brand.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-body-sm text-ink placeholder:text-ink-4 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10";

  return (
    <section id="contact" className="section-pad">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-bg-subtle shadow-lg">
          <div className="grid lg:grid-cols-2">
            {/* Left: info */}
            <div className="relative border-b border-line p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative">
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  Get started
                </span>
                <h2 className="mt-4 font-display text-heading-2 font-semibold text-ink">
                  Let&apos;s grow your business
                </h2>
                <p className="mt-3 max-w-md text-body-lg text-ink-2">
                  Tell us a little about your business and we&apos;ll get back with a clear plan — free, no obligation.
                </p>

                <ConsultScene className="mt-6 hidden h-auto w-full max-w-[300px] sm:block" />

                <div className="mt-8 flex flex-col gap-3">
                  {methods.map((m) => (
                    <a
                      key={m.label}
                      href={m.href}
                      target={m.icon === "whatsapp" ? "_blank" : undefined}
                      rel={m.icon === "whatsapp" ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm ${m.grad}`}>
                        <Icon name={m.icon} size={20} strokeWidth={1.8} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-body-sm font-semibold text-ink">{m.label}</span>
                        <span className="block text-[13px] text-ink-2">{m.value}</span>
                      </span>
                      <Icon name="arrow-up-right" size={18} className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-white p-4">
                    <span className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink">
                      <Icon name="clock" size={16} className="text-accent" /> Business hours
                    </span>
                    <p className="mt-1.5 text-[13px] text-ink-2">Mon–Sat · 10am – 7pm</p>
                    <p className="text-[13px] text-ink-3">WhatsApp us anytime</p>
                  </div>
                  <a
                    href="https://calendly.com/localrise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink">
                      <Icon name="calendar" size={16} className="text-accent" /> Schedule a meeting
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-accent">
                      Pick a time <Icon name="arrow-right" size={13} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 sm:p-10 lg:p-12">
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-label font-medium text-ink-2">Your name *</span>
                    <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Rahul Sharma" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-label font-medium text-ink-2">Business name</span>
                    <input value={form.business} onChange={(e) => update("business", e.target.value)} placeholder="e.g. Sharma Sweets" className={inputClass} />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-label font-medium text-ink-2">Phone / WhatsApp *</span>
                    <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" placeholder="+91 90000 00000" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-label font-medium text-ink-2">Business type</span>
                    <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputClass}>
                      <option value="">Select…</option>
                      {industries.map((i) => (
                        <option key={i.name} value={i.name}>{i.name}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-label font-medium text-ink-2">What do you need? (optional)</span>
                  <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} placeholder="A new website, Google listing, WhatsApp setup…" className={`${inputClass} resize-none`} />
                </label>

                <Button type="submit" size="lg" icon="whatsapp" className="mt-1 w-full">
                  Get my free consultation
                </Button>
                <p className="text-center text-[12px] text-ink-3">
                  Opens WhatsApp with your details ready to send. We&apos;ll only use them to help your business.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
