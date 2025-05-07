
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import MainLayout from "@/components/layout/main-layout";

// Auth pages
import Login from "./pages/login";

// Admin pages
import AdminDashboard from "./pages/admin/dashboard";
import InternsPage from "./pages/admin/interns";
import InternDetailPage from "./pages/admin/intern-detail";
import ReportsPage from "./pages/admin/reports";
import SettingsPage from "./pages/admin/settings";
import RegisterInternPage from "./pages/admin/register-intern";
import SubmissionStatusPage from "./pages/admin/submission-status";

// Intern pages
import InternDashboard from "./pages/intern/dashboard";
import MyReportsPage from "./pages/intern/my-reports";
import SubmitReportPage from "./pages/intern/submit-report";
import ProfilePage from "./pages/intern/profile";

// Shared pages
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: 'admin' | 'intern';
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <Login />} 
      />

      {/* Protected routes for admins */}
      <Route path="/interns" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <InternsPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/interns/:id" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <InternDetailPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <ReportsPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/register-intern" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <RegisterInternPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/submission-status" element={
        <ProtectedRoute requiredRole="admin">
          <MainLayout>
            <SubmissionStatusPage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Protected routes for interns */}
      <Route path="/my-reports" element={
        <ProtectedRoute requiredRole="intern">
          <MainLayout>
            <MyReportsPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/submit-report" element={
        <ProtectedRoute requiredRole="intern">
          <MainLayout>
            <SubmitReportPage />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Home route - shows different dashboard based on user role */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            {user?.role === "admin" ? <AdminDashboard /> : <InternDashboard />}
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
