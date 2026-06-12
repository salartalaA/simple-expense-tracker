import { Trash } from "lucide-react";
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

export default function Expenses({
  expenses,
  filteredExpenses,
}: {
  expenses: Expense[];
  filteredExpenses: string | undefined;
}) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDeleteExprense = async (id: string) => {
    await deleteExpense(id);
  };

  return (
    <ItemGroup className="mt-4">
      {(filteredExpenses
        ? expenses.filter((expense) =>
            expense.title
              .toLocaleLowerCase()
              .includes(filteredExpenses.toLocaleLowerCase())
          )
        : expenses
      ).map((expense) => (
        <Item
          className="rounded-xl bg-white transition-colors duration-150 hover:bg-[#f6f4f4]"
          key={expense.title}
        >
          <ItemMedia
            className={cn(
              "flex size-10 items-center justify-center rounded-lg p-2.5",
              expense.className
            )}
          >
            {/* {expense.icon} */}
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="font-semibold text-base">
              {expense.title}
            </ItemTitle>

            <ItemDescription className="text-xs">
              {dateFormatter.format(expense.date)}{" "}
              <span className="mx-1">.</span> {expense.category.name}
            </ItemDescription>
          </ItemContent>

          <p className="mr-10 font-bold text-lg">{expense.amount}$</p>

          <ItemActions onClick={() => handleDeleteExprense(expense.id)}>
            <Button className="rounded-full" size="icon" variant="ghost">
              <Trash />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
