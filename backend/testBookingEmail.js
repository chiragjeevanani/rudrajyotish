// Manual test harness for booking emails.
// Usage: node testBookingEmail.js
// - With SMTP_USER/SMTP_PASS set in .env it actually sends real mail
//   (customer copy -> the address below, admin copy -> ADMIN_EMAIL/SMTP_USER).
// - Without SMTP configured it logs the rendered emails to the console.
import dotenv from 'dotenv';
import { sendBookingEmails } from './src/utils/emailService.js';

dotenv.config();

// Send the customer copy to a real inbox you control when testing live.
// Override with: node testBookingEmail.js you@example.com
const customerEmail = process.argv[2] || process.env.SMTP_USER || 'test-customer@example.com';

const mockBooking = {
  _id: 'TEST_' + Date.now(),
  service: {
    id: 'svc_astro_01',
    title: 'Astrology Consultation',
    category: 'Astrology',
    price: 2100,
    duration: 45,
  },
  appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days out
  timeSlot: '11:00 AM - 11:45 AM',
  customer: {
    name: 'Test User',
    email: customerEmail,
    phone: '+91 98765 43210',
  },
  additionalInfo: {
    birthDate: '1995-08-15',
    birthTime: '06:30 AM',
    birthPlace: 'Indore, MP',
    notes: 'Please call before the session.',
  },
  paymentStatus: 'paid',
  transactionId: 'pay_TEST123456',
};

(async () => {
  console.log('--- SMTP config ---');
  console.log('SMTP_HOST :', process.env.SMTP_HOST || '(unset)');
  console.log('SMTP_USER :', process.env.SMTP_USER ? process.env.SMTP_USER : '(unset -> log mode)');
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || '(unset -> falls back to SMTP_USER)');
  console.log('Customer copy ->', customerEmail);
  console.log('-------------------\n');

  const result = await sendBookingEmails(mockBooking);

  console.log('\n--- Result ---');
  console.log('Customer email:', result.customer ? 'OK' : 'FAILED');
  console.log('Admin email   :', result.admin ? 'OK' : 'FAILED/SKIPPED');
  process.exit(result.customer && result.admin ? 0 : 1);
})();
