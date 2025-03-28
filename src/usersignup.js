import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState(""); // Store backend message
  const [messageType, setMessageType] = useState(""); // Success or error
  const [isSubmitted, setIsSubmitted] = useState(false); // Hide form after success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // **Frontend Email Validation**
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Only Gmail addresses are allowed.");
      setMessageType("error");
      return;
    }
    const BASE_URL = process.env.REACT_APP_BASE_URL;
//https://com.koyeb.app
    try {
      const response = await fetch(`${BASE_URL}/sign-up-the-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 

      if (response.status === 201) {
        setMessage(data.message); 
        setMessageType("success");
        setIsSubmitted(true); 
        setFormData({ firstName: "", lastName: "", email: "", phoneNumber: ""}); // Reset form
      } else if (response.status === 400) {
        const errorMessage = Object.values(data)[0]; 
        setMessage(errorMessage); 
        setMessageType("error");
      } else if (response.status === 409) {
        setMessage(data); 
        setMessageType("error");
      } else {
        throw new Error("Something went wrong. Please try again."); // Generic error
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Sign Up</h3>

        {/* Show success message when submitted */}
        {isSubmitted ? (
          <p className="text-success text-center fw-bold">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => {
                  // Allow only digits in phone number
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phoneNumber: onlyDigits });
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-warning w-100"
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber }
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Show error or success message below the form */}
        {message && !isSubmitted && (
          <p className={`text-center fw-bold ${messageType === "error" ? "text-danger" : "text-success"}`}>{message}</p>
        )}

        <p className="text-center mt-3">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
