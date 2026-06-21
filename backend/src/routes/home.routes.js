import express from 'express';
import { getHomeContent, updateHomeContent } from '../controllers/homeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getHomeContent)
  .put(protect, updateHomeContent);

export default router;
