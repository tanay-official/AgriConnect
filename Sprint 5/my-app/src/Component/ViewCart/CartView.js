import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './CartView.css';

const CartView = ({ handleAddToCart, showBuyButton = true }) => {
  const [products, setProducts] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const handleBuy = (product) => {
    if (handleAddToCart) {
      handleAddToCart(product);
      setShowMsg(true);
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeout = setTimeout(() => setShowMsg(false), 2000);
      setTimeoutId(newTimeout);
    }
  };

  return (
    <Container className="mt-5">
      <div className='shomessage'>
        {showMsg && (
          <Alert variant="success" className="text-center">
            ✅ Product added to cart successfully!
          </Alert>
        )}
      </div>

      <h2 className="mb-4">🛒 Products</h2>
      <Row>
        {products.map(product => (
          <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.product_link}
                alt={product.product_name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ৳{product.product_price}<br />
                  <strong>Discount:</strong> {product.product_discount}%
                </Card.Text>
                <Card.Text style={{
                  fontSize: '0.9rem',
                  color: '#555',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {product.product_ditalise}
                </Card.Text>

                {showBuyButton && (
                  <Button variant="info" onClick={() => handleBuy(product)}>
                    Buy Now
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CartView;