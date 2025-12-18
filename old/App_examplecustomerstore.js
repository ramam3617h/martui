import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, Star, Heart, User, Package } from 'lucide-react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentView, setCurrentView] = useState('store');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'books', name: 'Books', icon: '📚' }
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 89.99, category: 'electronics', rating: 4.5, image: '🎧', description: 'Premium noise-canceling headphones' },
    { id: 2, name: 'Smart Watch', price: 249.99, category: 'electronics', rating: 4.7, image: '⌚', description: 'Fitness tracking smartwatch' },
    { id: 3, name: 'Cotton T-Shirt', price: 24.99, category: 'clothing', rating: 4.3, image: '👕', description: 'Comfortable cotton blend' },
    { id: 4, name: 'Running Shoes', price: 119.99, category: 'sports', rating: 4.6, image: '👟', description: 'Professional running shoes' },
    { id: 5, name: 'Coffee Maker', price: 79.99, category: 'home', rating: 4.4, image: '☕', description: 'Programmable coffee maker' },
    { id: 6, name: 'Yoga Mat', price: 34.99, category: 'sports', rating: 4.5, image: '🧘', description: 'Non-slip yoga mat' },
    { id: 7, name: 'Desk Lamp', price: 44.99, category: 'home', rating: 4.2, image: '💡', description: 'LED desk lamp with dimmer' },
    { id: 8, name: 'Fiction Novel', price: 14.99, category: 'books', rating: 4.8, image: '📖', description: 'Bestselling fiction' },
    { id: 9, name: 'Bluetooth Speaker', price: 59.99, category: 'electronics', rating: 4.6, image: '🔊', description: 'Portable wireless speaker' },
    { id: 10, name: 'Jeans', price: 69.99, category: 'clothing', rating: 4.4, image: '👖', description: 'Classic fit denim jeans' },
    { id: 11, name: 'Plant Pot Set', price: 29.99, category: 'home', rating: 4.3, image: '🪴', description: 'Ceramic plant pots set of 3' },
    { id: 12, name: 'Cookbook', price: 19.99, category: 'books', rating: 4.5, image: '📕', description: 'Healthy recipe cookbook' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden">
              {showMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-blue-600">ShopHub</h1>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentView('orders')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Package size={24} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={24} />
            </button>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );

  const CategoryBar = () => (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentView('store');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => {
    const isInWishlist = wishlist.find(item => item.id === product.id);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
        <div className="relative">
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <span className="text-6xl">{product.image}</span>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
          >
            <Heart size={20} fill={isInWishlist ? 'red' : 'none'} color={isInWishlist ? 'red' : 'gray'} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          
          <div className="flex items-center mb-3">
            <Star size={16} fill="gold" color="gold" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
            <span className="ml-1 text-sm text-gray-500">(127)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <ShoppingCart size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartSidebar = () => (
    <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform z-50 ${
      showCart ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={() => setShowCart(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const WishlistView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => setCurrentView('store')}
        className="flex items-center text-blue-600 mb-6 hover:underline"
      >
        <ChevronRight size={20} className="rotate-180" />
        <span>Back to Store</span>
      </button>
      
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  const OrdersView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => setCurrentView('store')}
        className="flex items-center text-blue-600 mb-6 hover:underline"
      >
        <ChevronRight size={20} className="rotate-180" />
        <span>Back to Store</span>
      </button>
      
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      
      <div className="text-center py-12">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No orders yet</p>
        <p className="text-gray-400">Start shopping to see your orders here</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentView === 'store' && <CategoryBar />}
      
      {currentView === 'store' && (
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' 
                ? 'All Products' 
                : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      )}
      
      {currentView === 'wishlist' && <WishlistView />}
      {currentView === 'orders' && <OrdersView />}
      
      <CartSidebar />
      
      {showCart && (
        <div 
          onClick={() => setShowCart(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
};

export default App;
