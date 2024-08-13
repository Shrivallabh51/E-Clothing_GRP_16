import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "./UserSlice";
import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, status } = useSelector((store) => store.User);

  useEffect(() => {
    if (status === "succeeded") {
      if (user.rId === 3) {
        navigate("/seller");
      } else if (user.rId === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [status, user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login:", { username, password });

    dispatch(loginUser({ username, password }));
    // console.log("user");
    // console.log(user);
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
