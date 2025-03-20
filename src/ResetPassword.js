import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    console.log("Form Submitted:", formData);
    setMessage("Password reset successfully!");
    setMessageType("success");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg border border-primary" style={{ width: "400px" }}>  
        <h3 className="text-center mb-4">Reset Password</h3>

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
              className="form-control border border-danger" // Added border for debugging
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

          <button type="submit" className="btn btn-success w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
