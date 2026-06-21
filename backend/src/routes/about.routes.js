import express from 'express';
import { getAboutContent, updateAboutContent } from '../controllers/aboutController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAboutContent)
  .put(protect, updateAboutContent);

export default router;
