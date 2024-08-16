import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../feature/User/UserSlice";
import { useDispatch } from "react-redux";

export default function CartButton() {
  const { user, isLoggedIn } = useSelector((store) => store.User);
  const { carts } = useSelector((store) => store.Cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(carts);
  const totalItems = carts.reduce((total, item) => total + item.stockQty, 0);

  // console.log("cartButton" + user.username);
  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="cart-btn-section">
      <Link to="/cart" className="cart-btn">
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{Number(totalItems)}</span>
        </span>
      </Link>
      {isLoggedIn ? (
        <div className="dropdown" style={{ zIndex: 5 }}>
          <button
            className="btn btn-light-skyblue dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user.username}
          </button>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item">Profile</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handelLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login">
          <button type="button" className="login-btnn">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
