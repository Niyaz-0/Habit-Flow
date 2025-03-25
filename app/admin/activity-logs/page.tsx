"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ActivityLogsPage() {
  const { data, error } = useSWR("/api/logs", fetcher);

  if (error) return <div>Error loading logs.</div>;
  if (!data) return <div>Loading logs...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
      <div className="space-y-2">
        {data.logs?.length === 0 && <p>No recent activity.</p>}
        {data.logs?.map((log: any) => (
          <div key={log._id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-sm ${
                log.action === "delete" ? "bg-red-100 text-red-800" :
                log.action === "ban" ? "bg-orange-100 text-orange-800" :
                "bg-green-100 text-green-800"
              }`}>
                {log.action.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                <span className="font-medium">Admin:</span> {log.adminEmail}
              </p>
              <p className="text-sm">
                <span className="font-medium">Target User:</span> {log.targetEmail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}