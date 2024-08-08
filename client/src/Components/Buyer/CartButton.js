import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartButton() {
  return (
    <section className="cart-btn-container">
      <Link to="/cart" className="cart-btn">
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">0</span>
        </span>
      </Link>
      <Link to="/login">
        <button type="button" className="login-btn">
          Login
        </button>
      </Link>
    </section>
  );
}
