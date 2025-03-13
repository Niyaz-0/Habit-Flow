// app/admin/layout.tsx
import { getAuth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { clerkClient } from '@clerk/nextjs/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass the request headers to getAuth
  const { userId } = getAuth(headers() as unknown as Request);
  if (!userId) {
    redirect('/sign-in');
  }
  const user = await clerkClient.users.getUser(userId);
  if (user.publicMetadata.role !== 'admin') {
    redirect('/');
  }

  return <div className="admin-container">{children}</div>;
}
