// app/admin/users/page.tsx
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";
import AdminUserTable from "../components/AdminUserTable";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const router = useRouter();
  // Fetch users
  const { data, error } = useSWR("/api/users", fetcher, { refreshInterval: 5000 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("username");

  // Pagination state with 10 rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (error) return <div>Error loading user data.</div>;
  if (!data) return <div>Loading...</div>;

  const users = data.users || [];

  // Filter logic
  const filteredUsers = users.filter((user: any) => {
    if (!searchTerm) return true;
    const value = String(user[filterColumn] ?? "").toLowerCase();
    return value.includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterColumn={filterColumn}
        setFilterColumn={setFilterColumn}
      />
      <AdminUserTable users={paginatedUsers} />
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
