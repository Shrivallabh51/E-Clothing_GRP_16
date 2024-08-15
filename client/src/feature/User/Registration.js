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
    rid: 2,
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("https://localhost:7268/api/Account/getRoles")
      .then((resp) => resp.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const validate = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "username":
        if (!value) errorMsg = "Username is required.";
        else if (value.length < 3)
          errorMsg = "Username must be at least 3 characters long.";
        break;
      case "password":
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!value) errorMsg = "Password is required.";
        else if (!passwordRegex.test(value))
          errorMsg =
            "Password must be at least 8 characters long, and contain at least one uppercase letter, one digit, and one special character.";
        break;
      case "firstName":
        if (!value) errorMsg = "First Name is required.";
        break;
      case "lastName":
        if (!value) errorMsg = "Last Name is required.";
        break;
      case "mobile":
        if (!value) errorMsg = "Mobile number is required.";
        else if (!/^\d{10}$/.test(value))
          errorMsg = "Mobile number must be 10 digits.";
        break;
      case "email":
        if (!value) errorMsg = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Email is invalid.";
        break;
      case "gender":
        if (!value) errorMsg = "Gender is required.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newFormData = {
      ...formData,
      [name]: name === "rid" ? Number(value) : value,
    };

    // Set status to "Inactive" if the selected role is "Seller"
    if (name === "rid" && value === "3") {
      newFormData.status = null;
    } else if (name === "rid") {
      newFormData.status = "Active";
    }

    setFormData(newFormData);
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    for (let field in formData) {
      validate(field, formData[field]);
      if (errors[field]) valid = false;
    }

    if (!valid) {
      alert("Please fix the validate befor submitting.");
      return;
    }

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
    setErrors({});
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
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className={`form-check-input ${
                    errors.gender ? "is-invalid" : ""
                  }`}
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
                  className={`form-check-input ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                />
                <label className="form-check-label">Female</label>
              </div>
              {errors.gender && (
                <div className="invalid-feedback d-block">{errors.gender}</div>
              )}
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
