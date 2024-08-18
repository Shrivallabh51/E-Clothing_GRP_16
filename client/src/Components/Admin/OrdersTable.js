import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/SellerTable.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/getAllOrders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">All Orders</h2>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Date</th>
            <th scope="col">User ID</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.totalAmount}</td>
              <td>{order.date}</td>
              <td>{order.userId}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
