
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import { api } from "@/lib/api-service";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUserData: (userData: Partial<User>) => Promise<User>;
  updateUserProfile: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("mangInsightUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("mangInsightUser"); // Remove invalid data
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call with mock data
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Create a copy without password for security
        const userToStore = { ...foundUser };
        delete userToStore.password;
        
        setUser(foundUser);
        // Store user in localStorage
        localStorage.setItem("mangInsightUser", JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mangInsightUser");
  };

  const updateUserData = async (userData: Partial<User>): Promise<User> => {
    if (!user) throw new Error("No user logged in");
    
    try {
      const updatedUser = await api.intern.updateProfile(user.id, userData);
      setUser(updatedUser);
      localStorage.setItem("mangInsightUser", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("mangInsightUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      updateUserData,
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
