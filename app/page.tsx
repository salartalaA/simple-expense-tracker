export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getExpenses } from "@/actions/expense";
import Header from "@/components/header";
import MainSection from "@/components/main-section";

export default async function Home() {
  const allExpenses = await getExpenses();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fbfaf9]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Header
          expensesLength={allExpenses?.length ?? 0}
          fullName={currentUser.fullName}
        />
        <MainSection allExpenses={allExpenses ?? []} />
      </div>
    </div>
  );
}
