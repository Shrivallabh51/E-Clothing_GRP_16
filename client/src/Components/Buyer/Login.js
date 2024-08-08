import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
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
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle successful login, e.g., redirect to another page
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here, e.g., show error message to user
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
    </section>
  );
}

export default Login;
