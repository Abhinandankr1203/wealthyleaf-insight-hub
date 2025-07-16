import { AppSidebar } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

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
  { period: "1 Year", return: "12%" },
  { period: "3 Years", return: "36%" },
  { period: "5 Years", return: "60%" },
];

const lineData = [
  { month: "Jan", Portfolio: 2, Nifty: 1.5, Sensex: 1.7 },
  { month: "Feb", Portfolio: 2.5, Nifty: 2, Sensex: 2.2 },
  { month: "Mar", Portfolio: 3, Nifty: 2.7, Sensex: 2.8 },
  { month: "Apr", Portfolio: 3.5, Nifty: 3, Sensex: 3.1 },
  { month: "May", Portfolio: 4, Nifty: 3.5, Sensex: 3.7 },
  { month: "Jun", Portfolio: 4.5, Nifty: 4, Sensex: 4.2 },
];

const radarData = [
  { metric: "Return", Portfolio: 4.5, Nifty: 4, Sensex: 4.2 },
  { metric: "Risk", Portfolio: 2, Nifty: 2.5, Sensex: 2.2 },
  { metric: "Volatility", Portfolio: 2.2, Nifty: 2.7, Sensex: 2.5 },
  { metric: "Sharpe", Portfolio: 3.5, Nifty: 3, Sensex: 3.1 },
  { metric: "Alpha", Portfolio: 4, Nifty: 3.5, Sensex: 3.7 },
];

export default function PortfolioPerformance() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Portfolio Performance</h1>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Multi-Line Chart for Performance vs. Benchmarks */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Performance vs. Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Portfolio" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="Nifty" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="Sensex" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Radar Chart for Risk/Return Profile */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Risk/Return Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius={90}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar name="Portfolio" dataKey="Portfolio" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Radar name="Nifty" dataKey="Nifty" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Radar name="Sensex" dataKey="Sensex" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
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
                <th className="px-4 py-2 text-left">Period</th>
                <th className="px-4 py-2 text-left">Return</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{row.period}</td>
                  <td className="px-4 py-2">{row.return}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
} 