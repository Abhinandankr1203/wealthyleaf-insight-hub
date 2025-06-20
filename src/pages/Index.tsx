import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  BarChart3, 
  PieChart,
  Plus,
  Minus,
  Eye,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  Leaf
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [portfolioValue, setPortfolioValue] = useState(125000);
  const [dailyChange, setDailyChange] = useState(1250);
  const [isPositive, setIsPositive] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [autoInvest, setAutoInvest] = useState(true);
  const [riskLevel, setRiskLevel] = useState("moderate");

  // Mock data for charts
  const portfolioData = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 105000 },
    { name: 'Mar', value: 110000 },
    { name: 'Apr', value: 115000 },
    { name: 'May', value: 120000 },
    { name: 'Jun', value: 125000 },
  ];

  const assetAllocation = [
    { name: 'Stocks', value: 45, color: '#3B82F6' },
    { name: 'Bonds', value: 25, color: '#10B981' },
    { name: 'Real Estate', value: 20, color: '#F59E0B' },
    { name: 'Cash', value: 10, color: '#EF4444' },
  ];

  const recentTransactions = [
    { id: 1, type: 'buy', asset: 'AAPL', amount: 1500, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'sell', asset: 'GOOGL', amount: 2200, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'buy', asset: 'TSLA', amount: 800, date: '2024-01-13', status: 'pending' },
    { id: 4, type: 'dividend', asset: 'MSFT', amount: 150, date: '2024-01-12', status: 'completed' },
  ];

  const investmentGoals = [
    { id: 1, name: 'Emergency Fund', target: 10000, current: 8500, deadline: '2024-06-01' },
    { id: 2, name: 'Vacation Fund', target: 5000, current: 3200, deadline: '2024-08-01' },
    { id: 3, name: 'Retirement', target: 1000000, current: 125000, deadline: '2040-01-01' },
  ];

  const marketInsights = [
    { id: 1, title: 'Tech Sector Rally Continues', impact: 'positive', confidence: 85 },
    { id: 2, title: 'Fed Rate Decision Expected', impact: 'neutral', confidence: 70 },
    { id: 3, title: 'Oil Prices Volatile', impact: 'negative', confidence: 60 },
  ];

  useEffect(() => {
    // Simulate real-time portfolio updates
    const interval = setInterval(() => {
      const change = Math.random() * 2000 - 1000;
      setPortfolioValue(prev => prev + change);
      setDailyChange(change);
      setIsPositive(change >= 0);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WealthyLeaf</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Pro Plan
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Portfolio Value
                <div className="flex items-center space-x-2">
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(dailyChange)}
                  </span>
                </div>
              </CardTitle>
              <CardDescription>Today's change</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(portfolioValue)}
              </div>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span>Goals Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentGoals.slice(0, 2).map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-gray-500">
                        {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                      </span>
                    </div>
                    <Progress value={getGoalProgress(goal.current, goal.target)} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-yellow-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-purple-500" />
                    <span>Asset Allocation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={assetAllocation}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {assetAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {assetAllocation.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: asset.color }}
                            />
                            <span className="text-sm font-medium">{asset.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{asset.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <span>Recent Transactions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'buy' ? 'bg-green-100' : 
                            transaction.type === 'sell' ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            {transaction.type === 'buy' ? (
                              <Plus className="w-4 h-4 text-green-600" />
                            ) : transaction.type === 'sell' ? (
                              <Minus className="w-4 h-4 text-red-600" />
                            ) : (
                              <DollarSign className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.asset}</div>
                            <div className="text-sm text-gray-500 capitalize">{transaction.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(transaction.amount)}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>6-month performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Volatility</span>
                      <Badge variant="outline">12.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Sharpe Ratio</span>
                      <Badge variant="outline">1.8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Max Drawdown</span>
                      <Badge variant="outline" className="text-red-600">-8.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Beta</span>
                      <Badge variant="outline">0.95</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Investment Goals</span>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Goal
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {investmentGoals.map((goal) => (
                      <div key={goal.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{goal.name}</h3>
                            <p className="text-sm text-gray-500">
                              Due: {new Date(goal.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(goal.current)}</div>
                            <div className="text-sm text-gray-500">of {formatCurrency(goal.target)}</div>
                          </div>
                        </div>
                        <Progress value={getGoalProgress(goal.current, goal.target)} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {formatPercentage(goal.current, goal.target)}% complete
                          </span>
                          <span className="text-gray-500">
                            {formatCurrency(goal.target - goal.current)} remaining
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Goal Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle>Goal Calculator</CardTitle>
                  <CardDescription>Plan your financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-amount">Goal Amount</Label>
                      <Input id="goal-amount" placeholder="Enter amount" />
                    </div>
                    <div>
                      <Label htmlFor="timeframe">Timeframe (years)</Label>
                      <Input id="timeframe" placeholder="Enter years" />
                    </div>
                    <div>
                      <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                      <Input id="monthly-contribution" placeholder="Enter amount" />
                    </div>
                    <div>
                      <Label htmlFor="expected-return">Expected Return (%)</Label>
                      <Input id="expected-return" placeholder="Enter percentage" />
                    </div>
                    <Button className="w-full">Calculate</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>AI-powered market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketInsights.map((insight) => (
                      <div key={insight.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">{insight.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={insight.impact === 'positive' ? 'default' : 
                                        insight.impact === 'negative' ? 'destructive' : 'secondary'}
                              >
                                {insight.impact}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {insight.confidence}% confidence
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Investment Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Based on your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-900">Rebalance Portfolio</h3>
                          <p className="text-sm text-blue-700 mt-1">
                            Consider rebalancing your tech holdings to reduce concentration risk.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-900">Increase Emergency Fund</h3>
                          <p className="text-sm text-green-700 mt-1">
                            You're close to your emergency fund goal. Consider increasing contributions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-yellow-900">Tax Loss Harvesting</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            Consider selling underperforming assets to offset gains.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-invest">Auto-Invest</Label>
                        <p className="text-sm text-gray-500">Automatically invest monthly</p>
                      </div>
                      <Switch 
                        id="auto-invest" 
                        checked={autoInvest} 
                        onCheckedChange={setAutoInvest} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="risk-level">Risk Tolerance</Label>
                      <Select value={riskLevel} onValueChange={setRiskLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive market updates</p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index; 