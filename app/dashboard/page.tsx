"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [chartData] = useState<number[]>(() =>
    Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard SHST</h1>

      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Últimos 90 dias
      </h3>

      <div className="h-40 flex items-end gap-1">
        {chartData.map((value, index) => (
          <div
            key={index}
            style={{ height: `${value}%` }}
            className="flex-1 bg-blue-500 rounded-t"
          />
        ))}
      </div>
    </div>
  );
}
