"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function createUser(formData: FormData) {
  const fullName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const sessionId = crypto.randomUUID();

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.deleteMany({
      where: {
        id: sessionId,
      },
    });

    return;
  }

  return session.user;
}

export async function logout() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  const deleteSession = await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  if (deleteSession) {
    cookieStore.delete("session");
  }

  redirect("/login");
}
