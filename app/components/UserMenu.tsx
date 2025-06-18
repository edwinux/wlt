"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { 
  MoreVertical, 
  User, 
  Settings, 
  Wallet, 
  Shield, 
  CreditCard,
  LogOut,
  ChevronDown
} from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const menuItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Wallet, label: "Wallet Settings", href: "/settings/wallet" },
    { icon: Shield, label: "Security", href: "/settings/security" },
    { icon: CreditCard, label: "Payment Methods", href: "/settings/payment" },
    { icon: Settings, label: "General Settings", href: "/settings" },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm hidden md:block">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-400 text-xs">{user.email}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl z-50">
          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-white/10 py-2">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors w-full text-left text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 