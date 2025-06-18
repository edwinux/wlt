"use client";

import { useState, useEffect } from "react";
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
  Search,
  Home,
  BarChart3,
  CreditCard,
  User,
  X,
  Eye,
  EyeOff,
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
import Link from "next/link";
import { useAuth } from "./auth/AuthContext";
import UserMenu from "./components/UserMenu";

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

// All available assets for the add asset screen
const allAssets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500", balance: "0.00" },
  { symbol: "ETH", name: "Ether", icon: "Ξ", color: "bg-purple-500", balance: "0.00" },
  { symbol: "Pepe", name: "Pepe", icon: "🐸", color: "bg-green-500", balance: "0.00" },
  { symbol: "ADA", name: "Cardano", icon: "₳", color: "bg-blue-600", balance: "0.00" },
  { symbol: "SHIB", name: "Shiba Inu", icon: "🐕", color: "bg-orange-600", balance: "0.00" },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "bg-purple-600", balance: "0.00" },
  { symbol: "XRP", name: "XRP", icon: "X", color: "bg-gray-700", balance: "0.00" },
  { symbol: "TETHER", name: "Tether", icon: "₮", color: "bg-green-600", balance: "USDT" },
  { symbol: "DOGE", name: "Doge coin", icon: "Ð", color: "bg-yellow-500", balance: "0.00" },
  { symbol: "AVAX", name: "Avalanche", icon: "A", color: "bg-red-600", balance: "0.00" },
  { symbol: "XRP", name: "XRP", icon: "X", color: "bg-gray-600", balance: "0.00" },
  { symbol: "TETHER", name: "Tether", icon: "₮", color: "bg-green-700", balance: "USDT" },
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

// App icons data
const appIcons = [
  { name: "SupplyChain", icon: "🌈", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { name: "Vouchers", icon: "📋", color: "bg-pink-500" },
  { name: "FIX", icon: "⚙️", color: "bg-gray-700" },
  { name: "win.win", icon: "🌿", color: "bg-green-500" },
  { name: "Jobs", icon: "💼", color: "bg-blue-600" },
  { name: "Identity", icon: "🔐", color: "bg-purple-600" },
];

export default function HomePage() {
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetsVisible, setAssetsVisible] = useState(true);
  const { isAuthenticated, isLoading, user } = useAuth();

  // Debug auth state
  useEffect(() => {
    console.log("HomePage - Auth state:", { isAuthenticated, isLoading, user });
  }, [isAuthenticated, isLoading, user]);

  const filteredAssets = allAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f0b1f] text-white">
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/10">
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
          {isLoading ? null : !isAuthenticated ? (
            <Link 
              href="/auth/welcome" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Log in
            </Link>
          ) : (
            <>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <Send className="w-4 h-4" />
                Send
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <ArrowDownLeft className="w-4 h-4" />
                Receive
              </button>
              <UserMenu />
            </>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3x3 className="w-5 h-5 text-purple-400" />
            <span className="font-semibold">Wallet.app</span>
          </div>
          {isLoading ? null : !isAuthenticated ? (
            <Link 
              href="/auth/welcome" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Log in
            </Link>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Mobile/Desktop Content */}
        <div className="flex-1 p-4 md:p-8 max-w-full md:max-w-none">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full"></div>
              </div>
            </div>
          ) : !isAuthenticated ? (
            /* Logged Out State */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-16 h-16 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Welcome to Wallet.app</h2>
                <p className="text-gray-400 max-w-md">
                  Your secure gateway to manage digital assets. Log in to access your wallet and start trading.
                </p>
              </div>
              <Link 
                href="/auth/welcome" 
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <>
          {/* Balance Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-sm md:text-base">Total balance</span>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">$2,521.44</div>
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-gray-400">$252.14</span>
              <span className="text-green-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                10%
              </span>
            </div>
            
            {/* Chart */}
            <div className="h-32 md:h-48 mt-4 md:mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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

          {/* Assets Grid - Mobile */}
          <div className="mb-8 md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-400 flex items-center gap-2 text-sm">
                My assets
                <button onClick={() => setAssetsVisible(!assetsVisible)}>
                  {assetsVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </h2>
              <button 
                onClick={() => setShowAssetsModal(true)}
                className="text-purple-400 text-sm flex items-center gap-1"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {assets.slice(0, 7).map((asset, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`asset-icon ${asset.color}`}>
                    <span className="text-white text-lg">{asset.icon}</span>
                  </div>
                  <span className="text-xs text-gray-400">{asset.symbol}</span>
                </div>
              ))}
              <button 
                onClick={() => setShowAddAssetModal(true)}
                className="flex flex-col items-center gap-2"
              >
                <div className="asset-icon bg-gray-800 border-2 border-dashed border-gray-600">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-400">Add</span>
              </button>
            </div>

            {/* Load More Button */}
            <button className="w-full mt-4 py-2 text-purple-400 text-sm">
              + Load more
            </button>
          </div>

          {/* Assets Grid - Desktop */}
          <div className="hidden md:block mb-8">
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

          {/* Latest Activity - Desktop Only */}
                      <div className="hidden md:block">
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
            </>
          )}
          </div>

        {/* Right Sidebar - Desktop Only */}
        {!isLoading && isAuthenticated && (
        <div className="hidden md:block w-80 p-8 border-l border-white/10">
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
                {appIcons.map((app, index) => (
                  <div key={index} className="text-center">
                    <div className="glass-card p-4 mb-2">
                      <div className="text-2xl mb-1">{app.icon}</div>
                    </div>
                    <span className="text-xs text-gray-400">{app.name}</span>
                  </div>
                ))}
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
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {!isLoading && isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a2e] border-t border-white/10">
          <div className="flex items-center justify-around py-2">
            <button className="flex flex-col items-center gap-1 p-2 text-purple-400">
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Balance</span>
            </button>
            <button 
              onClick={() => setShowActivityModal(true)}
              className="flex flex-col items-center gap-1 p-2 text-gray-400"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">History</span>
            </button>
            <button 
              onClick={() => setShowAppsModal(true)}
              className="flex flex-col items-center gap-1 p-2 text-gray-400"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">New Capital</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
              <Grid3x3 className="w-5 h-5" />
              <span className="text-xs">Apps</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
              <User className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Assets Arrange Modal */}
      {showAssetsModal && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden">
          <div className="bg-[#1a1a2e] h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-medium">Arrange and sort</h2>
              <button onClick={() => setShowAssetsModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {allAssets.slice(0, 12).map((asset, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500">⋮⋮</div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${asset.color}`}>
                        <span className="text-white">{asset.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                    <button className="text-gray-500">―</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Add Asset Modal */}
      {showAddAssetModal && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden">
          <div className="bg-[#1a1a2e] h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-medium">Add asset</h2>
              <button onClick={() => setShowAddAssetModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium">Crypto</button>
                <button className="bg-white/5 text-gray-400 px-4 py-2 rounded-lg text-sm">Vouchers</button>
                <button className="bg-white/5 text-gray-400 px-4 py-2 rounded-lg text-sm">Tokens</button>
              </div>
              <div className="space-y-3">
                {filteredAssets.map((asset, index) => (
                  <button key={index} className="flex items-center justify-between w-full hover:bg-white/5 p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${asset.color}`}>
                        <span className="text-white">{asset.icon}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-[#1a1a2e] z-50 md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-medium">Latest activity</h2>
            <div className="flex items-center gap-4">
              <button className="text-purple-400 text-sm">See All</button>
              <button onClick={() => setShowActivityModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {activity.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                      {activity.avatar}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      {activity.icon}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{activity.pair}</div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{activity.quantity}</div>
                  <div className="text-sm text-gray-400">{activity.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Apps Modal */}
      {showAppsModal && (
        <div className="fixed inset-0 bg-[#1a1a2e] z-50 md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-medium">Apps</h2>
            <button onClick={() => setShowAppsModal(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            {/* New Capital Card */}
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🎭</span>
                </div>
                <div>
                  <div className="font-medium">New Capital</div>
                  <div className="text-xs text-gray-400">Popular</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Invest in tokenized assets securely with blockchain transparency
              </p>
              <div className="h-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg"></div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-3 gap-4">
              {appIcons.map((app, index) => (
                <div key={index} className="text-center">
                  <div className={`glass-card p-4 mb-2 ${app.color}`}>
                    <div className="text-2xl">{app.icon}</div>
                  </div>
                  <span className="text-xs text-gray-400">{app.name}</span>
                </div>
              ))}
            </div>

            {/* Bottom Price Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="glass-card p-4 bg-gradient-to-br from-orange-900/20 to-orange-600/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    ₿
                  </div>
                  <span className="text-sm text-gray-400">BTC</span>
                </div>
                <div className="text-xl font-bold">$78,696.25</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </div>
                <div className="h-12 mt-2">
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    ₳
                  </div>
                  <span className="text-sm text-gray-400">ADA</span>
                </div>
                <div className="text-xl font-bold">$0.7201</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
