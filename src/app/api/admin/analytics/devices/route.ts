import { NextResponse } from "next/server";
import { analyticsRouteError, requireAdmin } from "@/lib/admin-api";
import { getDeviceAnalytics } from "@/lib/google-analytics-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const { response } = await requireAdmin();

  if (response) {
    return response;
  }

  try {
    return NextResponse.json({
      connected: true,
      data: await getDeviceAnalytics(),
    });
  } catch (error) {
    return analyticsRouteError(error);
  }
}

