const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters'],
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Category type is required'],
    enum: ['income', 'expense'],
    default: 'expense'
  },
  budget: {
    type: Number,
    default: 0,
    min: [0, 'Budget cannot be negative']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    default: '#3b82f6'
  },
  icon: {
    type: String,
    default: 'tag'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
categorySchema.index({ user: 1, name: 1 });
categorySchema.index({ user: 1, type: 1 });

module.exports = mongoose.model('Category', categorySchema);
