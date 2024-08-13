import { FaBars } from "react-icons/fa";
import { links } from "../../utils/Links";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { isLoggedIn } = useSelector((store) => store.User);
  return (
    <nav style={{ background: "rgb(170, 222, 210)" }}>
      <div className="nav-center">
        <div className="nav-header">
          {/* <img src="" alt="logo" /> */}
          <h1>Garmento</h1>
          <button type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
          {isLoggedIn && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/Order">Orders</Link>
            </li>
          )}
        </ul>
        <CartButton />
      </div>
    </nav>
  );
}
