import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";




const ResetPassword = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    console.log(`Field ${e.target.name} changed to: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
   
    // Validation for password confirmation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    try {
      // Assuming the backend URL is set in the environment variables
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      // Send the form data to the backend API
      const response = await fetch(`${BASE_URL}/unlock-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Assuming the response is JSON

      if (response.status === 200) {
        setMessage(data.message);
        setTimeout(() => {
          console.log("Navigating to /...");
          navigate("/");
        }, 2000);
        
      } else {
        setMessage(data.message || "Failed to reset password.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while resetting the password.");
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg border border-primary" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        {/* Show error or success message */}
        {message && (
          <p className={`text-center ${messageType === "error" ? "text-danger" : "text-success"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Temporary Password</label>
            <input
              type="password"
              className="form-control"
              name="tempPassword"
              value={formData.tempPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
