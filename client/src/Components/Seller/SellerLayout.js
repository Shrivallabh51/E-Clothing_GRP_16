import React from "react";
import { Outlet } from "react-router-dom";
import SellerNavbar from "./SellerNavbar";

function BuyerPage() {
  return (
    <div className="App">
      <SellerNavbar />
      <Outlet />
    </div>
  );
}

export default BuyerPage;
