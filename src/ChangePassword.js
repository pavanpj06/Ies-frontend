import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setMessage("Password must be at least 8 characters long and include a number and a special character.");
      setMessageType("error");
      return;
    }


    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text(); // Read response from backend

      if (response.status === 200) {
        setMessage("Password changed successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 2000); // Redirect to login after success
      } else if (response.status === 400) {
        setMessage(data); // Show validation error
        setMessageType("error");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Change Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter temporary password"
              name="tempPassword"
              value={formData.tempPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={!formData.tempPassword || !formData.newPassword || !formData.confirmPassword}
          >
            Change Password
          </button>
        </form>

        {/* Show error or success message */}
        {message && (
          <p className={`text-center fw-bold mt-3 ${messageType === "error" ? "text-danger" : "text-success"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
