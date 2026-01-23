import React from "react";
import { notFound } from "next/navigation";
import { getRoomBySlug, getAllRooms } from "@/lib/data";
import RoomDetailClient from "./room-detail-client";

// Revalidate this page every 60 seconds (ISR - Incremental Static Regeneration)
// This ensures data updates appear within 60 seconds even if revalidatePath fails
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
  // Unwrap params using React.use() pattern for async params
  const unwrappedParams = await params;
  const { slug } = unwrappedParams;

  // Fetch room data
  const room = await getRoomBySlug(slug);
  const allRooms = await getAllRooms();

  if (!room) {
    notFound();
  }

  // Get related rooms for comparison
  const relatedRooms = allRooms
    .filter((r) => r.slug !== slug)
    .slice(0, 3);

  return <RoomDetailClient room={room} relatedRooms={relatedRooms} />;
}
