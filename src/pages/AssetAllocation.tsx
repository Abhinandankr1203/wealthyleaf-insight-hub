import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Treemap } from "recharts";
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
  { asset: "Equity", allocation: "70%" },
  { asset: "Debt", allocation: "20%" },
  { asset: "Gold", allocation: "10%" },
];

const pieData = [
  { name: "Equity", value: 70, color: "#3B82F6" },
  { name: "Debt", value: 20, color: "#10B981" },
  { name: "Gold", value: 10, color: "#F59E0B" },
];

const treemapData = [
  { name: "Equity", children: [
    { name: "Large Cap", size: 40 },
    { name: "Mid Cap", size: 20 },
    { name: "Small Cap", size: 10 },
  ]},
  { name: "Debt", children: [
    { name: "Corporate Bonds", size: 10 },
    { name: "Government Bonds", size: 10 },
  ]},
  { name: "Gold", size: 10 },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

const handleMultiSelect = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setter: (value: string[]) => void
) => {
  const options = Array.from(
    event.target.selectedOptions,
    (option) => (option as HTMLOptionElement).value
  );
  setter(options);
};

export default function AssetAllocation() {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedAssets(options);
  };
  const filteredData = selectedAssets.length === 0 ? tableData : tableData.filter(row => selectedAssets.includes(row.asset));

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
          <h1 className="text-2xl font-bold mb-6">Asset Allocation</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart for High-Level Allocation */}
            <Card className="shadow-md rounded-xl w-full">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">High-Level Allocation</CardTitle>
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
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    {pieData.map((item) => (
                      <div key={item.name} style={{ display: 'flex', alignItems: 'center', margin: '0 12px', fontSize: 15 }}>
                        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: item.color, marginRight: 6 }}></span>
                        <span style={{ fontWeight: 500 }}>{item.name} {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Asset Allocation Table - aligned with chart */}
            <Card className="shadow-md rounded-xl w-full">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Asset Allocation Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4 justify-center">
                  {/* Multi-select filter dropdown for Asset */}
                  <select multiple value={selectedAssets} onChange={handleAssetChange} className="p-2 rounded border border-gray-300 min-w-[220px] h-24">
                    {Array.from(new Set(tableData.map(row => row.asset))).map(asset => (
                      <option key={asset} value={asset}>{asset}</option>
                    ))}
                  </select>
                  <button onClick={() => setSelectedAssets([])} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Clear</button>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-bold">Category</th>
                        <th className="p-3 text-left font-bold">Percent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="p-3">{row.asset}</td>
                          <td className="p-3">{row.allocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}