import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Trash2, Edit2, Plus, LogOut } from 'lucide-react';
import { getProductsFromStorage, saveProductsToStorage } from '../data/products';
import './Admin.css';

const ADMIN_CODE = 'vgr2024admin';

const Admin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Sarees',
    size: 'M',
    stock: '',
    description: ''
  });

  const [offerData, setOfferData] = useState({
    productId: '',
    discountPercent: '',
    expiryDate: ''
  });

  // Check authentication on mount
  useEffect(() => {
    const code = searchParams.get('code');
    if (code === ADMIN_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else if (sessionStorage.getItem('adminAuth')) {
      setIsAuthenticated(true);
    }
  }, [searchParams]);

  // Load products from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      setProducts(getProductsFromStorage());

      const savedOffers = localStorage.getItem('vgr_offers');
      if (savedOffers) {
        setOffers(JSON.parse(savedOffers));
      }
    }
  }, [isAuthenticated]);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (adminCode === ADMIN_CODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setAdminCode('');
    } else {
      alert('Invalid admin code');
      setAdminCode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: editingId || products.length + 1,
      ...formData,
      price: parseFloat(formData.price).toFixed(0),
      stock: parseInt(formData.stock)
    };

    let updatedProducts;
    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? newProduct : p);
      setEditingId(null);
    } else {
      updatedProducts = [...products, { ...newProduct, id: Math.max(...products.map(p => p.id)) + 1 }];
    }

    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
    resetForm();
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
    }
  };

  const handleAddOffer = () => {
    if (!offerData.productId || !offerData.discountPercent || !offerData.expiryDate) {
      alert('Please fill in all offer fields');
      return;
    }

    const newOffer = {
      id: Math.max(...offers.map(o => o.id), 0) + 1,
      ...offerData,
      discountPercent: parseInt(offerData.discountPercent)
    };

    const updatedOffers = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem('vgr_offers', JSON.stringify(updatedOffers));
    setOfferData({ productId: '', discountPercent: '', expiryDate: '' });
  };

  const handleDeleteOffer = (id) => {
    const updatedOffers = offers.filter(o => o.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem('vgr_offers', JSON.stringify(updatedOffers));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      category: 'Sarees',
      size: 'M',
      stock: '',
      description: ''
    });
    setEditingId(null);
  };

  const getTotalStock = () => products.reduce((sum, p) => sum + p.stock, 0);

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="login-card">
          <h1>Admin Access</h1>
          <p>Enter the admin code to access the dashboard</p>
          <form onSubmit={handleCodeSubmit}>
            <input
              type="password"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="admin-input"
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const totalInStock = getTotalStock();
  const lowStockProducts = products.filter(p => p.stock < 10);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-content">
          <h1>VGR Admin Dashboard</h1>
          <p>Manage products and offers</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={`tab ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          Offers
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-section">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-number">{products.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Stock</h3>
                <p className="stat-number">{totalInStock}</p>
              </div>
              <div className="stat-card warning">
                <h3>Low Stock Items</h3>
                <p className="stat-number">{lowStockProducts.length}</p>
              </div>
              <div className="stat-card">
                <h3>Active Offers</h3>
                <p className="stat-number">{offers.length}</p>
              </div>
            </div>

            {lowStockProducts.length > 0 && (
              <div className="low-stock-section">
                <h3>⚠️ Low Stock Alert</h3>
                <div className="low-stock-list">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="low-stock-item">
                      <span>{product.name}</span>
                      <span className="stock-badge">Stock: {product.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Manage Products</h2>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>

            {showAddForm && (
              <div className="form-container">
                <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price (₹) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock Count *</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="form-input"
                      >
                        <option>Sarees</option>
                        <option>Lehengas</option>
                        <option>Jewelry</option>
                        <option>Designer Wear</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Size</label>
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        className="form-input"
                      >
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="form-input"
                      placeholder="/assets/product_image.png"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="form-input"
                      rows="3"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                      {editingId ? 'Update Product' : 'Add Product'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className={product.stock < 10 ? 'low-stock-row' : ''}>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td className={product.stock < 10 ? 'stock-warning' : ''}>
                        {product.stock}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.size}</td>
                      <td className="actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditProduct(product)}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="offers-section">
            <h2>Manage Offers</h2>
            
            <div className="offer-form">
              <h3>Add New Offer</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Product *</label>
                  <select
                    value={offerData.productId}
                    onChange={(e) => setOfferData({...offerData, productId: e.target.value})}
                    className="form-input"
                  >
                    <option value="">Select a product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount % *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={offerData.discountPercent}
                    onChange={(e) => setOfferData({...offerData, discountPercent: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="date"
                    value={offerData.expiryDate}
                    onChange={(e) => setOfferData({...offerData, expiryDate: e.target.value})}
                    className="form-input"
                  />
                </div>
                <button 
                  onClick={handleAddOffer}
                  className="btn btn-primary add-offer-btn"
                >
                  Add Offer
                </button>
              </div>
            </div>

            <div className="offers-list">
              <h3>Active Offers</h3>
              {offers.length === 0 ? (
                <p className="empty-state">No offers yet</p>
              ) : (
                <div className="offers-grid">
                  {offers.map(offer => {
                    const product = products.find(p => p.id === parseInt(offer.productId));
                    return (
                      <div key={offer.id} className="offer-card">
                        <div className="offer-header">
                          <h4>{product?.name || 'Product'}</h4>
                          <button 
                            className="delete-offer-btn"
                            onClick={() => handleDeleteOffer(offer.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="offer-details">
                          <p><strong>Discount:</strong> {offer.discountPercent}%</p>
                          <p><strong>Original Price:</strong> ₹{product?.price}</p>
                          <p className="discounted-price">
                            <strong>Offer Price:</strong> ₹{Math.floor(product?.price * (1 - offer.discountPercent / 100))}
                          </p>
                          <p><strong>Expires:</strong> {new Date(offer.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
