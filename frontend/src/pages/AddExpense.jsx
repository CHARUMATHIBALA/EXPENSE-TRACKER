import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { DollarSign, Calendar, Tag, FileText, Save, X } from 'lucide-react';
import expenseService from '../services/expenseService';
import './AddExpense.css';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Bills', 'Healthcare',
    'Shopping', 'Education', 'Travel', 'Investment', 'Salary',
    'Freelance', 'Business', 'Other'
  ];

  useEffect(() => {
    // Set today's date as default
    setFormData(prev => ({
      ...prev,
      date: new Date().toISOString().split('T')[0]
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      const response = await expenseService.create(expenseData);
      
      if (response.success) {
        setSuccess('Expense added successfully!');
        setTimeout(() => {
          navigate('/expenses');
        }, 1500);
      } else {
        setError(response.message || 'Failed to add expense');
      }
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error('Add expense error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/expenses');
  };

  return (
    <div className="add-expense-container">
      <Sidebar />
      <div className="add-expense-main">
        <Navbar title="Add Transaction" />
        
        <div className="add-expense-content">
          <div className="add-expense-card">
            <div className="add-expense-header">
              <h1>Add New Transaction</h1>
              <p>Record your income or expense</p>
            </div>

            {error && (
              <div className="add-expense-error">
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="add-expense-success">
                <span>{success}</span>
              </div>
            )}

            <form className="add-expense-form" onSubmit={handleSubmit}>
              {/* Transaction Type */}
              <div className="form-group">
                <label className="form-label">Transaction Type</label>
                <div className="transaction-type-selector">
                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                  >
                    Income
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label className="form-label">
                  <FileText size={16} />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter transaction title"
                  required
                />
              </div>

              {/* Amount */}
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={16} />
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">
                  <Tag size={16} />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">
                  <FileText size={16} />
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Add any additional notes..."
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader size="small" text="Saving..." />
                  ) : (
                    <>
                      <Save size={18} />
                      Save Transaction
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
