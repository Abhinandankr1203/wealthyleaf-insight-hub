import { AppSidebar } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

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
  { date: "2024-06-01", value: "₹1,00,000" },
  { date: "2024-06-15", value: "₹1,10,000" },
];

// Dummy data for charts
const barData = [
  { asset: "Equity", value: 70000 },
  { asset: "Debt", value: 25000 },
  { asset: "Gold", value: 10000 },
];

const pieData = [
  { name: "Equity", value: 70, color: "#3B82F6" },
  { name: "Debt", value: 25, color: "#10B981" },
  { name: "Gold", value: 5, color: "#F59E0B" },
];

export default function PortfolioSnapshot() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Portfolio Snapshot</h1>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart for Value by Asset/Fund */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Snapshot Value by Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="asset" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Pie Chart for Allocation at Snapshot Date */}
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Allocation at Snapshot Date</CardTitle>
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
        </div>
      </main>
    </div>
  );
}