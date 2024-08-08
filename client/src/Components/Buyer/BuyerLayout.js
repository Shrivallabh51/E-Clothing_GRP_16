import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function BuyerPage() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default BuyerPage;