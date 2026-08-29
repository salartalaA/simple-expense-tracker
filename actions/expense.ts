"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./auth";

export async function createExpense(formData: FormData) {
  const spend = formData.get("spend") as string;
  const amount = Number(formData.get("amount"));
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  await prisma.expense.create({
    data: {
      title: spend,
      amount,
      date: new Date(date),
      categoryId: category,
      userId: currentUser.id,
    },
  });

  revalidatePath("/");
}

export async function getExpenses() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return await prisma.expense.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getExpenseByCategory(category: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return await prisma.expense.aggregate({
    where: {
      category: {
        name: category,
      },
      userId: currentUser.id,
    },
    _sum: {
      amount: true,
    },
  });
}

export async function totalExpenses() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId: currentUser.id,
    },
  });
}

const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

export async function thisMonth() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return await prisma.expense.aggregate({
    where: {
      date: {
        gte: firstDayOfMonth,
      },
      userId: currentUser.id,
    },
    _sum: {
      amount: true,
    },
  });
}

export async function avgExpenses() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return await prisma.expense.aggregate({
    _avg: {
      amount: true,
    },
    where: {
      userId: currentUser.id,
    },
  });
}

export async function deleteExpense(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  await prisma.expense.delete({
    where: {
      id,
      userId: currentUser.id,
    },
  });

  revalidatePath("/");
}
