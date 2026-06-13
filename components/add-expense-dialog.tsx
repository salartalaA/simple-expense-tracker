"use client";

import { GraduationCap, Plus, Receipt, Utensils } from "lucide-react";
import { useState } from "react";
import { createExpense } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AddExpenseDialog() {
  const categories = [
    {
      id: "cmqbfo7460000yohu39g4ynf7",
      label: "Food",
      icon: Utensils,
    },
    {
      id: "cmqbfo8oa0001yohud3hof7mc",
      label: "Education",
      icon: GraduationCap,
    },
    {
      id: "cmqbfo8u60002yohugjryeh4l",
      label: "Bills",
      icon: Receipt,
    },
  ] as const;

  const [openState, setOpenState] = useState(false);

  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[number]["id"]
  >("cmqbfo7460000yohu39g4ynf7");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await createExpense(formData);

    setOpenState(false);
  };

  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <form id="add-expense-form" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            className="cursor-pointer rounded-xl bg-[#5b42d7] px-8.5 py-5 font-semibold"
            // variant={"default"}
          >
            <Plus /> Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">
              Add Expense
            </DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="spend">What did you spend on?</Label>
              <Input
                form="add-expense-form"
                id="spend"
                name="spend"
                placeholder="e.g. Coffee, Groceries, Uber..."
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  form="add-expense-form"
                  id="amount"
                  name="amount"
                  placeholder="0"
                  required
                  type="number"
                />
              </Field>

              <Field>
                <Label htmlFor="date">Date</Label>
                <Input
                  defaultValue={"2026-06-10"}
                  form="add-expense-form"
                  id="date"
                  name="date"
                  required
                  type="date"
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="date">Category</Label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  form="add-expense-form"
                  name="category"
                  type="hidden"
                  value={activeCategory}
                />
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;

                  return (
                    <Button
                      className={cn(
                        "rounded-lg",
                        isActive && "bg-[#5b42d7] text-white"
                      )}
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      type="button"
                      variant={"secondary"}
                    >
                      <category.icon />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              className="w-full rounded-lg bg-[#5b42d7] py-5 font-semibold text-base"
              form="add-expense-form"
              type="submit"
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
