import React from "react";
import { Navigate } from "react-router-dom";

export const AdminPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.rId === 1) {
    return children;
  } else {
    return <p>Access denied. Only admins can access this page.</p>;
  }
};

export const SellerPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.rId === 3) {
    return children;
  } else {
    return <p>Access denied. Only sellers can access this page.</p>;
  }
};
