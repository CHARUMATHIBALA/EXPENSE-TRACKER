import { useState, useEffect } from 'react';
import { expensesAPI } from '../services/api';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expensesAPI.getAll();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await expensesAPI.create(expenseData);
      setExpenses(prev => [newExpense, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const updatedExpense = await expensesAPI.update(id, expenseData);
      setExpenses(prev => 
        prev.map(exp => exp._id === id ? updatedExpense : exp)
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expensesAPI.delete(id);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
