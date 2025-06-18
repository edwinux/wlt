"use client";

import { useAuth } from "../auth/AuthContext";
import { useRouter } from "next/navigation";

export default function DebugPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      alert("LocalStorage cleared! Refreshing...");
      window.location.reload();
    }
  };

  const checkLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem("auth");
      alert(`LocalStorage auth: ${auth || "null"}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Debug Page</h1>
      
      <div className="space-y-4">
        <div className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-2">Auth State</h2>
          <pre className="text-sm text-gray-300">
            {JSON.stringify({ user, isAuthenticated, isLoading }, null, 2)}
          </pre>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={checkLocalStorage}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Check LocalStorage
          </button>
          
          <button
            onClick={clearLocalStorage}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Clear LocalStorage
          </button>
          
          <button
            onClick={logout}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
          
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => router.push("/auth/welcome")}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
} 