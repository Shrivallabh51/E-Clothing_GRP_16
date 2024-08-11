import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <main className="footer-center">
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Garmento </span>
      </h5>
      <h5>All rights reserved</h5>
    </main>
  );
};

export default Footer;
