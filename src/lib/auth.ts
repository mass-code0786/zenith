import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const cookieName = "zenith_admin_token";

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? "local-zenith-softech-development-secret",
  );
}

export async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@zenithsoftech.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (existing) {
    return existing;
  }

  return prisma.adminUser.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
}

export async function createAdminSession(adminId: string) {
  const token = await new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecret());
    const adminId = verified.payload.adminId;

    if (typeof adminId !== "string") {
      return null;
    }

    return prisma.adminUser.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, name: true },
    });
  } catch {
    return null;
  }
}
