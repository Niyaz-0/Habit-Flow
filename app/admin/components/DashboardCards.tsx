// app/admin/components/DashboardCards.tsx
"use client";
import React from "react";

type DashboardCardsProps = {
  totalUsers: number;
  activeCount: number;
  bannedCount: number;
  adminCount: number;
};

export default function DashboardCards({ totalUsers, activeCount, bannedCount, adminCount }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Total Users</h3>
        <p className="text-2xl">{totalUsers}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Active Users</h3>
        <p className="text-2xl">{activeCount}</p>
      </div>
      <div className="bg-red-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Banned Users</h3>
        <p className="text-2xl">{bannedCount}</p>
      </div>
      <div className="bg-purple-500 text-white p-4 rounded shadow">
        <h3 className="text-lg">Admin Users</h3>
        <p className="text-2xl">{adminCount}</p>
      </div>
    </div>
  );
}
