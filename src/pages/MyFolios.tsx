import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
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
  { folio: "1234567890", name: "HDFC Equity Fund", balance: "₹10,000" },
  { folio: "9876543210", name: "ICICI Bluechip Fund", balance: "₹8,000" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

// Dummy data for charts
const barData = [
  { scheme: "HDFC Equity Fund", balance: 10000 },
  { scheme: "ICICI Bluechip Fund", balance: 8000 },
];

const pieData = [
  { name: "HDFC Equity Fund", value: 55, color: "#3B82F6" },
  { name: "ICICI Bluechip Fund", value: 45, color: "#10B981" },
];

export default function MyFolios() {
  const [selectedFolio, setSelectedFolio] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedBalance, setSelectedBalance] = useState("");

  const filteredData = tableData.filter(row =>
    (selectedFolio === "" || row.folio === selectedFolio) &&
    (selectedName === "" || row.name === selectedName) &&
    (selectedBalance === "" || row.balance === selectedBalance)
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
          <h1 className="text-2xl font-bold mb-6">My Folios</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart for Folio Balances */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Folio Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="scheme" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="balance" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Pie Chart for Folio Distribution by Scheme */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Folio Distribution by Scheme</CardTitle>
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
          <h2 className="text-xl font-bold mb-4">My Folios</h2>
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="shadow-md rounded-xl w-full bg-white p-6">
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <select value={selectedFolio} onChange={e => setSelectedFolio(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Folios</option>
                  {Array.from(new Set(tableData.map(row => row.folio))).map(folio => (
                    <option key={folio} value={folio}>{folio}</option>
                  ))}
                </select>
                <select value={selectedName} onChange={e => setSelectedName(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Schemes</option>
                  {Array.from(new Set(tableData.map(row => row.name))).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <select value={selectedBalance} onChange={e => setSelectedBalance(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Balances</option>
                  {Array.from(new Set(tableData.map(row => row.balance))).map(balance => (
                    <option key={balance} value={balance}>{balance}</option>
                  ))}
                </select>
                <button onClick={() => { setSelectedFolio(""); setSelectedName(""); setSelectedBalance(""); }} className="ml-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Reset</button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-bold">Folio Number</th>
                      <th className="p-3 text-left font-bold">Scheme Name</th>
                      <th className="p-3 text-left font-bold">Current Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3">{row.folio}</td>
                        <td className="p-3">{row.name}</td>
                        <td className="p-3">{row.balance}</td>
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