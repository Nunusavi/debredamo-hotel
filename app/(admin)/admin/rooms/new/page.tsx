import RoomForm from '@/components/admin/forms/room-form';

export default function NewRoomPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New Room</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <RoomForm />
      </div>
    </div>
  );
}
