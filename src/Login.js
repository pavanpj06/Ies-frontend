import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

// const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Uncomment if using Google login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        // Save JWT and email to localStorage
        console.log(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.email);
        // const emailMatch = data.message.match(/email=([^&]+)/);
        // const email = emailMatch ? decodeURIComponent(emailMatch[1]) : null;
        // Redirect to dashboard
        navigate("/dashboard-page");
      } else {
        throw new Error(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">Login</button>
        </form>

        {/* Optional Google Login - Add back if needed */}
        {/* <div className="d-flex justify-content-center my-3">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
            className="w-100"
          />
        </div> */}

        <p className="text-center mt-3">
          <Link to="/forgot-password-page">Forgot Password?</Link>
        </p>
        {/* <p className="text-center mt-2">
          Don't have an account? <Link to="/signup-form">Sign up</Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
