import React from 'react';
import Slider from '../../Component/Slider/Slider';
import CartView from '../../Component/ViewCart/CartView';
import '../../styles/sellerDashboard.css';

const SellerDashboard = () => {
  return (
    <div className="dashboard-container">
      <Slider />
      <div className="seller-content-wrapper">
        <h2 className="seller-heading">Seller Dashboard</h2>
        <CartView showBuyButton={false} />
      </div>
    </div>
  );
};

export default SellerDashboard;