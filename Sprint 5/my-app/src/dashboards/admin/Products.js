// src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal'; // Import the modal component
import './Dashboard.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5005/api/admin/products')
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  }, []);

  const openDeleteModal = (id, name) => {
    setProductToDelete({ id, name });
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/admin/products/${productToDelete.id}`);
      setProducts(products.filter(product => product._id !== productToDelete.id));
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="section-header">🌽 Products ({products.length})</h2>
      <div className="data-grid">
        {products.map(product => (
          <div key={product._id} className="data-card">
            <img
              src={product.product_link}
              alt={product.product_name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
            <h3>{product.product_name}</h3>
            <p><strong>৳ {product.product_price}</strong></p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              {product.product_discount}% Off
            </p>
            <button className="delete-btn" onClick={() => openDeleteModal(product._id, product.product_name)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteProduct}
        itemName={productToDelete?.name}
      />
    </div>
  );
};

export default Products;
