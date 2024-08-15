import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

  const usernameNotEmptyMessage = "Username should not empty!";

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  const [passClick, setPassClick] = useState(false);

  const isFormIncomplete = !trimmedUsername || !trimmedPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Login:", { trimmedUsername, trimmedPassword });

    dispatch(loginUser({ username, password }));
    // console.log("user");
    // console.log(user);
  };
  //  console.log(username);

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
              onClick={() => setPassClick(false)}
            />
            {!trimmedUsername && passClick && (
              <p style={{ color: "red" }}>{usernameNotEmptyMessage}</p>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setPassClick(true)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isFormIncomplete}
              style={{ opacity: isFormIncomplete ? 0.6 : 1 }}
            >
              Login
            </button>
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
