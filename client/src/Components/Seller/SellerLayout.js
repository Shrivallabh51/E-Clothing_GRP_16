import React from "react";
import { Outlet } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";

function BuyerPage() {
  return (
    <div className="App">
      <SellerNavbar />
      <div style={{ minHeight: "90vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default BuyerPage;
