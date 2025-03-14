// app/admin/export/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExportDataPage() {
  const { data, error } = useSWR("/api/users", fetcher);
  const [exporting, setExporting] = useState(false);

  if (error) return <div>Error loading user data.</div>;
  if (!data) return <div>Loading user data...</div>;

  const users = data.users || [];

  function handleExportCSV() {
    setExporting(true);

    // Convert to CSV
    const header = ["username", "clerkUserId", "emailAddress", "role", "active"];
    const rows = users.map((u: any) => [
      u.username,
      u.clerkUserId,
      u.emailAddress,
      u.role,
      u.active ? "Active" : "Inactive",
    ]);

    let csvContent = header.join(",") + "\n";
    rows.forEach((row: string[]) => {
      csvContent += row.join(",") + "\n";
    });

    // Create a downloadable link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExporting(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Export Data</h1>
      <p className="mb-4">
        Export the current list of users (filtered or full) as CSV.
      </p>
      <button
        onClick={handleExportCSV}
        disabled={exporting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {exporting ? "Exporting..." : "Export as CSV"}
      </button>
    </div>
  );
}
