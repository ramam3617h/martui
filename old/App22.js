import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Package, Truck, BarChart3, Settings, LogOut, Search, Plus, Edit, Trash2, Eye, Bell, DollarSign, Users, Activity, Mail, MessageSquare, Phone, Home, X } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';
const TENANT_ID = 1;

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  auth: {
    login: (email, password) => 
      api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, tenantId: TENANT_ID }),
      }),
    register: (userData) => 
      api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ ...userData, tenantId: TENANT_ID }),
      }),
  },

  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/products?${query}`);
    },
    getById: (id) => api.request(`/products/${id}`),
    create: (product) => api.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
    update: (id, product) => api.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
    remove: (id) => api.request(`/products/${id}`, { method: 'DELETE' }),
    getCategories: () => api.request('/products/categories/list'),
  },

  orders: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/orders?${query}`);
    },
    getById: (id) => api.request(`/orders/${id}`),
    create: (orderData) => api.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
    updateStatus: (id, status) => api.request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    getStats: () => api.request('/orders/stats/dashboard'),
  },

  notifications: {
    getLogs: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/notifications/logs?${query}`);
    },
    getStats: () => api.request('/notifications/stats'),
  },

  users: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/users?${query}`);
    },
    create: (user) => api.request('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
    update: (id, user) => api.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
    toggleStatus: (id, is_active) => api.request(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active }),
    }),
    remove: (id) => api.request(`/users/${id}`, { method: 'DELETE' }),
    getStats: () => api.request('/users/stats/summary'),
  },

  settings: {
    get: () => api.request('/settings'),
    updateTenant: (data) => api.request('/settings/tenant', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },
};

const AuthContext = React.createContext();

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default function MultiTenantEcommerce() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.auth.register(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      <div className="min-h-screen bg-gray-50">
        {!currentUser ? (
          <LoginPage />
        ) : currentUser.role === 'admin' ? (
          <AdminDashboard />
        ) : currentUser.role === 'delivery' ? (
          <DeliveryDashboard />
        ) : (
          <CustomerStore />
        )}
      </div>
    </AuthContext.Provider>
  );
}

function LoginPage() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData);

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  const quickLogin = (role) => {
    const users = {
      admin: { email: 'admin@freshmart.com', password: 'admin123' },
      delivery: { email: 'delivery@freshmart.com', password: 'delivery123' },
      customer: { email: 'customer@example.com', password: 'customer123' }
    };
    setFormData({...formData, ...users[role]});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">FreshMart</h1>
          <p className="text-gray-600">Fresh & Quality Products</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              isLogin ? 'bg-white shadow' : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              !isLogin ? 'bg-white shadow' : 'text-gray-600'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows="2"
                />
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {isLogin && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-3 text-center">Demo Accounts:</p>
            <div className="space-y-2">
              <button onClick={() => quickLogin('admin')} className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg text-sm hover:bg-blue-200">
                Admin Demo
              </button>
              <button onClick={() => quickLogin('delivery')} className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg text-sm hover:bg-purple-200">
                Delivery Demo
              </button>
              <button onClick={() => quickLogin('customer')} className="w-full bg-green-100 text-green-700 py-2 rounded-lg text-sm hover:bg-green-200">
                Customer Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">{currentUser.name}</p>
        </div>
        <nav className="p-4">
          {[
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'users', label: 'Users', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === tab.id ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-4"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'users' && 'User Management'}
          </h1>
        </header>

        <div className="p-6">
          {activeTab === 'products' && <ProductManagementByCategory />}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </main>
    </div>
  );
}

function ProductManagementByCategory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.products.getAll(),
        api.products.getCategories()
      ]);
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        await api.products.update(editingProduct.id, productData);
      } else {
        await api.products.create(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
      loadData();
      alert('Product saved successfully!');
    } catch (error) {
      alert('Failed to save product: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.products.remove(id);
      loadData();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Fruits': 'from-red-400 to-pink-500',
      'Vegetables': 'from-green-400 to-emerald-500',
      'Grocery': 'from-yellow-400 to-orange-500',
      'Kitchen Items': 'from-purple-400 to-indigo-500',
      'Cleaning Items': 'from-blue-400 to-cyan-500'
    };
    return colors[categoryName] || 'from-gray-400 to-gray-500';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛒</span>
              <div>
                <h1 className="text-2xl font-bold text-green-600">FreshMart</h1>
                <p className="text-sm text-gray-600">Fresh & Quality Products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <button onClick={logout} className="text-red-600 hover:text-red-700">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          {categories.map(category => {
            const categoryProducts = filteredProducts.filter(p => p.category_name === category.name);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${getCategoryColor(category.name)} p-6`}>
                  <div className="flex items-center gap-4 text-white">
                    <div className="text-6xl">{category.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-white/90 mt-1">{categoryProducts.length} products available</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryProducts.map(product => (
                      <div key={product.id} className="bg-white border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-green-400 transition-all">
                        <div className="p-5">
                          <div className="text-6xl mb-4 text-center">{product.image_url || '📦'}</div>
                          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                            <span className="text-sm text-gray-500">{product.stock} in stock</span>
                          </div>
                          <button
                            disabled={product.stock === 0}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 font-medium"
                          >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-md"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category_name === category.name);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${getCategoryColor(category.name)} p-6`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{category.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-white/90 mt-1">{categoryProducts.length} products available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryProducts.map(product => (
                    <div key={product.id} className="bg-white border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-green-400 transition-all duration-200">
                      <div className="p-5">
                        <div className="text-6xl mb-4 text-center">{product.image_url || '📦'}</div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{product.sku || 'No SKU'}</p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{product.description}</p>
                        
                        <div className="flex items-center justify-between mb-4 pb-4 border-b">
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Stock</p>
                            <p className={`text-xl font-bold ${
                              product.stock > 20 ? 'text-green-600' : 
                              product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {product.stock}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingProduct(product); setShowForm(true); }}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 font-medium"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 py-2 rounded-lg hover:bg-red-100 font-medium"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onClose }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    category_id: categories[0]?.id || 1,
    price: '',
    stock: '',
    description: '',
    image_url: '',
    sku: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <input
                type="text"
                value={formData.sku || ''}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="PROD001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
                min="0"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Image Emoji</label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="📦 or 🍎"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.orders.getAll();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.orders.updateStatus(id, status);
      loadOrders();
      alert('Order status updated! Notification sent to customer.');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">#{order.order_number}</td>
              <td className="px-6 py-4">{order.customer_name}</td>
              <td className="px-6 py-4 font-semibold">₹{order.total_amount}</td>
              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                  className={`px-3 py-1 rounded text-sm ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserManagement() {
  return <div className="bg-white rounded-lg shadow p-6">User Management - Coming Soon</div>;
}

function DeliveryDashboard() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Delivery Dashboard - {currentUser.name}</h1>
        <button onClick={logout} className="text-red-600">
          <LogOut size={20} />
        </button>
      </header>
      <div className="p-6">
        <p>Delivery Dashboard Content</p>
      </div>
    </div>
  );
}

function CustomerStore() {
  const { currentUser, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        api.products.getAll(),
        api.products.getCategories()
      ]);
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Fruits': 'from-red-400 to-pink-500',
      'Vegetables': 'from-green-400 to-emerald-500',
      'Grocery': 'from-yellow-400 to-orange-500',
      'Kitchen Items': 'from-purple-400 to-indigo-500',
      'Cleaning Items': 'from-blue-400 to-cyan-500'
    };
    return colors[categoryName] || 'from-gray-400 to-gray-500';
