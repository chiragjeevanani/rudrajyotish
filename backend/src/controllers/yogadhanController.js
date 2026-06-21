import asyncHandler from 'express-async-handler';
import YogadhanContent from '../models/YogadhanContent.js';

// @desc    Get Yogadhan page content configuration
// @route   GET /api/v1/yogadhan
// @access  Public
export const getYogadhanContent = asyncHandler(async (req, res) => {
  let content = await YogadhanContent.findOne();
  if (!content) {
    content = await YogadhanContent.create({});
  }
  res.json(content);
});

// @desc    Update Yogadhan page content configuration
// @route   PUT /api/v1/yogadhan
// @access  Private (Admin)
export const updateYogadhanContent = asyncHandler(async (req, res) => {
  let content = await YogadhanContent.findOne();
  if (!content) {
    content = new YogadhanContent(req.body);
  } else {
    Object.assign(content, req.body);
    content.markModified('hero');
    content.markModified('split');
    content.markModified('pillars');
    content.markModified('cta');
  }

  const updatedContent = await content.save();
  res.json(updatedContent);
});
