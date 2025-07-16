import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
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
  { policy: "Life Insurance", provider: "LIC", sum: "₹10,00,000", status: "Active" },
  { policy: "Health Insurance", provider: "HDFC Ergo", sum: "₹5,00,000", status: "Active" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

export default function Insurance() {
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedSum, setSelectedSum] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredData = tableData.filter(row =>
    (selectedPolicy === "" || row.policy === selectedPolicy) &&
    (selectedProvider === "" || row.provider === selectedProvider) &&
    (selectedSum === "" || row.sum === selectedSum) &&
    (selectedStatus === "" || row.status === selectedStatus)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
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
          <h1 className="text-2xl font-bold mb-6">Insurance</h1>
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="shadow-md rounded-xl w-full bg-white p-6">
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <select value={selectedPolicy} onChange={e => setSelectedPolicy(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Policies</option>
                  {Array.from(new Set(tableData.map(row => row.policy))).map(policy => (
                    <option key={policy} value={policy}>{policy}</option>
                  ))}
                </select>
                <select value={selectedProvider} onChange={e => setSelectedProvider(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Providers</option>
                  {Array.from(new Set(tableData.map(row => row.provider))).map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
                <select value={selectedSum} onChange={e => setSelectedSum(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Sums</option>
                  {Array.from(new Set(tableData.map(row => row.sum))).map(sum => (
                    <option key={sum} value={sum}>{sum}</option>
                  ))}
                </select>
                <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="p-2 rounded border border-gray-300 min-w-[140px]">
                  <option value="">All Statuses</option>
                  {Array.from(new Set(tableData.map(row => row.status))).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button onClick={() => { setSelectedPolicy(""); setSelectedProvider(""); setSelectedSum(""); setSelectedStatus(""); }} className="ml-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">Reset</button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left font-bold">Policy</th>
                      <th className="p-3 text-left font-bold">Provider</th>
                      <th className="p-3 text-left font-bold">Sum Insured</th>
                      <th className="p-3 text-left font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3">{row.policy}</td>
                        <td className="p-3">{row.provider}</td>
                        <td className="p-3">{row.sum}</td>
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