"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  Bot,
  Building2,
  ChartCandlestick,
  Coins,
  GraduationCap,
  Hotel,
  Landmark,
  Network,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { MotionShell } from "@/components/motion-shell";

type SoftwareSolution = {
  name: string;
  tag: string;
  description: string;
  accent: string;
  accentSoft: string;
  icon: ComponentType<{ className?: string }>;
  metrics: string[];
  panels: string[];
  chart: "bars" | "line" | "nodes" | "calendar" | "wallet";
};

const solutions: SoftwareSolution[] = [
  {
    name: "Decentralized Software",
    tag: "Web3 Ecosystem",
    description:
      "A Web3 command center for wallets, staking, contracts, analytics, and decentralized operations.",
    accent: "#14f195",
    accentSoft: "rgba(20, 241, 149, 0.16)",
    icon: Network,
    metrics: ["12.8K wallets", "$4.2M staked", "99.9% uptime"],
    panels: ["Smart Contracts", "DAO", "Validators"],
    chart: "nodes",
  },
  {
    name: "Crypto Exchange Software",
    tag: "Trading Platform",
    description:
      "A secure exchange interface for trading pairs, order books, wallets, and market analytics.",
    accent: "#f3ba2f",
    accentSoft: "rgba(243, 186, 47, 0.16)",
    icon: ChartCandlestick,
    metrics: ["BTC/USDT", "+8.42%", "$91.4M volume"],
    panels: ["Order Book", "Wallet", "Depth"],
    chart: "line",
  },
  {
    name: "Blockchain Software",
    tag: "Enterprise Network",
    description:
      "Enterprise blockchain control for nodes, transactions, smart contracts, and monitoring.",
    accent: "#00c2ff",
    accentSoft: "rgba(0, 194, 255, 0.16)",
    icon: Landmark,
    metrics: ["48 nodes", "1.2M txns", "18 contracts"],
    panels: ["Nodes", "Transactions", "Audit"],
    chart: "nodes",
  },
  {
    name: "School Management Software",
    tag: "Education ERP",
    description:
      "A modern ERP for admissions, students, fees, attendance, exams, transport, and reports.",
    accent: "#22c55e",
    accentSoft: "rgba(34, 197, 94, 0.16)",
    icon: GraduationCap,
    metrics: ["2,840 students", "94% attendance", "Rs. 18L fees"],
    panels: ["Admissions", "Exams", "Transport"],
    chart: "bars",
  },
  {
    name: "Hospital Management Software",
    tag: "Healthcare",
    description:
      "A healthcare platform for patients, appointments, doctors, billing, pharmacy, and reports.",
    accent: "#38bdf8",
    accentSoft: "rgba(56, 189, 248, 0.16)",
    icon: Building2,
    metrics: ["126 patients", "42 doctors", "318 bills"],
    panels: ["Appointments", "Pharmacy", "Records"],
    chart: "calendar",
  },
  {
    name: "Hotel Management Software",
    tag: "Hospitality",
    description:
      "A luxury operations dashboard for bookings, rooms, reservations, check-in, and revenue.",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.16)",
    icon: Hotel,
    metrics: ["86% occupancy", "214 bookings", "Rs. 9.8L revenue"],
    panels: ["Rooms", "Bookings", "Revenue"],
    chart: "bars",
  },
  {
    name: "Wallet Software",
    tag: "Fintech",
    description:
      "A fintech wallet platform for balances, transfers, QR payments, KYC, and analytics.",
    accent: "#2563eb",
    accentSoft: "rgba(37, 99, 235, 0.18)",
    icon: WalletCards,
    metrics: ["Rs. 12.4L balance", "8.9K transfers", "1.8K QR pays"],
    panels: ["Transfers", "KYC", "Payouts"],
    chart: "wallet",
  },
  {
    name: "AI Software",
    tag: "Artificial Intelligence",
    description:
      "An intelligent workspace for AI agents, chat automation, workflows, and analytics.",
    accent: "#a855f7",
    accentSoft: "rgba(168, 85, 247, 0.18)",
    icon: Bot,
    metrics: ["24 agents", "91% resolved", "18 workflows"],
    panels: ["AI Chat", "Flows", "Knowledge"],
    chart: "line",
  },
  {
    name: "Astrology Software",
    tag: "AstroTech",
    description:
      "A premium astrology suite for kundli, horoscopes, charts, reports, and consultations.",
    accent: "#eab308",
    accentSoft: "rgba(234, 179, 8, 0.16)",
    icon: Sparkles,
    metrics: ["5.6K kundli", "42 reports", "320 consults"],
    panels: ["Kundli", "Reports", "Consults"],
    chart: "nodes",
  },
  {
    name: "ERP & Business Automation Software",
    tag: "Enterprise ERP",
    description:
      "A corporate ERP for finance, HR, inventory, CRM, analytics, and automated workflows.",
    accent: "#60a5fa",
    accentSoft: "rgba(96, 165, 250, 0.18)",
    icon: Coins,
    metrics: ["Rs. 48L finance", "218 staff", "1.2K tasks"],
    panels: ["Finance", "HR", "Inventory"],
    chart: "bars",
  },
];

const carouselSolutions = [...solutions, ...solutions.slice(0, 3)];

function KpiCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/24 p-2">
      <p className="truncate text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
      <p className="mt-1 truncate text-[0.72rem] font-semibold text-white">{value}</p>
      <div className="mt-1.5 h-1 rounded-full bg-white/10">
        <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}

function AreaChart({ accent, variant = "default" }: { accent: string; variant?: "default" | "health" | "revenue" }) {
  const path =
    variant === "health"
      ? "M22 94C52 76 78 82 106 55C138 24 166 42 194 36C228 29 250 62 286 44C314 30 324 34 338 28"
      : variant === "revenue"
        ? "M22 102C58 88 76 95 112 72C150 48 174 72 206 50C244 24 270 38 302 29C322 24 332 20 340 18"
        : "M22 96C58 78 77 42 114 56C150 70 164 98 205 70C244 42 274 28 338 39";

  return (
    <svg viewBox="0 0 360 118" className="h-20 w-full" aria-hidden="true">
      <path d="M28 28H338M28 58H338M28 88H338" stroke="white" opacity="0.07" />
      <path d={path} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <path d={`${path}V116H22Z`} fill={accent} opacity="0.13" />
    </svg>
  );
}

function CandlestickChart({ accent }: { accent: string }) {
  const candles = [
    [28, 54, 34, 70, true],
    [54, 46, 30, 62, true],
    [80, 66, 52, 82, false],
    [106, 50, 38, 72, true],
    [132, 42, 25, 68, true],
    [158, 76, 58, 94, false],
    [184, 68, 44, 84, false],
    [210, 38, 24, 61, true],
    [236, 48, 30, 70, true],
    [262, 62, 45, 86, false],
    [288, 36, 18, 60, true],
    [314, 30, 16, 52, true],
  ] as const;

  return (
    <svg viewBox="0 0 350 112" className="h-20 w-full" aria-hidden="true">
      <path d="M18 24H336M18 56H336M18 88H336" stroke="white" opacity="0.07" />
      {candles.map(([x, open, high, low, up]) => (
        <g key={x}>
          <path d={`M${x} ${high}V${low}`} stroke={up ? accent : "#fb7185"} strokeWidth="2" />
          <rect x={x - 5} y={Math.min(open, low - 8)} width="10" height="18" rx="2" fill={up ? accent : "#fb7185"} opacity="0.86" />
        </g>
      ))}
    </svg>
  );
}

function BarChart({ accent, values = [48, 72, 54, 90, 66, 82, 58] }: { accent: string; values?: number[] }) {
  return (
    <div className="flex h-20 items-end gap-1.5">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="flex-1 rounded-t-lg"
          style={{
            height: `${value}%`,
            background: `linear-gradient(180deg, ${accent}, rgba(255,255,255,0.08))`,
            opacity: 0.58 + index * 0.035,
          }}
        />
      ))}
    </div>
  );
}

function NodeChart({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 350 112" className="h-20 w-full" aria-hidden="true">
      <path d="M48 76L112 33L182 62L282 28M96 90L182 62L250 88" stroke={accent} strokeWidth="2" opacity="0.65" />
      {[
        [48, 76],
        [112, 33],
        [182, 62],
        [282, 28],
        [250, 88],
        [96, 90],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={index < 4 ? 11 : 8} fill={accent} opacity={index < 4 ? 0.2 : 0.12} />
          <circle cx={cx} cy={cy} r={index < 4 ? 4 : 3} fill={accent} />
        </g>
      ))}
    </svg>
  );
}

function DataRows({ rows, accent }: { rows: string[]; accent: string }) {
  return (
    <div className="grid gap-1.5">
      {rows.map((row, index) => (
        <div key={row} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-2 py-1.5">
          <span className="truncate text-[0.6rem] font-medium text-slate-300">{row}</span>
          <span className="size-1.5 rounded-full" style={{ backgroundColor: index % 2 === 0 ? accent : "#94a3b8" }} />
        </div>
      ))}
    </div>
  );
}

function OrderBook({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/24 p-2">
      <div className="mb-1.5 grid grid-cols-3 text-[0.52rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
        <span>Price</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Total</span>
      </div>
      {["67,420", "67,388", "67,351", "67,318"].map((price, index) => (
        <div key={price} className="relative grid grid-cols-3 overflow-hidden rounded px-1 py-0.5 text-[0.56rem] text-slate-300">
          <span className="absolute inset-y-0 right-0" style={{ width: `${35 + index * 12}%`, backgroundColor: index < 2 ? "rgba(244,63,94,0.16)" : `${accent}22` }} />
          <span className="relative text-rose-300">{price}</span>
          <span className="relative text-right">0.{index + 34}</span>
          <span className="relative text-right">{(2.4 + index).toFixed(1)}K</span>
        </div>
      ))}
    </div>
  );
}

function DashboardShell({
  solution,
  title,
  status,
  children,
}: {
  solution: SoftwareSolution;
  title: string;
  status: string;
  children: React.ReactNode;
}) {
  const Icon = solution.icon;

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#030711] p-2.5">
      <div
        className="absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: solution.accentSoft }}
      />
      <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-400/80" />
            <span className="size-2 rounded-full bg-yellow-300/80" />
            <span className="size-2 rounded-full bg-emerald-300/80" />
          </div>
          <span
            className="rounded-full border border-white/10 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em]"
            style={{ color: solution.accent, backgroundColor: solution.accentSoft }}
          >
            Online
          </span>
        </div>

        <div className="grid grid-cols-[2.8rem_1fr]">
          <aside className="border-r border-white/10 bg-black/25 p-2">
            <span
              className="mb-3 flex size-8 items-center justify-center rounded-xl text-black"
              style={{ backgroundColor: solution.accent }}
            >
              <Icon className="size-4" />
            </span>
            <div className="grid gap-1.5">
              {[title, ...solution.panels].slice(0, 4).map((panel, index) => (
                <span
                  key={panel}
                  className="flex h-6 items-center rounded-lg px-1"
                  style={{ backgroundColor: index === 0 ? `${solution.accent}36` : "rgba(255,255,255,0.075)" }}
                >
                  <span className="h-1 w-full rounded-full bg-white/35" />
                </span>
              ))}
            </div>
          </aside>

          <div className="p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-slate-500">{solution.tag}</p>
                <p className="mt-0.5 truncate text-[0.85rem] font-semibold text-white">{title}</p>
              </div>
              <span className="rounded-full px-2 py-1 text-[0.56rem] font-bold" style={{ color: solution.accent, backgroundColor: solution.accentSoft }}>
                {status}
              </span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview({ solution }: { solution: SoftwareSolution }) {
  const accent = solution.accent;

  if (solution.name === "Crypto Exchange Software") {
    return (
      <DashboardShell solution={solution} title="BTC/USDT Exchange" status="+8.42%">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Wallet" value="$48.2K" accent={accent} />
          <KpiCard label="Volume" value="$91.4M" accent={accent} />
          <KpiCard label="24H High" value="68,920" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1.15fr_0.85fr] gap-2">
          <CandlestickChart accent={accent} />
          <OrderBook accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <span className="rounded-xl bg-emerald-400/16 px-3 py-1.5 text-center text-[0.62rem] font-bold text-emerald-200">Buy BTC</span>
          <span className="rounded-xl bg-rose-400/16 px-3 py-1.5 text-center text-[0.62rem] font-bold text-rose-200">Sell BTC</span>
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Decentralized Software") {
    return (
      <DashboardShell solution={solution} title="DeFi Operations" status="Wallet Live">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Token" value="82.4K ZNT" accent={accent} />
          <KpiCard label="Staked" value="$4.2M" accent={accent} />
          <KpiCard label="Contracts" value="18 Active" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.78fr] gap-2">
          <NodeChart accent={accent} />
          <DataRows rows={["0x84...A92 swap", "Stake reward paid", "Contract verified"]} accent={accent} />
        </div>
        <div className="mt-2 rounded-xl border border-white/10 p-2" style={{ backgroundColor: solution.accentSoft }}>
          <p className="text-[0.62rem] font-semibold text-slate-200">Smart contract status: audited and synchronized</p>
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Blockchain Software") {
    return (
      <DashboardShell solution={solution} title="Network Control" status="Healthy">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Nodes" value="48 Online" accent={accent} />
          <KpiCard label="Blocks" value="9.8M" accent={accent} />
          <KpiCard label="Latency" value="42ms" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.78fr] gap-2">
          <AreaChart accent={accent} variant="health" />
          <DataRows rows={["Block #908212", "Txn pool 1,248", "Contract monitor"]} accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {[92, 84, 97, 88].map((value, index) => (
            <span key={value} className="rounded-lg border border-white/10 px-1 py-1 text-center text-[0.55rem] text-slate-300">
              N{index + 1} {value}%
            </span>
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "School Management Software") {
    return (
      <DashboardShell solution={solution} title="Campus ERP" status="Session 2026">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Students" value="2,840" accent={accent} />
          <KpiCard label="Attendance" value="94%" accent={accent} />
          <KpiCard label="Fees" value="Rs. 18L" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[0.9fr_1.1fr] gap-2">
          <BarChart accent={accent} values={[72, 84, 66, 91, 78, 88]} />
          <DataRows rows={["Exam result: 92%", "Teachers online: 64", "Bus routes: 18"]} accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[0.56rem] font-semibold text-slate-300">
          {["Admissions", "Transport", "Reports"].map((item) => (
            <span key={item} className="rounded-lg border border-white/10 px-1 py-1.5">{item}</span>
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Hospital Management Software") {
    return (
      <DashboardShell solution={solution} title="Care Command" status="OPD Live">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Patients" value="126 Today" accent={accent} />
          <KpiCard label="Doctors" value="42 Available" accent={accent} />
          <KpiCard label="Billing" value="318 Bills" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.78fr] gap-2">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 21 }).map((_, index) => (
              <span key={index} className="h-5 rounded border border-white/10" style={{ backgroundColor: index % 4 === 0 ? `${accent}38` : "rgba(255,255,255,0.07)" }} />
            ))}
          </div>
          <DataRows rows={["10:30 cardiology", "12:00 pharmacy", "14:15 lab report"]} accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <span className="rounded-xl border border-white/10 px-2 py-1.5 text-[0.58rem] text-slate-300">Pharmacy stock: 82%</span>
          <span className="rounded-xl border border-white/10 px-2 py-1.5 text-[0.58rem] text-slate-300">Reports: synced</span>
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Hotel Management Software") {
    return (
      <DashboardShell solution={solution} title="Hotel Operations" status="86% Full">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Rooms" value="86% Occupied" accent={accent} />
          <KpiCard label="Bookings" value="214" accent={accent} />
          <KpiCard label="Revenue" value="Rs. 9.8L" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.78fr] gap-2">
          <AreaChart accent={accent} variant="revenue" />
          <DataRows rows={["Suite check-in", "Deluxe reserved", "Checkout 12:00"]} accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-5 gap-1">
          {["101", "205", "306", "410", "512"].map((room, index) => (
            <span key={room} className="rounded-lg px-1 py-1 text-center text-[0.54rem] font-semibold" style={{ backgroundColor: index % 2 === 0 ? `${accent}30` : "rgba(255,255,255,0.08)", color: "#e2e8f0" }}>{room}</span>
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Wallet Software") {
    return (
      <DashboardShell solution={solution} title="Wallet Hub" status="KYC Secure">
        <div className="rounded-2xl border border-white/10 p-3" style={{ background: `linear-gradient(135deg, ${accent}46, rgba(255,255,255,0.05))` }}>
          <p className="text-[0.62rem] font-semibold text-slate-300">Available Balance</p>
          <p className="mt-1 text-2xl font-semibold text-white">Rs. 12.4L</p>
        </div>
        <div className="mt-2 grid grid-cols-[0.8fr_1.2fr] gap-2">
          <div className="grid place-items-center rounded-xl border border-white/10 bg-white/[0.045] text-[0.58rem] font-bold text-slate-200">QR Pay</div>
          <DataRows rows={["Sent to merchant", "UPI transfer", "Wallet top-up"]} accent={accent} />
        </div>
        <div className="mt-2">
          <BarChart accent={accent} values={[44, 78, 58, 86, 62, 94]} />
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "AI Software") {
    return (
      <DashboardShell solution={solution} title="AI Agent Studio" status="24 Agents">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Resolved" value="91%" accent={accent} />
          <KpiCard label="Tokens" value="1.8M" accent={accent} />
          <KpiCard label="Flows" value="18 Live" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.9fr] gap-2">
          <div className="grid gap-1.5">
            {["AI: Lead qualified", "Bot: Ticket closed", "Flow: Invoice sent"].map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-black/20 px-2 py-1.5 text-[0.58rem] text-slate-300">{item}</span>
            ))}
          </div>
          <AreaChart accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {["Chat", "Workflow", "Logs"].map((item) => (
            <span key={item} className="rounded-lg px-2 py-1.5 text-center text-[0.56rem] font-semibold" style={{ backgroundColor: `${accent}22`, color: "#e9d5ff" }}>{item}</span>
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (solution.name === "Astrology Software") {
    return (
      <DashboardShell solution={solution} title="Astro Console" status="Bookings">
        <div className="grid grid-cols-3 gap-1.5">
          <KpiCard label="Kundli" value="5.6K" accent={accent} />
          <KpiCard label="Reports" value="42" accent={accent} />
          <KpiCard label="Consults" value="320" accent={accent} />
        </div>
        <div className="mt-2 grid grid-cols-[0.8fr_1.2fr] gap-2">
          <svg viewBox="0 0 120 120" className="h-20 w-full" aria-hidden="true">
            <circle cx="60" cy="60" r="45" fill="none" stroke={accent} strokeWidth="2" opacity="0.45" />
            <circle cx="60" cy="60" r="24" fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
            <path d="M60 15V105M15 60H105M28 28L92 92M92 28L28 92" stroke={accent} opacity="0.35" />
            <circle cx="83" cy="38" r="5" fill={accent} />
          </svg>
          <DataRows rows={["Mars: Aries", "Moon: Taurus", "Consult 04:30 PM"]} accent={accent} />
        </div>
        <div className="mt-2 rounded-xl border border-white/10 px-2 py-1.5 text-[0.58rem] text-slate-300">Horoscope reports generated and ready for review</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell solution={solution} title="Enterprise Command" status="Automated">
      <div className="grid grid-cols-3 gap-1.5">
        <KpiCard label="Finance" value="Rs. 48L" accent={accent} />
        <KpiCard label="HR" value="218 Staff" accent={accent} />
        <KpiCard label="CRM" value="1.2K Leads" accent={accent} />
      </div>
      <div className="mt-2 grid grid-cols-[1fr_0.82fr] gap-2">
        <BarChart accent={accent} values={[66, 48, 82, 58, 94, 72]} />
        <DataRows rows={["Inventory +18%", "Payroll queued", "Workflow done"]} accent={accent} />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {["Finance", "Inventory", "Automation"].map((item) => (
          <span key={item} className="rounded-lg border border-white/10 px-1 py-1.5 text-center text-[0.54rem] font-semibold text-slate-300">{item}</span>
        ))}
      </div>
    </DashboardShell>
  );
}

export function SoftwareSolutionCard({ solution }: { solution: SoftwareSolution }) {
  return (
    <article
      data-solution-card
      className="solution-card solution-carousel-card group relative overflow-hidden rounded-[28px] border border-white/10 p-[1px] shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.18), ${solution.accent}75 36%, rgba(255,255,255,0.06) 68%, rgba(255,255,255,0.14))`,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-[27px] bg-[linear-gradient(180deg,#08111f_0%,#02040a_72%)] p-3">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-70 blur-3xl transition duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: solution.accentSoft,
        }}
      />
      <div className="relative">
        <DashboardPreview solution={solution} />
      </div>

      <div className="relative px-1 pb-1 pt-4">
        <span
          className="rounded-full border border-white/10 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em]"
          style={{ color: solution.accent, backgroundColor: solution.accentSoft }}
        >
          {solution.tag}
        </span>
        <h3 className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-tight text-white sm:text-2xl">{solution.name}</h3>
        <p className="solution-description mt-2 text-sm leading-6 text-slate-400">{solution.description}</p>
        <Link
          href="#contact"
          className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-blue-100"
        >
          View Details
        </Link>
      </div>
      </div>
    </article>
  );
}

export function SoftwareSolutionsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const positionIndexRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelectorAll<HTMLElement>("[data-solution-card]")[index];

    if (!viewport || !card) {
      return;
    }

    const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
    viewport.scrollTo({ left, behavior });
  }, []);

  useEffect(() => {
    const clearResetTimer = () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };

    const timer = window.setInterval(() => {
      clearResetTimer();

      const next = positionIndexRef.current + 1;
      positionIndexRef.current = next;
      scrollToIndex(next);
      setActiveIndex(next % solutions.length);

      if (next >= solutions.length) {
        resetTimerRef.current = window.setTimeout(() => {
          positionIndexRef.current = 0;
          scrollToIndex(0, "auto");
          setActiveIndex(0);
          resetTimerRef.current = null;
        }, 800);
      }
    }, 3000);

    return () => {
      window.clearInterval(timer);
      clearResetTimer();
    };
  }, [scrollToIndex]);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-solution-card]"));
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    positionIndexRef.current = nearestIndex;
    setActiveIndex(nearestIndex % solutions.length);
  }, []);

  return (
    <section id="solutions" className="relative py-12 sm:py-14 lg:py-28">
      <div className="absolute inset-x-0 top-8 -z-10 mx-auto h-[18rem] max-w-6xl rounded-full bg-blue-600/10 blur-3xl lg:top-12 lg:h-[30rem]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionShell className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
              Our Software Solutions
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:mt-5">
              Software Solutions For Every Industry
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:justify-self-end">
            Powerful software platforms designed for modern businesses, enterprises,
            organizations, and digital ecosystems.
          </p>
        </MotionShell>
      </div>

      <div className="solution-carousel-mask mt-5 lg:mt-12">
        <div
          ref={viewportRef}
          className="solution-carousel-viewport overflow-x-auto px-[5vw] pb-4 lg:px-8 lg:pb-5"
          onScroll={handleScroll}
        >
          <div className="solution-carousel-track mx-auto max-w-7xl">
            {carouselSolutions.map((solution, index) => (
              <SoftwareSolutionCard key={`${solution.name}-${index}`} solution={solution} />
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2 lg:mt-3" aria-label="Software carousel pagination">
          {solutions.map((solution, index) => (
            <button
              key={solution.name}
              type="button"
              aria-label={`Show ${solution.name}`}
              aria-current={activeIndex === index}
              onClick={() => {
                positionIndexRef.current = index;
                setActiveIndex(index);
                scrollToIndex(index);
              }}
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? "2rem" : "0.65rem",
                backgroundColor: activeIndex === index ? solution.accent : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:mt-6 lg:px-8">
        <MotionShell className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-center sm:p-6">
          <p className="text-base font-semibold text-white sm:text-lg">
            Need a custom software solution? Contact Zenith Softech for enterprise-grade development.
          </p>
          <Link
            href="#contact"
            className="mt-4 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 lg:mt-5"
          >
            Contact Zenith Softech
          </Link>
        </MotionShell>
      </div>
    </section>
  );
}
