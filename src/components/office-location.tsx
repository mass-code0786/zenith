import { Globe2, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  callLink,
  callingDisplay,
  marketPresence,
  officeAddressLines,
  whatsappDisplay,
  whatsappLink,
} from "@/lib/contact";

export function OfficeLocationCard({ compact = false }: { compact?: boolean }) {
  return (
    <article
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/25 ${
        compact ? "p-5" : "p-6 sm:p-7"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/10 text-blue-100">
          <MapPin className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">Office Address</h3>
          <address className="mt-3 not-italic text-sm leading-7 text-slate-300">
            {officeAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            {marketPresence}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ContactCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <OfficeLocationCard />
      <a
        href={callLink}
        className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 transition hover:border-blue-300/35 hover:bg-white/[0.065]"
      >
        <span className="flex size-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/10 text-blue-100">
          <Phone className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">Call Us</h3>
        <p className="mt-3 text-sm text-slate-300">{callingDisplay}</p>
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/25 transition hover:border-emerald-300/35 hover:bg-white/[0.065]"
      >
        <span className="flex size-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
          <MessageCircle className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">WhatsApp</h3>
        <p className="mt-3 text-sm text-slate-300">{whatsappDisplay}</p>
      </a>
    </div>
  );
}

export function OfficeMapSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-stretch lg:gap-6">
        <div className="space-y-4 lg:space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
            Location
          </p>
          <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl">
            Visit Our Office
          </h2>
          <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Zenith Softech operates from Supaul, Bihar, while serving clients
            across India and international markets.
          </p>
          <OfficeLocationCard compact />
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] shadow-2xl shadow-black/30 sm:min-h-[24rem] lg:aspect-auto">
          <div className="absolute inset-0 opacity-30 enterprise-grid" />
          <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/15 text-blue-100 shadow-[0_0_80px_rgba(0,102,255,0.26)]">
            <MapPin className="size-9" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-[1.25rem] border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <Globe2 className="mt-1 size-5 shrink-0 text-blue-200" />
              <div>
                <p className="font-semibold text-white">Zenith Softech Head Office</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Near Bus Stand, Supaul, Bihar, India - 852130
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {marketPresence}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
