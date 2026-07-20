import { brand, nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ConversationButton } from "@/components/ui/ConversationButton";
import { SmartLink } from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { GrowScene } from "@/components/illustrations/SpotScenes";
import { FooterWhatsAppLink } from "@/components/layout/FooterWhatsAppLink";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";

// Deep-links into the per-service pages (short labels for the column).
// Trailing slash matches the exported canonical URLs (trailingSlash: true) so
// Hostinger serves the page directly with no redirect hop.
const footerServices = [
  { label: "Business Websites", href: "/services/websites/" },
  { label: "Google Profile", href: "/services/google/" },
  { label: "Online Store", href: "/services/store/" },
  { label: "WhatsApp Setup", href: "/services/whatsapp/" },
  { label: "Branding", href: "/services/logo/" },
];

const supportingLinks = [
  { label: "Why Us", href: "/why-us/" },
  { label: "Concepts", href: "/concepts/" },
] as const;

// Only live profiles belong here — a dead social link costs more trust than a
// missing one. Add Facebook / LinkedIn / X back once those accounts exist.
const socials = [
  { label: "Instagram", href: brand.instagram, path: "M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 6.3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm4-6.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM7.5 4.5h9A3 3 0 0 1 19.5 7.5v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Zm0 1.4A1.6 1.6 0 0 0 5.9 7.5v9a1.6 1.6 0 0 0 1.6 1.6h9a1.6 1.6 0 0 0 1.6-1.6v-9A1.6 1.6 0 0 0 16.5 5.9Z" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-bg-inverse text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 [background:radial-gradient(50%_100%_at_70%_0%,rgba(47,91,255,0.18),transparent_70%)]" />
      <div className="container-x relative pt-[var(--section-standard)]">
        {/* Final CTA */}
        <div className="flex flex-col items-start justify-between gap-7 rounded-2xl border border-white/10 bg-white/[0.03] p-[var(--card-pad)] sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <h2 className="max-w-xl font-display text-heading-2 font-semibold text-white">
              Ready to bring more customers to your business?
            </h2>
            <p className="mt-3 max-w-md text-body-lg text-ink-inverse-2">
              Book a free consultation today. No pressure, no jargon — just a clear next step.
            </p>
          </div>
          <GrowScene className="hidden h-auto w-52 shrink-0 xl:block" />
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact/" size="lg" arrow className="w-full sm:w-auto">Get Free Consultation</Button>
            <ConversationButton
              start={{ channel: "whatsapp", type: "consultation", meta: { section: "footer", button: "whatsapp-us" } }}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              className="w-full sm:w-auto"
            >
              WhatsApp us
            </ConversationButton>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(14rem,1.6fr)_1fr_1fr_minmax(13rem,1.2fr)]">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-body-sm text-ink-inverse-2">
              A digital studio helping local businesses across India get online, get found and get more customers.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-inverse-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-label font-semibold uppercase tracking-wider text-ink-inverse-3">Explore</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <SmartLink href={n.href} className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">{n.label}</SmartLink>
                </li>
              ))}
              {supportingLinks.map((n) => (
                <li key={n.href}>
                  <SmartLink href={n.href} className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">{n.label}</SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href="/contact/" className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">Contact Us</SmartLink>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-label font-semibold uppercase tracking-wider text-ink-inverse-3">Services</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <SmartLink href={s.href} className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">{s.label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-label font-semibold uppercase tracking-wider text-ink-inverse-3">Get in touch</h3>
            <ul className="mt-4 flex flex-col gap-3 text-body-sm text-ink-inverse-2">
              <li>
                <FooterWhatsAppLink />
              </li>
              <li>
                <a href={`tel:${brand.phoneHref}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Icon name="phone" size={16} /> {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phoneAltHref}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Icon name="phone" size={16} /> {brand.phoneAltDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Icon name="mail" size={16} /> {brand.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2"><Icon name="pin" size={16} /> {brand.location}</li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-12 select-none border-t border-white/10 pt-7 sm:mt-16 sm:pt-8">
          <p className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] bg-clip-text text-center font-display text-[clamp(4rem,16vw,12rem)] font-semibold leading-none tracking-tight text-transparent">
            LocalRise
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7 text-label text-ink-inverse-3 sm:flex-row">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Icon name="heart" size={13} className="text-accent-bright" /> for local businesses in India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <SmartLink href="/privacy-policy/" className="transition-colors hover:text-white">Privacy</SmartLink>
            <SmartLink href="/terms/" className="transition-colors hover:text-white">Terms</SmartLink>
            <CookiePreferencesButton className="inline-flex min-h-11 items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
