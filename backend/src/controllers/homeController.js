import asyncHandler from 'express-async-handler';
import HomeContent from '../models/HomeContent.js';

// @desc    Get Home page content configuration
// @route   GET /api/v1/home
// @access  Public
export const getHomeContent = asyncHandler(async (req, res) => {
  let content = await HomeContent.findOne();
  if (!content) {
    content = await HomeContent.create({});
  }
  res.json(content);
});

// @desc    Update Home page content configuration
// @route   PUT /api/v1/home
// @access  Private (Admin)
export const updateHomeContent = asyncHandler(async (req, res) => {
  let content = await HomeContent.findOne();
  if (!content) {
    content = new HomeContent(req.body);
  } else {
    // Update the values with incoming request body
    Object.assign(content, req.body);
    content.markModified('hero');
    content.markModified('compass');
    content.markModified('methodology');
    content.markModified('whyUs');
    content.markModified('testimonialSpotlight');
    content.markModified('ctaSection');
  }

  const updatedContent = await content.save();
  res.json(updatedContent);
});
