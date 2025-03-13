// app/admin/components/AdminUserTable.tsx
"use client";
import React from "react";

type UserType = {
  clerkUserId: string;
  emailAddress: string;
  role: string;
  active: boolean;
  firstName?: string;
};

type AdminUserTableProps = {
  users: UserType[];
};

export default function AdminUserTable({ users }: AdminUserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Clerk User ID</th>
            <th className="border px-2 py-1">Email Address</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserType) => (
            <tr key={user.clerkUserId} className="border-b hover:bg-gray-100">
              <td className="border px-2 py-1">{user.clerkUserId}</td>
              <td className="border px-2 py-1">{user.emailAddress}</td>
              <td className="border px-2 py-1">{user.role}</td>
              <td className="border px-2 py-1">{user.active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
