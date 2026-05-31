"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function submit(formData: FormData) {
    setStatus("loading");
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form action={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className="field" />
        <input name="email" required type="email" placeholder="Email" className="field" />
        <input name="phone" placeholder="Phone" className="field" />
        <input name="company" placeholder="Company" className="field" />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your software, dashboard, automation, ERP, CRM, or website requirement."
        className="field resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.18)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-emerald-200">Inquiry received. Our team will contact you shortly.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-rose-300">Could not submit inquiry. Please try again.</p>
      ) : null}
    </form>
  );
}
