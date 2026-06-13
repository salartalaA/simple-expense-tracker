import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../app/generated/prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "Food",
    icon: "Utensils",
    className: "bg-orange-100 text-orange-600",
  },
  {
    name: "Education",
    icon: "GraduationCap",
    className: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Bills",
    icon: "Receipt",
    className: "bg-red-100 text-red-600",
  },
];

export async function main() {
  for (const u of categoryData) {
    await prisma.category.create({ data: u });
  }
}

main();
