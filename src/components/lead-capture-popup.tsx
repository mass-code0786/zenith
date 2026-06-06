"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "zenith-lead-popup-shown-at";
const DISPLAY_INTERVAL = 24 * 60 * 60 * 1000;

const projectTypes = [
  "AI Software",
  "MLM Software",
  "CRM Software",
  "ERP Software",
  "Mobile App",
  "E-Commerce Platform",
  "Blockchain Solution",
  "Exchange Platform",
  "School Management Software",
  "Hospital Management Software",
  "Custom Software",
];

const features = [
  "Free Project Consultation",
  "Custom Development Strategy",
  "Enterprise-Grade Security",
  "Scalable & Future-Ready Solutions",
];

export function LeadCapturePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
      return;
    }

    const lastShown = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);

    if (Date.now() - lastShown < DISPLAY_INTERVAL) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      setOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  async function submit(formData: FormData) {
    setStatus("loading");
    const whatsappNumber = String(formData.get("whatsappNumber") ?? "");
    const message = String(formData.get("message") ?? "").trim();

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          mobileNumber: whatsappNumber,
          whatsappNumber,
          email: formData.get("email"),
          companyName: "",
          interestedSoftware: formData.get("projectType"),
          message,
        }),
      });

      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-lg sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setOpen(false);
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-[radial-gradient(circle_at_0%_0%,rgba(20,241,149,0.16),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(153,69,255,0.22),transparent_34%),linear-gradient(145deg,rgba(12,13,18,0.98),rgba(0,0,0,0.98))] p-5 text-white shadow-[0_32px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-8"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close popup"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>

            {status === "sent" ? (
              <div className="flex min-h-80 flex-col items-center justify-center px-2 text-center">
                <span className="flex size-16 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                  <Check className="size-8" />
                </span>
                <h2 id="lead-popup-title" className="mt-6 text-3xl font-bold sm:text-4xl">
                  Thank you!
                </h2>
                <p className="mt-3 text-lg text-slate-300">Our team will contact you shortly.</p>
                <button type="button" onClick={() => setOpen(false)} className="mt-7 rounded-full border border-white/15 px-6 py-3 font-semibold transition hover:bg-white/10">
                  Close
                </button>
              </div>
            ) : (
              <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
                <div className="pr-8 lg:pr-0">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Free business consultation</p>
                  <h2 id="lead-popup-title" className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                    Get Your Free Software Demo
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    Turn your idea into a powerful digital business with custom software, AI solutions, mobile apps, CRM, ERP, blockchain platforms, and business automation systems.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {features.map((feature) => (
                      <p key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-300/12 text-emerald-200">
                          <Check className="size-3.5" />
                        </span>
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>

                <form action={submit} className="grid gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5">
                  <input name="fullName" required placeholder="Full Name *" className="field" />
                  <input name="whatsappNumber" required inputMode="tel" placeholder="WhatsApp Number *" className="field" />
                  <input name="email" type="email" placeholder="Email Address (Optional)" className="field" />
                  <select name="projectType" required defaultValue="" className="field appearance-none">
                    <option value="" disabled>Project Type *</option>
                    {projectTypes.map((projectType) => (
                      <option key={projectType} value={projectType} className="bg-slate-950">{projectType}</option>
                    ))}
                  </select>
                  <textarea name="message" rows={3} placeholder="Message (Optional)" className="field resize-none rounded-[1.2rem]" />
                  <button disabled={status === "loading"} className="rounded-full bg-emerald-300 px-6 py-3.5 font-bold text-black transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60">
                    {status === "loading" ? "Submitting..." : "Request Free Demo"}
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                    Maybe Later
                  </button>
                  {status === "error" ? <p className="text-center text-sm text-rose-300">Could not submit your request. Please try again.</p> : null}
                </form>
              </div>
            )}
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
