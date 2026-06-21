import express from 'express';
import {
  getVastuTips,
  getDirections,
  updateDirection,
  getMistakes,
  createMistake,
  updateMistake,
  deleteMistake,
  getRemedies,
  createRemedy,
  updateRemedy,
  deleteRemedy,
  getSeasons,
  updateSeason,
  getElements,
  updateElement,
  getBookPages,
  createBookPage,
  updateBookPage,
  deleteBookPage,
  getVastuHero,
  updateVastuHero,
} from '../controllers/vastuTipController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public aggregate query
router.get('/', getVastuTips);

// Hero Section
router.route('/hero')
  .get(getVastuHero)
  .put(protect, updateVastuHero);

// Directions
router.route('/directions')
  .get(getDirections);
router.route('/directions/:code')
  .put(protect, updateDirection);


// Mistakes
router.route('/mistakes')
  .get(getMistakes)
  .post(protect, createMistake);
router.route('/mistakes/:id')
  .put(protect, updateMistake)
  .delete(protect, deleteMistake);

// Remedies
router.route('/remedies')
  .get(getRemedies)
  .post(protect, createRemedy);
router.route('/remedies/:id')
  .put(protect, updateRemedy)
  .delete(protect, deleteRemedy);

// Seasons
router.route('/seasons')
  .get(getSeasons);
router.route('/seasons/:id')
  .put(protect, updateSeason);

// Elements
router.route('/elements')
  .get(getElements);
router.route('/elements/:id')
  .put(protect, updateElement);

// Book Pages
router.route('/book-pages')
  .get(getBookPages)
  .post(protect, createBookPage);
router.route('/book-pages/:id')
  .put(protect, updateBookPage)
  .delete(protect, deleteBookPage);

export default router;
