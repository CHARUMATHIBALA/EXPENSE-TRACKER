import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ExpenseCard from '../components/ExpenseCard';
import Loader from '../components/Loader';
import { Plus, Search, Filter, Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import expenseService from '../services/expenseService';
import './Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateRange: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const navigate = useNavigate();

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Bills', 'Healthcare',
    'Shopping', 'Education', 'Travel', 'Investment', 'Salary',
    'Freelance', 'Business', 'Other'
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [expenses, searchTerm, filters, sortBy, sortOrder]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseService.getAll();
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses');
      console.error('Expenses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...expenses];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter(expense => expense.type === filters.type);
    }

    if (filters.dateRange) {
      const today = new Date();
      let startDate;

      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          break;
        case 'week':
          startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        case 'year':
          startDate = new Date(today.getFullYear(), 0, 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered.filter(expense => new Date(expense.date) >= startDate);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredExpenses(filtered);
  };

  const handleEditExpense = (expense) => {
    navigate(`/edit-expense/${expense._id}`);
  };

  const handleDeleteExpense = async (expense) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.delete(expense._id);
        fetchExpenses(); // Refresh data
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      type: '',
      dateRange: ''
    });
    setSortBy('date');
    setSortOrder('desc');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateStats = () => {
    const totalIncome = filteredExpenses
      .filter(exp => exp.type === 'income')
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const totalExpense = filteredExpenses
      .filter(exp => exp.type === 'expense')
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="expenses-container">
        <Sidebar />
        <div className="expenses-main">
          <div className="expenses-content">
            <Loader size="large" text="Loading expenses..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expenses-container">
      <Sidebar />
      <div className="expenses-main">
        <div className="expenses-content">
          {error && (
            <div className="expenses-error">
              <span>{error}</span>
            </div>
          )}

          {/* Search Section */}
          <div className="expenses-search-section">
            <h2>Search Old Transactions</h2>
            <div className="search-controls">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="filter-select"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>

              <button className="btn btn-secondary" onClick={clearFilters}>
                <Filter size={16} />
                Clear
              </button>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-');
                  setSortBy(sort);
                  setSortOrder(order);
                }}
                className="sort-select"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>
          </div>

          {/* Expenses List */}
          <div className="expenses-list">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map(expense => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <Search size={48} />
                </div>
                <h3>No transactions found</h3>
                <p>
                  {searchTerm || filters.category || filters.type || filters.dateRange
                    ? 'Try adjusting your search or filters'
                    : 'No transactions available'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
