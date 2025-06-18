"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function WelcomePage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const router = useRouter();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone) {
      // Navigate to confirmation code page
      router.push("/auth/confirm");
    }
  };

  const socialOptions = [
    { 
      name: "Google", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      )
    },
    { 
      name: "Apple", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      )
    },
    { 
      name: "Discord", 
      icon: "💬",
      bgColor: "bg-indigo-600"
    },
    { 
      name: "FIX ID", 
      text: "Continue with FIX ID",
      bgColor: "bg-purple-600"
    },
    { 
      name: "GitHub", 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      )
    },
    { 
      name: "Twitter", 
      icon: "𝕏",
      bgColor: "bg-gray-800"
    },
    { 
      name: "LinkedIn", 
      icon: "in",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white flex flex-col">
      {/* Mobile optimized container */}
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold mb-2">Welcome</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleContinue} className="flex-1 flex flex-col">
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Your Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-purple-400 placeholder-gray-500"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-4 rounded-xl transition-colors text-base"
            >
              Continue
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            {/* Always visible options */}
            {socialOptions.slice(0, 2).map((option) => (
              <button
                key={option.name}
                type="button"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                {option.icon}
                <span>Continue with {option.name}</span>
              </button>
            ))}

            {/* Expandable options */}
            {showMoreOptions && (
              <div className="space-y-3">
                {socialOptions.slice(2).map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    className={`w-full ${option.bgColor || 'bg-white/5'} hover:opacity-90 border border-white/10 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-3`}
                  >
                    {option.icon && typeof option.icon === 'string' ? (
                      <span className="text-xl">{option.icon}</span>
                    ) : option.icon}
                    <span>{option.text || `Continue with ${option.name}`}</span>
                  </button>
                ))}
              </div>
            )}

            {/* More options button */}
            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="w-full text-purple-400 hover:text-purple-300 font-medium py-4 transition-colors flex items-center justify-center gap-2"
            >
              <span>{showMoreOptions ? 'Less' : 'More'} option</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Terms */}
          <div className="mt-auto pt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                Terms of service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                Privacy policy
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Desktop Sign Up link - Top Right */}
      <Link 
        href="/auth/signup" 
        className="hidden md:block absolute top-6 right-6 text-sm bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
} 