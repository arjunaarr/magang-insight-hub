
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // This page is just a redirect helper
    if (!isLoading) {
      if (user) {
        // User is logged in, redirect to the appropriate dashboard
        navigate('/');
      } else {
        // User is not logged in, redirect to the login page
        navigate('/login');
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
