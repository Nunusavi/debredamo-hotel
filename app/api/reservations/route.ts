import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { format } from 'date-fns';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📩 Received reservation request:', body);

    // Extract data
    const {
      check_in,
      check_out,
      num_guests,
      room_name,
      guest_first_name,
      guest_last_name,
      guest_email,
      guest_phone,
      special_requests,
      total_price,
    } = body;

    // Simple validation
    if (!check_in || !check_out || !num_guests || !room_name || !guest_first_name || !guest_email || !guest_phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const guestName = `${guest_first_name} ${guest_last_name || ''}`.trim();
    const confirmationId = `RES-${Date.now()}`;

    // Create email content
    const emailHtml = `
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
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              color: #6B7280;
              font-weight: 600;
            }
            .value {
              color: #1A2332;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🏨 New Reservation Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Debredamo Hotel</p>
          </div>

          <div class="content">
            <div class="confirmation-box">
              <p style="margin: 0 0 10px 0; color: #6B7280;">Confirmation ID</p>
              <div class="confirmation-id">${confirmationId}</div>
            </div>

            <h3 style="color: #1A2332;">Guest Information</h3>
            <div class="details">
              <div class="detail-row">
                <span class="label">Name:</span>
                <span class="value">${guestName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${guest_email}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span class="value">${guest_phone}</span>
              </div>
            </div>

            <h3 style="color: #1A2332;">Reservation Details</h3>
            <div class="details">
              <div class="detail-row">
                <span class="label">Check-in:</span>
                <span class="value">${format(checkInDate, 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <div class="detail-row">
                <span class="label">Check-out:</span>
                <span class="value">${format(checkOutDate, 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <div class="detail-row">
                <span class="label">Room:</span>
                <span class="value">${room_name}</span>
              </div>
              <div class="detail-row">
                <span class="label">Guests:</span>
                <span class="value">${num_guests}</span>
              </div>
              ${total_price ? `
              <div class="detail-row">
                <span class="label">Total Price:</span>
                <span class="value" style="color: #B8860B; font-weight: bold;">ETB ${total_price.toLocaleString()}</span>
              </div>
              ` : ''}
              ${special_requests ? `
              <div class="detail-row">
                <span class="label">Special Requests:</span>
                <div style="margin-top: 10px; padding: 10px; background: white; border: 1px solid #e5e7eb; border-radius: 4px;">
                  ${special_requests}
                </div>
              </div>
              ` : ''}
            </div>

            <p style="background: #FEF9F1; border-left: 4px solid #B8860B; padding: 15px; margin: 20px 0;">
              <strong>⏰ Action Required:</strong><br>
              Please review and contact the guest to confirm this reservation.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email
    if (!resend) {
      console.error('❌ Resend API key not configured!');
      console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'EXISTS' : 'MISSING');
      return NextResponse.json(
        {
          error: 'Email service not configured',
        },
        { status: 500 }
      );
    }

    console.log('📧 Sending email to nathanmesfin919@gmail.com...');
    console.log('Using API key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    try {
      const emailResult = await resend.emails.send({
        from: 'Debredamo Hotel <onboarding@resend.dev>',
        to: ['nathanmesfin919@gmail.com'],
        subject: `New Reservation - ${guestName} - ${room_name}`,
        html: emailHtml,
      });

      console.log('✅ Email sent successfully!', emailResult);

      return NextResponse.json(
        {
          success: true,
          confirmationId,
          message: 'Reservation request received successfully!',
          emailSent: true,
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      return NextResponse.json(
        {
          error: 'Failed to send confirmation email',
          details: emailError instanceof Error ? emailError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Reservation error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process reservation',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to list reservations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where = status ? { status } : {};

    const [reservations, total] = await Promise.all([
      prisma.reservationRequest.findMany({
        where,
        include: { room: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.reservationRequest.count({ where }),
    ]);

    return NextResponse.json({
      data: reservations,
      total,
      page,
      limit,
      hasMore: page * limit < total,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
