"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Expense } from "@/types/expense";
import Expenses from "./expenses";

export default function MainSection({
  allExpenses,
}: {
  allExpenses: Expense[];
}) {
  const [filteredExpenses, setFilteredExpenses] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const displayExpenses = allExpenses
    .filter((expense) => {
      const matchSearch = expense.title
        .toLowerCase()
        .includes(filteredExpenses.toLowerCase());

      const matchCategory =
        selectCategory === "all" ||
        expense.category.name.toLowerCase() === selectCategory;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortBy === "newest") {
        return dateB - dateA;
      }
      if (sortBy === "oldest") {
        return dateA - dateB;
      }
      if (sortBy === "highest") {
        return b.amount - a.amount;
      }
      if (sortBy === "lowest") {
        return a.amount - b.amount;
      }

      return 0;
    });

  return (
    <>
      <div className="gap-3 md:flex">
        <div className="w-full">
          <div className="flex w-full items-center rounded-lg border-2 border-[#e3e5e8] py-1">
            <Search className="ml-3 text-[#676f7e]" size={16} />
            <input
              className="ml-2 w-full border-none p-1 text-sm outline-none"
              onChange={(e) => setFilteredExpenses(e.target.value)}
              placeholder="Search expenses ..."
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3 md:mt-0">
          <Select defaultValue="all" onValueChange={setSelectCategory}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="newest" onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
                <SelectItem value="lowest">Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Expenses expenses={displayExpenses} />
    </>
  );
}
