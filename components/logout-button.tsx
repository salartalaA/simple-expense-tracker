"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      className="me-2 bg-[#5b42d7] text-white"
      onClick={async () => await logout()}
      variant={"outline"}
    >
      <LogOut />
    </Button>
  );
}
