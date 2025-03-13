// app/admin/components/DashboardCards.tsx
"use client";
import React from "react";

type DashboardCardsProps = {
  userCount: number;
  activeCount: number;
};

export default function DashboardCards({ userCount, activeCount }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-blue-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Total Users</h3>
        <p className="text-2xl">{userCount}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Active Users</h3>
        <p className="text-2xl">{activeCount}</p>
      </div>
    </div>
  );
}
