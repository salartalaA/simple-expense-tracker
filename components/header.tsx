import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { avgExpenses, thisMonth, totalExpenses } from "@/actions/expense";
import { AddExpenseDialog } from "./add-expense-dialog";
import HeaderCard from "./header-card";

export default async function Header({
  expensesLength,
}: {
  expensesLength: number;
}) {
  const allExpensesAmount = (await totalExpenses())._sum.amount;
  const thisMonthAmount = (await thisMonth())._sum.amount;
  const avgExpensesAmount = (await avgExpenses())._avg.amount;

  const headerCardItems = [
    {
      id: "total-spent",
      title: "Total Spent",
      customIcon: Wallet,
      amount: allExpensesAmount,
      className: "text-[#5b42d7]",
    },
    {
      id: "this-month",
      title: "This Month",
      customIcon: TrendingUp,
      amount: thisMonthAmount,
      className: "text-[#39ac86]",
    },
    {
      id: "avg-expense",
      title: "Avg / Expense",
      customIcon: TrendingDown,
      amount: avgExpensesAmount,
      className: "text-[#d74273]",
    },
  ] as const;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl tracking-tight sm:text-4xl">
            Expenses
          </h1>
          <p className="mt-1 text-[#676f7e]">Track and manage your spending</p>
        </div>
        <AddExpenseDialog />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {headerCardItems.map((item) => (
            <HeaderCard
              amount={item.amount}
              customIcon={
                <item.customIcon className={item.className} size={20} />
              }
              key={item.id}
              title={item.title}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-lg">
            All Expenses
            <span className="ml-2 font-normal text-[#676f7e] text-sm">
              ({expensesLength})
            </span>
          </h2>
        </div>
      </div>
    </>
  );
}
