import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import categoryService from '../services/categoryService';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  List
} from 'lucide-react';
import './Categories.css';

const Categories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Bills', createdDate: '2026-02-13' },
    { id: 2, name: 'Business', createdDate: '2026-02-13' },
    { id: 3, name: 'Entertainment', createdDate: '2026-02-13' },
    { id: 4, name: 'Food', createdDate: '2026-02-13' },
    { id: 5, name: 'Healthcare', createdDate: '2026-02-13' },
    { id: 6, name: 'Investment', createdDate: '2026-02-13' },
    { id: 7, name: 'Shopping', createdDate: '2026-02-13' },
    { id: 8, name: 'Transport', createdDate: '2026-02-13' },
    { id: 9, name: 'Education', createdDate: '2026-02-13' },
    { id: 10, name: 'Travel', createdDate: '2026-02-13' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll();
      setCategories(response.data || []);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Categories error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const categoryData = {
          name: newCategoryName.trim(),
          type: 'expense', // Default to expense type
          budget: 0 // Default budget
        };
        
        const response = await categoryService.create(categoryData);
        setCategories([...categories, response.data]);
        setNewCategoryName('');
        setShowAddModal(false);
      } catch (err) {
        setError('Failed to add category');
        console.error('Add category error:', err);
      }
    }
  };

  const handleEditCategory = async (id) => {
    const newName = prompt('Enter new category name:');
    if (newName && newName.trim()) {
      try {
        await categoryService.update(id, { name: newName.trim() });
        fetchCategories(); // Refresh categories
      } catch (err) {
        setError('Failed to update category');
        console.error('Update category error:', err);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        fetchCategories(); // Refresh categories
      } catch (err) {
        setError('Failed to delete category');
        console.error('Delete category error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="categories-container">
        <Sidebar />
        <div className="categories-main">
          <Navbar title="Categories" />
          <div className="categories-content">
            <Loader size="large" text="Loading categories..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <Sidebar />
      <div className="categories-main">
        <div className="categories-header">
          <h1>Manage Categories</h1>
          <p className="welcome-message">Welcome, {user?.name || 'leela'}</p>
        </div>
        
        <div className="categories-content">
          <div className="categories-layout">
            {/* Add New Category Section */}
            <div className="add-category-section">
              <div className="section-header">
                <Plus size={20} />
                <h2>Add New Category</h2>
              </div>
              
              <div className="add-category-form">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  id="categoryName"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="category-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                
                <button 
                  className="add-category-btn"
                  onClick={handleAddCategory}
                >
                  <Plus size={16} />
                  Add Category
                </button>
              </div>
            </div>

            {/* Your Categories Section */}
            <div className="your-categories-section">
              <div className="section-header">
                <List size={20} />
                <h2>Your Categories</h2>
              </div>
              
              <div className="categories-table-container">
                <table className="categories-table">
                  <thead>
                    <tr>
                      <th>CATEGORY NAME</th>
                      <th>CREATED DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td className="category-name">{category.name}</td>
                        <td className="created-date">{category.createdDate}</td>
                        <td className="actions">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditCategory(category.id)}
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
