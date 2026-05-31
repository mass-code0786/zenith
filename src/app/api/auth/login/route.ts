import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminSession, ensureDefaultAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const admin = await ensureDefaultAdmin();

  if (body.email !== admin.email) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const valid = await bcrypt.compare(body.password, admin.passwordHash);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  await createAdminSession(admin.id);
  return NextResponse.json({ ok: true });
}
