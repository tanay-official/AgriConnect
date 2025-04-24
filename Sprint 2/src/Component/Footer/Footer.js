import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40', color: '#fff', padding: '40px 0', marginTop: "20%" }}>
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <h5>🛍️ FreshShop</h5>
            <p style={{ fontSize: '14px', color: '#ccc' }}>
              Your one-stop shop for fresh groceries and daily essentials.
            </p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '14px' }}>
              <li><a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/products" style={{ color: '#ccc', textDecoration: 'none' }}>Add Products</a></li>
              <li><a href="/addTocart" style={{ color: '#ccc', textDecoration: 'none' }}>Cart</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Connect With Us</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" style={{ color: '#ccc' }}><FaFacebookF /></a>
              <a href="https://instagram.com" style={{ color: '#ccc' }}><FaInstagram /></a>
              <a href="https://twitter.com" style={{ color: '#ccc' }}><FaTwitter /></a>
              <a href="mailto:support@freshshop.com" style={{ color: '#ccc' }}><FaEnvelope /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" style={{ fontSize: '13px', color: '#aaa' }}>
            &copy; {new Date().getFullYear()} Agri-Connect. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
