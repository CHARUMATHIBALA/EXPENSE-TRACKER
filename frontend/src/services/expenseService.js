import api from './api';

export const expenseService = {
  // Get all expenses for the authenticated user
  getAll: async (params = {}) => {
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  // Get single expense
  getById: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Create new expense
  create: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  update: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  delete: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  // Get expense statistics
  getStats: async (params = {}) => {
    const response = await api.get('/expenses/stats', { params });
    return response.data;
  },

  // Filter expenses by date range
  filterByDate: async (startDate, endDate) => {
    const response = await api.get('/expenses', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Filter expenses by category
  filterByCategory: async (category) => {
    const response = await api.get('/expenses', {
      params: { category }
    });
    return response.data;
  },

  // Filter expenses by type (income/expense)
  filterByType: async (type) => {
    const response = await api.get('/expenses', {
      params: { type }
    });
    return response.data;
  },

  // Search expenses
  search: async (query) => {
    const response = await api.get('/expenses', {
      params: { search: query }
    });
    return response.data;
  }
};

export default expenseService;
