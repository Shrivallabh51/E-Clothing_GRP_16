import "./App.css";
import Home from "./Components/Buyer/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./Components/Buyer/About";
import Products from "./Components/Buyer/Products";
import Cart from "./Components/Buyer/Cart";
import Login from "./Components/Buyer/Login";
import Registration from "./Components/Buyer/Registration";
import CheckOut from "./Components/Buyer/CheckOut";
import SHomePage from "./Components/Seller/SHomePage";
import AHomePage from "./Components/Admin/AHomePage";

import BuyerLayout from "./Components/Buyer/BuyerLayout";
import SellerLayout from "./Components/Seller/SellerLayout";
import AdminLayout from "./Components/Admin/AdminLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Buyer route */}
          <Route path="/" element={<BuyerLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="checkout" element={<CheckOut />} />
            {/* <Route path="products/:id" element={<SingleProduct />} /> */}
          </Route>
        
          {/* seller route */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SHomePage />} />
          </Route>
        
          {/* admin route */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AHomePage />} />
            {/* <Route path="/viewseller" element={}/> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
