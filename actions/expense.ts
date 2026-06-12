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
