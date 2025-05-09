
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
import MainLayout from "./components/layout/main-layout";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />

      {/* Admin Routes */}
      <Route
        path="/"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          ) : user?.role === 'intern' ? (
            <Navigate to="/intern/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="dashboard"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="interns"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <InternsList />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="reports"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route 
        path="reports/:id" 
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <ReportDetailPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route
        path="register-intern"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <RegisterInternPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="submission-status"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <SubmissionStatusPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="interns/:id"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <InternDetailPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="settings"
        element={
          user?.role === 'admin' ? (
            <MainLayout>
              <Settings />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Intern Routes */}
      <Route
        path="intern/dashboard"
        element={
          user?.role === 'intern' ? (
            <MainLayout>
              <InternDashboard />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="intern/submit-report"
        element={
          user?.role === 'intern' ? (
            <MainLayout>
              <SubmitReportPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="intern/my-reports"
        element={
          user?.role === 'intern' ? (
            <MainLayout>
              <MyReportsPage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="intern/edit-profile"
        element={
          user?.role === 'intern' ? (
            <MainLayout>
              <EditProfilePage />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="profile" element={
        user ? (
          <MainLayout>
            {user.role === 'intern' ? <EditProfilePage /> : <Settings />}
          </MainLayout>
        ) : (
          <Navigate to="/login" />
        )
      } />

      {/* Catch all - redirect to appropriate dashboard or login */}
      <Route path="*" element={
        user ? (
          <Navigate to={user.role === 'admin' ? '/' : '/intern/dashboard'} />
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
}

export default App;
