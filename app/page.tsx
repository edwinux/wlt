"use client";

import { useState } from "react";
import {
  Send,
  ArrowDownLeft,
  TrendingUp,
  Grid3x3,
  Menu,
  Plus,
  ArrowUpRight,
  MoreVertical,
  SortAsc,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample chart data
const chartData = [
  { name: "Jan", value: 2100 },
  { name: "Feb", value: 2200 },
  { name: "Mar", value: 2150 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 2300 },
  { name: "Jun", value: 2521 },
];

// Asset data
const assets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-yellow-500" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-blue-500" },
  { symbol: "BTC", name: "Bitcoin", icon: "🦊", color: "bg-orange-600" },
  { symbol: "BTC", name: "Bitcoin", icon: "≋", color: "bg-cyan-600" },
  { symbol: "ADA", name: "Cardano", icon: "₳", color: "bg-blue-600" },
  { symbol: "Pepe", name: "Pepe", icon: "🐸", color: "bg-green-500" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "bg-purple-500" },
  { symbol: "TWINS", name: "Twins", icon: "∞", color: "bg-gradient-to-r from-green-500 to-red-500" },
  { symbol: "FIX", name: "Fix", icon: "FIX", color: "bg-purple-600" },
  { symbol: "FIX", name: "Fix", icon: "FIX", color: "bg-green-600" },
  { symbol: "FIX", name: "Fix", icon: "🦊", color: "bg-orange-500" },
  { symbol: "FIX", name: "Fix", icon: "FIX", color: "bg-gray-700" },
];

// Activity data
const activities = [
  {
    id: 1,
    type: "Send",
    pair: "James Doe",
    time: "Today 8:43 pm",
    quantity: "-ADA 200.00",
    price: "-€200.00",
    avatar: "JD",
  },
  {
    id: 2,
    type: "Trade",
    pair: "ADA > EUR",
    time: "Today 8:43 pm",
    quantity: "-ADA 200.00",
    price: "-€200.00",
    icon: "₳",
  },
  {
    id: 3,
    type: "Trade",
    pair: "ADA > EUR",
    time: "Today 8:43 pm",
    quantity: "-ADA 200.00",
    price: "-€200.00",
    icon: "₳",
  },
];

export default function HomePage() {
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-semibold">Wallet.app</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-purple-400">
              <Menu className="w-4 h-4" />
              Wallet
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              Market
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <span className="text-gray-400">🎭</span>
              New Capital
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <Send className="w-4 h-4" />
            Send
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <ArrowDownLeft className="w-4 h-4" />
            Receive
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=James+Doe&background=6366f1&color=fff"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <div className="font-medium">James Doe</div>
              <div className="text-gray-400 text-xs">james@gmail.com</div>
            </div>
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Section */}
        <div className="flex-1 p-8">
          {/* Balance Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span>Total balance</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded">⭕</span>
            </div>
            <div className="text-5xl font-bold mb-2">$2,521.44</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">$252.14</span>
              <span className="text-green-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                10%
              </span>
            </div>
            
            {/* Chart */}
            <div className="h-48 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assets Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-400 flex items-center gap-2">
                My assets
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded">👁</span>
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <SortAsc className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-400">Sort</span>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-400">Add</span>
              </div>
            </div>
            
            <div className="grid grid-cols-8 gap-4">
              {assets.map((asset, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`asset-icon ${asset.color}`}>
                    <span className="text-white">{asset.icon}</span>
                  </div>
                  <span className="text-xs text-gray-400">{asset.symbol}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <div className="asset-icon border-2 border-dashed border-gray-600 bg-transparent">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-400">Add</span>
              </div>
            </div>
          </div>

          {/* Latest Activity */}
          <div>
            <h2 className="text-gray-400 mb-4">Latest activity</h2>
            <div className="glass-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                    <th className="p-4">Pair</th>
                    <th className="p-4">Time</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {activity.avatar ? (
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm">
                              {activity.avatar}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">
                              {activity.icon}
                            </div>
                          )}
                          <span>{activity.pair}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{activity.time}</td>
                      <td className="p-4">{activity.type}</td>
                      <td className="p-4">{activity.quantity}</td>
                      <td className="p-4 text-right">{activity.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-8 border-l border-white/10">
          {/* Apps Section */}
          <div className="mb-8">
            <h3 className="text-gray-400 mb-4">Apps</h3>
            <div className="space-y-4">
              <div className="glass-card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white">🎭</span>
                  </div>
                  <span className="font-medium">New Capital</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">Popular</div>
                <p className="text-sm mb-3">
                  Invest in tokenized assets securely with blockchain transparency
                </p>
                <div className="h-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg"></div>
              </div>
              
              {/* Other Apps */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">🌈</div>
                  </div>
                  <span className="text-xs text-gray-400">SupplyChain</span>
                </div>
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">📋</div>
                  </div>
                  <span className="text-xs text-gray-400">Vouchers</span>
                </div>
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">🔧</div>
                  </div>
                  <span className="text-xs text-gray-400">FIX</span>
                </div>
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">🌿</div>
                  </div>
                  <span className="text-xs text-gray-400">win.win</span>
                </div>
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">💼</div>
                  </div>
                  <span className="text-xs text-gray-400">Jobs</span>
                </div>
                <div className="text-center">
                  <div className="glass-card p-4 mb-2">
                    <div className="text-2xl mb-1">🔐</div>
                  </div>
                  <span className="text-xs text-gray-400">Identity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Cards */}
          <div className="space-y-4">
            <div className="glass-card p-4 bg-gradient-to-br from-orange-900/20 to-orange-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    ₿
                  </div>
                  <span className="text-sm text-gray-400">BTC</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$78,696.25</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-4 bg-gradient-to-br from-blue-900/20 to-blue-600/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    ₳
                  </div>
                  <span className="text-sm text-gray-400">ADA</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">$0.7201</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
