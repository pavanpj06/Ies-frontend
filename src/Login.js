import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

// import { GoogleLogin } from "react-google-login";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google OAuth Client ID

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection after login

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // https://com.koyeb.app
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  try {
    const response = await fetch(`${BASE_URL}/login-form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate("/dashboard-page");
     
    }else{
      throw new Error(data.message);//"Invalid credentials. Please try again."
    }

   
   
  } catch (err) {
    console.error("Error during login:", err);
    setError(err.message);
  }
};

  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response.profileObj);
    alert("Google Login Successful!");
    navigate("/dashboard"); 
  };

  const handleGoogleFailure = (response) => {
    console.log("Google Login Failed:", response);
    setError("Google login failed. Please try again.");
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
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>

        {/* Google Login Button */}
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
        <p className="text-center mt-2">
          Don't have an account? <Link to="/signup-form">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
