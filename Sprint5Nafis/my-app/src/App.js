import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Navigation from './Component/Navigation/Navigation';
import Footer from './Component/Footer/Footer';
import Checkout from './Component/Checkout/Checkout';
import LandingPage from './pages/LandingPage';
import BuyerDashboard from './dashboards/buyer/BuyerDashboard';
import SellerDashboard from './dashboards/seller/SellerDashboard';
import AdminDashboard from './dashboards/admin/AdminDashboard';
import AddToCart from './Component/AddToCart/AddToCart';
import AddProductPage from './pages/AddProductPage'; // ✅ Newly added
import TrackOrder from './Component/TrackOrder';     // ✅ Track Order

function App() {
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const increaseQty = (id) => {
    const item = cart.find(p => p._id === id);
    if (item) setCart(prev => [...prev, item]);
  };

  const decreaseQty = (id) => {
    const index = cart.findIndex(p => p._id === id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  const hideNavAndFooter = location.pathname === '/';

  return (
    <div className="App">
      {!hideNavAndFooter && <Navigation userRole={userRole} cartLength={cart.length} />}

      <Routes>
        <Route path="/" element={<LandingPage setUserRole={setUserRole} />} />
        <Route path="/buyer" element={<BuyerDashboard handleAddToCart={handleAddToCart} />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addTocart" element={
          <AddToCart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
        } />
        <Route path="/products" element={<AddProductPage />} /> {/* ✅ New route */}
        <Route path="/checkout" element={<Checkout cartItems={cart} />} />
        <Route path="/track-order" element={<TrackOrder />} /> {/* ✅ Track Order */}
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
