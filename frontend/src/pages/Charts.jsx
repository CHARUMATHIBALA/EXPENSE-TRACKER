import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Download,
  PieChart,
  BarChart3,
  Activity
} from 'lucide-react';
import expenseService from '../services/expenseService';
import './Charts.css';

const Charts = () => {
  const [chartData, setChartData] = useState({
    monthly: [],
    categories: [],
    daily: [],
    stats: {
      totalIncome: 0,
      totalExpense: 0,
      totalSavings: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedChart, setSelectedChart] = useState('overview');

  useEffect(() => {
    fetchChartData();
  }, [selectedPeriod]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch expenses data
      const expensesResponse = await expenseService.getAll({ 
        limit: 100,
        startDate: getStartDateForPeriod(selectedPeriod)
      });
      
      const expenses = expensesResponse.data || [];
      
      // Process data for charts
      const processedData = processExpensesData(expenses);
      setChartData(processedData);
      
    } catch (err) {
      setError('Failed to load chart data');
      console.error('Charts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStartDateForPeriod = (period) => {
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 6);
    }
    
    return startDate.toISOString().split('T')[0];
  };

  const processExpensesData = (expenses) => {
    // Group by month
    const monthlyData = {};
    const categoryData = {};
    const dailyData = {};
    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      const category = expense.category || 'Other';
      
      // Monthly data
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      
      if (expense.type === 'income') {
        monthlyData[monthKey].income += expense.amount;
        totalIncome += expense.amount;
      } else {
        monthlyData[monthKey].expense += expense.amount;
        totalExpense += expense.amount;
      }
      
      // Category data
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      if (expense.type === 'expense') {
        categoryData[category] += expense.amount;
      }
      
      // Daily data (last 7 days)
      const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      if (daysDiff < 7) {
        if (!dailyData[dayKey]) {
          dailyData[dayKey] = 0;
        }
        if (expense.type === 'expense') {
          dailyData[dayKey] += expense.amount;
        }
      }
    });

    // Convert to arrays and sort
    const monthlyArray = Object.entries(monthlyData)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    const categoryArray = Object.entries(categoryData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const dailyArray = Object.entries(dailyData)
      .map(([day, amount]) => ({ day, amount }))
      .sort((a, b) => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.indexOf(a.day) - days.indexOf(b.day);
      });

    return {
      monthly: monthlyArray,
      categories: categoryArray,
      daily: dailyArray,
      stats: {
        totalIncome,
        totalExpense,
        totalSavings: totalIncome - totalExpense
      }
    };
  };

  const handleExportData = () => {
    const csvContent = [
      ['Month', 'Income', 'Expense'],
      ...chartData.monthly.map(item => [item.month, item.income, item.expense])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-data-${selectedPeriod}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="charts-container">
        <Sidebar />
        <div className="charts-main">
          <div className="charts-content">
            <Loader size="large" text="Loading charts..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <Sidebar />
      <div className="charts-main">
        <div className="charts-content">
          {error && (
            <div className="charts-error">
              <span>{error}</span>
            </div>
          )}

          {/* Charts Header */}
          <div className="charts-header">
            <h1>Analytics Dashboard</h1>
            <p>Visualize your financial data with interactive charts</p>
          </div>

          {/* Summary Cards */}
          <div className="charts-summary">
            <div className="summary-card income">
              <div className="card-icon">
                <TrendingUp size={24} />
              </div>
              <div className="card-content">
                <h3>Total Income</h3>
                <p className="amount">₹{chartData.stats.totalIncome.toLocaleString()}</p>
                <span className="period">Last {selectedPeriod.replace('months', ' months').replace('month', ' month').replace('year', ' year')}</span>
              </div>
            </div>
            
            <div className="summary-card expense">
              <div className="card-icon">
                <TrendingDown size={24} />
              </div>
              <div className="card-content">
                <h3>Total Expenses</h3>
                <p className="amount">₹{chartData.stats.totalExpense.toLocaleString()}</p>
                <span className="period">Last {selectedPeriod.replace('months', ' months').replace('month', ' month').replace('year', ' year')}</span>
              </div>
            </div>
            
            <div className="summary-card savings">
              <div className="card-icon">
                <DollarSign size={24} />
              </div>
              <div className="card-content">
                <h3>Total Savings</h3>
                <p className="amount">₹{chartData.stats.totalSavings.toLocaleString()}</p>
                <span className="period">Last {selectedPeriod.replace('months', ' months').replace('month', ' month').replace('year', ' year')}</span>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="chart-controls">
            <div className="period-selector">
              <label>Period:</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
              </select>
            </div>
            
            <button className="export-btn" onClick={handleExportData}>
              <Download size={16} />
              Export Data
            </button>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Monthly Overview Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">
                  <BarChart3 size={20} />
                  <h3>Income vs Expenses</h3>
                </div>
                <span className="chart-subtitle">Monthly comparison</span>
              </div>
              <div className="chart-container">
                {chartData.monthly.length > 0 ? (
                  <div className="bar-chart">
                    {chartData.monthly.map((item, index) => (
                      <div key={index} className="bar-group">
                        <div className="bars">
                          <div 
                            className="bar income-bar"
                            style={{ 
                              height: `${Math.max((item.income / Math.max(...chartData.monthly.map(m => m.income))) * 200, 10)}px`,
                              backgroundColor: '#10b981'
                            }}
                            title={`Income: ₹${item.income}`}
                          />
                          <div 
                            className="bar expense-bar"
                            style={{ 
                              height: `${Math.max((item.expense / Math.max(...chartData.monthly.map(m => m.expense))) * 200, 10)}px`,
                              backgroundColor: '#ef4444'
                            }}
                            title={`Expense: ₹${item.expense}`}
                          />
                        </div>
                        <span className="bar-label">{item.month}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-data">No data available for selected period</div>
                )}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color income" />
                  <span>Income</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color expense" />
                  <span>Expenses</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">
                  <PieChart size={20} />
                  <h3>Category Breakdown</h3>
                </div>
                <span className="chart-subtitle">Expense distribution</span>
              </div>
              <div className="chart-container">
                {chartData.categories.length > 0 ? (
                  <div className="category-bars">
                    {chartData.categories.map((category, index) => {
                      const maxAmount = Math.max(...chartData.categories.map(c => c.value));
                      const percentage = (category.value / chartData.categories.reduce((sum, cat) => sum + cat.value, 0)) * 100;
                      const colors = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#ec4899', '#6b7280', '#14b8a6', '#f97316'];
                      
                      return (
                        <div key={index} className="category-bar-item">
                          <div className="category-info">
                            <span className="category-name">{category.name}</span>
                            <span className="category-amount">₹{category.value.toLocaleString()}</span>
                          </div>
                          <div className="category-bar">
                            <div 
                              className="category-bar-fill"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: colors[index % colors.length]
                              }}
                            />
                          </div>
                          <span className="category-percentage">{percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-data">No expense data available</div>
                )}
              </div>
            </div>

            {/* Daily Spending */}
            <div className="chart-card full-width">
              <div className="chart-header">
                <div className="chart-title">
                  <Activity size={20} />
                  <h3>Daily Spending Trend</h3>
                </div>
                <span className="chart-subtitle">Last 7 days</span>
              </div>
              <div className="chart-container">
                {chartData.daily.length > 0 ? (
                  <div className="line-chart">
                    <div className="line-chart-grid">
                      {chartData.daily.map((item, index) => {
                        const maxAmount = Math.max(...chartData.daily.map(d => d.amount));
                        return (
                          <div key={index} className="line-point">
                            <div 
                              className="point"
                              style={{ 
                                bottom: `${Math.max((item.amount / maxAmount) * 150, 10)}px`,
                                backgroundColor: '#3b82f6'
                              }}
                              title={`${item.day}: ₹${item.amount}`}
                            />
                            <span className="point-label">{item.day}</span>
                            <span className="point-value">₹{item.amount}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="no-data">No daily data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
