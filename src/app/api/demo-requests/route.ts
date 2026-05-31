import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const requestSchema = z.object({
  fullName: z.string().min(2),
  mobileNumber: z.string().min(8),
  whatsappNumber: z.string().min(8),
  email: z.union([z.email(), z.literal("")]).optional(),
  companyName: z.string().optional(),
  interestedSoftware: z.string().min(2),
  message: z.string().min(3),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid demo request data." }, { status: 400 });
  }

  const data = parsed.data;
  const demoRequest = await prisma.demoRequest.create({
    data: {
      ...data,
      email: data.email || null,
      companyName: data.companyName || null,
      status: "New",
    },
  });

  return NextResponse.json(demoRequest, { status: 201 });
}

export async function GET(request: Request) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const status = searchParams.get("status")?.trim();

  const demoRequests = await prisma.demoRequest.findMany({
    where: {
      ...(status && status !== "All" ? { status } : {}),
      ...(query
        ? {
            OR: [
              { fullName: { contains: query } },
              { mobileNumber: { contains: query } },
              { whatsappNumber: { contains: query } },
              { email: { contains: query } },
              { interestedSoftware: { contains: query } },
              { companyName: { contains: query } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(demoRequests);
}
