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
import Footer from "./Components/Buyer/Footer";
import { AdminPrivateRoute } from "./Pages/PrivateRoute";
import { SellerPrivateRoute } from "./Pages/PrivateRoute";
import SellerTable from "./Components/Admin/SellerTable";

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
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
