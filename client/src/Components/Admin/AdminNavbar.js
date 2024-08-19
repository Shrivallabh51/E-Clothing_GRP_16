import React from "react";
import { Link } from "react-router-dom";
import "../../Style/Navbar.css";
import { useSelector } from "react-redux";
import { logout } from "../../feature/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { user } = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Admin
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/admin/sellersReq">Sellers_Request</Link>
        </li>
        <li>
          <Link to="/admin/Orders">Orders</Link>
        </li>
        {/* 
        <li>
          <Link to="/admin//Profile">Profile</Link>
        </li> */}
      </ul>
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
    </nav>
  );
};

export default AdminNavbar;
