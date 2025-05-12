import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Slider from '../Component/Slider/Slider';

const LandingPage = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setUserRole(role);
    navigate(`/${role}`);
  };

  return (
    <Container className="dashboard-container">
      <Slider />
      <h2 className="section-heading text-center">Welcome to AgriConnect</h2>
      <p className="text-center mb-4">Please select your role to continue:</p>
      <Row className="justify-content-center">
        <Col md={3}>
          <Button variant="primary" onClick={() => handleSelect('admin')} className="w-100">
            Admin
          </Button>
        </Col>
        <Col md={3}>
          <Button variant="success" onClick={() => handleSelect('buyer')} className="w-100">
            Buyer
          </Button>
        </Col>
        <Col md={3}>
          <Button variant="warning" onClick={() => handleSelect('seller')} className="w-100">
            Seller
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;