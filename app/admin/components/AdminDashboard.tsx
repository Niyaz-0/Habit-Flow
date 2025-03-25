// app/admin/components/AdminDashboard.tsx
"use client";

import useSWR from "swr";
import { useMemo } from "react";
import DashboardCards from "./DashboardCards";

const fetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then((res) => res.json());

export default function AdminDashboard() {
  // Always call hooks
  const { data: userData, error: userError } = useSWR("/api/users", fetcher, {
    refreshInterval: 5000,
  });
  const { data: habitData, error: habitError } = useSWR("/api/habits", fetcher);

  // Fallback values if data isn't available yet
  const users = userData?.users || [];
  const totalUsers = users.length;
  const activeCount = users.filter((u: any) => u.active).length;
  const bannedCount = totalUsers - activeCount;
  const adminCount = users.filter((u: any) => u.role?.toLowerCase() === "admin").length;
  const totalHabits = habitData?.habits ? habitData.habits.length : 0;
  console.log("Habits:", habitData);
  console.log("Users:", userData);

const now = Date.now();
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const recentlyJoinedCount = users.filter((u: any) => {
  // Check for both createdAt and created_at
  let timestamp = null;
  if (u.createdAt) {
    timestamp = new Date(u.createdAt).getTime();
  } else if (u.created_at) {
    timestamp = Number(u.created_at);
  }
  // Log for debugging
  console.log("User:", u.username, "timestamp:", timestamp);
  if (!timestamp) return false;
  return now - timestamp < SEVEN_DAYS;
}).length;

  // Always call useMemo
  const stats = useMemo(
    () => ({
      totalUsers,
      activeCount,
      bannedCount,
      adminCount,
      totalHabits,
      recentlyJoinedCount,
    }),
    [totalUsers, activeCount, bannedCount, adminCount, totalHabits, recentlyJoinedCount]
  );

  // Now conditionally render UI after all hooks have been called.
  if (userError || habitError) {
    return <div>Error loading data.</div>;
  }
  if (!userData || !habitData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <DashboardCards {...stats} />
    </div>
  );
}
