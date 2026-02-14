import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChartComponent from '../components/ChartComponent';
import Loader from '../components/Loader';
import { Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import expenseService from '../services/expenseService';
import './Reports.css';

const Reports = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
    categoryBreakdown: [],
    monthlyTrend: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [chartType, setChartType] = useState('pie');

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (dateRange.startDate) params.startDate = dateRange.startDate;
      if (dateRange.endDate) params.endDate = dateRange.endDate;

      const response = await expenseService.getStats(params);
      setStats(response.data);
    } catch (err) {
      setError('Failed to load report data');
      console.error('Reports error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setDateRange({ startDate: '', endDate: '' });
  };

  const downloadCSV = () => {
    // Create CSV content
    const headers = ['Title', 'Amount', 'Category', 'Type', 'Date', 'Description'];
    const rows = stats.categoryBreakdown?.map(cat => [
      cat._id,
      cat.total.toFixed(2),
      cat._id,
      'expense',
      new Date().toLocaleDateString(),
      `${cat.count} transactions`
    ]) || [];

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const prepareChartData = () => {
    if (!stats.categoryBreakdown?.length) return null;

    const categoryColors = [
      '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', 
      '#ef4444', '#8b5cf6', '#ec4899', '#6366f1',
      '#14b8a6', '#f97316', '#84cc16', '#a855f7'
    ];

    if (chartType === 'pie') {
      return {
        labels: stats.categoryBreakdown.map(cat => cat._id),
        datasets: [{
          data: stats.categoryBreakdown.map(cat => cat.total),
          backgroundColor: categoryColors.slice(0, stats.categoryBreakdown.length),
          borderWidth: 0,
          hoverOffset: 4
        }]
      };
    } else {
      return {
        labels: stats.categoryBreakdown.map(cat => cat._id),
        datasets: [{
          label: 'Amount',
          data: stats.categoryBreakdown.map(cat => cat.total),
          backgroundColor: categoryColors.slice(0, stats.categoryBreakdown.length),
          borderWidth: 0
        }]
      };
    }
  };

  const prepareMonthlyData = () => {
    if (!stats.monthlyTrend?.length) return null;

    const sortedMonthly = stats.monthlyTrend.sort((a, b) => {
      const dateA = new Date(a._id.year, a._id.month - 1);
      const dateB = new Date(b._id.year, b._id.month - 1);
      return dateA - dateB;
    });

    return {
      labels: sortedMonthly.map(item => {
        const date = new Date(item._id.year, item._id.month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }),
      datasets: [
        {
          label: 'Income',
          data: sortedMonthly.map(item => item.income),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: '#10b981',
          borderWidth: 2
        },
        {
          label: 'Expenses',
          data: sortedMonthly.map(item => item.expense),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: '#ef4444',
          borderWidth: 2
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="reports-container">
        <Sidebar />
        <div className="reports-main">
          <Navbar title="Reports" />
          <div className="reports-content">
            <Loader size="large" text="Loading reports..." />
          </div>
        </div>
      </div>
    );
  }

  const chartData = prepareChartData();
  const monthlyData = prepareMonthlyData();

  return (
    <div className="reports-container">
      <Sidebar />
      <div className="reports-main">
        <Navbar title="Reports" />
        
        <div className="reports-content">
          {error && (
            <div className="reports-error">
              <span>{error}</span>
            </div>
          )}

          {/* Summary Cards */}
          <div className="reports-summary">
            <div className="summary-card income">
              <div className="summary-icon">
                <TrendingUp />
              </div>
              <div className="summary-content">
                <h3>Total Income</h3>
                <p>{formatAmount(stats.totalIncome)}</p>
              </div>
            </div>

            <div className="summary-card expense">
              <div className="summary-icon">
                <TrendingDown />
              </div>
              <div className="summary-content">
                <h3>Total Expenses</h3>
                <p>{formatAmount(stats.totalExpense)}</p>
              </div>
            </div>

            <div className="summary-card balance">
              <div className="summary-icon">
                <Calendar />
              </div>
              <div className="summary-content">
                <h3>Net Balance</h3>
                <p>{formatAmount(stats.balance)}</p>
              </div>
            </div>

            <div className="summary-card transactions">
              <div className="summary-icon">
                <Filter />
              </div>
              <div className="summary-content">
                <h3>Transactions</h3>
                <p>{stats.totalTransactions}</p>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="reports-controls">
            <div className="date-filters">
              <div className="filter-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="filter-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="form-input"
                />
              </div>
              <button className="btn btn-secondary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>

            <div className="chart-controls">
              <div className="chart-type-selector">
                <button
                  className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}
                  onClick={() => setChartType('pie')}
                >
                  Pie Chart
                </button>
                <button
                  className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                  onClick={() => setChartType('bar')}
                >
                  Bar Chart
                </button>
              </div>
              
              <button className="btn btn-primary" onClick={downloadCSV}>
                <Download size={16} />
                Download CSV
              </button>
            </div>
          </div>

          {/* Charts Section */}
          <div className="reports-charts">
            <div className="chart-section">
              <h2>Category Breakdown</h2>
              {chartData ? (
                <ChartComponent
                  type={chartType}
                  data={chartData}
                  height={400}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: chartType === 'pie' ? 'right' : 'top'
                      }
                    }
                  }}
                />
              ) : (
                <div className="no-data">
                  <p>No data available for the selected period</p>
                </div>
              )}
            </div>

            <div className="chart-section">
              <h2>Monthly Trend</h2>
              {monthlyData ? (
                <ChartComponent
                  type={chartType === 'pie' ? 'line' : 'bar'}
                  data={monthlyData}
                  height={400}
                />
              ) : (
                <div className="no-data">
                  <p>No monthly data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Details */}
          {stats.categoryBreakdown?.length > 0 && (
            <div className="category-details">
              <h2>Category Details</h2>
              <div className="category-list">
                {stats.categoryBreakdown.map((category, index) => {
                  const percentage = stats.totalExpense > 0 
                    ? (category.total / stats.totalExpense * 100).toFixed(1)
                    : 0;
                  
                  return (
                    <div key={category._id} className="category-item">
                      <div className="category-info">
                        <div className="category-color" style={{
                          backgroundColor: [
                            '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', 
                            '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'
                          ][index % 8]
                        }}></div>
                        <div className="category-name">{category._id}</div>
                      </div>
                      <div className="category-stats">
                        <span className="category-amount">{formatAmount(category.total)}</span>
                        <span className="category-percentage">{percentage}%</span>
                        <span className="category-count">{category.count} transactions</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
