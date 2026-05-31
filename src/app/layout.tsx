import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenith Softech | Software, Websites & Digital Platforms",
  description:
    "Premium software development company building websites, dashboards, admin panels, ERP, CRM, automation tools, and custom digital platforms.",
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "32x32" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/favicon-256.png", sizes: "256x256", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#020617] text-slate-50">{children}</body>
    </html>
  );
}
