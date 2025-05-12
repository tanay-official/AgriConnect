import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Slider.css';

// Import your banner images
import banner1 from '../images/image.png';
import banner2 from '../images/image1.png';
import banner3 from '../images/image2.png';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Welcome To Agri-Connect",
      description: "Empowering farmers and buyers through seamless agricultural e-commerce. Browse, purchase, and manage your agri-products all in one place — efficiently and transparently.",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      image: banner2,
      title: "Summer Sale 50% Off",
      description: "Get amazing discounts on all fresh produce this summer season. Limited time offer!",
      buttonText: "Shop Now"
    },
    {
      id: 3,
      image: banner3,
      title: "Organic Vegetables",
      description: "Fresh organic vegetables delivered straight from local farms to your doorstep.",
      buttonText: "Browse Vegetables"
    }
  ];

  return (
    <Carousel fade controls={true} indicators={true} interval={5000} pause={false}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${slide.id}`}
          />
          <Carousel.Caption>
            <div className="slider-content">
              <h2 className="slider-title">{slide.title}</h2>
              <p className="slider-description">{slide.description}</p>
              <button className="slider-btn btn btn-primary">
                {slide.buttonText}
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;