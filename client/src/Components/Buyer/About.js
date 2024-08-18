// src/Components/Buyer/About.js

import React from "react";
import "../../Style/AboutUs.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At E-Clothing, our mission is to make fashion accessible to
            everyone. We offer a wide range of stylish and affordable clothing
            for men, women ensuring that you can find the perfect outfit for any
            occasion. With a focus on quality, comfort, and sustainability,
            E-Clothing is committed to helping you look and feel you best.
          </p>
        </section>
        <section className="values">
          <h2>Our Values</h2>
          <p>
            We believe in quality, affordability, and customer satisfaction. Our
            collections are curated with care, ensuring that every piece meets
            our high standards. We are committed to ethical practices, sourcing
            sustainable materials.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
