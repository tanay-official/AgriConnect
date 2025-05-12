import React, { useState } from 'react';
import { Button, Container, ListGroup, Alert, Modal, Form } from 'react-bootstrap';

const Checkout = ({ cartItems }) => {
  const [showForm, setShowForm] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const total = cartItems.reduce((sum, item) => {
    const price = item.product_price - (item.product_price * item.product_discount / 100);
    return sum + (price * (item.quantity || 1));
  }, 0);

  const handleCheckout = () => setShowForm(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting order...");

    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerDetails,
          items: cartItems.map(item => ({
            productId: item._id,
            name: item.product_name,
            price: item.product_price,
            quantity: item.quantity || 1,  // ✅ this line ensures quantity is included
            discount: item.product_discount
          })),
          totalAmount: total
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setOrderId(data.order._id);
        setSuccess(true);
        setShowForm(false);
      } else {
        alert("Failed to place order: " + data.message);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert("Network error. See console for details.");
    }
  };

  const downloadInvoice = () => {
    window.open(`http://localhost:3001/api/invoice/${orderId}`, '_blank');
  };

  return (
    <Container className="mt-4">
      <h2>Order Summary</h2>
      <ListGroup className="mb-3">
        {cartItems.map((item, i) => (
          <ListGroup.Item key={i}>
            {item.product_name} × {item.quantity || 1} - ৳{(
              (item.product_price - (item.product_price * item.product_discount / 100)) * 
              (item.quantity || 1)
            ).toFixed(2)}
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="fw-bold">Total: ৳{total.toFixed(2)}</ListGroup.Item>
      </ListGroup>

      <Button onClick={handleCheckout} variant="primary">
        Proceed to Checkout
      </Button>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                required
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Place Order (Cash on Delivery)
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {success && (
        <div className="mt-3">
          <Alert variant="success">Order placed successfully!</Alert>
          <Button onClick={downloadInvoice} variant="success" className="mt-2">
            Download Invoice
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Checkout;



