/**
 * Test Email Configuration
 *
 * Run this script to test if Resend email is configured correctly
 *
 * Usage:
 *   npx tsx scripts/test-email.ts
 */

import { sendReservationConfirmation } from '@/lib/email';

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');

  // Check if RESEND_API_KEY is set
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Error: RESEND_API_KEY is not set in .env.local');
    process.exit(1);
  }

  console.log('✅ RESEND_API_KEY is set');
  console.log(`📧 Admin Email: ${process.env.ADMIN_EMAIL || 'Not set'}`);
  console.log(`📧 Reservation Email: ${process.env.RESERVATION_EMAIL || 'Not set'}\n`);

  // Test data
  const testData = {
    guestEmail: 'test@example.com', // Change this to your email
    guestName: 'Test User',
    confirmationId: 'TEST-' + Date.now(),
    checkIn: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    checkOut: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    roomName: 'Deluxe Room',
    totalPrice: 3500,
  };

  console.log('📨 Sending test email to:', testData.guestEmail);
  console.log('⚠️  Make sure to check your spam folder!\n');

  try {
    await sendReservationConfirmation(testData);
    console.log('✅ Email sent successfully!');
    console.log('📬 Check your inbox (and spam folder) for the confirmation email');
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    process.exit(1);
  }
}

testEmail();
