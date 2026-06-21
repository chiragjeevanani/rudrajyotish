import express from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactInfoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getContactInfo)
  .put(protect, updateContactInfo);

export default router;
