-- Drop foreign key constraints and tables in correct order
-- This migration removes the reservation and availability functionality

-- Drop reservation_requests table (has foreign key to rooms)
DROP TABLE IF EXISTS "reservation_requests" CASCADE;

-- Drop availability table (has foreign key to rooms)
DROP TABLE IF EXISTS "availability" CASCADE;

-- Drop the enums that are no longer needed
DROP TYPE IF EXISTS "ReservationStatus";
