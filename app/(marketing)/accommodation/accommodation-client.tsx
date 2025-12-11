'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/rooms/room-card';
import RoomGrid from '@/components/rooms/room-grid';
import RoomFilters, { type FilterState } from '@/components/rooms/room-filters';
import type { Room } from '@/types';

interface AccommodationClientProps {
  rooms: Room[];
}

export default function AccommodationClient({ rooms }: AccommodationClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'popularity',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let filtered = [...rooms];

    // Filter by room type
    if (filters.roomType && filters.roomType !== 'all') {
      filtered = filtered.filter((room) => room.room_type === filters.roomType);
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(
        (room) =>
          room.base_price_etb >= filters.priceRange![0] &&
          room.base_price_etb <= filters.priceRange![1]
      );
    }

    // Filter by guest count
    if (filters.guests) {
      filtered = filtered.filter((room) => room.max_guests >= filters.guests!);
    }

    // Sort rooms
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.base_price_etb - b.base_price_etb);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.base_price_etb - a.base_price_etb);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'size-asc':
        filtered.sort((a, b) => (a.size_sqm || 0) - (b.size_sqm || 0));
        break;
      case 'size-desc':
        filtered.sort((a, b) => (b.size_sqm || 0) - (a.size_sqm || 0));
        break;
      case 'popularity':
      default:
        // Default to display order
        filtered.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    }

    return filtered;
  }, [rooms, filters]);

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Page Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="sticky top-24">
              <RoomFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 xl:col-span-9">
            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <RoomFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm border border-navy-100">
              <div>
                <h2 className="text-xl lg:text-2xl font-serif font-bold text-navy-700">
                  Available Rooms
                </h2>
                <p className="text-navy-500 mt-1 text-sm lg:text-base">
                  {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}{' '}
                  found
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={
                    viewMode === 'grid'
                      ? 'bg-gold-500 hover:bg-gold-600 text-white'
                      : 'hover:bg-navy-50 border-navy-200'
                  }
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={
                    viewMode === 'list'
                      ? 'bg-gold-500 hover:bg-gold-600 text-white'
                      : 'hover:bg-navy-50 border-navy-200'
                  }
                  aria-label="List view"
                >
                  <LayoutList className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Room Grid/List */}
            {filteredRooms.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-navy-100 shadow-sm">
                <div className="max-w-md mx-auto px-4">
                  <p className="text-navy-700 text-lg font-semibold mb-2">
                    No rooms match your current filters.
                  </p>
                  <p className="text-navy-500">
                    Try adjusting your search criteria to see more options.
                  </p>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <RoomGrid rooms={filteredRooms} />
            ) : (
              <div className="space-y-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
