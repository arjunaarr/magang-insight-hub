import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/dashboard";
import InternDashboard from "./pages/intern/dashboard";
import InternsList from "./pages/admin/interns";
import ReportsPage from "./pages/admin/reports";
import RegisterInternPage from "./pages/admin/register-intern";
import SubmissionStatusPage from "./pages/admin/submission-status";
import InternDetailPage from "./pages/admin/intern-detail";
import Settings from "./pages/settings";
import SubmitReportPage from "./pages/intern/submit-report";
import MyReportsPage from "./pages/intern/my-reports";
import EditProfilePage from "./pages/intern/edit-profile";
import ReportDetailPage from "./pages/admin/report-detail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

      {/* Admin Routes */}
      <Route
        path="dashboard"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="interns"
        element={user?.role === 'admin' ? <InternsList /> : <Navigate to="/login" />}
      />
      <Route
        path="reports"
        element={user?.role === 'admin' ? <ReportsPage /> : <Navigate to="/login" />}
      />
      <Route path="reports/:id" element={<ReportDetailPage />} />
      <Route
        path="register-intern"
        element={user?.role === 'admin' ? <RegisterInternPage /> : <Navigate to="/login" />}
      />
      <Route
        path="submission-status"
        element={user?.role === 'admin' ? <SubmissionStatusPage /> : <Navigate to="/login" />}
      />
      <Route
        path="interns/:id"
        element={user?.role === 'admin' ? <InternDetailPage /> : <Navigate to="/login" />}
      />
      <Route
        path="settings"
        element={user?.role === 'admin' ? <Settings /> : <Navigate to="/login" />}
      />

      {/* Intern Routes */}
      <Route
        path="intern/dashboard"
        element={user?.role === 'intern' ? <InternDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="intern/submit-report"
        element={user?.role === 'intern' ? <SubmitReportPage /> : <Navigate to="/login" />}
      />
      <Route
        path="intern/my-reports"
        element={user?.role === 'intern' ? <MyReportsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="intern/edit-profile"
        element={user?.role === 'intern' ? <EditProfilePage /> : <Navigate to="/login" />}
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/dashboard' : '/intern/dashboard') : '/login'} />} />
    </Routes>
  );
}

export default App;
