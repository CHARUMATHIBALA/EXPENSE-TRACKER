import { useState } from 'react';
import { Plus, RefreshCw, Calendar, TrendingUp, Menu, Home, FolderPlus, FileText, BarChart3, User, LogOut } from 'lucide-react';

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: '12-02-2026',
    paymentMode: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    // Handle add transaction logic here
    console.log('New transaction:', formData);
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      date: '12-02-2026',
      paymentMode: '',
      description: ''
    });
  };

  const handleClear = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      date: '12-02-2026',
      paymentMode: '',
      description: ''
    });
  };

  return (
    <div className="flex h-screen bg-navy-dark">
      {/* Sidebar */}
      <div className="w-64 bg-navy-gradient flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors mr-3">
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
              <a href="/add-expense" className="flex items-center p-3 rounded-lg bg-blue-primary text-white">
                <Plus className="w-5 h-5 mr-3" />
                <span>Add Expense</span>
              </a>
            </li>
            <li>
              <a href="/view-expenses" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
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
                <p className="text-white font-medium">novah</p>
                <p className="text-blue-light text-sm">Premium User</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add Expense</h1>
            <p className="text-gray-400">Enter your expense details below</p>
          </div>

          {/* Add Transaction Form */}
          <div className="bg-navy-medium rounded-xl p-8 border border-blue-primary border-opacity-30 max-w-4xl mx-auto">
            <form onSubmit={handleAddTransaction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-primary transition-colors"
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
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition-colors"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-primary transition-colors"
                  >
                    <option value="">Select category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-primary transition-colors"
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Payment Mode Dropdown */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-primary transition-colors"
                  >
                    <option value="">Select payment mode</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add notes about this transaction..."
                  rows="4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition-colors resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-blue-gradient text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Transaction
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="border border-gray-600 text-gray-300 font-medium py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
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

export default AddExpensePage;
