"use client";

import { useState } from "react";
import RoomCard from "./room-card";
import type { Room } from "@/types";
import { Button } from "@/components/ui/button";

interface RoomGridProps {
  rooms: Room[];
  locale?: "en" | "am";
  initialLimit?: number;
}

export default function RoomGrid({
  rooms,
  locale = "en",
  initialLimit,
}: RoomGridProps) {
  const [displayLimit, setDisplayLimit] = useState(
    initialLimit || rooms.length
  );

  const displayedRooms = initialLimit ? rooms.slice(0, displayLimit) : rooms;
  const hasMore = initialLimit && displayLimit < rooms.length;

  const handleLoadMore = () => {
    setDisplayLimit((prev) => Math.min(prev + initialLimit!, rooms.length));
  };

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-green-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No rooms found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-800">
          Showing <span className="font-semibold">{displayedRooms.length}</span>{" "}
          of <span className="font-semibold">{rooms.length}</span> rooms
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayedRooms.map((room, index) => (
          <RoomCard
            key={room.id}
            room={room}
            locale={locale}
            featured={index === 0} // First room is featured
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="border-green-300 text-gray-800 hover:bg-green-50"
          >
            Load More Rooms
          </Button>
        </div>
      )}
    </div>
  );
}
