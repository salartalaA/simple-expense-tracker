import { GraduationCap, Receipt, Utensils } from "lucide-react";
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

interface Expense {
  amount: string;
  category: string;
  className: string;
  date: string;
  icon: React.JSX.Element;
  title: string;
}

export function Expenses({
  filteredExpenses,
}: {
  filteredExpenses: string | undefined;
}) {
  const expenses: Expense[] = [
    {
      title: "Snapp! Food",
      icon: <Utensils />,
      className: "bg-orange-100 text-orange-600",
      date: "Jun 9, 2026",
      category: "Food",
      amount: "$25.00",
    },
    {
      title: "Online courses",
      icon: <GraduationCap />,
      className: "bg-indigo-100 text-indigo-600",
      date: "Jun 7, 2026",
      category: "Education",
      amount: "$35.00",
    },
    {
      title: "Electric bill",
      icon: <Receipt />,
      className: "bg-red-100 text-red-600",
      date: "Jun 4, 2026",
      category: "Bills",
      amount: "$45.00",
    },
  ];

  return (
    // <ItemGroup className="mt-4">
    //   {expenses.map((expense) => (
    //     <Item
    //       className="rounded-xl bg-white transition-colors duration-150 hover:bg-[#f6f4f4]"
    //       key={expense.title}
    //     >
    //       <ItemMedia
    //         className={cn(
    //           "flex size-10 items-center justify-center rounded-lg p-2.5",
    //           expense.className
    //         )}
    //       >
    //         {expense.icon}
    //       </ItemMedia>
    //       <ItemContent>
    //         <ItemTitle className="font-semibold text-base">
    //           {expense.title}
    //         </ItemTitle>
    //         <ItemDescription className="text-xs">
    //           {expense.date} <span className="mx-1">.</span> {expense.category}
    //         </ItemDescription>
    //       </ItemContent>
    //       {/* <ItemActions>
    //         <Button className="rounded-full" size="icon" variant="ghost">
    //           <PlusIcon />
    //         </Button>
    //       </ItemActions> */}
    //       <ItemActions className="mr-10 font-bold text-lg">
    //         {expense.amount}
    //       </ItemActions>
    //     </Item>
    //   ))}
    // </ItemGroup>

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
            {expense.icon}
          </ItemMedia>

          <ItemContent>
            <ItemTitle className="font-semibold text-base">
              {expense.title}
            </ItemTitle>

            <ItemDescription className="text-xs">
              {expense.date} <span className="mx-1">.</span> {expense.category}
            </ItemDescription>
          </ItemContent>

          {/* <ItemActions>
        <Button className="rounded-full" size="icon" variant="ghost">
          <PlusIcon />
        </Button>
      </ItemActions> */}

          <ItemActions className="mr-10 font-bold text-lg">
            {expense.amount}
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  );
}
