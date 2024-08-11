import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="App">
      <AdminNavbar />
      <div style={{ minHeight: "90vh" }}>
        <Outlet />
      </div>
    </div>
  );
}
