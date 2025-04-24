import React from 'react';
import { Container, Row, Col, ListGroup, Image, Badge, Button } from 'react-bootstrap';

const AddToCart = ({ cart, increaseQty, decreaseQty, removeItem }) => {
  const cartMap = new Map();

  cart.forEach(item => {
    const key = item._id;
    if (cartMap.has(key)) {
      cartMap.get(key).quantity += 1;
    } else {
      cartMap.set(key, { ...item, quantity: 1 });
    }
  });

  const cartItems = Array.from(cartMap.values());

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product_price);
      const discount = parseFloat(item.product_discount);
      const discountedPrice = price - (price * discount) / 100;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h4>🧺 Items in Cart: <Badge bg="secondary">{cart.length}</Badge></h4></Col>
        <Col className="text-end"><h5>💰 Total: ৳{calculateTotalPrice().toFixed(2)}</h5></Col>
      </Row>

      <ListGroup>
        {cartItems.map(item => (
          <ListGroup.Item key={item._id}>
            <Row>
              <Col md={2}>
                <Image src={item.product_link} thumbnail style={{ width: '100%' }} />
              </Col>
              <Col md={6}>
                <h5>{item.product_name}</h5>
                <p>
                  Price: ৳{item.product_price} <br />
                  Discount: {item.product_discount}% <br />
                  Quantity: <Badge bg="info">{item.quantity}</Badge>
                </p>
                <div className="d-flex gap-2">
                  <Button variant="success" size="sm" onClick={() => increaseQty(item._id)}>+</Button>
                  <Button variant="warning" size="sm" onClick={() => decreaseQty(item._id)}>-</Button>
                  <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>Remove</Button>
                </div>
              </Col>
              <Col md={4} className="text-end d-flex align-items-center justify-content-end">
                <strong>
                  Subtotal: ৳{(
                    (item.product_price - (item.product_price * item.product_discount) / 100) * item.quantity
                  ).toFixed(2)}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AddToCart;
