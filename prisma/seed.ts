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
  },
  {
    name: "Education",
    icon: "GraduationCap",
  },
  {
    name: "Bills",
    icon: "Receipt",
  },
];

export async function main() {
  for (const u of categoryData) {
    await prisma.category.create({ data: u });
  }
}

main();
