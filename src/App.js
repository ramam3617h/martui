import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Package, Truck, BarChart3, Settings, LogOut, Search, Plus, Edit, Trash2, Eye, Bell,IndianRupee , Users, Activity, Mail, MessageSquare, Phone, Home, X } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
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
    createCategory: (category) => api.request('/products/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    }),
  },

  orders: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/orders?${query}`);
    },
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
    sendTest: (type, userId) => api.request('/notifications/test', {
      method: 'POST',
      body: JSON.stringify({ type, userId }),
    }),
  },

  users: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.request(`/users?${query}`);
    },
    getById: (id) => api.request(`/users/${id}`),
    create: (user) => api.request('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
    update: (id, user) => api.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
    updatePassword: (id, password) => api.request(`/users/${id}/password`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
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
    updateBulk: (settings) => api.request('/settings/bulk', {
      method: 'POST',
      body: JSON.stringify({ settings }),
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
      admin: { email: 'admin@vrksatechnology.com', password: 'admin@#$123' },
      delivery: { email: 'delivery@vrksatechnology.com', password: 'delivery@#$123' },
      customer: { email: 'customer@example.com', password: 'customer@#$123' }
    };
    setFormData({...formData, ...users[role]});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Market</h1>
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
      
        <div className="mt-3 text-center">
          <p className="text-indigo-600">
            Terms and condition and Policy
     <a href="https://www.vrksatechnology.com" target="_blank" rel="noopener noreferrer"> vrksatechnology.com </a>
          </p>
        </div>
           <div className="border-t border-gray-800 mt-2 pt-1 text-center text-sm">
            <p>&copy; 2025 VRKSA TECHNOLOGY LLP . All rights reserved.</p>
          </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentUser, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [notificationStats, setNotificationStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [orderStats, notifStats] = await Promise.all([
        api.orders.getStats(),
        api.notifications.getStats()
      ]);
      setStats(orderStats.stats);
      setNotificationStats(notifStats.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">{currentUser.name}</p>
        </div>
        <nav className="p-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings }
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
            {activeTab === 'dashboard' && 'Dashboard Overview'}
            {activeTab === 'products' && 'Product Management'}
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'notifications' && 'Notification Center'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardView stats={stats} notificationStats={notificationStats} />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'notifications' && <NotificationManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

function DashboardView({ stats, notificationStats }) {
  if (!stats) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Package} label="Total Orders" value={stats.total_orders || 0} color="blue" />
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${stats.total_revenue || 0}`} color="green" />
        <StatCard icon={Truck} label="In Transit" value={stats.in_transit_orders || 0} color="purple" />
        <StatCard icon={Bell} label="Pending" value={stats.pending_orders || 0} color="orange" />
      </div>

      {notificationStats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} />
            Notification Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Mail className="mx-auto text-blue-500 mb-2" size={24} />
              <p className="text-2xl font-bold">{notificationStats.order_confirmations || 0}</p>
              <p className="text-sm text-gray-600">Order Confirmations</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MessageSquare className="mx-auto text-green-500 mb-2" size={24} />
              <p className="text-2xl font-bold">{notificationStats.status_updates || 0}</p>
              <p className="text-sm text-gray-600">Status Updates</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Phone className="mx-auto text-purple-500 mb-2" size={24} />
              <p className="text-2xl font-bold">{notificationStats.welcome_sent || 0}</p>
              <p className="text-sm text-gray-600">Welcome Messages</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Activity className="mx-auto text-orange-500 mb-2" size={24} />
              <p className="text-2xl font-bold">{notificationStats.total_notifications || 0}</p>
              <p className="text-sm text-gray-600">Total Sent</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className={`p-3 rounded-lg inline-block ${colors[color]} mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.products.getAll();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    
    try {
      await api.products.remove(id);
      loadProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-12">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
	
	{/*
            <div className="text-4xl mb-3 text-center">{product.image_url || ' ^=^s '}</div>
         */} 
           
          {/* <img 
		class="w-full h-auto rounded-lg showdow-lg object-cover"
		src={product.image_url}
                alt={product.name}
               />
            */}  
		<h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category_name}</p>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-green-600">₹{product.price}</span>
              <span className={`text-sm px-2 py-1 rounded ${product.stock > 20 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                Stock: {product.stock}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200">
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
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
      alert('Order status updated! Notifications sent to customer.');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="text-center py-12">Loading orders...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotificationManagement() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [logsData, statsData] = await Promise.all([
        api.notifications.getLogs({ limit: 20 }),
        api.notifications.getStats()
      ]);
      setLogs(logsData.logs || []);
      setStats(statsData.stats);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Mail className="text-blue-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.order_confirmations || 0}</p>
            <p className="text-sm text-gray-600">Order Confirmations</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <MessageSquare className="text-green-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.status_updates || 0}</p>
            <p className="text-sm text-gray-600">Status Updates</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Phone className="text-purple-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.welcome_sent || 0}</p>
            <p className="text-sm text-gray-600">Welcome Messages</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Bell className="text-orange-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.total_notifications || 0}</p>
            <p className="text-sm text-gray-600">Total Sent</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-lg">Recent Notifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.user_name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {log.status || 'sent'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeliveryDashboard() {
  const { currentUser, logout } = useAuth();
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

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      loadOrders();
      alert('Order status updated! Notification sent to customer.');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const assignedOrders = orders.filter(o => ['pending', 'processing', 'in-transit'].includes(o.status));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="text-purple-600" size={32} />
            <div>
              <h1 className="text-xl font-bold">Delivery Dashboard</h1>
              <p className="text-sm text-gray-600">{currentUser.name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Assigned Orders ({assignedOrders.length})</h2>

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : (
          <div className="space-y-4">
            {assignedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.order_number}</h3>
                    <p className="text-gray-600">{order.customer_name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Delivery Address:</p>
                  <p className="font-medium">{order.delivery_address}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <ul className="space-y-1">
                    {order.items && order.items.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        {item.product_name} x {item.quantity} - ₹{item.subtotal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold">Total: ₹{order.total_amount}</span>
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'in-transit')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Start Delivery
                      </button>
                    )}
                    {order.status === 'in-transit' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function CustomerStore() {
  const { currentUser, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeView, setActiveView] = useState('store');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        api.products.getAll(),
        api.orders.getAll()
      ]);
      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async (address, paymentMethod) => {
    try {
      if (paymentMethod === 'razorpay') {
        // Create Razorpay order
        const razorpayOrder = await api.request('/payment/create-order', {
          method: 'POST',
          body: JSON.stringify({
            amount: cartTotal,
            currency: 'INR',
            receipt: `order_${Date.now()}`
          })
        });

        // Initialize Razorpay
        const options = {
          key:'rzp_live_Rjv4rIbcryHGQs', // Replace with your Razorpay key
          amount: razorpayOrder.order.amount,
          currency: razorpayOrder.order.currency,
          name: 'Market',
          description: 'Order Payment',
          order_id: razorpayOrder.order.id,
          handler: async function (response) {
            // Verify payment
            try {
              await api.request('/payment/verify-payment', {
                method: 'POST',
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });

              // Create order after successful payment
              const orderData = {
                items: cart.map(item => ({
                  product_id: item.id,
                  quantity: item.quantity
                })),
                delivery_address: address,
                payment_method: 'razorpay',
                payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                notes: ''
              };

              await api.orders.create(orderData);
              setCart([]);
              setShowCheckout(false);
              setActiveView('orders');
              loadData();
              alert('Payment successful! Order placed. You will receive confirmation notifications via Email, SMS, and WhatsApp.');
            } catch (error) {
              alert('Payment verification failed: ' + error.message);
            }
          },
          prefill: {
            name: currentUser.name,
            email: currentUser.email,
            contact: currentUser.phone || ''
          },
          theme: {
            color: '#16a34a'
          },
          modal: {
            ondismiss: function() {
              alert('Payment cancelled');
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      } else {
        // Cash on Delivery
        const orderData = {
          items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          })),
          delivery_address: address,
          payment_method: 'cod',
          notes: ''
        };

        await api.orders.create(orderData);
        setCart([]);
        setShowCheckout(false);
        setActiveView('orders');
        loadData();
        alert('Order placed successfully! You will receive confirmation notifications via Email, SMS, and WhatsApp.');
      }
    } catch (error) {
      alert('Failed to place order: ' + error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛒</span>
              <div>
                <h1 className="text-2xl font-bold text-green-600">Market</h1>
                <p className="text-sm text-gray-600">Fresh & Quality Products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-green-600 text-white p-3 rounded-full hover:bg-green-700"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="text-sm font-medium">{currentUser.name}</span>
              </div>
              <button onClick={logout} className="text-red-600 hover:text-red-700">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('store')}
              className={`px-4 py-2 rounded-lg ${activeView === 'store' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              <Home size={18} className="inline mr-2" />
              Store
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className={`px-4 py-2 rounded-lg ${activeView === 'orders' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              <Package size={18} className="inline mr-2" />
              My Orders
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeView === 'store' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-4">

                 {/*
		 <div className="text-5xl mb-3 text-center">{product.image_url || '📦'}</div>
			*/}

		{/*	<div className="text-5xl mb-3 text-center"> http://localhost:3000/images/GROC001_Salt.png  </div> */}
                      <img
                	class="w-full h-auto rounded-lg showdow-lg object-cover"
                	src={product.image_url}
                	alt={product.name}
               			/>

                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500">{product.stock} in stock</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300"
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.order_number}</h3>
                      <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Total: ₹{order.total_amount}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {showCart && (
        <CartModal
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
          onClose={() => setShowCart(false)}
          onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cartTotal={cartTotal}
          currentUser={currentUser}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleCheckout}
        />
      )}
    </div>
  );
}

function CartModal({ cart, updateQuantity, removeFromCart, cartTotal, onClose, onCheckout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                 {/*
                   <div className="text-3xl">{item.image_url || '📦'}</div>
			*/}
			<div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">₹{cartTotal}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        api.users.getAll(),
        api.users.getStats()
      ]);
      setUsers(usersData.users || []);
      setStats(statsData.stats);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (userData) => {
    try {
      if (editingUser) {
        await api.users.update(editingUser.id, userData);
      } else {
        await api.users.create(userData);
      }
      setShowForm(false);
      setEditingUser(null);
      loadData();
      alert('User saved successfully!');
    } catch (error) {
      alert('Failed to save user: ' + error.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.users.toggleStatus(id, !currentStatus);
      loadData();
    } catch (error) {
      alert('Failed to update user status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.users.remove(id);
      loadData();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="text-center py-12">Loading users...</div>;

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Users className="text-blue-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.total_users}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Users className="text-green-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.customers}</p>
            <p className="text-sm text-gray-600">Customers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Truck className="text-purple-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.delivery_agents}</p>
            <p className="text-sm text-gray-600">Delivery Agents</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <Settings className="text-orange-500 mb-2" size={32} />
            <p className="text-2xl font-bold">{stats.admins}</p>
            <p className="text-sm text-gray-600">Admins</p>
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="delivery">Delivery</option>
          <option value="customer">Customer</option>
        </select>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'delivery' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.phone || '-'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleStatus(user.id, user.is_active)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingUser(user); setShowForm(true); }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingUser(null); }}
        />
      )}
    </div>
  );
}

function UserForm({ user, onSave, onClose }) {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    password: '',
    role: 'customer',
    phone: '',
    address: '',
    is_active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">{user ? 'Edit User' : 'Add New User'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="customer">Customer</option>
                <option value="delivery">Delivery Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {!user && (
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  required={!user}
                  minLength="6"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.is_active ? '1' : '0'}
                onChange={(e) => setFormData({...formData, is_active: e.target.value === '1'})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows="2"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              {user ? 'Update User' : 'Create User'}
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

function SettingsPanel() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.settings.get();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.settings.updateTenant(settings.tenant);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-6">Store Information</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input
                type="text"
                value={settings.tenant?.name || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tenant: {...settings.tenant, name: e.target.value}
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.tenant?.email || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tenant: {...settings.tenant, email: e.target.value}
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={settings.tenant?.phone || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tenant: {...settings.tenant, phone: e.target.value}
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GST Number</label>
              <input
                type="text"
                value={settings.tenant?.gst_number || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tenant: {...settings.tenant, gst_number: e.target.value}
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Razorpay Key ID</label>
              <input
                type="text"
                value={settings.tenant?.razorpay_key || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  tenant: {...settings.tenant, razorpay_key: e.target.value}
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="rzp_test_xxxxxxxxxxxxx"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Notification Services</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" size={24} />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Send order updates via email</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Phone className="text-green-600" size={24} />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Send order updates via SMS</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-purple-600" size={24} />
              <div>
                <p className="font-medium">WhatsApp Notifications</p>
                <p className="text-sm text-gray-600">Send order updates via WhatsApp</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ cartTotal, currentUser, onClose, onConfirm }) {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(address, paymentMethod);
  };

  const deliveryCharge = cartTotal < 500 ? 40 : 0;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              rows="3"
              placeholder="Enter your complete delivery address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee size={20} className="text-blue-600" />
                    <span className="font-semibold">Razorpay</span>
                  </div>
                  <p className="text-sm text-gray-600">Pay securely with Credit/Debit Card, UPI, NetBanking, Wallets</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">💳 Cards</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">📱 UPI</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">🏦 NetBanking</span>
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={20} className="text-green-600" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Bell size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Order Notifications</p>
                <p className="text-xs text-blue-800">
                  You will receive order confirmation and updates via:
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">📧 Email</span>
                  <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">📱 SMS</span>
                  <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">💬 WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Charge:</span>
              <span className="font-medium">
                {deliveryCharge === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>
            {cartTotal < 500 && (
              <p className="text-xs text-gray-500">
                Add ₹{500 - cartTotal} more for free delivery
              </p>
            )}
            <div className="flex justify-between pt-2 border-t">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-2xl font-bold text-green-600">₹{finalTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            {paymentMethod === 'razorpay' ? (
              <>
                <IndianRupee size={20} />
                Pay ₹{finalTotal} Securely
              </>
            ) : (
              <>
                <Package size={20} />
                Place Order
              </>
            )}
          </button>

          {paymentMethod === 'razorpay' && (
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>🔒 Secured by Razorpay</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
