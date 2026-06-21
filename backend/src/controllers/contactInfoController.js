import asyncHandler from 'express-async-handler';
import ContactInfo from '../models/ContactInfo.js';

// @desc    Get Contact info configuration
// @route   GET /api/v1/contact-info
// @access  Public
export const getContactInfo = asyncHandler(async (req, res) => {
  let content = await ContactInfo.findOne();
  if (!content) {
    content = await ContactInfo.create({});
  }
  res.json(content);
});

// @desc    Update Contact info configuration
// @route   PUT /api/v1/contact-info
// @access  Private (Admin)
export const updateContactInfo = asyncHandler(async (req, res) => {
  let content = await ContactInfo.findOne();
  if (!content) {
    content = new ContactInfo(req.body);
  } else {
    Object.assign(content, req.body);
    content.markModified('header');
    content.markModified('location');
    content.markModified('whatsapp');
    content.markModified('slots');
  }

  const updatedContent = await content.save();
  res.json(updatedContent);
});
