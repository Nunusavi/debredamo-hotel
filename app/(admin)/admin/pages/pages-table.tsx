'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { logError } from '@/lib/errors';

interface Page {
  id: string;
  slug: string;
  title: string;
  titleAm: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PagesTableProps {
  pages: Page[];
}

export default function PagesTable({ pages }: PagesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }

      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      logError('Error deleting page', error);
      alert('Failed to delete page. Please try again.');
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slug
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.map((page) => (
            <tr key={page.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {page.title}
                </div>
                {page.titleAm && (
                  <div className="text-sm text-gray-500">{page.titleAm}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="px-2 py-1 bg-gray-100 text-xs rounded">
                  /{page.slug}
                </code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    page.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {page.isPublished ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDistanceToNow(new Date(page.updatedAt), {
                  addSuffix: true,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/pages/${page.id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(page.id, page.title)}
                  disabled={deletingId === page.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === page.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No pages found. Create your first page!</p>
        </div>
      )}
    </div>
  );
}
