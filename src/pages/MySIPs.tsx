import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

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
  { label: "Insurance", path: "/dashboard/insurance" },
  { label: "My SIP's", path: "/dashboard/my-sips" },
  { label: "My Folios", path: "/dashboard/my-folios" },
  { label: "Goal Planner", path: "/dashboard/goal-planner" },
  { label: "Invest Online NSE", path: "/dashboard/invest-online-nse" },
  { label: "Invest Online MFU", path: "/dashboard/invest-online-mfu" },
  { label: "My Documents", path: "/dashboard/my-documents" },
  { label: "Risk Profiling", path: "/dashboard/risk-profiling" },
  { label: "Watchlist", path: "/dashboard/watchlist" },
];

const dummyData = [
  { scheme: "HDFC Equity Fund", amount: "₹2,000", date: "2024-06-05", status: "Active" },
  { scheme: "ICICI Bluechip Fund", amount: "₹1,500", date: "2024-06-10", status: "Paused" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

// Dummy data for charts
const lineData = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 4500 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 5200 },
  { month: "May", amount: 4800 },
  { month: "Jun", amount: 5300 },
];

const pieData = [
  { name: "Active", value: 60, color: "#10B981" },
  { name: "Paused", value: 30, color: "#F59E0B" },
  { name: "Cancelled", value: 10, color: "#EF4444" },
];

export default function MySIPs() {
  const [selectedScheme, setSelectedScheme] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredData = tableData.filter(row =>
    (selectedScheme === "" || row.scheme === selectedScheme) &&
    (selectedAmount === "" || row.amount === selectedAmount) &&
    (selectedDate === "" || row.date === selectedDate) &&
    (selectedStatus === "" || row.status === selectedStatus)
  );

  return (
    <div className="flex min-h-screen bg-blue-50">
      <AppSidebar items={sidebarItems} />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header Bar */}
        <header className="header-bar flex items-center justify-between px-6 py-3 mb-6">
          <div />
          <div className="flex items-center gap-3">
            <User className="text-teal-600" />
            <span className="font-semibold">{user.name}</span>
            <button className="relative">
              <Bell className="text-teal-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
            <button className="flex items-center gap-1 text-teal-600 hover:text-teal-800">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">My SIP's</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Line Chart for SIP Investment Over Time */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">SIP Investment Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} name="SIP Amount" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Pie Chart for SIP Status Distribution */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">SIP Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          labelLine={false}
                        >
                          {pieData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Table Section */}
          <h2 className="text-xl font-bold mb-4">My SIPs</h2>
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="shadow-md rounded-xl w-full bg-white p-6">
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <select value={selectedScheme} onChange={e => setSelectedScheme(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Schemes</option>
                  {Array.from(new Set(tableData.map(row => row.scheme))).map(scheme => (
                    <option key={scheme} value={scheme}>{scheme}</option>
                  ))}
                </select>
                <select value={selectedAmount} onChange={e => setSelectedAmount(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Amounts</option>
                  {Array.from(new Set(tableData.map(row => row.amount))).map(amount => (
                    <option key={amount} value={amount}>{amount}</option>
                  ))}
                </select>
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Dates</option>
                  {Array.from(new Set(tableData.map(row => row.date))).map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Statuses</option>
                  {Array.from(new Set(tableData.map(row => row.status))).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button onClick={() => { setSelectedScheme(""); setSelectedAmount(""); setSelectedDate(""); setSelectedStatus(""); }} className="ml-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Reset</button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-bold">Scheme</th>
                      <th className="p-3 text-left font-bold">Amount</th>
                      <th className="p-3 text-left font-bold">Date</th>
                      <th className="p-3 text-left font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3">{row.scheme}</td>
                        <td className="p-3">{row.amount}</td>
                        <td className="p-3">{row.date}</td>
                        <td className="p-3">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}