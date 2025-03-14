// app/admin/users/page.tsx
"use client";

import React, { useState } from "react";
import useSWR from "swr";
import SearchBar from "../components/SearchBar";
import AdminUserTable from "../components/AdminUserTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  // 1) SWR to fetch all users
  const { data, error } = useSWR("/api/users", fetcher, { refreshInterval: 5000 });
  // 2) Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("username");
  // 3) Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // e.g., 5 users per page

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
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // Page handlers
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

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
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
