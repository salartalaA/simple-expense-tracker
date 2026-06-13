import { Lock, Mail, Wallet } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="mx-auto flex min-h-screen min-w-120 max-w-7xl flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-fit rounded-xl border p-3 shadow">
          <Wallet className="text-[#5b42d7]" size={34} />
        </div>
        <h2 className="font-semibold text-3xl">Welcome Back</h2>
        <p className="font-normal text-[#676f7e] text-base">
          Sign in to continue managing your expenses
        </p>
      </div>

      <div className="mt-4 w-full rounded-xl border p-6 shadow">
        <form action={loginUser} className="space-y-6">
          {/* Start email field */}
          <Field>
            <Label htmlFor="email">Email</Label>

            <div className="flex w-full items-center rounded-lg border-2 border-[#e3e5e8] py-1">
              <Mail className="ml-3 text-[#676f7e]" size={20} />
              <input
                className="ml-2 w-full border-none p-1 text-sm outline-none"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
              />
            </div>
          </Field>
          {/* End email field */}

          {/* Start password field */}
          <Field>
            <Label htmlFor="password">Password</Label>

            <div className="flex w-full items-center rounded-lg border-2 border-[#e3e5e8] py-1">
              <Lock className="ml-3 text-[#676f7e]" size={20} />
              <input
                className="ml-2 w-full border-none p-1 text-sm outline-none"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
          </Field>
          {/* End password field */}

          <Button
            className="w-full rounded-lg bg-[#5b42d7] py-5 font-semibold text-base"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>

      <p className="font-normal text-[#676f7e] text-sm">
        Don't have an account?{" "}
        <Link className="text-[#5b42d7]" href={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
}
