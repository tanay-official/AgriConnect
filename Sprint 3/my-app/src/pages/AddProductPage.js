import React from 'react';
import Formcrud from '../Component/Form/Formcrud';
import '../styles/sellerDashboard.css';

const AddProductPage = () => {
  return (
    <div className="seller-content-wrapper">
      <h2 className="seller-heading">Add Product</h2>
      <Formcrud />
    </div>
  );
};

export default AddProductPage;