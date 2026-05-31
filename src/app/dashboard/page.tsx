import {
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  FileBarChart,
  Inbox,
  MessageSquare,
  PanelLeft,
  Users,
} from "lucide-react";
import { Background } from "@/components/background";
import { ProjectStatusChart, RevenueAnalyticsChart } from "@/components/enterprise-chart";
import { FloatingContact } from "@/components/floating-contact";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  try {
    const [activeDemos, inquiries, totalDemoRequests, newRequests, latestRequests] = await Promise.all([
      prisma.demo.count({ where: { isPublished: true } }),
      prisma.inquiry.count(),
      prisma.demoRequest.count(),
      prisma.demoRequest.count({ where: { status: "New" } }),
      prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

    return {
      activeDemos,
      inquiries,
      totalDemoRequests,
      newRequests,
      latestRequests,
    };
  } catch {
    return {
      activeDemos: 18,
      inquiries: 32,
      totalDemoRequests: 24,
      newRequests: 6,
      latestRequests: [],
    };
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const cards = [
    { label: "Total Projects", value: "120+", icon: BriefcaseBusiness },
    { label: "Revenue Analytics", value: "$1.8M", icon: FileBarChart },
    { label: "Active Clients", value: "40+", icon: Users },
    { label: "Demo Requests", value: data.totalDemoRequests, icon: Inbox },
  ];

  return (
    <>
      <Background />
      <Nav />
      <FloatingContact />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="enterprise-card rounded-lg p-4 lg:sticky lg:top-24 lg:h-[calc(100svh-120px)]">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-blue-500 text-white">
              <PanelLeft className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-slate-950">Zenith Enterprise</p>
              <p className="text-xs text-slate-500">Executive dashboard</p>
            </div>
          </div>
          <nav className="grid gap-2 text-sm">
            {["Overview", "Projects", "Clients", "Demo Requests", "Reports", "Notifications"].map((item) => (
              <a key={item} className="rounded-lg px-3 py-3 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700" href="#">
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="space-y-5">
          <div className="enterprise-card rounded-lg p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Enterprise analytics</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-5xl">Operational Intelligence</h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  A Stripe and Linear inspired control surface for projects, clients, demo requests, notifications, and reports.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <Bell className="size-4" />
                {data.newRequests} new requests
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="enterprise-card rounded-lg p-5">
                  <Icon className="size-6 text-blue-600" />
                  <p className="mt-5 text-3xl font-semibold text-slate-950">{card.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{card.label}</p>
                </article>
              );
            })}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <section className="enterprise-card rounded-lg p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">Revenue Analytics</h2>
                <FileBarChart className="size-5 text-blue-600" />
              </div>
              <RevenueAnalyticsChart />
            </section>

            <section className="enterprise-card rounded-lg p-5">
              <h2 className="text-xl font-semibold text-slate-950">Team Activity</h2>
              <div className="mt-5 grid gap-3">
                {["API integration review", "ERP sprint planning", "CRM QA pass", "Deployment report"].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="font-medium text-slate-950">{item}</p>
                    <p className="text-xs text-slate-500">Updated today</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
            <section className="enterprise-card rounded-lg p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">Project Status</h2>
                <ClipboardList className="size-5 text-blue-600" />
              </div>
              <ProjectStatusChart />
            </section>

            <section className="enterprise-card rounded-lg p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-950">Latest Demo Requests</h2>
                <MessageSquare className="size-5 text-blue-600" />
              </div>
              <div className="grid gap-3">
                {data.latestRequests.length ? (
                  data.latestRequests.map((request) => (
                    <div key={request.id} className={`rounded-lg border p-4 ${request.status === "New" ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <p className="font-medium text-slate-950">{request.fullName}</p>
                          <p className="text-sm text-slate-500">{request.interestedSoftware}</p>
                        </div>
                        <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs text-blue-700">{request.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    New demo requests will appear here instantly.
                  </p>
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
