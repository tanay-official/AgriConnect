import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import logoimg from "../images/logo.png";

const Navigation = ({ userRole, cartLength }) => {
  return (
    <div className='nabar'>
      <div>
        <img className="imgstyl" src={logoimg} alt="Logo not found" />
      </div>
      <ul className='uldesign'>
        <li><Link to="/">Home</Link></li>

        {userRole === 'seller' && (
          <li><Link to="/products">Add Product</Link></li>
        )}

        <li><Link to="/Contact">About Us</Link></li>

        {userRole === 'buyer' && (
          <li><Link to="/addTocart">Items in Cart: {cartLength}</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Navigation;