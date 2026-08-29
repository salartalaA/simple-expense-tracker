"use client";

import * as Icons from "lucide-react";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { deleteExpense } from "@/actions/expense";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import type { Expense } from "@/types/expense";
import { Button } from "./ui/button";

function DynamicIcon({ name, className }: { name: string; className: string }) {
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    return <Icons.HelpCircle className={className} />;
  }

  return <LucideIcon className={className} />;
}

export default function Expenses({ expenses }: { expenses: Expense[] }) {
  const [loading, setLoading] = useState(false);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDeleteExpense = async (id: string) => {
    setLoading(true);
    await deleteExpense(id);
  };

  if (expenses.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 text-sm">
        No expenses found matching the category.
      </div>
    );
  }

  return (
    <ItemGroup className="mt-4">
      {expenses.map((expense) => (
        <Item
          className="rounded-xl bg-white transition-colors duration-150 hover:bg-[#f6f4f4]"
          key={expense.id}
        >
          <ItemMedia
            className={cn(
              "flex size-10 items-center justify-center rounded-lg p-2.5",
              expense.category.className
            )}
          >
            <DynamicIcon className="size-5" name={expense.category.icon} />
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="font-semibold text-base">
              {expense.title}
            </ItemTitle>

            <ItemDescription className="text-xs">
              {dateFormatter.format(new Date(expense.date))}{" "}
              <span className="mx-1">.</span> {expense.category.name}
            </ItemDescription>
          </ItemContent>
          <p className="font-bold text-lg md:mr-10">${expense.amount}</p>
          <ItemActions onClick={() => handleDeleteExpense(expense.id)}>
            <Button
              className="rounded-full"
              disabled={loading}
              size="icon"
              variant="ghost"
            >
              {loading ? <Loader2 className="animte-spin" /> : <Trash />}
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
