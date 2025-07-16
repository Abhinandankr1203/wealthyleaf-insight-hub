import { AppSidebar } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, LabelList } from "recharts";

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
  { year: "2020", invested: "₹50,000", value: "₹60,000" },
  { year: "2021", invested: "₹70,000", value: "₹85,000" },
  { year: "2022", invested: "₹90,000", value: "₹1,10,000" },
];

const milestonesData = [
  { year: "2020", milestone: "Started SIP" },
  { year: "2021", milestone: "Crossed ₹1L" },
  { year: "2022", milestone: "Goal Achieved" },
];

const cumulativeData = [
  { year: "2020", invested: 50000 },
  { year: "2021", invested: 120000 },
  { year: "2022", invested: 210000 },
];

export default function InvestmentJourney() {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Investment Journey</h1>
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
          {/* Line Chart for Cumulative Investment */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Cumulative Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cumulativeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="invested" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
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
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Invested</th>
                <th className="px-4 py-2 text-left">Current Value</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{row.year}</td>
                  <td className="px-4 py-2">{row.invested}</td>
                  <td className="px-4 py-2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
} 