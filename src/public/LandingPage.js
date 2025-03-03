import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // CSS for styling the landing page

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="gym-name">Hamro Gym</span>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/register" className="nav-button">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="gym-name">Hamro Gym</span></h1>
          <p>Your journey to a healthier and stronger you starts here.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Hamro Gym</h2>
        <p>
          At Hamro Gym, we are dedicated to helping you achieve your fitness goals. Whether you're a beginner or a seasoned athlete, our state-of-the-art facilities and expert trainers are here to guide you every step of the way.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Personal Training</h3>
            <p>Get one-on-one coaching from our certified trainers.</p>
          </div>
          <div className="service-card">
            <h3>Group Classes</h3>
            <p>Join our fun and energetic group fitness classes.</p>
          </div>
          <div className="service-card">
            <h3>Membership</h3>
            <p>Membership plan for the members very from Basic, Permium  and Gold</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Members Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Hamro Gym has transformed my life! The trainers are amazing and the facilities are top-notch."</p>
            <p className="testimonial-author">— Saurabh Maharjan</p>
          </div>
          <div className="testimonial-card">
            <p>"I love the group classes! They're fun, challenging, and keep me motivated."</p>
            <p className="testimonial-author">— Kimti Shrestha</p>
          </div>
          <div className="testimonial-card">
            <p>"The trainer in this gym help me & motivate me in every situation"</p>
            <p className="testimonial-author">— Avinabh Shrestha</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 Hamro Gym. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://github.com/Rabindra-Bhattarai/" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;