import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

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
    rid: 2, // Assuming 2 is the ID for the Buyer role
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

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

    setFormIsValid(
      Object.values({ ...errors, [name]: errorMsg }).every(
        (error) => error === ""
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newFormData = {
      ...formData,
      [name]: name === "rid" ? Number(value) : value,
    };

    // Set status based on the selected role
    if (name === "rid") {
      if (value === "3") {
        newFormData.status = null; // Assuming "Inactive" for Seller
      } else {
        newFormData.status = "Active"; // Default to "Active" for other roles
      }
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
      alert("Please fix the validation errors before submitting.");
      return;
    }

    try {
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
      if (response.ok) {
        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
          text: "You will be redirected to the login page.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: data.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Please try again later.",
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setFormIsValid(false);
  };

  return (
    <div className="container mt-5">
      <div
        className="mx-auto p-4"
        style={{
          maxWidth: "600px",
          backgroundColor: "aquamarine",
          borderRadius: "8px",
          border: "1px solid #ced4da",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="mb-4 text-center">Registration Form</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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
              </div>
              {errors.gender && (
                <div className="invalid-feedback d-block">{errors.gender}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>
              <select
                className={`form-select ${errors.rid ? "is-invalid" : ""}`}
                name="rid"
                value={formData.rid}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role.rId} value={role.rId}>
                    {role.rName}
                  </option>
                ))}
              </select>
              {errors.rid && (
                <div className="invalid-feedback">{errors.rid}</div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formIsValid}
            >
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
    </div>
  );
};

export default Registration;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Registration = () => {
//   const navigate = useNavigate();
//   const initialFormData = {
//     username: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     gender: "",
//     rid: 2,
//     status: "Active",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [roles, setRoles] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [formIsValid, setFormIsValid] = useState(false);

//   useEffect(() => {
//     fetch("https://localhost:7268/api/Account/getRoles")
//       .then((resp) => resp.json())
//       .then((data) => setRoles(data))
//       .catch((error) => console.error("Error fetching roles:", error));
//   }, []);

//   const validate = (name, value) => {
//     let errorMsg = "";

//     switch (name) {
//       case "username":
//         if (!value) errorMsg = "Username is required.";
//         else if (value.length < 3)
//           errorMsg = "Username must be at least 3 characters long.";
//         break;
//       case "password":
//         const passwordRegex =
//           /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!value) errorMsg = "Password is required.";
//         else if (!passwordRegex.test(value))
//           errorMsg =
//             "Password must be at least 8 characters long, and contain at least one uppercase letter, one digit, and one special character.";
//         break;
//       case "firstName":
//         if (!value) errorMsg = "First Name is required.";
//         break;
//       case "lastName":
//         if (!value) errorMsg = "Last Name is required.";
//         break;
//       case "mobile":
//         if (!value) errorMsg = "Mobile number is required.";
//         else if (!/^\d{10}$/.test(value))
//           errorMsg = "Mobile number must be 10 digits.";
//         break;
//       case "email":
//         if (!value) errorMsg = "Email is required.";
//         else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Email is invalid.";
//         break;
//       case "gender":
//         if (!value) errorMsg = "Gender is required.";
//         break;
//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: errorMsg,
//     }));

//     setFormIsValid(
//       Object.values({ ...errors, [name]: errorMsg }).every(
//         (error) => error === ""
//       )
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let newFormData = {
//       ...formData,
//       [name]: name === "rid" ? Number(value) : value,
//     };

//     // Set status to "Inactive" if the selected role is "Seller"
//     if (name === "rid" && value === "3") {
//       newFormData.status = null;
//     } else if (name === "rid") {
//       newFormData.status = "Active";
//     }

//     setFormData(newFormData);
//     validate(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let valid = true;
//     for (let field in formData) {
//       validate(field, formData[field]);
//       if (errors[field]) valid = false;
//     }

//     if (!valid) {
//       alert("Please fix the validation errors before submitting.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://localhost:7268/api/Users/Register",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         // Show success message using SweetAlert
//         Swal.fire({
//           icon: "success",
//           title: "Registration successful!",
//           text: "You will be redirected to the login page.",
//           timer: 2000,
//           showConfirmButton: false,
//         });

//         setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Registration failed",
//           text: data.message || "Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//         text: "Please try again later.",
//       });
//     }
//   };

//   const handleReset = () => {
//     setFormData(initialFormData);
//     setErrors({});
//     setFormIsValid(false);
//   };

//   return (
//     <div className="container mt-5">
//       <div
//         className="mx-auto p-4"
//         style={{
//           maxWidth: "600px",
//           backgroundColor: "aquamarine",
//           borderRadius: "8px",
//           border: "1px solid #ced4da",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h2 className="mb-4 text-center">Registration Form</h2>
//         <form onSubmit={handleSubmit} noValidate>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Username</label>
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.username ? "is-invalid" : ""
//                 }`}
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//               {errors.username && (
//                 <div className="invalid-feedback">{errors.username}</div>
//               )}
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${
//                   errors.password ? "is-invalid" : ""
//                 }`}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {errors.password && (
//                 <div className="invalid-feedback">{errors.password}</div>
//               )}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">First Name</label>
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.firstName ? "is-invalid" : ""
//                 }`}
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//               {errors.firstName && (
//                 <div className="invalid-feedback">{errors.firstName}</div>
//               )}
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Last Name</label>
//               <input
//                 type="text"
//                 className={`form-control ${
//                   errors.lastName ? "is-invalid" : ""
//                 }`}
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//               {errors.lastName && (
//                 <div className="invalid-feedback">{errors.lastName}</div>
//               )}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Mobile Number</label>
//               <input
//                 type="text"
//                 className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//               />
//               {errors.mobile && (
//                 <div className="invalid-feedback">{errors.mobile}</div>
//               )}
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <div className="invalid-feedback">{errors.email}</div>
//               )}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Gender</label>
//               <div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className={`form-check-input ${
//                       errors.gender ? "is-invalid" : ""
//                     }`}
//                     type="radio"
//                     name="gender"
//                     value="Male"
//                     onChange={handleChange}
//                     checked={formData.gender === "Male"}
//                   />
//                   <label className="form-check-label">Male</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className={`form-check-input ${
//                       errors.gender ? "is-invalid" : ""
//                     }`}
//                     type="radio"
//                     name="gender"
//                     value="Female"
//                     onChange={handleChange}
//                     checked={formData.gender === "Female"}
//                   />
//                   <label className="form-check-label">Female</label>
//                 </div>
//                 {errors.gender && (
//                   <div className="invalid-feedback d-block">
//                     {errors.gender}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">Role</label>
//               <select
//                 className={`form-select ${errors.rid ? "is-invalid" : ""}`}
//                 name="rid"
//                 value={formData.rid}
//                 onChange={handleChange}
//               >
//                 {roles.map((role) => (
//                   <option key={role.rid} value={role.rid}>
//                     {role.rName}
//                   </option>
//                 ))}
//               </select>
//               {errors.rid && (
//                 <div className="invalid-feedback">{errors.rid}</div>
//               )}
//             </div>
//           </div>

//           <div className="d-flex justify-content-end">
//             <button
//               type="submit"
//               className="btn btn-primary me-2"
//               disabled={!formIsValid}
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;
