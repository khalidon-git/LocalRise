import { brand, nav } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";

const socials = [
  { label: "Instagram", href: "https://instagram.com/localrise", path: "M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 6.3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm4-6.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM7.5 4.5h9A3 3 0 0 1 19.5 7.5v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Zm0 1.4A1.6 1.6 0 0 0 5.9 7.5v9a1.6 1.6 0 0 0 1.6 1.6h9a1.6 1.6 0 0 0 1.6-1.6v-9A1.6 1.6 0 0 0 16.5 5.9Z" },
  { label: "Facebook", href: "https://facebook.com/localrise", path: "M13.5 21v-7.3h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2v2.8h2.5V21h2.8Z" },
  { label: "LinkedIn", href: "https://linkedin.com/company/localrise", path: "M7.2 9.3H4.6V19h2.6V9.3ZM5.9 5A1.5 1.5 0 1 0 5.9 8 1.5 1.5 0 0 0 5.9 5ZM19.4 19v-5.6c0-2.7-1.4-3.9-3.4-3.9a2.9 2.9 0 0 0-2.6 1.4V9.3H10.8V19h2.6v-5.1c0-1.3.5-2.1 1.6-2.1s1.6.8 1.6 2.1V19h2.8Z" },
  { label: "X", href: "https://x.com/localrise", path: "M17.5 4.5h2.4l-5.3 6 6.2 8.9h-4.9l-3.8-5.5-4.4 5.5H5.3l5.6-6.4L5 4.5h5l3.4 5 4.1-5Zm-.9 13 1.4.1L8.4 5.9H6.9l9.7 11.6Z" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-bg-inverse text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 [background:radial-gradient(50%_100%_at_70%_0%,rgba(47,91,255,0.18),transparent_70%)]" />
      <div className="container-x relative pt-20">
        {/* Final CTA */}
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div>
            <h2 className="max-w-xl font-display text-heading-2 font-semibold text-white">
              Ready to bring more customers to your business?
            </h2>
            <p className="mt-3 max-w-md text-body-lg text-ink-inverse-2">
              Book a free consultation today. No pressure, no jargon — just a clear next step.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg" arrow>Get Free Consultation</Button>
            <Button href={`https://wa.me/${brand.whatsappHref}`} variant="whatsapp" size="lg" icon="whatsapp">
              WhatsApp us
            </Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
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
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-ink-inverse-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
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
                  <a href={n.href} className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-label font-semibold uppercase tracking-wider text-ink-inverse-3">Services</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {["Business Websites", "Google Profile", "Online Store", "WhatsApp Setup", "Branding"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-body-sm text-ink-inverse-2 transition-colors hover:text-white">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-label font-semibold uppercase tracking-wider text-ink-inverse-3">Get in touch</h3>
            <ul className="mt-4 flex flex-col gap-3 text-body-sm text-ink-inverse-2">
              <li>
                <a href={`https://wa.me/${brand.whatsappHref}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Icon name="whatsapp" size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phoneHref}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <Icon name="phone" size={16} /> {brand.phoneDisplay}
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
        <div className="mt-16 select-none border-t border-white/10 pt-8">
          <p className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] bg-clip-text text-center font-display text-[16vw] font-semibold leading-none tracking-tight text-transparent lg:text-[13rem]">
            LocalRise
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-[13px] text-ink-inverse-3 sm:flex-row">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Icon name="heart" size={13} className="text-accent-bright" /> for local businesses in India
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
