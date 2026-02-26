"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Room } from '@/lib/cms/rooms';
import ImageUpload from '@/components/admin/image-upload';
import { getUserError, logError } from '@/lib/errors';

const ROOM_TYPES = [
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'executive', label: 'Executive' },
  { value: 'presidential', label: 'Presidential' },
];

const COMMON_AMENITIES = [
  'Air Conditioning',
  'Free WiFi',
  'Free High-Speed WiFi',
  'Satellite TV',
  'Smart TV',
  'Mini Bar',
  'Mini Fridge',
  'Electronic safe',
  'Work Desk',
  'Seating Area',
  'Private Bathroom',
  'Complimentary Toiletries',
  'Premium Toiletries',
  'Bathrobes & Slippers',
  'Daily Housekeeping',
  '24/7 Room Service',
  'City View',
  'Panoramic City View',
  'Balcony',
  'Separate Living Room',
  'Dining Area',
  'Office Workspace',
  'Multiple Rooms',
  'Private Lounge Area',
  'Jacuzzi',
  'Bathtub',
];

interface RoomFormProps {
  room?: Room;
  isEdit?: boolean;
}

export default function RoomForm({ room, isEdit = false }: RoomFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: room?.name || '',
    name_am: room?.name_am || '',
    slug: room?.slug || '',
    description: room?.description || '',
    description_am: room?.description_am || '',
    room_type: room?.room_type || 'standard',
    size_sqm: room?.size_sqm || null,
    max_guests: room?.max_guests || 1,
    base_price_etb: room?.base_price_etb || 0,
    amenities: room?.amenities || [],
    // Convert RoomImage[] to string[] for ImageUpload component
    images: room?.images ? room.images.map(img => typeof img === 'string' ? img : img.url) : [],
    is_active: room?.is_active ?? true,
    display_order: room?.display_order || 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert string[] images to RoomImage[] format for API
      const payload = {
        ...formData,
        size_sqm: formData.size_sqm || null,
        images: formData.images.map(url => ({ url, alt: '' })),
      };

      console.log('Submitting room data:', payload);

      const url = isEdit ? `/api/admin/rooms/${room?.id}` : '/api/admin/rooms';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show detailed error including validation details
        const errorMessage = data.error || 'Failed to save room';
        const details = data.details ? JSON.stringify(data.details, null, 2) : '';
        setError(`${errorMessage}${details ? '\n\nDetails:\n' + details : ''}`);
        logError('Room save error', data);
        setLoading(false);
        return;
      }

      router.push('/admin/rooms');
      router.refresh();
    } catch (err) {
      const userError = getUserError(err);
      setError(userError.message);
      logError('Room form error', err);
      setLoading(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="deluxe-room"
        />
      </div>

      {/* Description Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Type *
          </label>
          <select
            value={formData.room_type}
            onChange={(e) => setFormData({ ...formData, room_type: e.target.value as any })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {ROOM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size (m²)
          </label>
          <input
            type="number"
            value={formData.size_sqm || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                size_sqm: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Guests *
          </label>
          <input
            type="number"
            value={formData.max_guests}
            onChange={(e) =>
              setFormData({ ...formData, max_guests: parseInt(e.target.value) })
            }
            required
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (ETB) *
          </label>
          <input
            type="number"
            value={formData.base_price_etb}
            onChange={(e) =>
              setFormData({ ...formData, base_price_etb: parseInt(e.target.value) })
            }
            required
            min={0}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Images *
        </label>
        <ImageUpload
          images={formData.images}
          onChange={(images) => setFormData({ ...formData, images })}
          maxImages={15}
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {COMMON_AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.display_order}
            onChange={(e) =>
              setFormData({ ...formData, display_order: parseInt(e.target.value) })
            }
            min={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Room' : 'Create Room'}
        </button>
      </div>
    </form>
  );
}
