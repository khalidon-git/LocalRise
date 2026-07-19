"use client";

import { useState } from "react";
import { industries } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { startConversation } from "@/lib/communication";

// The only piece of /contact that needs "use client" — the form's state and
// submit handler.
export function ContactForm() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", type: "", message: "" });

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startConversation({
      channel: "whatsapp",
      type: "consultation",
      name: form.name,
      business: form.business,
      businessType: form.type,
      phone: form.phone,
      message: form.message,
      meta: { section: "contact-page", button: "form-submit" },
    });
  }

  const inputClass =
    "w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-body-sm text-ink placeholder:text-ink-4 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10";

  return (
    <div className="p-5 sm:p-8 lg:p-10">
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
        <p className="text-center text-label text-ink-3">
          Opens WhatsApp with your details ready to send. We&apos;ll only use them to help your business.
        </p>
      </form>
    </div>
  );
}

export default ContactForm;
