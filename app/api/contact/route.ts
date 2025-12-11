import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/neon';
import { contactSubmissions } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Insert contact submission into database
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'new',
      })
      .returning();

    if (!submission) {
      console.error('Database error: Failed to insert contact submission');
      return NextResponse.json(
        { error: 'Failed to submit message' },
        { status: 500 }
      );
    }

    // TODO: Send email notification to admin
    // You can integrate this with the existing email service

    return NextResponse.json(
      {
        success: true,
        id: submission.id,
        message: 'Message sent successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
