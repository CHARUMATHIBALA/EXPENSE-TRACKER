import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Calendar, Clock, Menu, Wallet, Home, FolderPlus, Plus, FileText, BarChart3, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import { useExpenses } from '../hooks/useExpenses';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { stats, loading: statsLoading } = useDashboard();
  const { addExpense } = useExpenses();
  
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMode: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.paymentMode) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const result = await addExpense(formData);
      if (result.success) {
        // Reset form
        setFormData({
          type: 'expense',
          amount: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          paymentMode: '',
          description: ''
        });
        alert('Transaction added successfully!');
      } else {
        alert(result.message || 'Failed to add transaction');
      }
    } catch (error) {
      alert('An error occurred while adding transaction');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      paymentMode: '',
      description: ''
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-navy-dark">
      {/* Sidebar */}
      <div className="w-64 bg-navy-gradient flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <button className="p-2 rounded-lg bg-gray-800 hover-bg-gray-700 transition-colors mr-3">
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center">
              <div className="bg-blue-gradient rounded-lg p-2 mr-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">ExpenseTracker</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <Home className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/categories" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <FolderPlus className="w-5 h-5 mr-3" />
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="/add-expense" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <Plus className="w-5 h-5 mr-3" />
                <span>Add Expense</span>
              </a>
            </li>
            <li>
              <a href="/view-expenses" className="flex items-center p-3 rounded-lg bg-blue-primary text-white">
                <FileText className="w-5 h-5 mr-3" />
                <span>View Expenses</span>
              </a>
            </li>
            <li>
              <a href="/charts" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Charts</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-blue-primary bg-opacity-20 rounded-lg p-3 mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-gradient flex items-center justify-center mr-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{user?.username || 'User'}</p>
                <p className="text-blue-light text-sm">Premium User</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover-bg-gray-700 text-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="bg-blue-gradient rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Wallet className="w-8 h-8 text-white opacity-80" />
                <span className="text-white text-opacity-80 text-sm">Balance</span>
              </div>
              <p className="text-white text-3xl font-bold mb-1">
                ₹{statsLoading ? '...' : stats.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* This Month Card */}
            <div className="bg-gradient-to-br from-blue-secondary to-blue-light rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-white opacity-80" />
                <span className="text-white text-opacity-80 text-sm">This Month</span>
              </div>
              <p className="text-white text-3xl font-bold mb-1">
                ₹{statsLoading ? '...' : stats.thisMonth.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Today Card */}
            <div className="bg-gradient-to-br from-blue-secondary to-blue-light rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-white opacity-80" />
                <span className="text-white text-opacity-80 text-sm">Today</span>
              </div>
              <p className="text-white text-3xl font-bold mb-1">
                ₹{statsLoading ? '...' : stats.today.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Add Transaction Section */}
          <div className="bg-navy-medium rounded-xl p-6 border border-blue-primary border-opacity-30">
            <h3 className="text-xl font-bold text-white mb-6">Add Transaction</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Type Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus-outline-none focus-border-blue-primary transition-colors"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary transition-colors"
                    required
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus-outline-none focus-border-blue-primary transition-colors"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="salary">Salary</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 pr-10 text-white focus-outline-none focus-border-blue-primary transition-colors"
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Payment Mode Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus-outline-none focus-border-blue-primary transition-colors"
                    required
                  >
                    <option value="">Select payment mode</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                {/* Description Textarea */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add notes about this transaction..."
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus-outline-none focus-border-blue-primary transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-gradient text-white font-medium py-2 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Adding...' : 'Add Transaction'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="border border-gray-600 text-gray-300 font-medium py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
