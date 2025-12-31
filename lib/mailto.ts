import { siteConfig } from "@/config/site";

interface RoomEmailParams {
  roomName: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

/**
 * Generates a generic reservation email mailto link
 * Used for general booking inquiries without specific room details
 */
export function generateGenericReservationEmail(): string {
  const email = siteConfig.contact.email;
  const subject = encodeURIComponent("Reservation Inquiry - DEBREDAMO HOTEL");
  const body = encodeURIComponent(
    `Dear DEBREDAMO HOTEL,

I would like to inquire about availability and make a reservation.

Guest Details:
Name:
Email:
Phone:

Reservation Details:
Check-in Date:
Check-out Date:
Number of Guests:
Room Type Preference:

Special Requests:


Looking forward to your response.

Best regards`
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Generates a room-specific reservation email mailto link
 * Used when booking a specific room type
 */
export function generateRoomSpecificEmail(params: RoomEmailParams): string {
  const email = siteConfig.contact.email;
  const { roomName, checkIn, checkOut, guests } = params;

  const subject = encodeURIComponent(
    `Reservation Request - ${roomName} at DEBREDAMO HOTEL`
  );

  let bodyText = `Dear DEBREDAMO HOTEL,

I would like to make a reservation for the ${roomName}.

Guest Details:
Name:
Email:
Phone:
`;

  if (checkIn || checkOut || guests) {
    bodyText += `\nReservation Details:\n`;
    if (checkIn) bodyText += `Check-in Date: ${checkIn}\n`;
    if (checkOut) bodyText += `Check-out Date: ${checkOut}\n`;
    if (guests) bodyText += `Number of Guests: ${guests}\n`;
  } else {
    bodyText += `\nReservation Details:
Check-in Date:
Check-out Date:
Number of Guests:
`;
  }

  bodyText += `\nSpecial Requests:


Looking forward to your confirmation.

Best regards`;

  const body = encodeURIComponent(bodyText);

  return `mailto:${email}?subject=${subject}&body=${body}`;
}
