import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeDetails from "./components/employeeDetails";
import TimeSheet from "./components/TimeSheet";
import Projects from "./components/Projects";
import Reports from "./components/Reports";

import Setting from "./components/Setting";
import Behaviour from "./components/Behaviour";
import SalaryPage from "./components/salaryPage";
import FrontPage from "./components/FrontPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmpHome from "./components/EmpHome";
import EmpAttendence from "./components/EmpAttendence";
import EmpDocuments from "./components/EmpDocuments";
import EmpRequest from "./components/EmpRequest";
import LeaveRequest from "./components/LeaveRequest";
import MainDashboard from "./pages/MainDashboard";
import FirstPage from "./components/FrontPage";
import { EmployeeProtectedRoute, ProtectedRoute } from "./pages/ProtectedRoute";
import EmpLeavesChanges from "./components/EmpLeavesChanges";
import EmpSalaryManagement from "./components/EmpSalaryManagment";
import EmpDailyAttendence from "./components/EmpDailyAttendence";
import Payroll from "./components/Payroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpForgotPassword from "./pages/EmpForgotPassword";
import EmpResetPassword from "./pages/EmpResetPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import EmpAllAttendence from "./components/EmpAllAttendence";
import EmpAllLeave from "./components/EmpAllLeave";
import EmpLocation from "./components/EmpLocation";
import Assets from "./components/Assets";
import Termination from "./components/Termination";
import EmpAdvanced from "./components/EmpAdvanced";
import EmpPayslip from "./components/EmpPayslip";
import EmpPaymentSlip from "./components/EmpPaymentSlip";
import EmpAssetsSubmit from "./components/EmpAssetsSubmit";
import EmpReqLeaveStatus from "./components/EmpReqLeaveStatus";
import EmpNotes from "./components/EmpNotes";
import GatepassApproval from "./components/GatepassApproval";
import EmpGatePass from "./components/EmpGatePass";
import EmpShowCauseNotice from "./components/EmpShowCauseNotice";
import ReviewShowCauseNotice from "./components/ReviewShowCauseNotice";
import Incentives from "./components/payroll/Incentives";
import Reimbursements from "./components/payroll/Reimbursements";
import PayrollSummary from "./components/payroll/PayrollSummary";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [empAuthToken, setEmpAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const handleRequestSuccess = (email) => {
    setEmail(email); // Store the email
  };

  // Unified Authentication Check
  useEffect(() => {
    const fetchTokens = () => {
      const adminToken = localStorage.getItem("userLogin");
      const employeeToken = localStorage.getItem("employeeLogin");

      if (adminToken) {
        try {
          const parsedAdmin = JSON.parse(adminToken);
          setAuthToken(parsedAdmin?.data?.accessToken || "");
        } catch (error) {
          console.error("Error parsing admin token:", error);
        }
      }

      if (employeeToken) {
        try {
          const parsedEmployee = JSON.parse(employeeToken);
          setEmpAuthToken(parsedEmployee?.data?.accessToken || "");
        } catch (error) {
          console.error("Error parsing employee token:", error);
        }
      }

      setLoading(false); // Set loading to false after tokens are checked
    };

    fetchTokens();
  }, []);

  const isAuthenticated = !!authToken; // Admin authentication status
  const isEmployeeAuthenticated = !!empAuthToken; // Employee authentication status

  // Show loading while checking tokens
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Admin Protected Routes */}
        <Route path="/" element={<Login />} />

        <Route
          path="/employee/forgot/password"
          element={
            <EmpForgotPassword onRequestSuccess={handleRequestSuccess} />
          }
        />
        <Route
          path="/employee/reset/password"
          element={<EmpResetPassword email={email} />}
        />
        <Route
          path="/forgot/password"
          element={
            <AdminForgotPassword onRequestSuccess={handleRequestSuccess} />
          }
        ></Route>
        <Route
          path="/reset/password"
          element={<AdminResetPassword email={email} />}
        ></Route>
        <Route
          path="/employee/leave/changes"
          element={
            <ProtectedRoute
              element={<EmpLeavesChanges />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
        path="/gatepass/approval"
        element={
          <ProtectedRoute
           element={<GatepassApproval/>}
           isAuthenticated={isAuthenticated}
          ></ProtectedRoute>
        }
        ></Route>
        <Route
          path="/employee/advance/money/request"
          element={
            <ProtectedRoute
              element={<Payroll />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
        path="/view/employee/show/cause/notice"
        element={
          <ProtectedRoute
          element={<ReviewShowCauseNotice/>}
          isAuthenticated={isAuthenticated}
          ></ProtectedRoute>
        }
        ></Route>
        <Route
          path="/generate/employee/payslip"
          element={
            <ProtectedRoute
              element={<EmpPayslip />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/all/leave"
          element={
            <ProtectedRoute
              element={<EmpAllLeave />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/all/attendence"
          element={
            <ProtectedRoute
              element={<EmpAllAttendence />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/location"
          element={
            <ProtectedRoute
              element={<EmpLocation />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/payrollSummary"
          element={
            <ProtectedRoute
              element={<PayrollSummary />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/incentives"
          element={
            <ProtectedRoute
              element={<Incentives />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/reimbursements"
          element={
            <ProtectedRoute
              element={<Reimbursements />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/company/assets"
          element={
            <ProtectedRoute
              element={<Assets />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/employee/termination"
          element={
            <ProtectedRoute
              element={<Termination />}
              isAuthenticated={isAuthenticated}
            ></ProtectedRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={<FirstPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/employee-details"
          element={
            <ProtectedRoute
              element={<EmployeeDetails />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/timesheet"
          element={
            <ProtectedRoute
              element={<TimeSheet />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              element={<Projects />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              element={<Reports />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute
              element={<Setting />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/behavior"
          element={
            <ProtectedRoute
              element={<Behaviour />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/salary/details"
          element={
            <ProtectedRoute
              element={<SalaryPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="employee/request/leave/approval"
          element={
            <ProtectedRoute
              element={<LeaveRequest />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/employee/salary/management"
          element={
            <ProtectedRoute
              element={<EmpSalaryManagement />}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
          path="/employee/daily/attendance"
          element={
            <ProtectedRoute
              element={<EmpDailyAttendence />}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frontpage" element={<FrontPage />} />

        {/* Employee Protected Routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route
          path="/employee/home"
          element={
            <EmployeeProtectedRoute
              element={<EmpHome />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/attendence"
          element={
            <EmployeeProtectedRoute
              element={<EmpAttendence />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/documents"
          element={
            <EmployeeProtectedRoute
              element={<EmpDocuments />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />
        <Route
          path="/employee/request/leave"
          element={
            <EmployeeProtectedRoute
              element={<EmpRequest />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        />

        <Route
          path="/employee/advanced"
          element={
            <EmployeeProtectedRoute
              element={<EmpAdvanced />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            ></EmployeeProtectedRoute>
          }
        ></Route>

        <Route
          path="/employee/Leave/status"
          element={
            <EmployeeProtectedRoute
              element={<EmpReqLeaveStatus />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            ></EmployeeProtectedRoute>
          }
        ></Route>

        <Route
          path="/employee/notes"
          element={
            <EmployeeProtectedRoute
              element={<EmpNotes />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            ></EmployeeProtectedRoute>
          }
        ></Route>

        <Route
          path="/employee/payslip"
          element={
            <EmployeeProtectedRoute
              element={<EmpPaymentSlip />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            />
          }
        ></Route>

        <Route
          path="/employee/assets"
          element={
            <EmployeeProtectedRoute
              element={<EmpAssetsSubmit />}
              isEmployeeAuthenticated={isEmployeeAuthenticated}
            ></EmployeeProtectedRoute>
          }
        ></Route>
        <Route
        path="/employee/gatepass/request"
        element={
          <EmployeeProtectedRoute
           element={<EmpGatePass/>}
            isEmployeeAuthenticated={isEmployeeAuthenticated}
          ></EmployeeProtectedRoute>
        }
        ></Route>
        <Route
        path="/employee/cause/notice"
         element={
          <EmployeeProtectedRoute
          element={<EmpShowCauseNotice/>}
          isEmployeeAuthenticated={isEmployeeAuthenticated}
          ></EmployeeProtectedRoute>
         }
        ></Route>
        <Route
          path="/employee/forgot/password"
          element={<EmpForgotPassword />}
        ></Route>
        <Route
          path="/employee/reset/password"
          element={<EmpResetPassword />}
        ></Route>

        <Route
          path="/forgot/password"
          element={<AdminForgotPassword />}
        ></Route>
        <Route path="/reset/password" element={<AdminResetPassword />}></Route>
      </Routes>
    </div>
  );
};

export default App;
