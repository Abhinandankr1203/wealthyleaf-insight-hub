import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";
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
  { scheme: "HDFC Equity Fund", value: "₹10,000", units: 100, nav: "₹100", gain: "+5%" },
  { scheme: "ICICI Bluechip Fund", value: "₹8,000", units: 80, nav: "₹100", gain: "+3%" },
  { scheme: "Axis Midcap Fund", value: "₹6,000", units: 60, nav: "₹100", gain: "+2%" },
];

const valueTrendData = [
  { month: "Jan", value: 22000 },
  { month: "Feb", value: 25000 },
  { month: "Mar", value: 27000 },
  { month: "Apr", value: 30000 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 35000 },
];

const growthData = [
  { period: "Q1", growth: 12 },
  { period: "Q2", growth: 8 },
  { period: "Q3", growth: 15 },
  { period: "Q4", growth: 10 },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false; // set to true to show skeleton
const tableData = dummyData; // set to [] for empty state

export default function PortfolioValuation() {
  const [schemeFilter, setSchemeFilter] = useState("");
  const [valueFilter, setValueFilter] = useState("");
  const [unitsFilter, setUnitsFilter] = useState("");
  const [navFilter, setNavFilter] = useState("");
  const [gainFilter, setGainFilter] = useState("");
  const filteredData = tableData.filter(row =>
    (schemeFilter === "" || row.scheme === schemeFilter) &&
    (valueFilter === "" || row.value === valueFilter) &&
    (unitsFilter === "" || String(row.units) === unitsFilter) &&
    (navFilter === "" || row.nav === navFilter) &&
    (gainFilter === "" || row.gain === gainFilter)
  );
  const resetFilters = () => {
    setSchemeFilter("");
    setValueFilter("");
    setUnitsFilter("");
    setNavFilter("");
    setGainFilter("");
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header Bar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-3 mb-6">
          <div className="flex items-center gap-3">
            <User className="text-teal-600" />
            <span className="font-semibold">{user.name}</span>
          </div>
          <div className="flex items-center gap-4">
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
          <h1 className="text-2xl font-bold mb-6">Portfolio Valuation</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Area/Line Chart for Value Trend */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Portfolio Value Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valueTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#dbeafe" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Bar Chart for Growth */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Quarterly Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="growth" fill="#10B981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Table Section */}
          <div className="table-container">
            {/* Single-select filters for all columns */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <select value={schemeFilter} onChange={e => setSchemeFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                <option value="">All Schemes</option>
                {Array.from(new Set(tableData.map(row => row.scheme))).map(scheme => (
                  <option key={scheme} value={scheme}>{scheme}</option>
                ))}
              </select>
              <select value={valueFilter} onChange={e => setValueFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[120px]">
                <option value="">All Values</option>
                {Array.from(new Set(tableData.map(row => row.value))).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
              <select value={unitsFilter} onChange={e => setUnitsFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[100px]">
                <option value="">All Units</option>
                {Array.from(new Set(tableData.map(row => String(row.units)))).map(units => (
                  <option key={units} value={units}>{units}</option>
                ))}
              </select>
              <select value={navFilter} onChange={e => setNavFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[100px]">
                <option value="">All NAVs</option>
                {Array.from(new Set(tableData.map(row => row.nav))).map(nav => (
                  <option key={nav} value={nav}>{nav}</option>
                ))}
              </select>
              <select value={gainFilter} onChange={e => setGainFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[100px]">
                <option value="">All Gains</option>
                {Array.from(new Set(tableData.map(row => row.gain))).map(gain => (
                  <option key={gain} value={gain}>{gain}</option>
                ))}
              </select>
              <button onClick={resetFilters} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Reset</button>
            </div>
            {isLoading ? (
              <div className="animate-pulse h-32 bg-slate-100 rounded" />
            ) : filteredData.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No data available</div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-bold">Scheme</th>
                      <th className="p-3 text-left font-bold">Value</th>
                      <th className="p-3 text-left font-bold">Units</th>
                      <th className="p-3 text-left font-bold">NAV</th>
                      <th className="p-3 text-left font-bold">Gain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3">{row.scheme}</td>
                        <td className="p-3">{row.value}</td>
                        <td className="p-3">{row.units}</td>
                        <td className="p-3">{row.nav}</td>
                        <td className="p-3">{row.gain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 