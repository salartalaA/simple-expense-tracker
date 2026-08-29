import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import SignupPage from "./_signup";

export default async function Signup() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/");
  }

  return <SignupPage />;
}
