import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const allowedStatuses = new Set(["New", "Contacted", "Completed"]);

export async function PATCH(request: Request, context: RouteContext) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" && allowedStatuses.has(body.status) ? body.status : undefined;
  const notes = typeof body?.notes === "string" ? body.notes : undefined;
  const followUp = typeof body?.followUp === "string" ? body.followUp : undefined;

  const demoRequest = await prisma.demoRequest.update({
    where: { id },
    data: { status, notes, followUp },
  });

  return NextResponse.json(demoRequest);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.demoRequest.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
