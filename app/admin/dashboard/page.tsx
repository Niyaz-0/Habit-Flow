// app/admin/dashboard/page.tsx
"use client";

import React from "react";
import AdminDashboard from "@/app/admin/components/AdminDashboard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
}
