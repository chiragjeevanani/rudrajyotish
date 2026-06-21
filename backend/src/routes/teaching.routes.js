import express from 'express';
import {
  applyToTeach,
  getTeachingApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/teachingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/apply', applyToTeach);
router.get('/applications', protect, getTeachingApplications);
router.patch('/applications/:id/status', protect, updateApplicationStatus);
router.delete('/applications/:id', protect, deleteApplication);

export default router;
