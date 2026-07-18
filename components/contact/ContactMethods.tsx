import { brand } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ConsultScene } from "@/components/illustrations/SpotScenes";
import { ContactWhatsAppCard } from "@/components/contact/ContactWhatsAppCard";

// Contact methods, business hours and the schedule-a-meeting card. Pure
// markup — no state — so unlike ContactForm this stays a server component.
// WhatsApp is rendered separately via ContactWhatsAppCard (needs an onClick,
// see that file); Call/Email stay plain links here.
const methods: { icon: IconName; label: string; value: string; href: string; grad: string }[] = [
  { icon: "phone", label: "Call us", value: brand.phoneDisplay, href: `tel:${brand.phoneHref}`, grad: "from-[#2f5bff] to-[#5b84ff]" },
  { icon: "phone", label: "Or call us", value: brand.phoneAltDisplay, href: `tel:${brand.phoneAltHref}`, grad: "from-[#06b6d4] to-[#22d3ee]" },
  { icon: "mail", label: "Email", value: brand.email, href: `mailto:${brand.email}`, grad: "from-[#9b5bff] to-[#c79bff]" },
];

export function ContactMethods() {
  return (
    <div className="relative border-b border-line p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        <ConsultScene className="hidden h-auto w-full max-w-[300px] sm:block" />

        <div className="mt-6 flex flex-col gap-3">
          <ContactWhatsAppCard />
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
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
  );
}

export default ContactMethods;
