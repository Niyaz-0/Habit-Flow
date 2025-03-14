// app/admin/components/DashboardCards.tsx
"use client";
import React from "react";

type DashboardCardsProps = {
  totalUsers: number;
  activeCount: number;
  bannedCount: number;
  adminCount: number;
  totalHabits: number;
  recentlyJoinedCount: number;
};

export default function DashboardCards({
  totalUsers,
  activeCount,
  bannedCount,
  adminCount,
  totalHabits,
  recentlyJoinedCount,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card color="bg-blue-600" title="Total Users" value={totalUsers} />
      <Card color="bg-green-600" title="Active Users" value={activeCount} />
      <Card color="bg-red-600" title="Banned Users" value={bannedCount} />
      <Card color="bg-purple-600" title="Admin Users" value={adminCount} />
      <Card color="bg-yellow-600" title="Total Habits" value={totalHabits} />
      <Card color="bg-pink-600" title="Recently Joined" value={recentlyJoinedCount} />
    </div>
  );
}

function Card({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: number;
}) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-lg flex flex-col`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
