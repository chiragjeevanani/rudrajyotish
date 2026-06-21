import express from 'express';
import {
  getContacts,
  submitContact,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getContacts)
  .post(submitContact);

router.patch('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;
