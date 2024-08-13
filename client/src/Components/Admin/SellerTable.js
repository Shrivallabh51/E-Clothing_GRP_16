import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/SellerTable.css";

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
        `https://localhost:7066/api/Admin/ActivateUser?userId=${userId}`,
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

  const InactiveteSeller = async (userId) => {
    try {
      console.log(userId);
      const response = await fetch(
        `https://localhost:7066/api/Admin/InactivateUser?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("User inactivated successfully");
      } else {
        console.error("Failed to inactivate user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Seller Request List</h2>
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
            <th scope="col">Inactivate</th>
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
                  className={`btn btn-sm btn-success`}
                  onClick={() => ActiveteSeller(seller.userId)}
                >
                  Activate
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-sm btn-inactivate`}
                  onClick={() => InactiveteSeller(seller.userId)}
                >
                  Inactivate
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
