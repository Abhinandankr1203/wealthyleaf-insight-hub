import { AppSidebar } from "@/components/ui/sidebar";
import { Bell, LogOut, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, LabelList } from "recharts";

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
  { goal: "Retirement", target: "₹1,00,00,000", achieved: "₹10,00,000", status: "In Progress" },
  { goal: "Child Education", target: "₹50,00,000", achieved: "₹5,00,000", status: "In Progress" },
];

const user = { name: "Ankita Agarwal", avatar: "/logo.svg" };
const isLoading = false;
const tableData = dummyData;

// Dummy data for charts
const milestonesData = [
  { year: "2022", milestone: "Started Goal Planning" },
  { year: "2023", milestone: "Reached 10%" },
  { year: "2024", milestone: "Reached 20%" },
];

const barData = [
  { goal: "Retirement", achieved: 10, target: 100 },
  { goal: "Child Education", achieved: 5, target: 50 },
];

export default function GoalPlanner() {
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
          <h1 className="text-2xl font-bold mb-6">Goal Planner</h1>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Timeline/Step Chart for Milestones */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Milestones Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={milestonesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="year" />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="year" fill="#3B82F6">
                        <LabelList dataKey="milestone" position="top" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            {/* Bar Chart for Goal Achievement vs. Target */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Goal Achievement vs. Target (₹L)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="goal" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="achieved" fill="#10B981" name="Achieved" />
                      <Bar dataKey="target" fill="#3B82F6" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Table Section */}
          <div className="table-container">
            {isLoading ? (
              <div className="animate-pulse h-32 bg-slate-100 rounded" />
            ) : tableData.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No data available</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Target Amount</th>
                    <th>Achieved</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td>{row.goal}</td>
                      <td>{row.target}</td>
                      <td>{row.achieved}</td>
                      <td>{row.status}</td>
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