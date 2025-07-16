import { AppSidebar } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
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
  { scheme: "HDFC Equity Fund", gain: "₹1,000", year: "2023-24" },
  { scheme: "ICICI Bluechip Fund", gain: "₹500", year: "2023-24" },
];

const barData = [
  { year: "2020-21", HDFC: 200, ICICI: 100 },
  { year: "2021-22", HDFC: 400, ICICI: 200 },
  { year: "2022-23", HDFC: 700, ICICI: 350 },
  { year: "2023-24", HDFC: 1000, ICICI: 500 },
];

const lineData = [
  { year: "2020-21", cumulative: 300 },
  { year: "2021-22", cumulative: 900 },
  { year: "2022-23", cumulative: 1950 },
  { year: "2023-24", cumulative: 3450 },
];

export default function CapitalGainRealized() {
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const handleSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedSchemes(options);
  };
  const filteredData = selectedSchemes.length === 0 ? dummyData : dummyData.filter(row => selectedSchemes.includes(row.scheme));
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Capital Gain Realized</h1>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart for Realized Gains by Year/Fund */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Realized Gains by Year/Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="HDFC" fill="#3B82F6" />
                    <Bar dataKey="ICICI" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Line Chart for Cumulative Realized Gains */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Cumulative Realized Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cumulative" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded shadow p-4">
          {/* Multi-select filter dropdown for Scheme */}
          <div className="mb-4 flex items-center gap-2">
            <select multiple value={selectedSchemes} onChange={handleSchemeChange} className="p-2 rounded border border-gray-300 min-w-[220px] h-24">
              {Array.from(new Set(dummyData.map(row => row.scheme))).map(scheme => (
                <option key={scheme} value={scheme}>{scheme}</option>
              ))}
            </select>
            <button onClick={() => setSelectedSchemes([])} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Clear</button>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left font-bold">Scheme</th>
                  <th className="p-3 text-left font-bold">Gain</th>
                  <th className="p-3 text-left font-bold">Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">{row.scheme}</td>
                    <td className="p-3">{row.gain}</td>
                    <td className="p-3">{row.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 