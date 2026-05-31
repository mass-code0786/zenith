import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  const demo = await prisma.demo.update({
    where: { id },
    data: {
      title: body?.title,
      description: body?.description,
      category: body?.category,
      liveLink: body?.liveLink,
      isPublished:
        typeof body?.isPublished === "boolean" ? body.isPublished : undefined,
    },
  });

  return NextResponse.json(demo);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.demo.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
