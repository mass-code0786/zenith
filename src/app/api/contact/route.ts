import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid inquiry data." }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({ data: parsed.data });
  return NextResponse.json(inquiry, { status: 201 });
}

export async function GET() {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(inquiries);
}
