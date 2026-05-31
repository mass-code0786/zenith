import Image from "next/image";
import Link from "next/link";
import {
  callLink,
  callingDisplay,
  marketPresence,
  officeAddressLines,
  whatsappDisplay,
  whatsappLink,
} from "@/lib/contact";

const solutions = [
  "Software Development",
  "AI Solutions",
  "CRM",
  "ERP",
  "Mobile Apps",
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.7fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
              <Image
                src="/brand/zenith-mark.svg"
                alt="Zenith Softech logo"
                width={40}
                height={40}
                className="size-9"
              />
            </span>
            <span className="text-2xl font-semibold tracking-tight text-white">Zenith Softech</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Building powerful software, AI systems, and digital platforms for modern businesses.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Solutions</h3>
          <div className="mt-5 grid gap-3 text-sm text-slate-500">
            {solutions.map((solution) => (
              <Link key={solution} href="/#services" className="transition hover:text-white">
                {solution}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Contact</h3>
          <div className="mt-5 grid gap-4 text-sm text-slate-500">
            <div>
              <p className="font-semibold text-slate-300">Office Address</p>
              <address className="mt-2 not-italic leading-6">
                {officeAddressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="transition hover:text-white">
              <span className="font-semibold text-slate-300">WhatsApp</span>
              <span className="block mt-1">{whatsappDisplay}</span>
            </a>
            <a href={callLink} className="transition hover:text-white">
              <span className="font-semibold text-slate-300">Call Us</span>
              <span className="block mt-1">{callingDisplay}</span>
            </a>
            <p className="text-xs font-semibold uppercase leading-5 tracking-[0.14em] text-slate-600">
              {marketPresence}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-sm text-slate-600">
          &copy; 2026 Zenith Softech. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
