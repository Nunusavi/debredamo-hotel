import Link from 'next/link';
import { getAllRooms } from '@/lib/cms/rooms';
import RoomsTable from './rooms-table';

export default async function RoomsListPage() {
  const rooms = await getAllRooms();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Rooms Management</h2>
        <Link
          href="/admin/rooms/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Room
        </Link>
      </div>

      <RoomsTable rooms={rooms} />
    </div>
  );
}
