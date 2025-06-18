"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useAuth } from "../AuthContext";

export default function SuccessPage() {
  const router = useRouter();
  const { login } = useAuth();
  const hasLoggedIn = useRef(false);

  useEffect(() => {
    // Prevent double execution
    if (hasLoggedIn.current) return;
    hasLoggedIn.current = true;

    // Simulate successful authentication
    const simulatedUser = {
      name: "James Doe",
      email: "james@gmail.com",
    };
    
    // Login immediately
    console.log("Logging in user...");
    login(simulatedUser);

    // Redirect to 2FA setup after animation completes
    const redirectTimer = setTimeout(() => {
      console.log("Attempting redirect to 2FA setup...");
      // Use window.location directly for most reliable redirect
      window.location.href = "/auth/2fa-setup";
    }, 1500); // Reduced from 2000ms to 1500ms

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []); // Remove dependencies to prevent re-runs

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-32 h-32 bg-purple-500 rounded-full flex items-center justify-center mb-8 animate-scale-in">
          <Check className="w-16 h-16 text-white animate-check" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Successfully confirmed!</h1>
        <p className="text-gray-400 text-sm mb-4">Redirecting...</p>
        
        {/* Manual redirect options as fallback */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <button
            onClick={() => {
              console.log("Manual redirect to 2FA clicked");
              window.location.href = "/auth/2fa-setup";
            }}
            className="text-purple-400 hover:text-purple-300 text-sm underline"
          >
            Continue to 2FA Setup
          </button>
          
          <button
            onClick={() => {
              console.log("Skip to home clicked");
              window.location.href = "/";
            }}
            className="text-gray-400 hover:text-gray-300 text-xs"
          >
            Skip to Home
          </button>
        </div>
      </div>
    </div>
  );
} 