import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { links } from "../../utils/Links";

export default function Sidebar() {
  const myUser = true;
  const isSidebarOpen = true;
  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <img className="logo" alt="coding addict" />
        <button className="close-btn">
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        {links.map(({ id, text, url }) => {
          return (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          );
        })}
        {myUser && (
          <li>
            <Link to="/checkout">checkout</Link>
          </li>
        )}
      </ul>
      <CartButton />
    </aside>
  );
}
