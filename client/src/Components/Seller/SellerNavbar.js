import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../feature/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  const { user } = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Seller Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/seller/addproduct" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/seller/orderdetails" className="nav-link">
                Order_Details
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown" style={{ zIndex: 5 }}>
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user.username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item" onClick={handelLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;
