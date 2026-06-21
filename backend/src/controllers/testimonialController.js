import asyncHandler from 'express-async-handler';
import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials (visible or all for admin)
// @route   GET /api/v1/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true';
  const query = isAdmin ? {} : { isVisible: true };
  const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
  res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/v1/testimonials
// @access  Private (Admin)
export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, text, rating, isVisible, order } = req.body;

  const testimonial = new Testimonial({
    name,
    role: role || "Consultant Client",
    text,
    rating: rating || 5,
    isVisible: isVisible !== undefined ? isVisible : true,
    order: order || 0,
  });

  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Update a testimonial
// @route   PUT /api/v1/testimonials/:id
// @access  Private (Admin)
export const updateTestimonial = asyncHandler(async (req, res) => {
  const { name, role, text, rating, isVisible, order } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    testimonial.name = name !== undefined ? name : testimonial.name;
    testimonial.role = role !== undefined ? role : testimonial.role;
    testimonial.text = text !== undefined ? text : testimonial.text;
    testimonial.rating = rating !== undefined ? rating : testimonial.rating;
    testimonial.isVisible = isVisible !== undefined ? isVisible : testimonial.isVisible;
    testimonial.order = order !== undefined ? order : testimonial.order;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/v1/testimonials/:id
// @access  Private (Admin)
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Testimonial removed successfully' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});
