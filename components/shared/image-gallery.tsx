"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { RoomImage } from "@/types";

interface ImageGalleryProps {
  images: RoomImage[];
  roomName: string;
}

export default function ImageGallery({ images, roomName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const hasImages = images && images.length > 0;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  if (!hasImages) {
    return (
      <div className="w-full h-[500px] bg-green-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Maximize2 className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <p className="text-gray-600">No images available</p>
        </div>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-green-100 group">
        {!imageError[selectedIndex] ? (
          <>
            <Image
              src={currentImage.url}
              alt={currentImage.alt || roomName}
              fill
              className="object-cover"
              priority={selectedIndex === 0}
              onError={() => handleImageError(selectedIndex)}
            />

            {/* Expand Button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors z-10"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Maximize2 className="w-16 h-16 text-green-300 mx-auto mb-2" />
              <p className="text-gray-500">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative aspect-video rounded-lg overflow-hidden transition-all",
                selectedIndex === index
                  ? "ring-2 ring-gold-500 ring-offset-2"
                  : "hover:ring-2 hover:ring-green-300 hover:ring-offset-2 opacity-70 hover:opacity-100"
              )}
            >
              {!imageError[index] ? (
                <Image
                  src={image.url}
                  alt={image.alt || `${roomName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-green-300" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full">
              {!imageError[selectedIndex] ? (
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || roomName}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(selectedIndex)}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white">Image unavailable</p>
                </div>
              )}
            </div>

            {/* Navigation in Lightbox */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
