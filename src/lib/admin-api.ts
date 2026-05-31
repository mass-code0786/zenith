import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import {
  analyticsDisconnectedResponse,
  GoogleAnalyticsNotConnectedError,
} from "@/lib/google-analytics-data";

export async function requireAdmin() {
  const admin = await getAdminFromSession();

  if (!admin) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  return { admin, response: null };
}

export function analyticsRouteError(error: unknown) {
  if (error instanceof GoogleAnalyticsNotConnectedError) {
    return NextResponse.json(analyticsDisconnectedResponse());
  }

  console.error(error);
  return NextResponse.json(
    { error: "Unable to load Google Analytics data." },
    { status: 500 },
  );
}

