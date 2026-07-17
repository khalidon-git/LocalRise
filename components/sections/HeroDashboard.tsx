"use client";

import { motion, type Variants } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

const ease = [0.22, 1, 0.36, 1] as const;

const pop: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease, delay: 0.35 + i * 0.13 },
  }),
};

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#FFB020]">
      {Array.from({ length: n }).map((_, i) => (
        <Icon key={i} name="star" size={12} strokeWidth={0} className="fill-current" />
      ))}
    </span>
  );
}

export function HeroDashboard() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[520px] sm:h-[520px] lg:h-[560px]">
      <div className="absolute left-1/2 top-0 h-[560px] w-[520px] origin-top -translate-x-1/2 scale-[0.72] sm:scale-90 lg:scale-100">
        {/* soft accent glow behind */}
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[90px]" />

        {/* Main browser / website preview */}
        <motion.div custom={0} variants={pop} initial="hidden" animate="show" className="absolute left-[26px] top-[76px] w-[372px]">
          <div className="animate-float-soft">
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-float">
              <div className="flex items-center gap-2 border-b border-line bg-bg-subtle px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[11px] text-ink-3 ring-1 ring-line">
                  sweetcravings.in
                </span>
              </div>
              <div className="p-4">
                <div className="relative flex h-28 items-end overflow-hidden rounded-xl bg-gradient-to-br from-accent to-accent-bright p-4">
                  <div className="noise absolute inset-0 opacity-[0.15]" />
                  <div className="relative">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-white/80">Fresh daily</p>
                    <p className="font-display text-lg font-semibold leading-tight text-white">Sweet Cravings<br />Bakery</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="space-y-1.5">
                    <div className="h-2 w-24 rounded-full bg-ink/10" />
                    <div className="h-2 w-16 rounded-full bg-ink/5" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-[11px] font-semibold text-[#06240f]">
                    <Icon name="whatsapp" size={13} /> Order
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["from-[#ffd9a0] to-[#ffb865]", "from-[#f5b9c6] to-[#ec8298]", "from-[#c7b3ff] to-[#9b7bff]"].map((g, i) => (
                    <div key={i} className={`h-12 rounded-lg bg-gradient-to-br ${g}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Google Business profile card */}
        <motion.div custom={1} variants={pop} initial="hidden" animate="show" className="absolute right-[2px] top-[8px] w-[236px]">
          <div className="animate-float-slow">
            <div className="rounded-2xl border border-line bg-white/95 p-3.5 shadow-lg backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent">
                  <Icon name="pin" size={20} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">Sweet Cravings Bakery</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-ink">4.9</span>
                    <Stars />
                    <span className="text-[11px] text-ink-3">(128)</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ink-3">
                    <span className="inline-flex items-center gap-1 font-medium text-[#12b981]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#12b981]" /> Open
                    </span>
                    <span>·</span> <span>2.1 km · Bakery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp chat card */}
        <motion.div custom={2} variants={pop} initial="hidden" animate="show" className="absolute bottom-[76px] left-[0px] w-[248px]">
          <div className="animate-float-slow [animation-delay:1.2s]">
            <div className="rounded-2xl border border-line bg-white p-3 shadow-lg">
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25D366] text-[#06240f]">
                  <Icon name="whatsapp" size={13} />
                </span>
                <span className="text-[11px] font-semibold text-ink">WhatsApp</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-[#25D366]" />
              </div>
              <div className="space-y-1.5">
                <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-bg-muted px-3 py-1.5 text-[11px] text-ink-2">
                  Do you deliver to Andheri? 🙌
                </div>
                <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-[#DCFCE7] px-3 py-1.5 text-[11px] text-[#0b3d1e]">
                  Yes! Free above ₹499. Shall I share the menu?
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics card */}
        <motion.div custom={3} variants={pop} initial="hidden" animate="show" className="absolute bottom-[8px] right-[6px] w-[212px]">
          <div className="animate-float-soft [animation-delay:0.6s]">
            <div className="rounded-2xl border border-line bg-white p-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-ink-3">Visitors this month</p>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-[#e7f8ef] px-1.5 py-0.5 text-[10px] font-semibold text-[#12b981]">
                  <Icon name="arrow-up-right" size={10} strokeWidth={2.4} /> 128%
                </span>
              </div>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">3,248</p>
              <div className="mt-2 flex h-10 items-end gap-1">
                {[35, 50, 42, 65, 58, 78, 70, 92, 84, 100].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-accent/30 to-accent"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* New review pill */}
        <motion.div custom={4} variants={pop} initial="hidden" animate="show" className="absolute right-[26px] top-[212px]">
          <div className="animate-float-soft [animation-delay:1.6s]">
            <div className="flex items-center gap-2 rounded-full border border-line bg-white/95 px-3 py-2 shadow-md backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FFF3D6] text-[#FFB020]">
                <Icon name="star" size={13} strokeWidth={0} className="fill-current" />
              </span>
              <span className="text-[11px] font-semibold text-ink">+3 new 5-star reviews</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroDashboard;
