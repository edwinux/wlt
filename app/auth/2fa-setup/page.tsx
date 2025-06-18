"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "../AuthContext";

export default function TwoFASetupPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    console.log("2FA Setup - Auth state:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  const handleSetup2FA = () => {
    // In a real app, this would navigate to 2FA setup flow
    console.log("Setting up 2FA...");
    console.log("Current auth state before redirect:", { isAuthenticated });
    
    // Navigate to home
    router.push("/");
  };

  const handleSkip = () => {
    console.log("Skipping 2FA...");
    console.log("Current auth state before redirect:", { isAuthenticated });
    
    // Navigate to home
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white flex flex-col">
      {/* Mobile optimized container */}
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        {/* 2FA Setup Card */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-purple-400" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-3 text-center">2FA Setup</h1>
          <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
            For more secure and faster logins, we recommend that you turn on Two-Factor Authentication.
          </p>
          
          <button
            onClick={handleSetup2FA}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-4 rounded-xl transition-colors mb-4"
          >
            Turn on secure 2FA
          </button>

          <button
            onClick={handleSkip}
            className="w-full text-gray-400 hover:text-white font-medium py-4 transition-colors"
          >
            Skip for now
          </button>

          {/* Debug info and manual navigation */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 mb-2">
              Auth status: {isLoading ? "Loading..." : isAuthenticated ? "Logged in" : "Not logged in"}
            </p>
            <Link 
              href="/" 
              className="text-purple-400 hover:text-purple-300 text-sm underline"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 