import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';
import { sendContactAcknowledgment } from '../utils/emailService.js';

// @desc    Get all contact submissions
// @route   GET /api/v1/contacts
// @access  Private (Admin)
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

// @desc    Submit contact form
// @route   POST /api/v1/contacts
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, service, message, preferredTime } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields (name, email, phone, message)');
  }

  // Name validation
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    res.status(400);
    throw new Error('Name must be at least 2 characters long.');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400);
    throw new Error('Please provide a valid email address.');
  }

  // Phone validation (allows + prefix and 10 to 15 digits, ignoring spaces/dashes)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    res.status(400);
    throw new Error('Please provide a valid phone number (10 to 15 digits).');
  }

  // Message validation
  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 15) {
    res.status(400);
    throw new Error('Message details must be at least 15 characters long.');
  }

  const contact = new Contact({
    name: trimmedName,
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    service,
    message: trimmedMessage,
    preferredTime,
  });

  const createdContact = await contact.save();

  // Send acknowledgment email
  await sendContactAcknowledgment(createdContact);

  res.status(201).json(createdContact);
});

// @desc    Update contact status (read / resolved)
// @route   PATCH /api/v1/contacts/:id/status
// @access  Private (Admin)
export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !['new', 'read', 'resolved'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const contact = await Contact.findById(req.params.id);

  if (contact) {
    contact.status = status;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error('Contact message not found');
  }
});

// @desc    Delete contact message
// @route   DELETE /api/v1/contacts/:id
// @access  Private (Admin)
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact message removed successfully' });
  } else {
    res.status(404);
    throw new Error('Contact message not found');
  }
});
