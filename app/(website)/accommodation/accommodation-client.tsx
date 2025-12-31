"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/rooms/room-card";
import RoomGrid from "@/components/rooms/room-grid";
import RoomFilters, { type FilterState } from "@/components/rooms/room-filters";
import type { Room } from "@/types";

interface AccommodationClientProps {
  rooms: Room[];
}

export default function AccommodationClient({
  rooms,
}: AccommodationClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "popularity",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let filtered = [...rooms];

    // Filter by room type
    if (filters.roomType && filters.roomType !== "all") {
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
      case "price-asc":
        filtered.sort((a, b) => a.base_price_etb - b.base_price_etb);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.base_price_etb - a.base_price_etb);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "size-asc":
        filtered.sort((a, b) => (a.size_sqm || 0) - (b.size_sqm || 0));
        break;
      case "size-desc":
        filtered.sort((a, b) => (b.size_sqm || 0) - (a.size_sqm || 0));
        break;
      case "popularity":
      default:
        // Default to display order
        filtered.sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0)
        );
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
            <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-white to-green-50 rounded-2xl p-6 shadow-lg border-2 border-green-100">
              <div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900">
                  Available Rooms
                </h2>
                <p className="text-gray-600 mt-2 text-base lg:text-lg flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">
                    {filteredRooms.length}
                  </span>
                  {filteredRooms.length === 1 ? "room" : "rooms"} found
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg"
                      : "hover:bg-green-50 border-2 border-green-200 hover:border-green-400"
                  }
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg"
                      : "hover:bg-green-50 border-2 border-green-200 hover:border-green-400"
                  }
                  aria-label="List view"
                >
                  <LayoutList className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Room Grid/List */}
            {filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-200 shadow-lg">
                <div className=" mx-auto px-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="text-gray-900 text-xl font-bold mb-3">
                    No rooms match your current filters
                  </p>
                  <p className="text-gray-600 text-lg">
                    Try adjusting your search criteria to see more options
                  </p>
                </div>
              </div>
            ) : viewMode === "grid" ? (
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
