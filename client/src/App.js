import "./App.css";
import Home from "./Components/Buyer/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./Components/Buyer/About";
import Products from "./Components/Buyer/Products";
import Cart from "./feature/Cart/Cart";
import Login from "./feature/User/Login";
import Registration from "./feature/User/Registration";
import CheckOut from "./Components/Buyer/CheckOut";
import SHomePage from "./Components/Seller/SHomePage";
import AHomePage from "./Components/Admin/AHomePage";
import AddProduct from "./Components/Seller/AddProduct";
import SingleProduct from "./feature/product/SingleProduct";
import BuyerLayout from "./Components/Buyer/BuyerLayout";
import SellerLayout from "./Components/Seller/SellerLayout";
import AdminLayout from "./Components/Admin/AdminLayout";
import OrderDetails from "./Components/Seller/OrderDetails";
import OrdersTable from "./Components/Admin/OrdersTable";
import OrderHistory from "./Components/Buyer/OrderHistory";
import AdminProducts from "./Components/Admin/Products";
import Footer from "./Components/Buyer/Footer";
import { AdminPrivateRoute } from "./Pages/PrivateRoute";
import { SellerPrivateRoute } from "./Pages/PrivateRoute";
import SellerTable from "./Components/Admin/SellerTable";

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { logout } from "./feature/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user?.token && isTokenExpired(user?.token)) {
      // Token is expired
      //logout
      dispatch(logout());
      navigate("/login");
    } else if (!isTokenValid) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp < currentTime;
  };
  const isTokenValid = (token) => {
    const decodedToken = jwtDecode(token);
  
    const expectedIssuer = "yourExpectedIssuer";
    const expectedAudience = "yourExpectedAudience";

    if (
      decodedToken.issuer === expectedIssuer && // Token should have the expected issuer
      decodedToken.audience === expectedAudience
    ) {
      return true;
    }else{
      return false;
    }
  };
  return (
    <div className="App">
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
          <Route path="Orders" element={<OrderHistory />} />
          <Route path="products/:id" element={<SingleProduct />} />
        </Route>

        {/* seller route */}
        <Route
          path="/seller"
          element={
            <SellerPrivateRoute>
              <SellerLayout />
            </SellerPrivateRoute>
          }
        >
          <Route index element={<SHomePage />} />
          <Route path="/seller/addproduct" element={<AddProduct />} />
          <Route path="/seller/orderdetails" element={<OrderDetails />} />
        </Route>

        {/* admin route */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AHomePage />} />
          <Route path="/admin/sellersReq" element={<SellerTable />} />
          <Route path="/admin/Orders" element={<OrdersTable />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
