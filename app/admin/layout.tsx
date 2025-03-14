// app/admin/layout.tsx
import { getAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Sidebar from "./components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Construct a NextRequest instance with a dummy URL and current headers.
  const req = new NextRequest("http://localhost/admin", { headers: headers() });
  const { userId } = getAuth(req);
  console.log(userId);
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await clerkClient.users.getUser(userId);
  if (user.publicMetadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
