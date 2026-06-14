"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// const data = [
//   {
//     name: "Food",
//     value: 35,
//     fill: "#fb923c",
//   },
//   {
//     name: "Bills",
//     value: 25,
//     fill: "#dc2626",
//   },
//   {
//     name: "Education",
//     value: 20,
//     fill: "#4f46e5",
//   },
// ];

export function ExpensePieChart({ data }: { data: any }) {
  return (
    <div className="h-48 w-48">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Tooltip />

          <Pie
            data={data}
            dataKey="amount"
            innerRadius={45}
            nameKey="name"
            outerRadius={80}
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
