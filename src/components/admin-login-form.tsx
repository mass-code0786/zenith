"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid admin credentials.");
      return;
    }

    router.refresh();
  }

  return (
    <form action={submit} className="glass mx-auto grid max-w-md gap-4 rounded-lg p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Secure login</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-500">Default local admin: admin@zenithsoftech.com / admin12345</p>
      </div>
      <input name="email" type="email" required placeholder="Admin email" className="field" />
      <input name="password" type="password" required placeholder="Password" className="field" />
      <button disabled={loading} className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
