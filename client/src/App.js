import "./App.css";
import Home from "./Components/Buyer/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./Components/Buyer/About";
import Product from "./feature/product/Product";
import Cart from "./Components/Buyer/Cart";
import Login from "./Components/Buyer/Login";
import Registration from "./Components/Buyer/Registration";
import CheckOut from "./Components/Buyer/CheckOut";
import SHomePage from "./Components/Seller/SHomePage";
import AHomePage from "./Components/Admin/AHomePage";
import AddProduct from "./Components/Seller/AddProduct";
import SingleProduct from "./feature/product/SingleProduct";

import BuyerLayout from "./Components/Buyer/BuyerLayout";
import SellerLayout from "./Components/Seller/SellerLayout";
import AdminLayout from "./Components/Admin/AdminLayout";
import Footer from "./Components/Buyer/Footer";

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
            <Route path="products" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="products/:id" element={<SingleProduct />} />
          </Route>

          {/* seller route */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SHomePage />} />
            <Route path="/seller/addproduct" element={<AddProduct />} />
          </Route>

          {/* admin route */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AHomePage />} />

            {/* <Route path="/viewseller" element={}/> */}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
