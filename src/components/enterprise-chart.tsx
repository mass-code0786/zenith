"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42, projects: 12 },
  { month: "Feb", revenue: 54, projects: 16 },
  { month: "Mar", revenue: 49, projects: 14 },
  { month: "Apr", revenue: 68, projects: 19 },
  { month: "May", revenue: 81, projects: 24 },
  { month: "Jun", revenue: 92, projects: 27 },
];

const statusData = [
  { name: "Planning", value: 18 },
  { name: "Development", value: 34 },
  { name: "Testing", value: 22 },
  { name: "Deployment", value: 14 },
];

export function RevenueAnalyticsChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ left: -20, right: 8, top: 12 }}>
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(15,23,42,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 8, color: "#0f172a" }} />
          <Area type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} fill="url(#revenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProjectStatusChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={statusData} margin={{ left: -20, right: 8, top: 12 }}>
          <CartesianGrid stroke="rgba(15,23,42,0.08)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 8, color: "#0f172a" }} />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
