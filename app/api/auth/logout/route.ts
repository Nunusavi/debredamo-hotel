import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth/session';
import { logError } from '@/lib/errors';

export async function POST() {
  try {
    await deleteSession();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logError('Logout error', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
