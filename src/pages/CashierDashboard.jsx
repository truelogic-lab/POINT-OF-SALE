import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingCart, Package, Users, Receipt,
  RotateCcw, Tag, Settings, Search, Bell, Menu, Plus,
  Minus, Trash2, Grid2X2, Headphones, LogOut, CreditCard,
  Banknote, Smartphone, X, Coffee
} from 'lucide-react';
import './CashierDashboard.css';

const demoProducts = [
  { id: 1, name: 'Product One', category: 'General', price: 350, stock: 24, color: '#e6f4ee' },
  { id: 2, name: 'Product Two', category: 'General', price: 250, stock: 18, color: '#fcebdc' },
  { id: 3, name: 'Product Three', category: 'General', price: 500, stock: 12, color: '#e8edfb' },
  { id: 4, name: 'Product Four', category: 'General', price: 180, stock: 30, color: '#f8e9ed' },
  { id: 5, name: 'Product Five', category: 'General', price: 420, stock: 15, color: '#f5efd9' },
  { id: 6, name: 'Product Six', category: 'General', price: 650, stock: 9, color: '#e6eef2' },
  { id: 7, name: 'Product Seven', category: 'General', price: 300, stock: 21, color: '#f4e9df' },
  { id: 8, name: 'Product Eight', category: 'General', price: 200, stock: 16, color: '#e8f1e8' },
];

const money = (amount) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 2,
  }).format(amount);

export default function CashierDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    fetch('/api/auth/me', { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) {
          navigate('/login', { replace: true });
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!active || !data?.user) return;

        const roles = data.user.roles || [];
        if (!roles.includes('Cashier') && !roles.includes('Super Admin')) {
          navigate('/dashboard', { replace: true });
          return;
        }

        setUser(data.user);
      })
      .catch(() => navigate('/login', { replace: true }))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [navigate]);

  const categories = ['All', ...new Set(demoProducts.map(item => item.category))];

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const addToCart = (product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);

      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
    setNotice('');
  };

  const changeQuantity = (id, amount) => {
    setCart(current => current
      .map(item => item.id === id
        ? { ...item, quantity: item.quantity + amount }
        : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 0;
  const total = subtotal + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      navigate('/login', { replace: true });
    }
  };

  if (loading) {
    return <div className="cashier-loading">Loading cashier workspace...</div>;
  }

  if (!user) return null;

  return (
    <div className="cashier-app">
      {mobileSidebar && (
        <button
          className="cashier-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside className={`cashier-sidebar ${mobileSidebar ? 'sidebar-open' : ''}`}>
        <div className="cashier-brand">
          <span className="cashier-brand-icon">B</span>
          <span>BOTANICO <small>ERP</small></span>
          <button className="cashier-close-sidebar" onClick={() => setMobileSidebar(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cashier-nav-label">WORKSPACE</div>

        <nav className="cashier-nav">
          <a className="active" href="#dashboard">
            <LayoutDashboard size={19} /> Dashboard
          </a>
          <a href="#new-sale">
            <ShoppingCart size={19} /> New Sale
          </a>
          <a href="#sales-history">
            <Receipt size={19} /> Sales History
          </a>
          <a href="#products">
            <Package size={19} /> Products
          </a>
          <a href="#customers">
            <Users size={19} /> Customers
          </a>
          <a href="#returns">
            <RotateCcw size={19} /> Returns
          </a>
          <a href="#discounts">
            <Tag size={19} /> Discounts
          </a>
          <a href="#settings">
            <Settings size={19} /> Settings
          </a>
        </nav>

        <div className="cashier-sidebar-bottom">
          <div className="cashier-help">
            <Headphones size={21} />
            <div>
              <strong>Need help?</strong>
              <span>Contact support</span>
            </div>
          </div>

          <div className="cashier-user">
            <div className="cashier-avatar">
              {(user.firstName || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="cashier-user-info">
              <strong>{user.firstName} {user.lastName}</strong>
              <span>Cashier workspace</span>
            </div>
            <button onClick={handleLogout} title="Sign out" aria-label="Sign out">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      <main className="cashier-main">
        <header className="cashier-topbar">
          <div className="cashier-topbar-left">
            <button
              className="cashier-menu-button"
              onClick={() => setMobileSidebar(true)}
              aria-label="Open navigation"
            >
              <Menu size={23} />
            </button>
            <div>
              <h1>Welcome back, {user.firstName}!</h1>
              <p>Here's what's happening in your workspace today.</p>
            </div>
          </div>

          <div className="cashier-topbar-actions">
            <div className="cashier-search">
              <Search size={18} />
              <input
                placeholder="Search products..."
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
            </div>
            <button className="cashier-icon-button" aria-label="Notifications">
              <Bell size={20} />
              <span />
            </button>
          </div>
        </header>

        <div className="cashier-content">
          <section className="cashier-stats">
            <article className="cashier-stat-card">
              <div className="cashier-stat-icon"><Banknote size={21} /></div>
              <div>
                <span>Today's Sales</span>
                <strong>—</strong>
                <small>Sales data not connected</small>
              </div>
            </article>

            <article className="cashier-stat-card">
              <div className="cashier-stat-icon"><Receipt size={21} /></div>
              <div>
                <span>Transactions</span>
                <strong>—</strong>
                <small>Sales data not connected</small>
              </div>
            </article>

            <article className="cashier-stat-card">
              <div className="cashier-stat-icon"><Package size={21} /></div>
              <div>
                <span>Items Sold</span>
                <strong>—</strong>
                <small>Sales data not connected</small>
              </div>
            </article>

            <article className="cashier-stat-card">
              <div className="cashier-stat-icon"><Users size={21} /></div>
              <div>
                <span>Customers</span>
                <strong>—</strong>
                <small>Customer data not connected</small>
              </div>
            </article>
          </section>

          <section className="cashier-workspace">
            <div className="cashier-cart-panel" id="new-sale">
              <div className="cashier-panel-heading">
                <div>
                  <h2>Current Sale</h2>
                  <p>{itemCount} items in your cart</p>
                </div>
                <button
                  className="cashier-clear-button"
                  onClick={() => setCart([])}
                  disabled={!cart.length}
                >
                  Clear cart
                </button>
              </div>

              <div className="cashier-cart-items">
                {cart.length === 0 ? (
                  <div className="cashier-empty-cart">
                    <div><ShoppingCart size={28} /></div>
                    <strong>Your cart is empty</strong>
                    <span>Select products to start a sale.</span>
                  </div>
                ) : (
                  cart.map(item => (
                    <div className="cashier-cart-row" key={item.id}>
                      <div className="cashier-product-thumbnail" style={{ background: item.color }}>
                        <Package size={23} />
                      </div>

                      <div className="cashier-cart-product">
                        <strong>{item.name}</strong>
                        <span>{money(item.price)} each</span>
                      </div>

                      <div className="cashier-quantity">
                        <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <strong className="cashier-line-total">
                        {money(item.price * item.quantity)}
                      </strong>

                      <button
                        className="cashier-remove-item"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="cashier-cart-summary">
                <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div><span>Tax</span><strong>{money(tax)}</strong></div>
                <div className="cashier-total"><span>Total</span><strong>{money(total)}</strong></div>
              </div>

              <div className="cashier-payment-heading">Payment method</div>
              <div className="cashier-payment-methods">
                <button
                  className={paymentMethod === 'Cash' ? 'selected' : ''}
                  onClick={() => setPaymentMethod('Cash')}
                >
                  <Banknote size={17} /> Cash
                </button>
                <button
                  className={paymentMethod === 'M-Pesa' ? 'selected' : ''}
                  onClick={() => setPaymentMethod('M-Pesa')}
                >
                  <Smartphone size={17} /> M-Pesa
                </button>
                <button
                  className={paymentMethod === 'Card' ? 'selected' : ''}
                  onClick={() => setPaymentMethod('Card')}
                >
                  <CreditCard size={17} /> Card
                </button>
              </div>

              {notice && <p className="cashier-notice">{notice}</p>}

              <button
                className="cashier-checkout-button"
                disabled={!cart.length}
                onClick={() => setNotice('Checkout will be enabled when the sales and payment API is connected.')}
              >
                Complete Sale · {money(total)}
              </button>
              <p className="cashier-payment-caption">
                Selected payment: {paymentMethod}
              </p>
            </div>

            <div className="cashier-products-panel" id="products">
              <div className="cashier-products-heading">
                <div>
                  <h2>Products</h2>
                  <p>Choose products to add to the current sale.</p>
                </div>
                <button className="cashier-grid-button" aria-label="Grid view">
                  <Grid2X2 size={19} />
                </button>
              </div>

              <div className="cashier-categories">
                {categories.map(item => (
                  <button
                    key={item}
                    className={category === item ? 'selected' : ''}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="cashier-product-grid">
                {filteredProducts.map(product => (
                  <article className="cashier-product-card" key={product.id}>
                    <div className="cashier-product-image" style={{ background: product.color }}>
                      <Package size={38} strokeWidth={1.5} />
                    </div>
                    <div className="cashier-product-details">
                      <strong>{product.name}</strong>
                      <span>{money(product.price)}</span>
                      <small>{product.stock} in stock · Preview item</small>
                    </div>
                    <button
                      className="cashier-add-button"
                      onClick={() => addToCart(product)}
                      disabled={cart.find(item => item.id === product.id)?.quantity >= product.stock}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus size={17} />
                    </button>
                  </article>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="cashier-no-products">No matching products found.</div>
                )}
              </div>

              <div className="cashier-demo-notice">
                <Coffee size={16} />
                Preview catalogue only. Live products and stock will be loaded from your Botanico database next.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
