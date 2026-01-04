import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import PagesTable from './pages-table';

export default async function PagesListPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Pages Management</h2>
        <Link
          href="/admin/pages/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Page
        </Link>
      </div>

      <PagesTable pages={pages} />
    </div>
  );
}
