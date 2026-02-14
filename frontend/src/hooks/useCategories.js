import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesAPI.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const newCategory = await categoriesAPI.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoriesAPI.update(id, categoryData);
      setCategories(prev => 
        prev.map(cat => cat._id === id ? updatedCategory : cat)
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoriesAPI.delete(id);
      setCategories(prev => prev.filter(cat => cat._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
