
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Target, AlertCircle, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";

const InvestorDashboard = () => {
  const navigate = useNavigate();

  const portfolioData = [
    { month: 'Jan', value: 85000 },
    { month: 'Feb', value: 89000 },
    { month: 'Mar', value: 92000 },
    { month: 'Apr', value: 88000 },
    { month: 'May', value: 95000 },
    { month: 'Jun', value: 102000 },
  ];

  const assetAllocation = [
    { name: 'Equity Funds', value: 60, amount: 612000, color: '#3B82F6' },
    { name: 'Debt Funds', value: 25, amount: 255000, color: '#10B981' },
    { name: 'Hybrid Funds', value: 10, amount: 102000, color: '#F59E0B' },
    { name: 'Gold ETF', value: 5, amount: 51000, color: '#EF4444' },
  ];

  const goals = [
    { name: 'Retirement Planning', target: 5000000, current: 1020000, progress: 20.4, timeLeft: '18 years' },
    { name: 'Child Education', target: 2000000, current: 450000, progress: 22.5, timeLeft: '12 years' },
    { name: 'Dream Home', target: 1500000, current: 300000, progress: 20, timeLeft: '8 years' },
  ];

  const recentTransactions = [
    { date: '2024-06-15', fund: 'HDFC Top 100 Fund', type: 'SIP', amount: 5000, status: 'Completed' },
    { date: '2024-06-10', fund: 'Axis Bluechip Fund', type: 'Redemption', amount: -15000, status: 'Completed' },
    { date: '2024-06-05', fund: 'SBI Small Cap Fund', type: 'Purchase', amount: 25000, status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Investor Dashboard</h1>
              <p className="text-gray-600">Welcome back, John Doe</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium">June 20, 2024 • 09:30 AM</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-gray-800">₹10,20,000</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+7.2% (₹68,400)</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Returns</p>
                  <p className="text-2xl font-bold text-green-600">+₹1,68,400</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+19.8% (1Y)</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active SIPs</p>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">₹15,000/month</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Goals Progress</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-blue-600">21% avg. progress</span>
                  </div>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Portfolio Performance Chart */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>6-month portfolio value trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Current portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetAllocation.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3"
                            style={{ backgroundColor: asset.color }}
                          ></div>
                          <span className="text-sm font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{(asset.amount / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-500">{asset.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Holdings Breakdown</CardTitle>
                <CardDescription>Detailed view of your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'HDFC Top 100 Fund', amount: 285000, units: 1250, returns: '+15.2%', nav: 228 },
                    { name: 'Axis Bluechip Fund', amount: 195000, units: 890, returns: '+12.8%', nav: 219 },
                    { name: 'SBI Small Cap Fund', amount: 132000, units: 2200, returns: '+28.5%', nav: 60 },
                    { name: 'ICICI Prudential Balanced Fund', amount: 102000, units: 1580, returns: '+8.9%', nav: 65 },
                  ].map((fund, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{fund.name}</h4>
                        <p className="text-sm text-gray-600">{fund.units} units • NAV: ₹{fund.nav}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(fund.amount / 1000).toFixed(0)}K</p>
                        <Badge variant={fund.returns.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                          {fund.returns}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid gap-6">
              {goals.map((goal, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{goal.name}</h4>
                        <p className="text-sm text-gray-600">{goal.timeLeft} remaining</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="text-lg font-semibold">{goal.progress}%</p>
                      </div>
                    </div>
                    <Progress value={goal.progress} className="mb-4" />
                    <div className="flex justify-between text-sm">
                      <span>Current: ₹{(goal.current / 100000).toFixed(1)}L</span>
                      <span>Target: ₹{(goal.target / 100000).toFixed(1)}L</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{transaction.fund}</h4>
                        <p className="text-sm text-gray-600">{transaction.date} • {transaction.type}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorDashboard;
