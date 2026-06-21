import asyncHandler from 'express-async-handler';
import AboutContent from '../models/AboutContent.js';

// @desc    Get About page content configuration
// @route   GET /api/v1/about
// @access  Public
export const getAboutContent = asyncHandler(async (req, res) => {
  let content = await AboutContent.findOne();
  if (!content) {
    content = await AboutContent.create({});
  }
  res.json(content);
});

// @desc    Update About page content configuration
// @route   PUT /api/v1/about
// @access  Private (Admin)
export const updateAboutContent = asyncHandler(async (req, res) => {
  let content = await AboutContent.findOne();
  if (!content) {
    content = new AboutContent(req.body);
  } else {
    Object.assign(content, req.body);
    content.markModified('header');
    content.markModified('profile');
    content.markModified('doDont');
    content.markModified('journey');
  }

  const updatedContent = await content.save();
  res.json(updatedContent);
});
