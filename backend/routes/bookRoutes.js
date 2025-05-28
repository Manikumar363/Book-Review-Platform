const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Admin only routes
router.post('/', auth, adminAuth, createBook);
router.put('/:id', auth, adminAuth, updateBook);
router.delete('/:id', auth, adminAuth, deleteBook);

module.exports = router;