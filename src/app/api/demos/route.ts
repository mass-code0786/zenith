import { NextResponse } from "next/server";
import { getAdminFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/upload";

export const runtime = "nodejs";

export async function GET() {
  const demos = await prisma.demo.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(demos);
}

export async function POST(request: Request) {
  const admin = await getAdminFromSession();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const liveLink = String(formData.get("liveLink") ?? "").trim() || null;

  if (!title || !description || !category) {
    return NextResponse.json({ error: "Title, description, and category are required." }, { status: 400 });
  }

  const imageUrl = await saveUpload(formData.get("image") as File | null, "images");
  const videoUrl = await saveUpload(formData.get("video") as File | null, "videos");
  const downloadUrl = await saveUpload(formData.get("download") as File | null, "downloads");

  const demo = await prisma.demo.create({
    data: {
      title,
      description,
      category,
      liveLink,
      imageUrl,
      videoUrl,
      downloadUrl,
      isPublished: true,
    },
  });

  return NextResponse.json(demo, { status: 201 });
}
