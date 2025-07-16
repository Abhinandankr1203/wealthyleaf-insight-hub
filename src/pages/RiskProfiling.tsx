import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";

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
  { question: "Investment Experience", answer: "5 years" },
  { question: "Risk Appetite", answer: "Moderate" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

export default function RiskProfiling() {
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
          <h1 className="text-2xl font-bold mb-6">Risk Profiling</h1>
          <div className="table-container">
            {isLoading ? (
              <div className="animate-pulse h-32 bg-slate-100 rounded" />
            ) : tableData.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No data available</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td>{row.question}</td>
                      <td>{row.answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 