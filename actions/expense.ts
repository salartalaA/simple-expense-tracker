"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createExpense(formData: FormData) {
  const spend = formData.get("spend") as string;
  const amount = Number(formData.get("amount"));
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;

  await prisma.expense.create({
    data: {
      title: spend,
      amount,
      date: new Date(date),
      categoryId: category,
    },
  });

  revalidatePath("/");
}

export async function getExpenses() {
  return await prisma.expense.findMany({
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getExpenseByCategory(category: string) {
  return await prisma.expense.aggregate({
    where: {
      category: {
        name: category,
      },
    },
    _sum: {
      amount: true,
    },
  });
}

export async function totalExpenses() {
  return await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
  });
}

const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

export async function thisMonth() {
  return await prisma.expense.aggregate({
    where: {
      date: {
        gte: firstDayOfMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });
}

export async function avgExpenses() {
  return await prisma.expense.aggregate({
    _avg: {
      amount: true,
    },
  });
}

export async function deleteExpense(id: string) {
  await prisma.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}
