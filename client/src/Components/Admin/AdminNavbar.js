import React from "react";
import { Link } from "react-router-dom";
import "../../Style/Navbar.css";

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Admin Home
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/admin/sellers">Sellers</Link>
        </li>
        <li>
          <Link to="/admin//products">Products</Link>
        </li>
        <li>
          <Link to="/admin//categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin//Profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
