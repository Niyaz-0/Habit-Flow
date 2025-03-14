// app/admin/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import AppIcon from "../../SVG_Icons/AppIcon";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col">
      {/* Logo / Branding */}
      <div className="flex items-center mb-8">
        {/* If you have a real logo, replace src */}
        <AppIcon color="#ffffff" height="34" width="34" />
        <span className="font-bold text-xl">Habit Stacker</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/activity-logs"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Activity Logs
            </Link>
          </li>
          <li>
            <Link
              href="/admin/export"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Export Data
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sign Out (Clerk) */}
      <div className="mt-8">
        <SignOutButton>
          <button className="text-red-600 hover:underline">Sign out</button>
        </SignOutButton>
      </div>
    </div>
  );
}
