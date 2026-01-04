import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/admin/logout-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If no session, render plain layout (for login page)
  // The middleware will handle redirecting to login if needed
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              DEBREDAMO HOTEL - Admin Panel
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {session.name}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/rooms"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Rooms
              </Link>
              <Link
                href="/admin/pages"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Pages
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
