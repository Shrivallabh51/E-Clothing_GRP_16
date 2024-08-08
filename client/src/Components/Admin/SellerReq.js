import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7066/api/Admin/GetSeller")
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sellers]);

  const ActiveteSeller = async (userId) => {
    try {
      console.log(userId);
      const response = await fetch(
        `https://localhost:7066/api/Admin/ActivateUser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("User activated successfully");
      } else {
        console.error("Failed to activate user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Seller List</h2>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">User Id</th>
            <th scope="col">Activate</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{seller.firstName}</td>
              <td>{seller.lastName}</td>
              <td>{seller.mobile}</td>
              <td>{seller.email}</td>
              <td>{seller.userId}</td>
              <td>
                <button
                  className={`btn btn-sm ${
                    seller.active ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => ActiveteSeller(seller.userId)}
                >
                  Activate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;
