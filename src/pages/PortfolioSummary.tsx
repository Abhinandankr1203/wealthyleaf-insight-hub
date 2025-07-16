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
  { category: "Equity", value: "₹20,000", percent: "70%" },
  { category: "Debt", value: "₹5,000", percent: "20%" },
  { category: "Gold", value: "₹3,000", percent: "10%" },
];

const stackedBarData = [
  { month: "Jan", Equity: 12000, Debt: 3000, Gold: 2000 },
  { month: "Feb", Equity: 13000, Debt: 3200, Gold: 2100 },
  { month: "Mar", Equity: 14000, Debt: 3500, Gold: 2200 },
  { month: "Apr", Equity: 15000, Debt: 3700, Gold: 2300 },
  { month: "May", Equity: 16000, Debt: 4000, Gold: 2400 },
  { month: "Jun", Equity: 17000, Debt: 4200, Gold: 2500 },
];

const donutData = [
  { name: "Equity", value: 70, color: "#3B82F6" },
  { name: "Debt", value: 20, color: "#10B981" },
  { name: "Gold", value: 10, color: "#F59E0B" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

export default function PortfolioSummary() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [valueFilter, setValueFilter] = useState("");
  const [percentFilter, setPercentFilter] = useState("");
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(options);
  };
  const filteredData = tableData.filter(row =>
    (categoryFilter === "" || row.category === categoryFilter) &&
    (valueFilter === "" || row.value === valueFilter) &&
    (percentFilter === "" || row.percent === percentFilter)
  );
  const resetFilters = () => {
    setCategoryFilter("");
    setValueFilter("");
    setPercentFilter("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
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
          <h1 className="text-2xl font-bold mb-6">Portfolio Summary</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Stacked Bar Chart for Asset Class Distribution */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Asset Class Distribution by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stackedBarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Equity" stackId="a" fill="#3B82F6" />
                      <Bar dataKey="Debt" stackId="a" fill="#10B981" />
                      <Bar dataKey="Gold" stackId="a" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Donut Chart for Current Asset Split */}
            <Card className="shadow-md rounded-xl w-full max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Current Asset Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donutData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          labelLine={false}
                        >
                          {donutData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    {donutData.map((item) => (
                      <div key={item.name} style={{ display: 'flex', alignItems: 'center', margin: '0 12px', fontSize: 15 }}>
                        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: item.color, marginRight: 6 }}></span>
                        <span style={{ fontWeight: 500 }}>{item.name} {item.value}%</span>
                      </div>
                    ))}
                  </div>
                  {/* Filters and Table */}
                  <div className="w-full mt-8">
                    {/* Single-select filters for all columns */}
                    <div className="mb-4 flex flex-wrap gap-2 items-center justify-center">
                      <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                        <option value="">All Categories</option>
                        {Array.from(new Set(tableData.map(row => row.category))).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <select value={valueFilter} onChange={e => setValueFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[120px]">
                        <option value="">All Values</option>
                        {Array.from(new Set(tableData.map(row => row.value))).map(value => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                      <select value={percentFilter} onChange={e => setPercentFilter(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[100px]">
                        <option value="">All Percents</option>
                        {Array.from(new Set(tableData.map(row => row.percent))).map(percent => (
                          <option key={percent} value={percent}>{percent}</option>
                        ))}
                      </select>
                      <button onClick={resetFilters} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Reset</button>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-left font-bold">Category</th>
                            <th className="p-3 text-left font-bold">Value</th>
                            <th className="p-3 text-left font-bold">Percent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((row, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="p-3">{row.category}</td>
                              <td className="p-3">{row.value}</td>
                              <td className="p-3">{row.percent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 