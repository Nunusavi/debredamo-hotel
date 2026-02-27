'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Room } from '@/lib/cms/rooms';
import { logError } from '@/lib/errors';

interface RoomsTableProps {
  rooms: Room[];
}

export default function RoomsTable({ rooms }: RoomsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/admin/rooms/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      logError('Error deleting room', error);
      alert('Failed to delete room. Please try again.');
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price (ETB)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Guests
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-green-700">
                  {room.name}
                </div>
                {room.name_am && (
                  <div className="text-sm text-gray-500">{room.name_am}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {room.room_type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {room.base_price_etb.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {room.max_guests}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    room.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {room.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/rooms/${room.id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(room.id, room.name)}
                  disabled={deletingId === room.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === room.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No rooms found. Add your first room!</p>
        </div>
      )}
    </div>
  );
}
