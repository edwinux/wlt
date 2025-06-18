"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

export default function SimpleSuccessPage() {
  const { login } = useAuth();

  useEffect(() => {
    // Simulate successful authentication
    const simulatedUser = {
      name: "James Doe",
      email: "james@gmail.com",
    };
    
    // Login the user
    login(simulatedUser);
    
    // Immediate redirect
    console.log("Simple success page - redirecting immediately...");
    window.location.href = "/auth/2fa-setup";
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center mb-8">
          <Check className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Successfully confirmed!</h1>
        <p className="text-gray-400 text-sm">Redirecting immediately...</p>
      </div>
    </div>
  );
} 