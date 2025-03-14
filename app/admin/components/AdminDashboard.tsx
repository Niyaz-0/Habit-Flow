// app/admin/components/AdminDashboard.tsx
"use client";

import useSWR from "swr";
import { useState } from "react";
import DashboardCards from "./DashboardCards";
import AdminUserTable from "./AdminUserTable";
import SearchBar from "./SearchBar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  // Fetch user data every 5 seconds for near realtime updates.
  const { data, error } = useSWR("/api/users", fetcher, { refreshInterval: 5000 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("username");

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  // Data comes in the shape { users: [...] }
  const users = data.users || [];

  // Filter users based on search term and selected column.
  const filteredUsers = users.filter((user: any) => {
    if (!searchTerm) return true;
    const value = String(user[filterColumn] ?? "").toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  // Compute additional dashboard values.
  const totalUsers = users.length;
  const activeCount = users.filter((user: any) => user.active).length;
  const bannedCount = totalUsers - activeCount;
  const adminCount = users.filter((user: any) => user.role.toLowerCase() === "admin").length;

  return (
    <div className="p-4">
      <DashboardCards
        totalUsers={totalUsers}
        activeCount={activeCount}
        bannedCount={bannedCount}
        adminCount={adminCount}
      />
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filterColumn={filterColumn}
        setFilterColumn={setFilterColumn}
      />
      <AdminUserTable users={filteredUsers} />
    </div>
  );
}
