"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Check,
  Globe2,
  Star,
} from "lucide-react";
import { MotionShell } from "@/components/motion-shell";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 200, suffix: "+", label: "Business Clients" },
  { value: 15, suffix: "+", label: "Countries Served" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Technical Support" },
];

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const duration = 1300;
        const startedAt = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="about-stat-card group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 sm:p-5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 sm:mt-3">{label}</p>
    </div>
  );
}

export function AboutZenithSection() {
  return (
    <section id="about" className="about-zenith-bg relative overflow-hidden px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-28">
      <div className="about-gradient-orb about-gradient-orb-one" />
      <div className="about-gradient-orb about-gradient-orb-two" />
      <div className="about-particles" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
        <MotionShell className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200 sm:text-lg">
            ABOUT US
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-slate-200 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl lg:mt-5">
            <Star className="size-4 fill-emerald-200 text-emerald-200" />
            Trusted Since 2015
          </div>
          <div className="relative mt-4 lg:mt-5">
            <div className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(20,241,149,0.16),rgba(0,194,255,0.08)_42%,transparent_70%)] blur-2xl" />
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl sm:leading-[1.02] lg:text-6xl">
              Building Powerful Digital Solutions For Modern Businesses
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-200 sm:text-xl sm:leading-8 lg:mt-6">
            Trusted technology partner for startups, enterprises, educational institutions, healthcare organizations, and digital businesses.
          </p>

          <div className="mt-5 max-w-4xl space-y-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-9 lg:mt-8 lg:space-y-5">
            <p>
              Zenith Softech is a technology-driven software company dedicated to helping businesses grow through innovation, automation, and digital transformation.
            </p>
            <p>
              With more than 10 years of industry experience, we specialize in custom software development, enterprise solutions, AI platforms, blockchain applications, mobile apps, CRM systems, ERP software, and business automation tools.
            </p>
            <p>
              Our mission is to deliver secure, scalable, and future-ready digital products that empower organizations to operate smarter, faster, and more efficiently.
            </p>
            <p>
              We combine creativity, technology, and business strategy to build world-class software solutions for startups, enterprises, schools, hospitals, financial institutions, and organizations across multiple industries.
            </p>
          </div>
        </MotionShell>

        <MotionShell delay={0.08} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/10 via-blue-500/10 to-purple-500/10 blur-2xl" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </MotionShell>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-7xl lg:mt-12">
        <MotionShell className="rounded-[1.75rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">Company Vision</p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-white">
            &quot;To become a globally trusted software company that empowers businesses through technology, innovation, and intelligent digital transformation.&quot;
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-emerald-300/70 via-blue-300/40 to-transparent lg:mt-8" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-purple-200 lg:mt-6">Company Mission</p>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            &quot;Deliver high-quality software solutions that create measurable business growth and long-term value for our clients.&quot;
          </p>
        </MotionShell>
      </div>

      <MotionShell delay={0.12} className="relative z-10 mx-auto mt-4 max-w-7xl lg:mt-8">
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(20,241,149,0.11),rgba(0,0,0,0.64),rgba(153,69,255,0.12))] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
              <Globe2 className="size-5" />
            </span>
            <p className="max-w-4xl text-lg font-semibold leading-8 text-white">
              Trusted by startups, businesses, educational institutions, healthcare organizations, and enterprises across India and international markets.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200">
            <Check className="size-4 text-emerald-200" />
            Future-ready software partner
          </span>
        </div>
      </MotionShell>
    </section>
  );
}
