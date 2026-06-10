"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Expenses } from "@/components/expenses";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MainSection() {
  const [filteredExpenses, setFilteredExpenses] = useState<
    string | undefined
  >();

  return (
    <>
      <div className="flex gap-3">
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
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="bills">Bills</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select defaultValue="newest">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select a fruit" />
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
      <Expenses filteredExpenses={filteredExpenses} />
    </>
  );
}
