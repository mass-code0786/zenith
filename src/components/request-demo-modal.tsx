"use client";

import { useState } from "react";
import { OfficeLocationCard } from "@/components/office-location";

export function RequestDemoModal({ software }: { software: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("loading");
    const payload = Object.fromEntries(formData);
    const response = await fetch("/api/demo-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setStatus("idle");
        }}
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-100"
      >
        Request Demo
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <div className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] border border-white/10 bg-black/95 p-5 shadow-2xl shadow-purple-950/30 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">Request demo</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{software}</h2>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10">
                Close
              </button>
            </div>

            {status === "sent" ? (
              <div className="grid gap-4">
                <div className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 p-5">
                  <p className="font-semibold text-emerald-100">Demo request submitted.</p>
                  <p className="mt-2 text-sm text-slate-300">Zenith Softech will contact you shortly on mobile or WhatsApp.</p>
                </div>
                <OfficeLocationCard compact />
              </div>
            ) : (
              <form action={submit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="fullName" required placeholder="Full Name" className="field" />
                  <input name="mobileNumber" required placeholder="Mobile Number" className="field" />
                  <input name="whatsappNumber" required placeholder="WhatsApp Number" className="field" />
                  <input name="email" type="email" placeholder="Email (optional)" className="field" />
                  <input name="companyName" placeholder="Company Name (optional)" className="field" />
                  <input name="interestedSoftware" readOnly aria-label="Software Interested" value={software} className="field" />
                </div>
                <textarea name="message" required rows={4} placeholder="Message" className="field resize-none rounded-[1.25rem]" />
                <button disabled={status === "loading"} className="rounded-full bg-emerald-300 px-6 py-3 font-semibold text-black transition hover:bg-emerald-200 disabled:opacity-60">
                  {status === "loading" ? "Submitting..." : "Submit Request"}
                </button>
                {status === "error" ? <p className="text-sm text-rose-300">Could not submit request. Please try again.</p> : null}
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
