import { AddExpenseDialog } from "./add-expense-dialog";

export default function Header() {
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
      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-lg">
            All Expenses
            <span className="ml-2 font-normal text-[#676f7e] text-sm">(8)</span>
          </h2>
        </div>
      </div>
    </>
  );
}
