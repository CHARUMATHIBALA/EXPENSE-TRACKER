import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ExpenseCard from '../components/ExpenseCard';
import ChartComponent from '../components/ChartComponent';
import Loader from '../components/Loader';
import { 
  Wallet, 
  Calendar, 
  Clock, 
  Plus, 
  Edit2, 
  Trash2,
  Check,
  X
} from 'lucide-react';
import expenseService from '../services/expenseService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 49500,
    totalTransactions: 0,
    avgTransaction: 200
  });
  const [categories, setCategories] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMode: '',
    description: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch expenses data
      const expensesResponse = await expenseService.getAll({ limit: 100 });
      const expenses = expensesResponse.data || [];
      
      // Initialize default categories if no categories exist
      const defaultCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Rent', 'Salary', 'Investment', 'Personal', 'Petrol'];
      
      // Extract unique categories from expenses, excluding 'Other'
      const uniqueCategories = [...new Set(expenses.map(exp => exp.category).filter(Boolean))].filter(cat => cat !== 'Other');
      
      // Add default categories if they don't exist
      const allCategories = [...new Set([...defaultCategories, ...uniqueCategories])].filter(cat => cat !== 'Other');
      setCategories(allCategories);
      
      // Calculate real stats from expenses
      const totalIncome = expenses
        .filter(exp => exp.type === 'income')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const totalExpense = expenses
        .filter(exp => exp.type === 'expense')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const balance = totalIncome - totalExpense;
      const totalTransactions = expenses.length;
      const avgTransaction = totalTransactions > 0 ? 
        (totalIncome + totalExpense) / totalTransactions : 0;
      
      // Calculate this month's totals
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const thisMonthExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && 
               expDate.getFullYear() === currentYear;
      });
      
      const thisMonthIncome = thisMonthExpenses
        .filter(exp => exp.type === 'income')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const thisMonthExpense = thisMonthExpenses
        .filter(exp => exp.type === 'expense')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      // Calculate today's totals
      const today = new Date().toDateString();
      const todayExpenses = expenses.filter(exp => 
        new Date(exp.date).toDateString() === today
      );
      
      const todayIncome = todayExpenses
        .filter(exp => exp.type === 'income')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      const todayExpense = todayExpenses
        .filter(exp => exp.type === 'expense')
        .reduce((sum, exp) => sum + exp.amount, 0);
      
      setStats({
        totalIncome,
        totalExpense,
        balance,
        totalTransactions,
        avgTransaction,
        thisMonthIncome,
        thisMonthExpense,
        todayIncome,
        todayExpense
      });
      
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      await expenseService.create(expenseData);
      
      // Reset form
      setFormData({
        title: '',
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        paymentMode: '',
        description: ''
      });
      
      // Refresh dashboard data and categories
      fetchDashboardData();
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Transaction error:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main">
          <div className="dashboard-content">
            <Loader size="large" text="Loading dashboard..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-content">
          {error && (
            <div className="dashboard-error">
              <span>{error}</span>
            </div>
          )}

          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card balance-card">
              <div className="card-icon">
                <Wallet size={24} />
              </div>
              <div className="card-content">
                <h3>Balance</h3>
                <p className="amount">₹{stats.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="summary-card month-card">
              <div className="card-icon">
                <Calendar size={24} />
              </div>
              <div className="card-content">
                <h3>This Month</h3>
                <p className="amount">₹{stats.thisMonthExpense.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="summary-card today-card">
              <div className="card-icon">
                <Clock size={24} />
              </div>
              <div className="card-content">
                <h3>Today</h3>
                <p className="amount">₹{stats.todayExpense.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Add Transaction Section */}
          <div className="add-transaction-section">
            <div className="add-transaction-header">
              <h2>Add Transaction</h2>
              <p className="add-transaction-subtitle">Record your income and expenses</p>
            </div>
            
            <form onSubmit={handleSubmit} className="transaction-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter transaction title"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="form-input"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Date *</label>
                  <div className="date-input-wrapper">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    <Calendar size={16} className="date-icon" />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Digital Wallet">Digital Wallet</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add notes about this transaction..."
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
