"use client";

import { useState } from "react";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { roomTypes } from "@/config/site";
import { PRICE_RANGES, GUEST_COUNTS, ROOM_SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface FilterState {
  roomType?: string;
  priceRange?: [number, number];
  guests?: number;
  sortBy?: string;
}

// Alias for backwards compatibility
export type RoomFilters = FilterState;

interface RoomFiltersProps {
  filters: RoomFilters;
  onFiltersChange: (filters: RoomFilters) => void;
}

export default function RoomFiltersComponent({
  filters,
  onFiltersChange,
}: RoomFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = !!(
    filters.roomType ||
    filters.priceRange ||
    filters.guests
  );

  const handleFilterChange = (
    key: keyof RoomFilters,
    value: RoomFilters[keyof RoomFilters]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      sortBy: filters.sortBy, // Keep sort option
    });
  };

  const handlePriceRangeChange = (rangeString: string) => {
    if (rangeString === "all") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { priceRange, ...rest } = filters;
      onFiltersChange(rest);
      return;
    }

    const range = PRICE_RANGES.find((r) => `${r.min}-${r.max}` === rangeString);
    if (range) {
      handleFilterChange("priceRange", [range.min, range.max]);
    }
  };

  const getPriceRangeValue = () => {
    if (!filters.priceRange) return "all";
    return `${filters.priceRange[0]}-${filters.priceRange[1]}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-green-100">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between py-6 px-4 hover:bg-green-50 rounded-lg"
        >
          <span className="flex items-center gap-2 text-gray-900 font-medium">
            <Filter className="w-5 h-5 text-green-500" />
            Filters & Sort
            {hasActiveFilters && (
              <Badge className="bg-green-500 text-white hover:bg-green-600 ml-1">
                {
                  Object.values(filters).filter(
                    (v) => v !== undefined && v !== "popularity"
                  ).length
                }
              </Badge>
            )}
          </span>
          <SlidersHorizontal
            className={cn(
              "w-5 h-5 transition-transform text-gray-500",
              isExpanded && "rotate-90"
            )}
          />
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-green-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Filters & Sort
          </h3>
          {hasActiveFilters && (
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              {
                Object.values(filters).filter(
                  (v) => v !== undefined && v !== "popularity"
                ).length
              }
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Container */}
      <div
        className={cn("p-4 lg:p-6 space-y-6", !isExpanded && "hidden lg:block")}
      >
        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Active Filters
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {filters.roomType && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-green-50 text-gray-900 hover:bg-green-100 pl-3 pr-2 py-1.5"
                >
                  {
                    roomTypes.find((t) => t.value === filters.roomType)?.label
                      .en
                  }
                  <button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { roomType, ...rest } = filters;
                      onFiltersChange(rest);
                    }}
                    className="ml-1 hover:text-green-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
              {filters.priceRange && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-green-50 text-gray-900 hover:bg-green-100 pl-3 pr-2 py-1.5"
                >
                  ETB {filters.priceRange[0].toLocaleString()} -{" "}
                  {filters.priceRange[1].toLocaleString()}
                  <button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { priceRange, ...rest } = filters;
                      onFiltersChange(rest);
                    }}
                    className="ml-1 hover:text-green-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
              {filters.guests && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-green-50 text-gray-900 hover:bg-green-100 pl-3 pr-2 py-1.5"
                >
                  {filters.guests} {filters.guests === 1 ? "guest" : "guests"}
                  <button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { guests, ...rest } = filters;
                      onFiltersChange(rest);
                    }}
                    className="ml-1 hover:text-green-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 lg:hidden h-7"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Room Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              Room Type
            </label>
            <Select
              value={filters.roomType || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "roomType",
                  value === "all" ? undefined : value
                )
              }
            >
              <SelectTrigger className="bg-white border-green-200 hover:border-green-400 focus:border-green-500 transition-colors">
                <SelectValue placeholder="All rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All rooms</SelectItem>
                {roomTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              Price Range
            </label>
            <Select
              value={getPriceRangeValue()}
              onValueChange={handlePriceRangeChange}
            >
              <SelectTrigger className="bg-white border-green-200 hover:border-green-400 focus:border-green-500 transition-colors">
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any price</SelectItem>
                {PRICE_RANGES.map((range, index) => (
                  <SelectItem key={index} value={`${range.min}-${range.max}`}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Guests Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              Guests
            </label>
            <Select
              value={filters.guests?.toString() || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  "guests",
                  value === "all" ? undefined : parseInt(value)
                )
              }
            >
              <SelectTrigger className="bg-white border-green-200 hover:border-green-400 focus:border-green-500 transition-colors">
                <SelectValue placeholder="Any number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any number</SelectItem>
                {GUEST_COUNTS.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} {count === 1 ? "guest" : "guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              Sort By
            </label>
            <Select
              value={filters.sortBy || "popularity"}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="bg-white border-green-200 hover:border-green-400 focus:border-green-500 transition-colors">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {ROOM_SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
