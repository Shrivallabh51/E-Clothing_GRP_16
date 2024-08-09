import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login:", { username, password });

    fetch("https://localhost:7268/api/Account/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((errorData) => {
            // Assuming the error message is in errorData.message
            throw new Error(errorData.message || "Bad Request");
          });
        }
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const roleId = data.rId;
        console.log("Role ID:", roleId);
        if (roleId === 3) {
          navigate("/seller");
        } else if (roleId === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }

        console.log("Success:", data);
        toast.success("Login successful!");
        // Handle successful login, e.g., redirect to another page
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message.includes("Account is not activated")) {
          toast.error("Account is not activated. Please contact support.");
          // You can also handle this scenario differently, e.g., show a modal
        } else {
          toast.error("Login failed: Wrong Credential");
          // Handle other errors here
        }
      });
  };

  return (
    <section className="login-center">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
            <br />
            <br />
          </div>
          <div>
            <Link to="/register">
              <p className="tranparent-btn">New User? Sign Up Here</p>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
}

export default Login;
