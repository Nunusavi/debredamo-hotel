import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { contactSchema } from '@/lib/validations';
import { sendContactNotification } from '@/lib/email';
import { logError } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate using Zod schema
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validation.data;

    // Insert contact submission into database using Prisma
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'new',
      },
    });

    // Send email notification to admin
    try {
      await sendContactNotification({
        submissionId: submission.id,
        name,
        email,
        phone: phone || 'Not provided',
        subject,
        message,
        submittedAt: submission.createdAt.toISOString(),
      });
    } catch (emailError) {
      logError('Failed to send contact notification email', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        id: submission.id,
        message: 'Message sent successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    logError('Contact API error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
