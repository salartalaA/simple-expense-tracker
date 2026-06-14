import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  avgExpenses,
  getExpenseByCategory,
  thisMonth,
  totalExpenses,
} from "@/actions/expense";
import { AddExpenseDialog } from "./add-expense-dialog";
import { ExpensePieChart } from "./expense-pie-chart";
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

  const categories = [
    {
      name: "Food",
      amount: (await getExpenseByCategory("Food"))._sum.amount ?? 0,
      color: "#fb923c",
      fill: "#fb923c",
    },
    {
      name: "Bills",
      amount: (await getExpenseByCategory("Bills"))._sum.amount ?? 0,
      color: "#dc2626",
      fill: "#dc2626",
    },
    {
      name: "Education",
      amount: (await getExpenseByCategory("Education"))._sum.amount ?? 0,
      color: "#4f46e5",
      fill: "#4f46e5",
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

        <div className="rounded-xl border bg-card p-6 text-[#14181f] shadow">
          <h3 className="mb-4 font-semibold text-lg">Spending by Category</h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ExpensePieChart data={categories} />
            <div className="w-full flex-1 space-y-2.5">
              {categories.map((category) => (
                <div
                  className="flex items-center justify-between"
                  key={category.name}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>

                  <span className="font-semibold text-sm tabular-nums">
                    ${category.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
