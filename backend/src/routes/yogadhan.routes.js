import express from 'express';
import { getYogadhanContent, updateYogadhanContent } from '../controllers/yogadhanController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getYogadhanContent)
  .put(protect, updateYogadhanContent);

export default router;
