const Category = require('../models/Category');
const Expense = require('../models/Expense');

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private
const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name, type, budget, color, icon } = req.body;

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ 
      name: name, 
      user: req.user.id 
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    const category = await Category.create({
      name,
      type: type || 'expense',
      budget: budget || 0,
      color: color || '#3b82f6',
      icon: icon || 'tag',
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  try {
    const { name, type, budget, color, icon } = req.body;

    let category = await Category.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if name is being changed and if new name already exists
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name, 
        user: req.user.id 
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists'
        });
      }
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, type, budget, color, icon },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if there are expenses using this category
    const expensesCount = await Expense.countDocuments({ 
      category: category.name,
      user: req.user.id 
    });

    if (expensesCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category. It is being used by expenses.'
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get categories with stats
// @route   GET /api/categories/stats
// @access  Private
const getCategoriesWithStats = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ name: 1 });

    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        const expensesCount = await Expense.countDocuments({
          category: category.name,
          user: req.user.id
        });

        const totalSpent = await Expense.aggregate([
          {
            $match: {
              category: category.name,
              user: req.user.id,
              type: 'expense'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ]);

        return {
          ...category.toObject(),
          expensesCount,
          totalSpent: totalSpent.length > 0 ? totalSpent[0].total : 0
        };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithStats
};
