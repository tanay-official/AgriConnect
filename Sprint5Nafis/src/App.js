import { useState } from 'react';
// import Formcrud from './Component/Form/Formcrud';
import Home from './Component/Home/Home';
import Navigation from './Component/Navigation/Navigation';
import { Route, Routes } from 'react-router';
import AddToCart from './Component/AddToCart/AddToCart';
import Footer from './Component/Footer/Footer';
import Product from './Component/Product/Product';


function App() {
  const [cart, setCart] = useState([]);

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
      updatedCart.splice(index, 1); // remove one instance
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home handleAddToCart={handleAddToCart}></Home>}></Route>
        <Route path='products' element={<Product />}></Route>
        <Route path='addTocart' element={<AddToCart cart={cart} 
          increaseQty={increaseQty}  decreaseQty ={decreaseQty}removeItem={removeItem} />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
