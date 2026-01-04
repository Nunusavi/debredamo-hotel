import { getRoomById } from '@/lib/cms/rooms';
import RoomForm from '@/components/admin/forms/room-form';
import { notFound } from 'next/navigation';

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Room</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <RoomForm room={room} isEdit={true} />
      </div>
    </div>
  );
}
