const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithStats
} = require('../controllers/categoryController');

const router = express.Router();

// Middleware to protect all routes
const protect = require('../middleware/authMiddleware');

router.use(protect);

// Get all categories with optional stats
router.route('/')
  .get(getCategories)
  .post(createCategory);

// Get categories with stats
router.get('/stats', getCategoriesWithStats);

router.route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
