export const dynamic = "force-dynamic";

import { getExpenses } from "@/actions/expense";
import Header from "@/components/header";
import MainSection from "@/components/main-section";

export default async function Home() {
  const allExpenses = await getExpenses();

  return (
    <div className="min-h-screen bg-[#fbfaf9]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Header expensesLength={allExpenses.length} />
        <MainSection allExpenses={allExpenses} />
      </div>
    </div>
  );
}
