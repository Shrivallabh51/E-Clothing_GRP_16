import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/SellerTable.css";

const OrderHistory = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.userId);

  useEffect(() => {
    fetch(`http://localhost:8090/user/${user.userId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setOrderDetails(data); // Set data directly if it's an array
        } else if (data && Array.isArray(data.orders)) {
          setOrderDetails(data.orders); // Adjust according to the structure of the fetched data
        } else {
          setOrderDetails([]); // Fallback to an empty array if the response is not as expected
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Order Details</h2>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Stock Quantity</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Current Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.productId}</td>
              <td>{order.productName}</td>
              <td>{order.stockQty}</td>
              <td>{order.stockQty * order.productPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderHistory;
