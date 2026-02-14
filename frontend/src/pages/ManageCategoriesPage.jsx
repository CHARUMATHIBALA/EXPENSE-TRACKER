import { useState } from 'react';
import { Plus, Edit2, Trash2, FolderPlus } from 'lucide-react';

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Bills', createdDate: '2026-02-12' },
    { id: 2, name: 'Entertainment', createdDate: '2026-02-12' },
    { id: 3, name: 'Food', createdDate: '2026-02-12' },
    { id: 4, name: 'Healthcare', createdDate: '2026-02-12' },
    { id: 5, name: 'Other', createdDate: '2026-02-12' }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      setCategories([...categories, {
        id: newId,
        name: newCategory.trim(),
        createdDate: new Date().toISOString().split('T')[0]
      }]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (id) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setEditingCategory(category);
    }
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editingCategory && editingCategory.name.trim()) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, name: editingCategory.name.trim() }
          : c
      ));
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="flex h-screen bg-navy-dark">
      {/* Sidebar */}
      <div className="w-64 bg-navy-gradient flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors mr-3">
              <FolderPlus className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center">
              <div className="bg-blue-gradient rounded-lg p-2 mr-2">
                <FolderPlus className="w-6 h-6 text-white" />
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
                <FolderPlus className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/categories" className="flex items-center p-3 rounded-lg bg-blue-primary text-white">
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
              <a href="/view-expenses" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <FolderPlus className="w-5 h-5 mr-3" />
                <span>View Expenses</span>
              </a>
            </li>
            <li>
              <a href="/charts" className="flex items-center p-3 rounded-lg text-gray-300 hover-bg-gray-800 transition-colors">
                <FolderPlus className="w-5 h-5 mr-3" />
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
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-white font-medium">novah</p>
                <p className="text-blue-light text-sm">Premium User</p>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors">
            <FolderPlus className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Categories</h1>
            <p className="text-gray-400">Welcome, novah</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add New Category Card */}
            <div className="lg:col-span-1">
              <div className="bg-navy-medium rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <Plus className="w-5 h-5 text-blue-primary mr-2" />
                  <h3 className="text-xl font-bold text-white">Add New Category</h3>
                </div>
                
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-primary transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-gradient text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Category
                  </button>
                </form>
              </div>
            </div>

            {/* Categories Table */}
            <div className="lg:col-span-2">
              <div className="bg-navy-medium rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-gray-300 font-medium">CATEGORY NAME</th>
                        <th className="text-left p-4 text-gray-300 font-medium">CREATED DATE</th>
                        <th className="text-left p-4 text-gray-300 font-medium">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                          <td className="p-4 text-white">
                            {editingCategory?.id === category.id ? (
                              <input
                                type="text"
                                value={editingCategory.name}
                                onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                                onBlur={handleUpdateCategory}
                                onKeyPress={(e) => e.key === 'Enter' && handleUpdateCategory(e)}
                                className="bg-gray-700 border border-blue-primary rounded px-2 py-1 text-white focus:outline-none"
                                autoFocus
                              />
                            ) : (
                              category.name
                            )}
                          </td>
                          <td className="p-4 text-gray-400">{category.createdDate}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditCategory(category.id)}
                                className="p-2 bg-blue-primary rounded-lg hover:bg-blue-secondary transition-colors"
                              >
                                <Edit2 className="w-4 h-4 text-white" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
