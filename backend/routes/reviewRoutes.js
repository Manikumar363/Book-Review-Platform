const express = require('express');
const router = express.Router({ mergeParams: true });
const { auth } = require('../middleware/auth');
const {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// Public routes
router.get('/', getBookReviews);

// Protected routes
router.post('/', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;