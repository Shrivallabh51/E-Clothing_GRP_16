import React, { useState, useEffect } from "react";
import "./PlaceOrder.css"; // Import your custom styles
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClearCarts } from "../../feature/Cart/CartSlice";
import { clearCart } from "../../feature/Cart/CartSlice";

const CheckOut = () => {
  const initialFormData = {
    full_name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    mobile_number: "",
    payment_method_name: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts, OrderTotal } = useSelector((store) => store.Cart);
  // console.log(JSON.stringify(carts));
  // console.log(JSON.stringify(carts));
  // console.log(carts);
  console.log(OrderTotal);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(); // State to hold orderId

  const [Total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(Number(OrderTotal) + 50);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    switch (name) {
      case "full_name":
        if (!value) errorMsg = "Full Name is required.";
        break;
      case "street":
        if (!value) errorMsg = "Street is required.";
        break;
      case "city":
        if (!value) errorMsg = "City is required.";
        break;
      case "state":
        if (!value) errorMsg = "State is required.";
        break;
      case "pincode":
        if (!value) errorMsg = "Pincode is required.";
        else if (!/^\d{6}$/.test(value)) errorMsg = "Pincode must be 6 digits.";
        break;
      case "mobile_number":
        if (!value) errorMsg = "Mobile number is required.";
        else if (!/^\d{10}$/.test(value))
          errorMsg = "Mobile number must be 10 digits.";
        break;
      case "payment_method_name":
        if (!value) errorMsg = "Payment method is required.";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMsg });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any remaining validation errors before submitting
    let formIsValid = true;
    const newErrors = {};

    for (let key in formData) {
      if (!formData[key]) {
        formIsValid = false;
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")
        } is required.`;
      }
    }

    setErrors(newErrors);

    //console.log(JSON.stringify(formData));

    const user = JSON.parse(localStorage.getItem("user"));

    if (formIsValid) {
      //orders
      try {
        const response = await fetch(
          `http://localhost:8090/createOrder?userId=${
            user.userId
          }&totalPrice=${Number(Total)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(carts),
          }
        );
        console.log("1");
        if (!response.ok) {
          console.log("not ok");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("okk");
        const orderId = await response.json();
        setOrderId(orderId);
        console.log("Order created successfully with ID:", orderId);
      } catch (error) {
        console.log("error");
        console.error("Error creating order:", error);
      }
      // payment
      console.log("payment");
      try {
        const response = await fetch(
          `http://localhost:8090/placeOrder?userId=${
            user.userId
          }&orderId=${orderId}&totalPrice=${Number(Total)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Order placed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          dispatch(clearCart());
          dispatch(ClearCarts());
          navigate("/Orders");
        } else if (response.status === 500) {
          Swal.fire({
            title: "Error!",
            text: "Failed to place order. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to place order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error placing order:", error);
      }
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="place-order-container">
      <div className="order-form">
        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                className={`form-control ${
                  errors.full_name ? "is-invalid" : ""
                }`}
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              {errors.full_name && (
                <div className="invalid-feedback">{errors.full_name}</div>
              )}
            </div>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
                value={formData.street}
                onChange={handleChange}
                required
              />
              {errors.street && (
                <div className="invalid-feedback">{errors.street}</div>
              )}
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                value={formData.state}
                onChange={handleChange}
                required
              />
              {errors.state && (
                <div className="invalid-feedback">{errors.state}</div>
              )}
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              {errors.pincode && (
                <div className="invalid-feedback">{errors.pincode}</div>
              )}
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile_number"
                className={`form-control ${
                  errors.mobile_number ? "is-invalid" : ""
                }`}
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
              {errors.mobile_number && (
                <div className="invalid-feedback">{errors.mobile_number}</div>
              )}
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="payment_method_name"
                className={`form-control ${
                  errors.payment_method_name ? "is-invalid" : ""
                }`}
                value={formData.payment_method_name}
                onChange={handleChange}
                required
              >
                <option value="">Select a payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
              </select>
              {errors.payment_method_name && (
                <div className="invalid-feedback">
                  {errors.payment_method_name}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Place Your Order
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>RS.{OrderTotal}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>RS.{50}</span>
          </div>
          <div className="summary-item total">
            <span>Order Total</span>
            <span>RS.{Total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
