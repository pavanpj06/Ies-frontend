import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [greeting, setGreeting] = useState("Welcome Back!");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch greeting message from backend
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-message-basedon-time`);
        setGreeting(res.data.message);
      } catch (err) {
        console.error("Error fetching greeting:", err);
        setGreeting("Welcome Back!");
      }
    };
    fetchGreeting();
  }, [BASE_URL]);

  // Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);
      navigate("/dashboard-page");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      }}
    >
      <div
        className="shadow-lg p-4 rounded-4 bg-white"
        style={{ width: "400px", backdropFilter: "blur(10px)" }}
      >
        <h2 className="text-center text-primary mb-3">{greeting}</h2>
        <h4 className="text-center mb-4">Login</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <FaEnvelope />
            </span>
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
            <span className="input-group-text bg-light">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          <Link to="/forgot-password-page" className="text-decoration-underline text-primary">
  Forgot Password?
</Link>

        </p>
      </div>
    </div>
  );
};

export default Login;
