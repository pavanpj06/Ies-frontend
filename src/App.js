import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./usersignup";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup-form" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={< ChangePassword/>} />
        <Route path="/dashboard-page" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
