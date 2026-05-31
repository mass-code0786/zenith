import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const [totalDemoRequests, newRequests, activeDemos, contactMessages] =
    await Promise.all([
      prisma.demoRequest.count(),
      prisma.demoRequest.count({ where: { status: "New" } }),
      prisma.demo.count({ where: { isPublished: true } }),
      prisma.inquiry.count(),
    ]);

  return NextResponse.json({
    totalDemoRequests,
    newRequests,
    activeDemos,
    contactMessages,
  });
}
