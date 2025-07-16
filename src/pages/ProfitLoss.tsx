import { AppSidebar } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

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
  { scheme: "HDFC Equity Fund", profit: "₹1,500", loss: "₹200" },
  { scheme: "ICICI Bluechip Fund", profit: "₹1,000", loss: "₹100" },
];

const waterfallData = [
  { label: "Start", profit: 0, loss: 0, net: 0 },
  { label: "HDFC Equity Fund", profit: 1500, loss: 200, net: 1300 },
  { label: "ICICI Bluechip Fund", profit: 1000, loss: 100, net: 900 },
  { label: "Total", profit: 0, loss: 0, net: 2200 },
];

const lineData = [
  { month: "Jan", pnl: 500 },
  { month: "Feb", pnl: 700 },
  { month: "Mar", pnl: 900 },
  { month: "Apr", pnl: 1100 },
  { month: "May", pnl: 1300 },
  { month: "Jun", pnl: 2200 },
];

export default function ProfitLoss() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Profit & Loss</h1>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Waterfall (Stacked Bar) Chart for Profit/Loss Breakdown */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Profit/Loss Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterfallData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" stackId="a" fill="#10B981" />
                    <Bar dataKey="loss" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Line Chart for Net P&L Trend */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Net P&L Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pnl" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded shadow p-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Scheme</th>
                <th className="px-4 py-2 text-left">Profit</th>
                <th className="px-4 py-2 text-left">Loss</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{row.scheme}</td>
                  <td className="px-4 py-2">{row.profit}</td>
                  <td className="px-4 py-2">{row.loss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
} 