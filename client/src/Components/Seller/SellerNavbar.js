import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const SellerNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-90">
      <Link className="navbar-brand " href="#">
        Seller Portal
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/orders" className="nav-link" href="#">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Add Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Update Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Delete Product
            </Link>
          </li>
        </ul>
      </div>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </nav>
  );
};

export default SellerNavbar;
