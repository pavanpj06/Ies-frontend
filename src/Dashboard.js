import React, { useState } from "react";
import { FaSignOutAlt, FaThLarge, FaTools, FaEnvelope, FaChartBar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [showApps, setShowApps] = useState(false);

  // Toggle Applications
  const toggleApplications = () => {
    setShowApps(!showApps);
  };

  // Logout function
  const handleLogout = () => {
    alert("Logged out successfully!");
    
    window.location.href = "/";
  };

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary d-flex justify-content-between px-3">
        <button className="btn btn-light" onClick={toggleApplications}>
          <FaThLarge size={20} className="me-2" /> Applications
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout <FaSignOutAlt className="ms-2" />
        </button>
      </nav>

      {/* Application Icons Section */}
      {showApps && (
        <div className="container mt-4">
          <h5>Applications</h5>
          <div className="d-flex flex-wrap gap-3">
            <div className="card p-3 text-center">
              <FaTools size={30} className="text-primary" />
              <p>Settings</p>
            </div>
            <div className="card p-3 text-center">
              <FaEnvelope size={30} className="text-success" />
              <p>Messages</p>
            </div>
            <div className="card p-3 text-center">
              <FaChartBar size={30} className="text-warning" />
              <p>Reports</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
