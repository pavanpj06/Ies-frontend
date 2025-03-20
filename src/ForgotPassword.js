import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [isSubmitted, setIsSubmitted] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); 
        setMessageType("success");
        setIsSubmitted(true);
        setEmail(""); 
      } else {
        setMessage(data.message || "Something went wrong.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error, please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        
        {message && <p className={`text-center ${messageType === "error" ? "text-danger" : "text-success"}`}>{message}</p>}
        
        {!isSubmitted && (
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
            <button type="submit" className="btn btn-success w-100">Reset Password</button>
          </form>
        )}

        <p className="text-center mt-3">
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
