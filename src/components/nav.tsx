"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Software Solutions" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = () => {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/86 backdrop-blur-2xl">
      <nav className="mx-auto flex h-[77px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <span className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
            <Image
              src="/brand/zenith-mark.svg"
              alt="Zenith Softech logo"
              width={40}
              height={40}
              priority
              className="size-9"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
            Zenith Softech
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center lg:hidden">
          <details ref={menuRef} className="group relative">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/10">
              <Menu className="size-5" />
            </summary>
            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-white/10 bg-black/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
