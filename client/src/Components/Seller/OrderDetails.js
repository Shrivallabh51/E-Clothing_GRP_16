import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/SellerTable.css";
import Swal from "sweetalert2";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isStatusUpdate, setIsStatusUpdate] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // Fetch order details
    axios
      .get(`http://localhost:8090/seller/${user.userId}`)
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(orderDetails);

    // Fetch statuses
    axios
      .get("http://localhost:8090/getAllStatuses")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isStatusUpdate]);

  // Method to update the order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8090/updateOrderStatus/${orderId}/${status}`
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Status updated successfully",
        });
        setIsStatusUpdate(!isStatusUpdate);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to update status",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update status",
      });
    }
  };

  // Handle the status change
  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    if (newStatus) {
      updateOrderStatus(orderId, newStatus);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Order Details</h2>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Buyer ID</th>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Stock Quantity</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Current Status</th>
            <th scope="col">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.userId}</td>
              <td>{order.productId}</td>
              <td>{order.productName}</td>
              <td>{order.stockQty}</td>
              <td>{order.stockQty * order.productPrice}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status || ""}
                  onChange={(e) => handleStatusChange(order.orderId, e)}
                  className="form-control"
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status.statusId} value={status.status}>
                      {status.status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
