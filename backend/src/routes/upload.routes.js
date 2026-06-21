import express from 'express';
import { uploadImage, handleUploadResponse } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, uploadImage, handleUploadResponse);

export default router;
