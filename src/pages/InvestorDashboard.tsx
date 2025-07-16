import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { AppSidebar } from "@/components/ui/sidebar";
import { LogOut, User, PlusCircle, TrendingUp, Target } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard/investor" },
  { label: "Report", sub: [
    { label: "Portfolio Valuation", path: "/dashboard/report/portfolio-valuation" },
    { label: "Portfolio Summary", path: "/dashboard/report/portfolio-summary" },
    { label: "Asset Allocation", path: "/dashboard/report/asset-allocation" },
    { label: "Capital Gain Realized", path: "/dashboard/report/capital-gain-realized" },
    { label: "Capital Gain Unrealized", path: "/dashboard/report/capital-gain-unrealized" },
    { label: "Profit & Loss", path: "/dashboard/report/profit-loss" },
    { label: "Portfolio Performance", path: "/dashboard/report/portfolio-performance" },
    { label: "Investment Journey", path: "/dashboard/report/investment-journey" },
    { label: "Portfolio Rebalancing", path: "/dashboard/report/portfolio-rebalancing" },
    { label: "Portfolio Snapshot", path: "/dashboard/report/portfolio-snapshot" },
    { label: "Transaction Report", path: "/dashboard/report/transaction-report" },
  ]},
  { label: "Transactions Entry", path: "/dashboard/transactions-entry" },
  { label: "My SIP's", path: "/dashboard/my-sips" },
  { label: "My Folios", path: "/dashboard/my-folios" },
  { label: "Goal Planner", path: "/dashboard/goal-planner" },
  { label: "Invest Online NSE", path: "/dashboard/invest-online-nse" },
  { label: "Invest Online MFU", path: "/dashboard/invest-online-mfu" },
  { label: "My Documents", path: "/dashboard/my-documents" },
  { label: "Risk Profiling", path: "/dashboard/risk-profiling" },
  { label: "Watchlist", path: "/dashboard/watchlist" },
];

const kpiCards = [
  { label: "Portfolio Value", value: "₹ 1,25,000", icon: <TrendingUp className="text-teal-600" /> },
  { label: "Invested Amount", value: "₹ 1,00,000", icon: <PlusCircle className="text-blue-600" /> },
  { label: "Total Gain/Loss", value: "+₹ 25,000", icon: <TrendingUp className="text-green-600" /> },
  { label: "Today's Change", value: "+₹ 1,200", icon: <TrendingUp className="text-indigo-600" /> },
  { label: "Annualized Return", value: "12.5%", icon: <Target className="text-yellow-600" /> },
];

const allocationData = [
  { name: "Debt", value: 9.8, color: "#10B981" },
  { name: "Equity", value: 88.1, color: "#3B82F6" },
  { name: "Global Equity", value: 0.1, color: "#6366F1" },
  { name: "Gold", value: 0.8, color: "#F59E0B" },
  { name: "Other", value: 1.2, color: "#6B7280" },
];

const performanceData = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 105000 },
  { date: "Mar", value: 110000 },
  { date: "Apr", value: 112000 },
  { date: "May", value: 120000 },
  { date: "Jun", value: 125000 },
];

const recentTransactions = [
  { date: "2024-06-20", type: "Buy", scheme: "HDFC Equity Fund", amount: "₹5,000" },
  { date: "2024-06-18", type: "Sell", scheme: "ICICI Bluechip Fund", amount: "₹2,000" },
  { date: "2024-06-15", type: "Buy", scheme: "Axis Midcap Fund", amount: "₹3,000" },
  { date: "2024-06-10", type: "Dividend", scheme: "HDFC Equity Fund", amount: "₹500" },
  { date: "2024-06-05", type: "Buy", scheme: "SBI Small Cap Fund", amount: "₹4,000" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };

// Mock notifications data
const mockNotifications = [
  { id: 1, title: "Portfolio Update", message: "Your portfolio value has increased by 2.5%", time: "2 hours ago", read: false },
  { id: 2, title: "SIP Reminder", message: "Your monthly SIP of ₹5,000 is due tomorrow", time: "4 hours ago", read: false },
  { id: 3, title: "Market Alert", message: "Nifty 50 has crossed 22,000 mark", time: "6 hours ago", read: false },
];

export default function InvestorDashboard() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleLogout = () => {
    toast({ 
      title: "Logged Out", 
      description: "You have been successfully logged out." 
    });
    logout();
    // The AuthContext will handle redirecting to the login page
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Wealthyleaf Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-teal-700">Wealthyleaf</span>
          </div>
          <div className="text-lg font-medium text-gray-700">Welcome back, {user.name}!</div>
          <div className="flex items-center gap-4">
            <NotificationDropdown 
              notifications={notifications}
              onNotificationsChange={setNotifications}
            />
            <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-teal-500" />
            <button className="flex items-center gap-1 text-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" aria-label="Logout" onClick={handleLogout}>
              <LogOut size={18} aria-hidden="true" /> Logout
            </button>
          </div>
        </header>
        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8 pt-6">
          {kpiCards.map((card) => (
            <Card key={card.label} className="shadow-md hover:shadow-lg transition rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-500">{card.label}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8">
          {/* Left: Charts */}
          <div className="flex flex-col gap-8">
            {/* Portfolio Allocation Pie Chart */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={allocationData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          labelLine={false}
                        >
                          {allocationData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    {allocationData.map((item) => (
                      <div key={item.name} style={{ display: 'flex', alignItems: 'center', margin: '0 12px', fontSize: 15 }}>
                        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: item.color, marginRight: 6 }}></span>
                        <span style={{ fontWeight: 500 }}>{item.name} {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Performance Line Chart */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Right: Actions, Goal, Transactions */}
          <div className="flex flex-col gap-8">
            {/* Quick Actions */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" aria-label="Add Investment"><PlusCircle aria-hidden="true" /> Add Investment</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Rebalance"><TrendingUp aria-hidden="true" /> Rebalance</Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500" aria-label="Set Goal"><Target aria-hidden="true" /> Set Goal</Button>
                </div>
              </CardContent>
            </Card>
            {/* Goal Progress */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-gray-700">Retirement Fund</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div className="bg-teal-500 h-4 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹6,00,000 / ₹10,00,000</span>
                  <span>60% achieved</span>
                </div>
              </CardContent>
            </Card>
            {/* Recent Transactions */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Scheme</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((row, idx) => (
                        <tr key={idx} className="border-b hover:bg-slate-50">
                          <td className="px-4 py-2 whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.type}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.scheme}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}