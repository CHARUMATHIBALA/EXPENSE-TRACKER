import { useState } from 'react';
import { Plus, RefreshCw, TrendingUp, Menu, Home, FolderPlus, FileText, BarChart3, User, LogOut, Edit2, Trash2, Table, Grid } from 'lucide-react';

const ViewExpensesPage = () => {
  const [viewMode, setViewMode] = useState('table');
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: 'income',
      category: 'salary',
      amount: 100000.00,
      date: '03-02-2026',
      paymentMode: 'Bank Transfer',
      description: '-'
    },
    {
      id: 2,
      type: 'expense',
      category: 'petrol',
      amount: 1000.00,
      date: '02-02-2026',
      paymentMode: 'Cash',
      description: 'Fuel for car'
    },
    {
      id: 3,
      type: 'expense',
      category: 'food',
      amount: 200.00,
      date: '01-02-2026',
      paymentMode: 'UPI',
      description: 'Restaurant dinner'
    }
  ]);

  const handleEditExpense = (id) => {
    console.log('Edit expense:', id);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleAddTransaction = () => {
    console.log('Navigate to add expense');
  };

  const handleClear = () => {
    console.log('Clear filters');
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
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"></div>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/categories" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <div className="w-5 h-5 border-2 border-gray-400 mr-3" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}></div>
                <span>Categories</span>
              </a>
            </li>
            <li>
              <a href="/add-expense" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-gray-400" />
                </div>
                <span>Add Expense</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg bg-blue-primary text-white">
                <FileText className="w-5 h-5 mr-3" />
                <span>View Expenses</span>
              </a>
            </li>
            <li>
              <a href="/charts" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <div className="w-5 h-5 mr-3 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-gray-400"></div>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
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
          <button className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover-bg-gray-700 text-gray-300 transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <div className="p-8">
          {/* Top Action Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">View Expenses</h1>
            <div className="flex gap-3">
              <button
                onClick={handleAddTransaction}
                className="bg-blue-gradient text-white px-6 py-2 rounded-full flex items-center hover-shadow-lg transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full flex items-center hover-bg-gray-400 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </button>
            </div>
          </div>

          {/* View Expenses Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-primary border-opacity-30 p-6">
            {/* Toggle Buttons */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">View Expenses</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-primary text-white' 
                      : 'bg-gray-200 text-gray-600 hover-bg-gray-300'
                  }`}
                >
                  <Table className="w-4 h-4 mr-2" />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-blue-primary text-white' 
                      : 'bg-gray-200 text-gray-600 hover-bg-gray-300'
                  }`}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Cards
                </button>
              </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-navy-gradient">
                      <th className="p-4 text-white text-left font-medium">TYPE</th>
                      <th className="p-4 text-white text-left font-medium">CATEGORY</th>
                      <th className="p-4 text-white text-left font-medium">AMOUNT</th>
                      <th className="p-4 text-white text-left font-medium">DATE</th>
                      <th className="p-4 text-white text-left font-medium">PAYMENT MODE</th>
                      <th className="p-4 text-white text-left font-medium">DESCRIPTION</th>
                      <th className="p-4 text-white text-left font-medium">ACTIONS</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="border-b border-gray-200 hover-bg-gray-50 transition-colors">
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            expense.type === 'income' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {expense.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-gray-700">{expense.category}</td>
                        <td className={`p-4 font-semibold ${
                          expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
                        </td>
                        <td className="p-4 text-gray-700">{expense.date}</td>
                        <td className="p-4 text-gray-700">{expense.paymentMode}</td>
                        <td className="p-4 text-gray-700">{expense.description}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditExpense(expense.id)}
                              className="p-2 bg-gray-200 rounded-lg hover-bg-gray-300 transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteExpense(expense.id)}
                              className="p-2 bg-gray-200 rounded-lg hover-bg-gray-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Cards View */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow hover-shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expense.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {expense.type.toUpperCase()}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditExpense(expense.id)}
                          className="p-1 hover-bg-gray-100 rounded transition-colors"
                        >
                          <Edit2 className="w-3 h-3 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1 hover-bg-gray-100 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Category:</span>
                        <span className="text-gray-800 font-medium">{expense.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Amount:</span>
                        <span className={`font-bold ${
                          expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Date:</span>
                        <span className="text-gray-800">{expense.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Payment:</span>
                        <span className="text-gray-800">{expense.paymentMode}</span>
                      </div>
                      {expense.description !== '-' && (
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-600 text-sm">{expense.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpensesPage;
