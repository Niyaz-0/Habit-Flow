// app/admin/activity-logs/page.tsx
"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivityLogsPage() {
  const { data, error } = useSWR("/api/logs", fetcher);

  if (error) return <div>Error loading logs.</div>;
  if (!data) return <div>Loading logs...</div>;

  // Suppose data.logs is an array of logs
  const logs = data.logs || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
      <div className="space-y-2">
        {logs.length === 0 && <p>No recent activity.</p>}
        {logs.map((log: any) => (
          <div key={log.id} className="p-2 bg-white shadow rounded">
            <p className="text-sm text-gray-700">
              <strong>Action:</strong> {log.action}
            </p>
            <p className="text-sm text-gray-700">
              <strong>User:</strong> {log.userId}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Timestamp:</strong> {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
