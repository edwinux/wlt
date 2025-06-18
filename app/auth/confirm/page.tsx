"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, X } from "lucide-react";

export default function ConfirmCodePage() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleKeypadClick = (value: string) => {
    if (value === "delete") {
      // Handle backspace
      if (currentIndex > 0) {
        const newCode = [...code];
        const deleteIndex = code[currentIndex] ? currentIndex : currentIndex - 1;
        newCode[deleteIndex] = "";
        setCode(newCode);
        setCurrentIndex(Math.max(0, deleteIndex));
      }
    } else if (value !== "" && currentIndex < 5) {
      // Add digit
      const newCode = [...code];
      newCode[currentIndex] = value;
      setCode(newCode);
      
      // Move to next index
      if (currentIndex < 4) {
        setCurrentIndex(currentIndex + 1);
      }
      
      // Auto-submit when all digits are entered
      if (currentIndex === 4) {
        setTimeout(() => {
          window.location.href = "/auth/success";
        }, 500);
      }
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");

  const keypadButtons = [
    { value: "1", label: "1" },
    { value: "2", label: "2", sublabel: "ABC" },
    { value: "3", label: "3", sublabel: "DEF" },
    { value: "4", label: "4", sublabel: "GHI" },
    { value: "5", label: "5", sublabel: "JKL" },
    { value: "6", label: "6", sublabel: "MNO" },
    { value: "7", label: "7", sublabel: "PQRS" },
    { value: "8", label: "8", sublabel: "TUV" },
    { value: "9", label: "9", sublabel: "WXYZ" },
    { value: "", label: "" }, // Empty space
    { value: "0", label: "0" },
    { value: "delete", label: "⌫" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button 
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <Mail className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2 text-center">Enter confirmation code</h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          We sent an email with your confirmation code to<br />
          <span className="text-white">youremail@gmail.com</span>
        </p>
        
        {/* Code Input Display */}
        <div className="flex justify-center gap-3 mb-8">
          {code.map((digit, index) => (
            <div
              key={index}
              className={`w-12 h-14 bg-white/10 border-2 ${
                index === currentIndex && !isCodeComplete ? 'border-purple-400' : 'border-white/20'
              } rounded-lg flex items-center justify-center text-xl font-semibold transition-all`}
            >
              {digit}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            I didn't get the code
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => isCodeComplete && router.push("/auth/success")}
          disabled={!isCodeComplete}
          className={`w-full font-medium py-4 rounded-xl transition-colors mb-8 ${
            isCodeComplete 
              ? "bg-purple-500 hover:bg-purple-600 text-white" 
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto w-full">
          {keypadButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => button.value && handleKeypadClick(button.value)}
              disabled={!button.value}
              className={`
                ${button.value ? 'bg-white/5 hover:bg-white/10' : ''} 
                rounded-xl h-16 flex flex-col items-center justify-center transition-colors
                ${button.value === 'delete' ? 'text-purple-400' : ''}
              `}
            >
              <span className="text-2xl font-medium">{button.label}</span>
              {button.sublabel && (
                <span className="text-xs text-gray-500 mt-0.5">{button.sublabel}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 