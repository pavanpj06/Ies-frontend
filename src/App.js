import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./usersignup";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import ResettingPassword from "./ResetPassword";

import Dashboard from "./Dashboard";
import CreateAccountPage from "./Pages/CreateAccountPage";
import CreatePlanPage from "./CreatePlan";
import ViewAccountspage from "./ViewAccounts";
import CreateApplicationPage from "./CreateApplication";
import PlanSelectionPage from "./PlanSelection";
import IncomeDetailsPage from "./IncomeDetails";
import EducationDetailsPage from "./EducationDetails";
import KidDetailsFormPage from "./KidDetailsForm";
import EligibilityFormPage from "./EligibilityForm";
import ViewPlansPage from "./ViewPlans";
import ViewApplicationPage from "./ViewApplication";

import UserProfilePage from "./UserProfile";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup-form" element={<Signup />} />
        <Route path="/forgot-password-page" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/resetting-password" element={<ResettingPassword />} />

        {/* Dashboard and nested pages */}
        <Route path="/dashboard-page" element={<Dashboard />}>
          <Route path="user-account-creation" element={<CreateAccountPage/>} />
          <Route path="create-plan-page" element={<CreatePlanPage />} />
          <Route path="view-accounts-page" element={<ViewAccountspage />} />
          <Route path="create-application-page" element={<CreateApplicationPage />} />
          <Route path="plan-selection-page" element={<PlanSelectionPage />} />

          <Route path="view-plans" element={<ViewPlansPage />} />
          <Route path="income-details-page" element={<IncomeDetailsPage />} />
          <Route path="education-details-page" element={<EducationDetailsPage />} />
          <Route path="kid-details-form-page" element={<KidDetailsFormPage />} />
          <Route path="eligibility-form-page" element={<EligibilityFormPage />} />
          <Route path="profile" element={<UserProfilePage />} />
                    <Route path="view-applications" element={<ViewApplicationPage/>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
