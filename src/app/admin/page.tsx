import { Background } from "@/components/background";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminPanel } from "@/components/admin-panel";
import { Nav } from "@/components/nav";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Demo, DemoRequest, Inquiry } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await getAdminFromSession();

  let demos: Demo[] = [];
  let inquiries: Inquiry[] = [];
  let demoRequests: DemoRequest[] = [];

  if (admin) {
    [demos, inquiries, demoRequests] = await Promise.all([
      prisma.demo.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
  }

  return (
    <>
      <Background />
      <Nav />
      <main className="min-h-[calc(100svh-73px)] py-10">
        {admin ? <AdminPanel demos={demos} inquiries={inquiries} demoRequests={demoRequests} /> : <AdminLoginForm />}
      </main>
    </>
  );
}
