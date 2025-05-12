import React, { useState } from 'react';
import { Container, Form, Button, Alert, ListGroup } from 'react-bootstrap';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError('Please enter a valid Order ID');
      setOrderData(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/track/${orderId}`);
      const data = await res.json();

      if (data.success) {
        setOrderData(data.order);
        setError('');
      } else {
        setOrderData(null);
        setError(data.message);
      }
    } catch (err) {
      console.error('Track error:', err);
      setError('Something went wrong. Try again.');
      setOrderData(null);
    }
  };

  const handleCancel = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/track/cancel/${orderData.id}`, {
        method: 'PUT',
      });
      const data = await res.json();

      if (data.success) {
        alert("Order cancelled successfully.");
        setOrderData(data.order); // Update status
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel order.");
    }
  };

  return (
    <Container className="mt-5">
      <h3>Track Your Order</h3>
      <Form.Group className="mb-3 mt-4">
        <Form.Label>Enter Order ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g., 662d9e4a198c1aafc7a6eb03"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleTrack} variant="primary">Track</Button>

      {error && <Alert className="mt-3" variant="danger">{error}</Alert>}

      {orderData && (
        <div className="mt-4">
          <h5>Status: {orderData.status}</h5>
          <p><strong>Placed:</strong> {new Date(orderData.createdAt).toLocaleString()}</p>
          <p><strong>Customer:</strong> {orderData.customer.name}, {orderData.customer.phone}</p>
          <p><strong>Address:</strong> {orderData.customer.address}</p>
          <h6>Items:</h6>
          <ListGroup>
            {orderData.items.map((item, i) => (
              <ListGroup.Item key={i}>
                {item.name} × {item.quantity} = ৳{item.price * item.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p className="mt-3"><strong>Total:</strong> ৳{orderData.total}</p>

          {orderData.status !== 'Cancelled' && (
            <Button variant="danger" className="mt-3" onClick={handleCancel}>
              Cancel Order
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default TrackOrder;



