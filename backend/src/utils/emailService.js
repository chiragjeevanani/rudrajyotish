import nodemailer from 'nodemailer';

// Helper to check if SMTP settings are configured
const isSmtpConfigured = () => {
  return (
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_HOST
  );
};

// Create reusable transporter object using the default SMTP transport
const getTransporter = () => {
  if (isSmtpConfigured()) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// "From" header used on all outgoing mail
const fromAddress = () =>
  `"Rudra Jyotish" <${process.env.SMTP_USER || 'noreply@rudra.com'}>`;

/**
 * Send a mail through the transporter, or log it when SMTP is not configured.
 * Keeps a single place for the send/log/error handling logic.
 * @param {Object} mailOptions
 * @param {string} label - short description used in logs
 * @returns {Promise<boolean>} true if sent/logged successfully
 */
const dispatchMail = async (mailOptions, label) => {
  const transporter = getTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`${label} email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`Error sending ${label} email: ${error.message}`);
      return false;
    }
  }

  console.log(`[SMTP Not Configured] ${label} email log:`);
  console.log(`To: ${mailOptions.to}`);
  console.log(`Subject: ${mailOptions.subject}`);
  console.log(`Body: ${mailOptions.html}`);
  return true;
};

// Format an INR amount with the rupee symbol
const formatINR = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

/**
 * Build the shared "booking slip" details table used in both the
 * customer confirmation and the admin notification emails.
 * @param {Object} booking
 * @param {Object} [opts]
 * @param {boolean} [opts.includeCustomer] - include customer contact rows (admin copy)
 */
const buildBookingDetails = (booking, { includeCustomer = false } = {}) => {
  const info = booking.additionalInfo || {};

  const row = (label, value) => `
    <tr>
      <td style="padding: 8px 0; color: #666; width: 170px; vertical-align: top;"><strong>${label}:</strong></td>
      <td style="padding: 8px 0; color: #333;">${value}</td>
    </tr>`;

  const customerRows = includeCustomer
    ? row('Customer Name', booking.customer?.name || '-') +
      row('Customer Email', booking.customer?.email || '-') +
      row('Customer Phone', booking.customer?.phone || '-')
    : '';

  // Optional birth / vastu details — only shown when present
  const extraRows = [
    info.birthDate ? row('Birth Date', info.birthDate) : '',
    info.birthTime ? row('Birth Time', info.birthTime) : '',
    info.birthPlace ? row('Birth Place', info.birthPlace) : '',
    info.vastuAddress ? row('Vastu Address', info.vastuAddress) : '',
    info.notes ? row('Notes', info.notes) : '',
  ].join('');

  const paymentColor =
    booking.paymentStatus === 'paid'
      ? 'green'
      : booking.paymentStatus === 'failed'
      ? '#c0392b'
      : '#d4a017';

  return `
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; width: 170px;"><strong>Booking ID:</strong></td>
        <td style="padding: 8px 0; color: #333;">${booking._id || '-'}</td>
      </tr>
      ${customerRows}
      ${row('Service', `${booking.service.title} (${booking.service.category})`)}
      ${row('Date', new Date(booking.appointmentDate).toDateString())}
      ${row('Time Slot', booking.timeSlot)}
      ${row('Duration', `${booking.service.duration} minutes`)}
      ${row('Amount', formatINR(booking.service.price))}
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Payment Status:</strong></td>
        <td style="padding: 8px 0; font-weight: bold; color: ${paymentColor};">${(booking.paymentStatus || 'pending').toUpperCase()}</td>
      </tr>
      ${booking.transactionId ? row('Transaction ID', booking.transactionId) : ''}
      ${extraRows}
    </table>`;
};

/**
 * Send Booking Confirmation Email to the customer (booking slip)
 * @param {Object} booking
 */
export const sendBookingConfirmation = async (booking) => {
  const mailOptions = {
    from: fromAddress(),
    to: booking.customer.email,
    subject: `Booking Confirmed: ${booking.service.title} - Rudra Jyotish`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #c5a880; text-align: center;">Booking Confirmed!</h2>
        <p>Dear ${booking.customer.name},</p>
        <p>Thank you for choosing <strong>Rudra Jyotish</strong>. Your appointment has been successfully booked. Please find your booking slip below.</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <h3 style="color: #333;">Booking Slip</h3>
        ${buildBookingDetails(booking)}

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p>If you have any questions, please feel free to reply to this email or contact us at +91 9999999999.</p>
        <p>Warm regards,<br><strong>Rudra Ji</strong><br>Rudra Jyotish Team</p>
      </div>
    `,
  };

  return dispatchMail(mailOptions, 'Booking confirmation (customer)');
};

/**
 * Send Booking Notification Email to the admin/business inbox.
 * Sends to ADMIN_EMAIL (supports a comma-separated list). Falls back to
 * SMTP_USER if ADMIN_EMAIL is not set.
 * @param {Object} booking
 */
export const sendAdminBookingNotification = async (booking) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  if (!adminEmail) {
    console.log('[Admin Notification Skipped] No ADMIN_EMAIL / SMTP_USER configured.');
    return false;
  }

  const mailOptions = {
    from: fromAddress(),
    to: adminEmail,
    subject: `New Booking: ${booking.service.title} — ${booking.customer.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #c5a880; text-align: center;">New Booking Received</h2>
        <p>A new appointment has been booked on <strong>Rudra Jyotish</strong>. Details below:</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <h3 style="color: #333;">Booking Details</h3>
        ${buildBookingDetails(booking, { includeCustomer: true })}

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p style="color: #888; font-size: 13px;">This is an automated notification from the Rudra Jyotish booking system.</p>
      </div>
    `,
  };

  return dispatchMail(mailOptions, 'Booking notification (admin)');
};

/**
 * Convenience helper: notify both the customer and the admin about a booking.
 * Runs both in parallel and never throws so the booking flow is not blocked.
 * @param {Object} booking
 */
export const sendBookingEmails = async (booking) => {
  const [customer, admin] = await Promise.all([
    sendBookingConfirmation(booking).catch((err) => {
      console.error(`Customer booking email failed: ${err.message}`);
      return false;
    }),
    sendAdminBookingNotification(booking).catch((err) => {
      console.error(`Admin booking email failed: ${err.message}`);
      return false;
    }),
  ]);
  return { customer, admin };
};

/**
 * Send Contact Inquiry Acknowledgment Email
 * @param {Object} contact
 */
export const sendContactAcknowledgment = async (contact) => {
  const mailOptions = {
    from: fromAddress(),
    to: contact.email,
    subject: `We have received your message - Rudra Jyotish`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #c5a880; text-align: center;">Message Received!</h2>
        <p>Dear ${contact.name},</p>
        <p>Thank you for reaching out to <strong>Rudra Jyotish</strong>. We have received your inquiry regarding <strong>${contact.service || 'our consulting services'}</strong>.</p>
        <p>Our team (or Rudra Ji) will review your query and get back to you shortly, usually within 24-48 hours.</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <h3 style="color: #333;">Your Message Details:</h3>
        <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; color: #555; font-style: italic;">
          "${contact.message}"
        </p>

        <p>Preferred Contact Time: ${contact.preferredTime || 'Anytime'}</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p>Warm regards,<br><strong>Rudra Ji</strong><br>Rudra Jyotish Team</p>
      </div>
    `,
  };

  return dispatchMail(mailOptions, 'Contact acknowledgment');
};
