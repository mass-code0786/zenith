import Link from "next/link";
import { CalendarCheck, Globe2, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import {
  callLink,
  callingDisplay,
  marketPresence,
  whatsappDisplay,
  whatsappLink,
} from "@/lib/contact";
import { MotionShell } from "@/components/motion-shell";

const contactItems = [
  {
    label: "Supaul, Bihar, India - 852130",
    icon: MapPin,
  },
  {
    label: callingDisplay,
    icon: PhoneCall,
    href: callLink,
  },
  {
    label: whatsappDisplay,
    icon: MessageCircle,
    href: whatsappLink,
    external: true,
  },
  {
    label: marketPresence,
    icon: Globe2,
  },
];

export function PremiumContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-32">
      <div className="contact-grid-bg absolute inset-0 opacity-40" />
      <div className="contact-orb contact-orb-one" />
      <div className="contact-orb contact-orb-two" />
      <svg
        className="contact-wave absolute inset-x-[-20%] top-6 h-44 w-[140%] lg:top-12 lg:h-72"
        viewBox="0 0 1200 260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="contactWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9945ff" stopOpacity="0" />
            <stop offset="35%" stopColor="#9945ff" />
            <stop offset="58%" stopColor="#14f195" />
            <stop offset="82%" stopColor="#00c2ff" />
            <stop offset="100%" stopColor="#00c2ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-80 178C110 54 230 248 405 126S707 47 885 137S1124 195 1280 72"
          fill="none"
          stroke="url(#contactWaveGradient)"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M-120 215C104 94 265 268 465 170S780 88 940 188S1160 232 1310 116"
          fill="none"
          stroke="url(#contactWaveGradient)"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.45"
        />
      </svg>
      <div className="contact-particles absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ "--i": index } as React.CSSProperties} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <MotionShell className="max-w-5xl">
          <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[0.9]">
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8 lg:mt-7">
            Talk with Zenith Softech about your software, AI, automation, ERP,
            CRM, mobile app, blockchain, or enterprise platform requirements.
          </p>
        </MotionShell>

        <MotionShell delay={0.06} className="mt-6 lg:mt-12">
          <div className="flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap lg:justify-between lg:gap-5 lg:py-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <span className="inline-flex items-center gap-3 text-sm font-semibold text-slate-200 transition hover:text-white sm:text-base">
                  <Icon className="size-5 text-blue-200" />
                  {item.label}
                </span>
              );

              return (
                <div key={item.label} className="flex items-center gap-5">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      data-ga-event={item.external ? "whatsapp_button_click" : "call_button_click"}
                      data-ga-label={`Contact section ${item.external ? "WhatsApp" : "call"} link`}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                  {index < contactItems.length - 1 ? (
                    <span className="hidden h-8 w-px bg-white/10 lg:block" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </MotionShell>

        <MotionShell delay={0.1} className="mt-6 lg:mt-14">
          <div className="contact-cta-border">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-black px-6 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                  Enterprise consultation
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Ready To Transform Your Business?
                </h3>
              </div>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  data-ga-event="whatsapp_button_click"
                  data-ga-label="Contact CTA WhatsApp Us"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-blue-100"
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <CalendarCheck className="mr-2 size-4" />
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </MotionShell>
      </div>
    </section>
  );
}
