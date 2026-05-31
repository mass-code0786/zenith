"use client";

import { Download, Eye, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";

type Demo = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  liveLink?: string | null;
  downloadUrl?: string | null;
  isPublished: boolean;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  createdAt: Date | string;
};

type DemoRequest = {
  id: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string | null;
  companyName?: string | null;
  interestedSoftware: string;
  message: string;
  status: string;
  notes?: string | null;
  followUp?: string | null;
  createdAt: Date | string;
};

const statuses = ["All", "New", "Contacted", "Demo Sent", "Closed"];

export function AdminPanel({
  demos,
  inquiries,
  demoRequests,
}: {
  demos: Demo[];
  inquiries: Inquiry[];
  demoRequests: DemoRequest[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("Demo Requests");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const newRequests = demoRequests.filter((request) => request.status === "New").length;
  const filteredRequests = useMemo(() => {
    const normalized = query.toLowerCase();
    return demoRequests.filter((request) => {
      const matchesStatus = filter === "All" || request.status === filter;
      const matchesQuery =
        !normalized ||
        [
          request.id,
          request.fullName,
          request.mobileNumber,
          request.whatsappNumber,
          request.email,
          request.companyName,
          request.interestedSoftware,
          request.message,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalized));

      return matchesStatus && matchesQuery;
    });
  }, [demoRequests, filter, query]);

  async function upload(formData: FormData) {
    setStatus("Uploading...");
    const response = await fetch("/api/demos", {
      method: "POST",
      body: formData,
    });

    setStatus(response.ok ? "Demo uploaded and published." : "Upload failed.");
    if (response.ok) {
      router.refresh();
    }
  }

  async function toggle(demo: Demo) {
    await fetch(`/api/demos/${demo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !demo.isPublished }),
    });
    router.refresh();
  }

  async function removeDemo(id: string) {
    await fetch(`/api/demos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function updateRequest(id: string, data: { status?: string; notes?: string; followUp?: string }) {
    await fetch(`/api/demo-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
  }

  async function removeRequest(id: string) {
    await fetch(`/api/demo-requests/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  function exportCsv() {
    const rows = [
      ["Request ID", "Name", "Mobile", "WhatsApp", "Email", "Company", "Software", "Message", "Status", "Follow-up", "Notes", "Date Time"],
      ...filteredRequests.map((request) => [
        request.id,
        request.fullName,
        request.mobileNumber,
        request.whatsappNumber,
        request.email ?? "",
        request.companyName ?? "",
        request.interestedSoftware,
        request.message,
        request.status,
        request.followUp ?? "",
        request.notes ?? "",
        new Date(request.createdAt).toLocaleString(),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "zenith-demo-requests.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
      <aside className="glass rounded-lg p-5 lg:sticky lg:top-24 lg:h-fit">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Zenith Control</h1>
          </div>
          <button onClick={logout} className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
            Logout
          </button>
        </div>

        <nav className="mt-6 grid gap-2">
          {[
            "Dashboard",
            "Projects",
            "Demos",
            "Demo Requests",
            "Leads CRM",
            "Analytics",
            "Contact Messages",
            "Clients",
            "Team",
            "Blog",
            "Reports",
            "Settings",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Analytics") {
                  router.push("/admin/analytics");
                  return;
                }

                setActiveTab(item === "Demos" ? "Manage Demos" : item === "Leads CRM" ? "Demo Requests" : item);
              }}
              className={`flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                activeTab === item || (item === "Demos" && activeTab === "Manage Demos") || (item === "Leads CRM" && activeTab === "Demo Requests")
                  ? "bg-blue-500 text-white"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {item}
              {item === "Demo Requests" && newRequests ? (
                <span className="rounded-full bg-rose-400 px-2 py-0.5 text-xs font-bold text-white">{newRequests}</span>
              ) : null}
            </button>
          ))}
        </nav>
      </aside>

      <section className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Demo Requests", demoRequests.length],
            ["New Requests", newRequests],
            ["Active Demos", demos.filter((demo) => demo.isPublished).length],
            ["Contact Messages", inquiries.length],
          ].map(([label, value]) => (
            <div key={label} className="glass rounded-lg p-5">
              <p className="text-3xl font-bold text-slate-950">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {activeTab === "Dashboard" ? <AdminAnalyticsDashboard embedded /> : null}

        {["Projects", "Clients", "Team", "Blog", "Reports", "Settings"].includes(activeTab) ? (
          <div className="enterprise-card rounded-lg p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">{activeTab}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Enterprise module</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              This module is part of the Zenith Softech enterprise control center. Demo requests, leads, demos, and contact messages are fully operational; this section is prepared for expansion.
            </p>
          </div>
        ) : null}

        {activeTab === "Manage Demos" ? (
          <div className="enterprise-card rounded-lg p-5">
            <h2 className="text-xl font-semibold text-slate-950">Upload demo</h2>
            <form action={upload} className="mt-5 grid gap-3">
              <input name="title" required placeholder="Demo title" className="field" />
              <textarea name="description" required rows={4} placeholder="Description" className="field resize-none" />
              <input name="category" required placeholder="Category" className="field" />
              <input name="liveLink" placeholder="Live demo link" className="field" />
              <label className="text-sm text-slate-600">
                Screenshot/image
                <input name="image" type="file" accept="image/*" className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white" />
              </label>
              <label className="text-sm text-slate-600">
                Video optional
                <input name="video" type="file" accept="video/*" className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border file:border-slate-200 file:bg-white file:px-4 file:py-2 file:text-slate-700" />
              </label>
              <label className="text-sm text-slate-600">
                Download/file optional
                <input name="download" type="file" className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border file:border-slate-200 file:bg-white file:px-4 file:py-2 file:text-slate-700" />
              </label>
              <button className="rounded-full bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400">Upload Demo</button>
              {status ? <p className="text-sm text-blue-700">{status}</p> : null}
            </form>
          </div>
        ) : null}

        {activeTab === "Demo Requests" ? (
          <div className="glass rounded-lg p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <h2 className="text-xl font-semibold text-slate-950">Demo Requests</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lead" className="field pl-10" />
                </label>
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className="field sm:w-44">
                  {statuses.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                  <Download className="size-4" />
                  Export CSV
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {filteredRequests.map((request) => (
                <article key={request.id} className={`rounded-lg border p-4 ${request.status === "New" ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                    <div className="grid gap-2 text-sm text-slate-600">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-slate-950">{request.fullName}</p>
                        <span className="rounded-full border border-blue-200 bg-white px-2 py-0.5 text-xs text-blue-700">{request.status}</span>
                      </div>
                      <p>Request ID: {request.id}</p>
                      <p>Mobile: {request.mobileNumber} | WhatsApp: {request.whatsappNumber}</p>
                      <p>Email: {request.email || "Not provided"} | Company: {request.companyName || "Not provided"}</p>
                      <p>Software Requested: {request.interestedSoftware}</p>
                      <p>Date & Time: {new Date(request.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setExpanded(expanded === request.id ? null : request.id)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
                        <Eye className="size-4" />
                        View
                      </button>
                      <select value={request.status} onChange={(event) => updateRequest(request.id, { status: event.target.value })} className="rounded-full border border-blue-200 bg-white px-3 py-2 text-xs text-blue-700">
                        {statuses.filter((item) => item !== "All").map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                      <button onClick={() => removeRequest(request.id)} className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 px-3 py-2 text-xs text-rose-100 hover:bg-rose-300/10">
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                  {expanded === request.id ? (
                    <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4">
                      <p className="text-sm text-slate-600">{request.message}</p>
                      <textarea
                        defaultValue={request.notes ?? ""}
                        rows={3}
                        placeholder="Lead notes"
                        className="field resize-none"
                        onBlur={(event) => updateRequest(request.id, { notes: event.target.value })}
                      />
                      <input
                        defaultValue={request.followUp ?? ""}
                        placeholder="Follow-up, e.g. Tomorrow 11:00 AM or 2026-06-01"
                        className="field"
                        onBlur={(event) => updateRequest(request.id, { followUp: event.target.value })}
                      />
                    </div>
                  ) : null}
                </article>
              ))}
              {!filteredRequests.length ? <p className="text-sm text-slate-600">No demo requests found.</p> : null}
            </div>
          </div>
        ) : null}

        {activeTab === "Manage Demos" ? (
          <div className="glass rounded-lg p-5">
            <h2 className="text-xl font-semibold text-slate-950">Manage demos</h2>
            <div className="mt-5 grid gap-3">
              {demos.map((demo) => (
                <article key={demo.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <p className="font-semibold text-slate-950">{demo.title}</p>
                      <p className="text-sm text-slate-500">{demo.category}</p>
                      <p className="mt-2 text-sm text-slate-600">{demo.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button onClick={() => toggle(demo)} className="rounded-full border border-blue-200 px-3 py-2 text-xs text-blue-700 hover:bg-blue-50">
                        {demo.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => removeDemo(demo.id)} className="rounded-full border border-rose-300/30 px-3 py-2 text-xs text-rose-100 hover:bg-rose-300/10">
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {!demos.length ? <p className="text-sm text-slate-600">No demos uploaded yet.</p> : null}
            </div>
          </div>
        ) : null}

        {activeTab === "Contact Messages" ? (
          <div className="glass rounded-lg p-5">
            <h2 className="text-xl font-semibold text-slate-950">Contact messages</h2>
            <div className="mt-5 grid gap-3">
              {inquiries.map((inquiry) => (
                <article key={inquiry.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="font-semibold text-slate-950">{inquiry.name}</p>
                  <p className="text-sm text-blue-700">{inquiry.email}{inquiry.phone ? ` | ${inquiry.phone}` : ""}</p>
                  <p className="mt-2 text-sm text-slate-600">{inquiry.message}</p>
                </article>
              ))}
              {!inquiries.length ? <p className="text-sm text-slate-600">No inquiries yet.</p> : null}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
