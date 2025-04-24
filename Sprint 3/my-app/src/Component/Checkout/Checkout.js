import React, { useState } from 'react';
import { Button, Container, ListGroup, Alert } from 'react-bootstrap';

const Checkout = ({ cartItems }) => {
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);

  // ⬇️ Copied and reused the same total logic from AddToCart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product_price);
      const discount = parseFloat(item.product_discount);
      const quantity = item.quantity || 1;
      const discountedPrice = price - (price * discount) / 100;
      return total + discountedPrice * quantity;
    }, 0);
  };

  const total = calculateTotalPrice();

  const handleCheckout = async () => {
    const orderData = {
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      items: cartItems,
      total
    };

    try {
      const res = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await res.json();
      setOrderId(result._id);
      setSuccess(true);
    } catch (err) {
      console.error('Checkout failed', err);
    }
  };

  const downloadInvoice = () => {
    window.open(`http://localhost:3000/api/invoice/${orderId}`, '_blank');
  };

  return (
    <Container className="mt-4">
      <h2>🧾 Checkout</h2>
      {cartItems.length === 0 ? (
        <Alert variant="info">Your cart is empty</Alert>
      ) : (
        <>
          <ListGroup className="mb-3">
            {cartItems.map((item, index) => {
              const price = parseFloat(item.product_price);
              const discount = parseFloat(item.product_discount);
              const quantity = item.quantity || 1;
              const discountedPrice = price - (price * discount) / 100;
              return (
                <ListGroup.Item key={index}>
                  {item.product_name} x {quantity} — ৳{discountedPrice.toFixed(2)} each
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item><strong>Total: ৳{total.toFixed(2)}</strong></ListGroup.Item>
          </ListGroup>

          <Button onClick={handleCheckout} variant="primary">
            Confirm Order
          </Button>

          {success && (
            <div className="mt-3">
              <Alert variant="success">🎉 Order placed successfully!</Alert>
              <Button onClick={downloadInvoice} variant="success">
                Download Invoice
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Checkout;
