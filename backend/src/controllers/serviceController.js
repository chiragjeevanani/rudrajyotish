import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';

// @desc    Get all active services
// @route   GET /api/v1/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
  const isAdmin = req.query.admin === 'true'; // simple query check for admin previewing inactive items
  const query = isAdmin ? {} : { isActive: true };
  const services = await Service.find(query).sort({ order: 1 });
  res.json(services);
});

// @desc    Get single service by ID
// @route   GET /api/v1/services/:id
// @access  Public
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a new service
// @route   POST /api/v1/services
// @access  Private (Admin)
export const createService = asyncHandler(async (req, res) => {
  const { title, category, sub, desc, price, duration, note, imgUrl, list, isActive, order, availability } = req.body;

  const service = new Service({
    title,
    category,
    sub,
    desc,
    price,
    duration,
    note,
    imgUrl,
    list,
    isActive,
    order,
    availability,
  });

  const createdService = await service.save();
  res.status(201).json(createdService); // standard 201 Created
});

// @desc    Update a service
// @route   PUT /api/v1/services/:id
// @access  Private (Admin)
export const updateService = asyncHandler(async (req, res) => {
  const { title, category, sub, desc, price, duration, note, imgUrl, list, isActive, order, availability } = req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.title = title !== undefined ? title : service.title;
    service.category = category !== undefined ? category : service.category;
    service.sub = sub !== undefined ? sub : service.sub;
    service.desc = desc !== undefined ? desc : service.desc;
    service.price = price !== undefined ? price : service.price;
    service.duration = duration !== undefined ? duration : service.duration;
    service.note = note !== undefined ? note : service.note;
    service.imgUrl = imgUrl !== undefined ? imgUrl : service.imgUrl;
    service.list = list !== undefined ? list : service.list;
    service.isActive = isActive !== undefined ? isActive : service.isActive;
    service.order = order !== undefined ? order : service.order;
    service.availability = availability !== undefined ? availability : service.availability;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/v1/services/:id
// @access  Private (Admin)
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service removed successfully' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});
