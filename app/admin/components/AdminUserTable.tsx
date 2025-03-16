// app/admin/components/AdminUserTable.tsx
"use client";
import React from "react";
import ActionsDropdown from "./ActionsDropdown";

export type UserType = {
  clerkUserId: string;
  username: string;
  emailAddress: string;
  role: string;
  active: boolean;
};

type AdminUserTableProps = {
  users: UserType[];
};

export default function AdminUserTable({ users }: AdminUserTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Clerk User ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: UserType) => (
            <tr key={user.clerkUserId} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.clerkUserId}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.emailAddress}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {user.active ? "Active" : "Inactive"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                <ActionsDropdown userId={user.clerkUserId} active={user.active} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
