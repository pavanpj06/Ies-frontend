import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./usersignup";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";
import Resetingpassword from "./ResetPassword"
import UseraccountCreation from "./CreateAccountModal";
import CreatePlanPage from "./CreatePlan";
import ViewAccountspage from "./ViewAccounts";

import EligibilityFormPage from "./EligibilityForm";

import PlanSlectionPage from "./PlanSelection";
import IncomeDetailsPage from "./IncomeDetails";
import EducationDetailsPage from "./EducationDetails";
import KidDetailsFormPage from "./KidDetailsForm";

import CreateApplicationPage from "./CreateApplication";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup-form" element={<Signup/>} />
        <Route path="/forgot-password-page" element={<ForgotPassword />} />
        <Route path="/reset-password" element={< ChangePassword/>} />
        <Route path="/dashboard-page" element={<Dashboard/>} />
<Route path="/reset-password" element={<Resetingpassword/>} />
<Route path="/user-account-creation" element={<UseraccountCreation/>} />
<Route path="/create-plan-page" element={<CreatePlanPage/>} />
<Route path="/View-Accounts-page" element={<ViewAccountspage/>}/>

<Route path="/create-application-page" element={<CreateApplicationPage/>} />
<Route path="/plan-selection-page" element={<PlanSlectionPage/>} />

<Route path ="/income-details-page" element={<IncomeDetailsPage/>} />
<Route path ="/education-details-page" element={<EducationDetailsPage/>} />


<Route path="kid=details-form-page" element={<KidDetailsFormPage/>} />

<Route path="/eligibility-form-page" element={<EligibilityFormPage/>} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
