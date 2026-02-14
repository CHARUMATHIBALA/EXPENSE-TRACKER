import { useState } from 'react';
import { TrendingUp, Menu, Home, FolderPlus, FileText, BarChart3, User, LogOut, PieChart, BarChart } from 'lucide-react';

const ChartsPage = () => {
  const [categoryData] = useState([
    { name: 'PETROL', value: 1000.00, percentage: 83.3, color: '#3b82f6' },
    { name: 'Food', value: 200.00, percentage: 16.7, color: '#10b981' }
  ]);

  const [comparisonData] = useState([
    { category: 'PETROL', amount: 1000.00, color: '#3b82f6' },
    { category: 'Food', amount: 200.00, color: '#10b981' }
  ]);

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

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
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
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
              <a href="#" className="flex items-center p-3 rounded-lg bg-blue-primary text-white">
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
          <button className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover-bg-gray-700 text-gray-300 transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-navy-dark overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Visualize your spending patterns by category</h1>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Breakdown Card */}
            <div className="bg-navy-medium rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="flex items-center mb-6">
                <PieChart className="w-6 h-6 text-blue-primary mr-3" />
                <h2 className="text-xl font-bold text-white">Category Breakdown</h2>
              </div>
              
              {/* Pie Chart */}
              <div className="relative mb-6">
                <div className="w-64 h-64 mx-auto relative">
                  {/* SVG Pie Chart */}
                  <svg className="w-full h-full transform -rotate-90">
                    {categoryData.map((item, index) => {
                      const percentage = item.percentage;
                      const strokeDasharray = `${percentage} ${100 - percentage}`;
                      const strokeDashoffset = index === 0 ? 0 : -categoryData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                      
                      return (
                        <circle
                          key={item.name}
                          cx="128"
                          cy="128"
                          r="100"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="40"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Tooltip */}
                  <div className="absolute top-1/4 left-1/4 bg-gray-800 rounded-lg p-3 shadow-xl border border-gray-600">
                    <p className="text-white font-bold text-sm">PETROL</p>
                    <p className="text-blue-primary font-semibold">₹1000.00</p>
                    <p className="text-gray-400 text-xs">(83.3%)</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense Comparison Card */}
            <div className="bg-navy-medium rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="flex items-center mb-6">
                <BarChart className="w-6 h-6 text-blue-primary mr-3" />
                <h2 className="text-xl font-bold text-white">Expense Comparison</h2>
              </div>
              
              {/* Bar Chart */}
              <div className="relative h-64">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-400 text-xs">
                  <span>₹1000</span>
                  <span>₹900</span>
                  <span>₹800</span>
                  <span>₹700</span>
                  <span>₹600</span>
                  <span>₹500</span>
                  <span>₹400</span>
                  <span>₹300</span>
                  <span>₹200</span>
                  <span>₹100</span>
                  <span>₹0</span>
                </div>

                {/* Grid lines */}
                <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="border-b border-gray-700 border-opacity-30"></div>
                  ))}
                </div>

                {/* Bars */}
                <div className="absolute left-12 right-4 top-0 h-full flex items-end justify-around px-8">
                  {comparisonData.map((item) => {
                    const height = (item.amount / 1000) * 100; // Percentage of max value (₹1000)
                    return (
                      <div key={item.category} className="flex flex-col items-center flex-1">
                        <div className="w-full max-w-16 relative">
                          <div 
                            className="rounded-t transition-all duration-500"
                            style={{ 
                              backgroundColor: item.color,
                              height: `${height}%`,
                              minHeight: '20px'
                            }}
                          ></div>
                        </div>
                        <span className="text-white text-sm mt-2 font-medium">{item.category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amount labels on bars */}
              <div className="absolute left-12 right-4 top-0 h-full flex items-end justify-around px-8 pointer-events-none">
                {comparisonData.map((item) => {
                  const height = (item.amount / 1000) * 100;
                  return (
                    <div key={item.category} className="flex flex-col items-center flex-1">
                      <div className="w-full max-w-16 relative">
                        <div 
                          className="text-white text-xs font-bold text-center"
                          style={{ 
                            bottom: `${height + 5}%`,
                            position: 'absolute',
                            width: '100%'
                          }}
                        >
                          ₹{item.amount.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-navy-medium rounded-xl p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm mb-2">Total Expenses</h3>
              <p className="text-2xl font-bold text-white">₹{totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-navy-medium rounded-xl p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm mb-2">Categories</h3>
              <p className="text-2xl font-bold text-white">{categoryData.length}</p>
            </div>
            <div className="bg-navy-medium rounded-xl p-6 border border-gray-700">
              <h3 className="text-gray-400 text-sm mb-2">Highest Category</h3>
              <p className="text-2xl font-bold text-white">{categoryData[0]?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
