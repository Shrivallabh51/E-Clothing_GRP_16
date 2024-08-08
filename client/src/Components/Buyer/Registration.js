import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gender: "",
    rid: 1,
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7268/api/Account/getRoles")
      .then((resp) => resp.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);
  // console.log(roles);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newFormData = {
      ...formData,
      [name]: name === "rid" ? Number(value) : value,
    };

    // Set status to "Inactive" if the selected role is "Seller"
    if (name === "rid" && value === "3") {
      newFormData.status = "Inactive";
    } else if (name === "rid") {
      newFormData.status = "Active";
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        "https://localhost:7268/api/Users/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(
          `Registration failed! ${errorData.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <body style={{ backgroundColor: "lightyellow" }}>
      <div
        className="container mt-5"
        style={{
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ced4da",
          backgroundColor: "aquamarine",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="mb-4 text-center">Registration Form</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control`}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className={`form-control`}
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="rid"
              value={formData.rid}
              onChange={handleChange}
            >
              {roles.map((role) => {
                return (
                  <option key={role.rId} value={role.rId}>
                    {role.rName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </body>
  );
};

export default Registration;
