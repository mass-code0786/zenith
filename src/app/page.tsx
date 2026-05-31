import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  DatabaseZap,
  MonitorSmartphone,
  Network,
  PanelsTopLeft,
  ShoppingBag,
  Workflow,
} from "lucide-react";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { FaqSection } from "@/components/faq-section";
import { HeroBackground } from "@/components/hero-background";
import { MotionShell } from "@/components/motion-shell";
import { Nav } from "@/components/nav";
import { PremiumContactSection } from "@/components/premium-contact-section";
import { AutoScrollReviews } from "@/components/auto-scroll-reviews";
import { SoftwareSolutionsSection } from "@/components/software-solutions-section";
import { AboutZenithSection } from "@/components/about-zenith-section";

const logoStrip = [
  "ERP Systems",
  "CRM Platforms",
  "AI Agents",
  "Mobile Apps",
  "Web Apps",
  "E-Commerce",
  "Blockchain",
  "Automation",
];

const services = [
  {
    title: "Custom Software Development",
    description: "Secure business platforms engineered around your exact workflow.",
    icon: PanelsTopLeft,
  },
  {
    title: "AI Agent & Chatbot Solutions",
    description: "Always-on AI systems for support, sales, follow-ups, and operations.",
    icon: Bot,
  },
  {
    title: "CRM & Lead Management",
    description: "Track leads, customers, reminders, pipelines, and team performance.",
    icon: Network,
  },
  {
    title: "ERP & Business Automation",
    description: "Unify finance, inventory, staff, reporting, and daily processes.",
    icon: Workflow,
  },
  {
    title: "Mobile App Development",
    description: "High-performance Android and iOS apps with scalable backends.",
    icon: MonitorSmartphone,
  },
  {
    title: "E-Commerce Platforms",
    description: "Modern selling systems with catalog, checkout, orders, and analytics.",
    icon: ShoppingBag,
  },
  {
    title: "School & Hospital Management Software",
    description: "Specialized ERP platforms for education and healthcare operations.",
    icon: Building2,
  },
  {
    title: "Blockchain & Web3 Dashboards",
    description: "Premium dashboards, smart data views, and Web3-ready interfaces.",
    icon: DatabaseZap,
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <FloatingContact />
      <main className="overflow-hidden bg-black text-white">
        <section id="home" className="relative flex min-h-[calc(100svh-77px)] items-center px-4 py-16 sm:px-6 lg:px-8">
          <HeroBackground />
          <div className="relative mx-auto flex max-w-7xl flex-col justify-center">
            <MotionShell className="max-w-5xl">
              <h1 className="max-w-5xl text-[4.25rem] font-semibold leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
                The software company for every business on earth.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Zenith Softech builds high-performance software, AI solutions, business automation, CRM, ERP, mobile apps, and digital platforms for modern companies.
              </p>
              <Link
                href="#services"
                className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-emerald-100"
              >
                Get started <ArrowRight className="ml-2 size-4" />
              </Link>
            </MotionShell>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <MotionShell className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(20,241,149,0.2),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(153,69,255,0.28),transparent_35%),linear-gradient(135deg,rgba(13,13,18,0.95),rgba(0,0,0,0.98))] p-6 shadow-2xl shadow-purple-950/20 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Announcement</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Zenith AI Suite 2026
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Our next-generation software, AI automation, CRM, ERP, and enterprise platforms are built to transform modern businesses.
                </p>
              </div>
              <Link
                href="#services"
                className="inline-flex w-fit items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/60 hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </MotionShell>
        </section>

        <section aria-label="Trusted platform strip" className="overflow-hidden border-y border-white/10 bg-white/[0.025] py-4">
          <div className="logo-marquee flex w-max">
            {[...logoStrip, ...logoStrip].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mx-5 shrink-0 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <AboutZenithSection />

        <section id="services" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <MotionShell className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Solutions</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:mt-5">
                Solutions built for modern businesses.
              </h2>
            </MotionShell>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <MotionShell
                    key={service.title}
                    delay={index * 0.025}
                    className="group rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(20,241,149,0.12)]"
                  >
                    <Icon className="size-6 text-emerald-200" />
                    <h3 className="mt-5 text-lg font-semibold text-white lg:mt-7">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
                  </MotionShell>
                );
              })}
            </div>
          </div>
        </section>

        <SoftwareSolutionsSection />

        <AutoScrollReviews />

        <FaqSection />

        <PremiumContactSection />
      </main>
      <Footer />
    </>
  );
}
