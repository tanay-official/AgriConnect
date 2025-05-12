import React from 'react';
import Slider from '../../Component/Slider/Slider';
import CartView from '../../Component/ViewCart/CartView';
import '../../styles/buyerDashboard.css'; // add this line

const BuyerDashboard = ({ handleAddToCart }) => {
  return (
    <div className="dashboard-container">
      <Slider />
      <div className="buyer-content-wrapper">
        <h2 className="buyer-heading">Buyer Dashboard</h2>
        <CartView handleAddToCart={handleAddToCart} showBuyButton={true} />
      </div>
    </div>
  );
};

export default BuyerDashboard;