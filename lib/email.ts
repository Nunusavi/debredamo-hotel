import { Resend } from "resend";
import { format } from "date-fns";
import { formatCurrency } from "./utils";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ReservationConfirmationProps {
  guestEmail: string;
  guestName: string;
  confirmationId: string;
  checkIn: string;
  checkOut: string;
  roomName: string;
  totalPrice: number;
}

interface AdminNotificationProps {
  reservationId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  roomName: string;
  numGuests: number;
  totalPrice: number;
  specialRequests?: string;
}

export async function sendReservationConfirmation({
  guestEmail,
  guestName,
  confirmationId,
  checkIn,
  checkOut,
  roomName,
  totalPrice,
}: ReservationConfirmationProps) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #1A2332;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1A2332 0%, #2A3F5F 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .confirmation-box {
            background: #FEF9F1;
            border: 2px solid #B8860B;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }
          .confirmation-id {
            font-size: 24px;
            font-weight: bold;
            color: #B8860B;
            font-family: monospace;
          }
          .details {
            background: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            color: #6B7280;
          }
          .value {
            font-weight: 600;
            color: #1A2332;
          }
          .footer {
            background: #F9FAFB;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            color: #6B7280;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            background: #B8860B;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">DEBREDAMO HOTEL</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Reservation Confirmation</p>
        </div>

        <div class="content">
          <h2 style="color: #1A2332; margin-top: 0;">Dear ${guestName},</h2>

          <p>Thank you for choosing DEBREDAMO HOTEL! We have received your reservation request.</p>

          <div class="confirmation-box">
            <p style="margin: 0 0 10px 0; color: #6B7280;">Confirmation ID</p>
            <div class="confirmation-id">${confirmationId}</div>
          </div>

          <h3 style="color: #1A2332;">Reservation Details</h3>
          <div class="details">
            <div class="detail-row">
              <span class="label">Check-in</span>
              <span class="value">${format(
                checkInDate,
                "EEEE, MMMM dd, yyyy"
              )}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-out</span>
              <span class="value">${format(
                checkOutDate,
                "EEEE, MMMM dd, yyyy"
              )}</span>
            </div>
            <div class="detail-row">
              <span class="label">Room</span>
              <span class="value">${roomName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Price</span>
              <span class="value" style="color: #B8860B; font-size: 18px;">${formatCurrency(
                totalPrice
              )}</span>
            </div>
          </div>

          <h3 style="color: #1A2332;">What Happens Next?</h3>
          <ol style="color: #4B5563;">
            <li style="margin-bottom: 10px;">Our team will review your reservation request</li>
            <li style="margin-bottom: 10px;">We will contact you within 24 hours to confirm availability</li>
            <li style="margin-bottom: 10px;">Once confirmed, we'll send payment instructions</li>
          </ol>

          <p style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0;">
            <strong>Important:</strong> This is a reservation request, not a confirmed booking.
            We will contact you shortly to finalize your reservation.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:reservations@debredamohotel.com" class="button">Contact Us</a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>DEBREDAMO HOTEL</strong></p>
          <p style="margin: 5px 0;">Addis Ababa, Ethiopia</p>
          <p style="margin: 5px 0;">Phone: +251116612630</p>
          <p style="margin: 5px 0;">Email: reservations@debredamohotel.com</p>
        </div>
      </body>
    </html>
  `;

  const textContent = `
DEBREDAMO HOTEL - Reservation Confirmation

Dear ${guestName},

Thank you for choosing DEBREDAMO HOTEL! We have received your reservation request.

Confirmation ID: ${confirmationId}

Reservation Details:
- Check-in: ${format(checkInDate, "EEEE, MMMM dd, yyyy")}
- Check-out: ${format(checkOutDate, "EEEE, MMMM dd, yyyy")}
- Room: ${roomName}
- Total Price: ${formatCurrency(totalPrice)}

What Happens Next?
1. Our team will review your reservation request
2. We will contact you within 24 hours to confirm availability
3. Once confirmed, we'll send payment instructions

Important: This is a reservation request, not a confirmed booking. We will contact you shortly to finalize your reservation.

Contact Us:
Phone: +251116612630
Email: reservations@debredamohotel.com

DEBREDAMO HOTEL
Addis Ababa, Ethiopia
  `;

  // Skip email sending if Resend is not configured
  if (!resend) {
    console.log("Resend API key not configured. Skipping confirmation email.");
    console.log(`Would have sent confirmation email to: ${guestEmail}`);
    return;
  }

  try {
    await resend.emails.send({
      from: "DEBREDAMO HOTEL <reservations@debredamohotel.com>",
      to: guestEmail,
      subject: `Reservation Confirmation - ${confirmationId}`,
      html: htmlContent,
      text: textContent,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}

export async function sendAdminNotification({
  reservationId,
  guestName,
  guestEmail,
  guestPhone,
  checkIn,
  checkOut,
  roomName,
  numGuests,
  totalPrice,
  specialRequests,
}: AdminNotificationProps) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #1A2332;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #DC2626;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .details {
            background: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            color: #6B7280;
            font-weight: 600;
            display: inline-block;
            width: 150px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">🔔 New Reservation Request</h1>
        </div>

        <div class="content">
          <p style="color: #DC2626; font-weight: bold; font-size: 16px;">
            Action Required: Review and confirm this reservation
          </p>

          <h3>Reservation ID: ${reservationId}</h3>

          <div class="details">
            <div class="detail-row">
              <span class="label">Guest Name:</span>
              <span>${guestName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span>${guestEmail}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span>${guestPhone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-in:</span>
              <span>${format(checkInDate, "EEEE, MMMM dd, yyyy")}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-out:</span>
              <span>${format(checkOutDate, "EEEE, MMMM dd, yyyy")}</span>
            </div>
            <div class="detail-row">
              <span class="label">Room:</span>
              <span>${roomName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Number of Guests:</span>
              <span>${numGuests}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Price:</span>
              <span style="color: #B8860B; font-weight: bold;">${formatCurrency(
                totalPrice
              )}</span>
            </div>
            ${
              specialRequests
                ? `
            <div class="detail-row">
              <span class="label">Special Requests:</span>
              <div style="margin-top: 10px; padding: 10px; background: white; border: 1px solid #e5e7eb; border-radius: 4px;">
                ${specialRequests}
              </div>
            </div>
            `
                : ""
            }
          </div>

          <p style="background: #FEF9F1; border-left: 4px solid #B8860B; padding: 15px; margin: 20px 0;">
            <strong>Next Steps:</strong><br>
            1. Check room availability for the requested dates<br>
            2. Contact the guest to confirm the reservation<br>
            3. Update the reservation status in the admin panel
          </p>
        </div>
      </body>
    </html>
  `;

  // Skip email sending if Resend is not configured
  if (!resend) {
    console.log(
      "Resend API key not configured. Skipping admin notification email."
    );
    console.log(
      `Would have sent admin notification for reservation: ${reservationId}`
    );
    return;
  }

  try {
    await resend.emails.send({
      from: "DEBREDAMO HOTEL System <system@debredamohotel.com>",
      to: process.env.ADMIN_EMAIL || "admin@debredamohotel.com",
      subject: `New Reservation Request - ${reservationId}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error sending admin notification:", error);
    throw error;
  }
}

interface ContactNotificationProps {
  submissionId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export async function sendContactNotification({
  submissionId,
  name,
  email,
  phone,
  subject,
  message,
  submittedAt,
}: ContactNotificationProps) {
  const submittedDate = new Date(submittedAt);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #1A2332;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #2563EB;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .details {
            background: #F9FAFB;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            color: #6B7280;
            font-weight: 600;
            display: inline-block;
            width: 120px;
          }
          .message-box {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
        </div>

        <div class="content">
          <p style="color: #2563EB; font-weight: bold; font-size: 16px;">
            You have received a new message from your website contact form.
          </p>

          <h3>Submission ID: ${submissionId}</h3>

          <div class="details">
            <div class="detail-row">
              <span class="label">Name:</span>
              <span>${name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span><a href="mailto:${email}">${email}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span>${phone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Subject:</span>
              <span><strong>${subject}</strong></span>
            </div>
            <div class="detail-row">
              <span class="label">Submitted:</span>
              <span>${format(submittedDate, "EEEE, MMMM dd, yyyy 'at' hh:mm a")}</span>
            </div>
          </div>

          <h3>Message:</h3>
          <div class="message-box">
${message}
          </div>

          <p style="background: #EFF6FF; border-left: 4px solid #2563EB; padding: 15px; margin: 20px 0;">
            <strong>Action Required:</strong><br>
            Please respond to this inquiry within 24 hours to ensure excellent customer service.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display: inline-block; background: #2563EB; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">
              Reply to Customer
            </a>
          </div>
        </div>

        <div style="background: #F9FAFB; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #6B7280; font-size: 14px;">
          <p style="margin: 0;"><strong>DEBREDAMO HOTEL</strong> - Contact Form Notification</p>
        </div>
      </body>
    </html>
  `;

  const textContent = `
DEBREDAMO HOTEL - New Contact Form Submission

Submission ID: ${submissionId}

Contact Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Submitted: ${format(submittedDate, "EEEE, MMMM dd, yyyy 'at' hh:mm a")}

Message:
${message}

---
Please respond to this inquiry within 24 hours.
Reply to: ${email}
  `;

  // Skip email sending if Resend is not configured
  if (!resend) {
    console.log("Resend API key not configured. Skipping contact notification email.");
    console.log(`Would have sent contact notification for submission: ${submissionId}`);
    return;
  }

  try {
    await resend.emails.send({
      from: "DEBREDAMO HOTEL System <system@debredamohotel.com>",
      to: process.env.ADMIN_EMAIL || "info@debredamohotel.com",
      subject: `New Contact Form: ${subject}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    });
  } catch (error) {
    console.error("Error sending contact notification:", error);
    throw error;
  }
}
