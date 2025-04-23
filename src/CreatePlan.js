import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePlan = () => {
  const [planName, setPlanName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState(""); // To store success or error messages
  const userEmail = localStorage.getItem("userEmail"); // Retrieve email from localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if userEmail is available
    if (!userEmail) {
      setMessage("User email is not found. Please login again.");
      return;
    }

    // Prepare the data to send to the backend
    const planData = {
      planName,
      startDate,
      endDate,
      createByUser: userEmail, // Send user email with the plan data
    };

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    try {
      // Make the POST request to the backend API
      const response = await fetch(`${BASE_URL}/create-the-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(planData), // Sending data to the backend
      });

      const data = await response.json();
      if (response.status === 201) {
        setMessage(data.message);
        setPlanName("");
        setStartDate("");
        setEndDate("");

        // Optionally hide message after 2s
        setTimeout(() => {
          setMessage(""); // Hide message after 2 seconds
        }, 3000);
      } else if (response.status === 409) {
        setMessage(data.message);
      } else if (response.status === 400) {
        // Handle validation errors
        if (typeof data === 'object' && data !== null) {
          // Extract all error messages and combine them
          const errors = Object.values(data).join(" ");
          setMessage(errors);
        } else {
          setMessage("Validation failed.");
        }
      }
      else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error creating plan:", error);
      setMessage("An error occurred while creating the plan.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-4">Create Plan</h3>

        {/* Display message if available */}
        {message && (
          <div className="alert alert-info" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Plan Name</label>
            <input
              type="text"
              className="form-control"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Plan Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Plan End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
