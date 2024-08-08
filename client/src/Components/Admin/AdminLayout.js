import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="App">
      <h1>Admin Navigation Bar</h1>
      <Outlet />
    </div>
  );
}
