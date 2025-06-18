"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for stored auth on mount (client-side only)
  useEffect(() => {
    console.log("AuthContext - Checking for stored auth...");
    if (typeof window !== 'undefined') {
      try {
        const storedAuth = localStorage.getItem("auth");
        console.log("AuthContext - Found in localStorage:", storedAuth);
        if (storedAuth) {
          const parsedUser = JSON.parse(storedAuth);
          console.log("AuthContext - Setting user:", parsedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      } finally {
        setIsLoading(false);
        console.log("AuthContext - Loading complete");
      }
    }
  }, []);

  const login = (userData: User) => {
    console.log("AuthContext - Login called with:", userData);
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem("auth", JSON.stringify(userData));
      console.log("AuthContext - Saved to localStorage:", localStorage.getItem("auth"));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("auth");
    }
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
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