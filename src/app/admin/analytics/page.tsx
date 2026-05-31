import { AdminAnalyticsDashboard } from "@/components/admin-analytics-dashboard";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Background } from "@/components/background";
import { Nav } from "@/components/nav";
import { getAdminFromSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const admin = await getAdminFromSession();

  return (
    <>
      <Background />
      <Nav />
      <main className="min-h-[calc(100svh-73px)] py-10">
        {admin ? <AdminAnalyticsDashboard /> : <AdminLoginForm />}
      </main>
    </>
  );
}

