import { FaBars } from "react-icons/fa";
import { links } from "../../utils/Links";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src="" alt="logo" />
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
          <li>
            <Link to="/checkout">checkout</Link>
          </li>
        </ul>
        <CartButton />
      </div>
    </nav>
  );
}
