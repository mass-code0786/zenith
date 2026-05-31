"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BarChart3,
  Globe2,
  Laptop,
  MapPin,
  MonitorSmartphone,
  MousePointerClick,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

const disconnectedMessage =
  "Google Analytics API is not connected. Add GA4 credentials to enable admin analytics.";

type OverviewData = {
  todayVisitors: number;
  yesterdayVisitors: number;
  totalVisitors: number;
  pageViews: number;
  last30DaysVisitors: number;
  visitorsLast7Days: Array<{ date: string; visitors: number; pageViews: number }>;
  trafficSources: Array<{ source: string; users: number }>;
};

type RealtimeData = {
  activeUsers: number;
};

type PageData = {
  pages: Array<{ path: string; title: string; views: number; users: number }>;
};

type DeviceData = {
  devices: Array<{ device: string; users: number }>;
  mobileUsers: number;
  desktopUsers: number;
};

type CountryData = {
  topCountry: string;
  countries: Array<{ country: string; users: number }>;
  cities: Array<{ city: string; country: string; users: number }>;
};

type ApiResponse<T> =
  | { connected: true; data: T }
  | { connected: false; message: string }
  | { error: string };

type AnalyticsState = {
  overview?: OverviewData;
  realtime?: RealtimeData;
  topPages?: PageData;
  devices?: DeviceData;
  countries?: CountryData;
};

const deviceColors = ["#38bdf8", "#22c55e", "#a78bfa", "#f59e0b"];

function formatNumber(value?: number) {
  return new Intl.NumberFormat("en-IN").format(value ?? 0);
}

function shortDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function DarkTooltip() {
  return (
    <Tooltip
      contentStyle={{
        background: "#020617",
        border: "1px solid rgba(148,163,184,0.22)",
        borderRadius: 8,
        color: "#f8fafc",
      }}
      labelStyle={{ color: "#e2e8f0" }}
    />
  );
}

function ChartShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/20 sm:p-5">
      <h2 className="text-base font-semibold text-white sm:text-lg">{title}</h2>
      <div className="mt-4 h-72">{children}</div>
    </section>
  );
}

export function AdminAnalyticsDashboard({ embedded = false }: { embedded?: boolean }) {
  const [state, setState] = useState<AnalyticsState>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAnalytics() {
      setLoading(true);
      setMessage("");

      try {
        const [overview, realtime, topPages, devices, countries] = await Promise.all([
          fetch("/api/admin/analytics/overview", { cache: "no-store" }),
          fetch("/api/admin/analytics/realtime", { cache: "no-store" }),
          fetch("/api/admin/analytics/top-pages", { cache: "no-store" }),
          fetch("/api/admin/analytics/devices", { cache: "no-store" }),
          fetch("/api/admin/analytics/countries", { cache: "no-store" }),
        ]);

        const payloads = (await Promise.all([
          overview.json(),
          realtime.json(),
          topPages.json(),
          devices.json(),
          countries.json(),
        ])) as [
          ApiResponse<OverviewData>,
          ApiResponse<RealtimeData>,
          ApiResponse<PageData>,
          ApiResponse<DeviceData>,
          ApiResponse<CountryData>,
        ];

        if (!active) {
          return;
        }

        const disconnected = payloads.find(
          (payload) => "connected" in payload && payload.connected === false,
        );

        if (disconnected && "message" in disconnected) {
          setMessage(disconnected.message);
          setState({});
          return;
        }

        const apiError = payloads.find((payload) => "error" in payload);

        if (apiError && "error" in apiError) {
          setMessage(apiError.error);
          setState({});
          return;
        }

        setState({
          overview: "data" in payloads[0] ? payloads[0].data : undefined,
          realtime: "data" in payloads[1] ? payloads[1].data : undefined,
          topPages: "data" in payloads[2] ? payloads[2].data : undefined,
          devices: "data" in payloads[3] ? payloads[3].data : undefined,
          countries: "data" in payloads[4] ? payloads[4].data : undefined,
        });
      } catch {
        if (active) {
          setMessage("Unable to load Google Analytics data.");
          setState({});
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      active = false;
    };
  }, []);

  const cards = useMemo(
    () => [
      {
        label: "Today Visitors",
        value: state.overview?.todayVisitors,
        icon: Users,
      },
      {
        label: "Yesterday Visitors",
        value: state.overview?.yesterdayVisitors,
        icon: TrendingUp,
      },
      {
        label: "Total Visitors",
        value: state.overview?.totalVisitors,
        icon: BarChart3,
      },
      {
        label: "Page Views",
        value: state.overview?.pageViews,
        icon: MousePointerClick,
      },
      {
        label: "Realtime Active Users",
        value: state.realtime?.activeUsers,
        icon: Activity,
      },
      {
        label: "Mobile Users",
        value: state.devices?.mobileUsers,
        icon: Smartphone,
      },
      {
        label: "Desktop Users",
        value: state.devices?.desktopUsers,
        icon: Laptop,
      },
      {
        label: "Top Country",
        value: state.countries?.topCountry ?? "No data",
        icon: Globe2,
        text: true,
      },
    ],
    [state],
  );

  const visitorsLast7Days = state.overview?.visitorsLast7Days ?? [];
  const devices = state.devices?.devices ?? [];
  const countries = state.countries?.countries ?? [];
  const cities = state.countries?.cities ?? [];
  const sources = state.overview?.trafficSources ?? [];
  const pages = state.topPages?.pages ?? [];

  return (
    <div className={`${embedded ? "" : "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"}`}>
      <div className="rounded-lg border border-white/10 bg-[#020617] p-4 text-white shadow-2xl shadow-black/30 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Google Analytics
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Website Visitor Intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              GA4 traffic, realtime visitors, devices, pages, sources, and country data for zenithsoftech.com.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            <Activity className="size-4" />
            {loading ? "Loading" : `${formatNumber(state.realtime?.activeUsers)} live now`}
          </span>
        </div>

        {message ? (
          <div className="mt-6 rounded-lg border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            {message || disconnectedMessage}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {card.label}
                  </p>
                  <Icon className="size-5 text-cyan-200" />
                </div>
                <p className="mt-5 truncate text-2xl font-semibold text-white sm:text-3xl">
                  {loading
                    ? "..."
                    : card.text
                      ? String(card.value)
                      : formatNumber(Number(card.value ?? 0))}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <ChartShell title="Visitors last 7 days">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorsLast7Days} margin={{ left: -18, right: 8, top: 12 }}>
                <defs>
                  <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <DarkTooltip />
                <Area type="monotone" dataKey="visitors" stroke="#38bdf8" strokeWidth={2} fill="url(#visitorsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartShell>

          <ChartShell title="Page views last 7 days">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorsLast7Days} margin={{ left: -18, right: 8, top: 12 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <DarkTooltip />
                <Bar dataKey="pageViews" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartShell>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
          <ChartShell title="Device type chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  dataKey="users"
                  nameKey="device"
                  innerRadius={62}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {devices.map((entry, index) => (
                    <Cell key={entry.device} fill={deviceColors[index % deviceColors.length]} />
                  ))}
                </Pie>
                <DarkTooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartShell>

          <ChartShell title="Country wise visitors">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countries} margin={{ left: -10, right: 8, top: 12 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="country" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <DarkTooltip />
                <Bar dataKey="users" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartShell>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 p-4 sm:p-5">
              <h2 className="text-base font-semibold text-white sm:text-lg">Top pages table</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-white/[0.035] text-xs uppercase tracking-[0.14em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Page</th>
                    <th className="px-4 py-3 font-semibold">Path</th>
                    <th className="px-4 py-3 text-right font-semibold">Views</th>
                    <th className="px-4 py-3 text-right font-semibold">Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {pages.map((page) => (
                    <tr key={`${page.path}-${page.title}`} className="text-slate-300">
                      <td className="max-w-[18rem] truncate px-4 py-3 font-medium text-white">{page.title}</td>
                      <td className="max-w-[18rem] truncate px-4 py-3">{page.path}</td>
                      <td className="px-4 py-3 text-right">{formatNumber(page.views)}</td>
                      <td className="px-4 py-3 text-right">{formatNumber(page.users)}</td>
                    </tr>
                  ))}
                  {!pages.length ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                        {loading ? "Loading pages..." : "No page data available."}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-5">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:p-5">
              <h2 className="text-base font-semibold text-white sm:text-lg">Traffic sources</h2>
              <div className="mt-4 grid gap-3">
                {sources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.04] px-3 py-3">
                    <span className="truncate text-sm text-slate-300">{source.source}</span>
                    <span className="font-semibold text-white">{formatNumber(source.users)}</span>
                  </div>
                ))}
                {!sources.length ? (
                  <p className="rounded-lg bg-white/[0.04] px-3 py-3 text-sm text-slate-400">
                    {loading ? "Loading sources..." : "No source data available."}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-cyan-200" />
                <h2 className="text-base font-semibold text-white sm:text-lg">Country/city data</h2>
              </div>
              <div className="mt-4 grid gap-3">
                {cities.map((city) => (
                  <div key={`${city.city}-${city.country}`} className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.04] px-3 py-3">
                    <span className="truncate text-sm text-slate-300">
                      {city.city}, {city.country}
                    </span>
                    <span className="font-semibold text-white">{formatNumber(city.users)}</span>
                  </div>
                ))}
                {!cities.length ? (
                  <p className="rounded-lg bg-white/[0.04] px-3 py-3 text-sm text-slate-400">
                    {loading ? "Loading cities..." : "No city data available."}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <MonitorSmartphone className="size-5 text-cyan-200" />
            <p className="mt-4 text-2xl font-semibold text-white">
              {formatNumber(state.overview?.last30DaysVisitors)}
            </p>
            <p className="mt-1 text-sm text-slate-400">Last 30 days visitors</p>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4 sm:col-span-1 xl:col-span-3">
            <p className="text-sm font-semibold text-slate-300">GA4 Property</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Measurement ID G-WHXD4YW7KF is loaded on the website. Server analytics require the GA4 property ID and service account credentials in environment variables.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

