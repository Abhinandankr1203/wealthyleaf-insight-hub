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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TrendingUp, TrendingDown, DollarSign, Target, BarChart3, PieChart,
  Plus, Minus, Eye, Settings, Bell, CheckCircle, AlertCircle, Leaf,
  Wallet, Building, ArrowUpRight, ArrowDownRight, Activity, Calendar,
  Users, Shield, Zap, Star, Clock, Download, Share2, Search,
  Filter, RefreshCw, Info, Calculator, FileText, TrendingUp as TrendingUpIcon,
  PieChart as PieChartIcon, BarChart, LineChart, AreaChart
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, AreaChart as RechartsAreaChart, Area } from "recharts";
import { useAuth } from "../context/AuthContext";
import { mutualFundApi, portfolioApi, mockPortfolio, mockSIPs, PortfolioHolding, SIP } from "../services/mutualFundApi";
import DashboardNav from "../components/dashboard/DashboardNav";
import { useToast } from "@/components/ui/use-toast";

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);
  const [sips, setSips] = useState<SIP[]>([]);
  const [funds, setFunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(5);
  const [showBuyFund, setShowBuyFund] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  // Portfolio metrics
  const portfolioMetrics = portfolioApi.calculatePortfolioMetrics(portfolio);
  const totalInvested = portfolioMetrics.totalInvested;
  const totalCurrentValue = portfolioMetrics.totalCurrentValue;
  const totalGainLoss = portfolioMetrics.totalGainLoss;
  const totalGainLossPercentage = portfolioMetrics.totalGainLossPercentage;

  // Mock data for charts
  const portfolioGrowthData = [
    { month: 'Jan', value: 100000, invested: 95000 },
    { month: 'Feb', value: 105000, invested: 100000 },
    { month: 'Mar', value: 110000, invested: 105000 },
    { month: 'Apr', value: 115000, invested: 110000 },
    { month: 'May', value: 120000, invested: 115000 },
    { month: 'Jun', value: 125000, invested: 120000 },
  ];

  const assetAllocation = [
    { name: 'Equity', value: 60, color: '#3B82F6' },
    { name: 'Debt', value: 25, color: '#10B981' },
    { name: 'Hybrid', value: 10, color: '#F59E0B' },
    { name: 'Liquid', value: 5, color: '#EF4444' },
  ];

  const sectorAllocation = [
    { sector: 'Technology', allocation: 25, color: '#3B82F6' },
    { sector: 'Financial Services', allocation: 20, color: '#10B981' },
    { sector: 'Consumer Goods', allocation: 15, color: '#F59E0B' },
    { sector: 'Healthcare', allocation: 12, color: '#EF4444' },
    { sector: 'Energy', allocation: 10, color: '#8B5CF6' },
    { sector: 'Others', allocation: 18, color: '#6B7280' },
  ];

  const taxInsights = {
    shortTermGains: 2500,
    longTermGains: 8500,
    dividendIncome: 1200,
    taxLiability: 1800,
    taxSaving: 5000
  };

  const alerts = [
    { id: 1, type: 'sip', message: 'SIP payment due for HDFC Mid-Cap Fund', date: '2024-01-20', priority: 'high' },
    { id: 2, type: 'exit', message: 'Exit load period ending for ICICI Bluechip Fund', date: '2024-01-25', priority: 'medium' },
    { id: 3, type: 'rebalance', message: 'Portfolio rebalancing recommended', date: '2024-01-30', priority: 'low' },
  ];

  const topPerformingFunds = [
    { name: 'HDFC Mid-Cap Opportunities', returns: 18.5, category: 'Equity' },
    { name: 'ICICI Prudential Bluechip', returns: 15.2, category: 'Equity' },
    { name: 'Axis Balanced Advantage', returns: 12.3, category: 'Hybrid' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [portfolioData, sipsData, fundsData] = await Promise.all([
          portfolioApi.getUserPortfolio(user?.id || ''),
          portfolioApi.getUserSIPs(user?.id || ''),
          mutualFundApi.getAllFunds()
        ]);
        
        setPortfolio(portfolioData);
        setSips(sipsData);
        setFunds(fundsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const handleBuyFund = () => {
    toast({
      title: "Fund Purchase Successful",
      description: "Your order to buy the fund has been placed.",
      variant: "default",
    });
    setShowBuyFund(false);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <DashboardNav userRole="investor" notifications={notifications} />

      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-2 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                Portfolio Value
                <div className="flex items-center space-x-2">
                  {totalGainLoss >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercentage(totalGainLossPercentage)}
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="text-slate-300">Total gain/loss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {formatCurrency(totalCurrentValue)}
              </div>
              <div className="text-sm text-slate-300 mb-4">
                Invested: {formatCurrency(totalInvested)}
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <RechartsAreaChart data={portfolioGrowthData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    fill="url(#portfolioGradient)"
                    strokeWidth={2}
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>Active SIPs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {sips.filter(sip => sip.status === 'Active').length}
              </div>
              <div className="text-sm text-slate-300 mb-4">
                Monthly: {formatCurrency(sips.reduce((sum, sip) => sum + (sip.status === 'Active' ? sip.amount : 0), 0))}
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-xs text-slate-400 mt-2">75% success rate</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Dialog open={showBuyFund} onOpenChange={setShowBuyFund}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Buy Fund
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Buy Mutual Fund</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Select a fund to invest in
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fund" className="text-slate-300">Select Fund</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Choose a fund" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {funds.map((fund) => (
                              <SelectItem key={fund.schemeCode} value={fund.schemeCode} className="text-white">
                                {fund.schemeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="amount" className="text-slate-300">Investment Amount</Label>
                        <Input 
                          id="amount" 
                          type="number" 
                          placeholder="Enter amount"
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleBuyFund}>
                        Invest Now
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={showGuidance} onOpenChange={setShowGuidance}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Get Guidance
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Get Investment Guidance</DialogTitle>
                      <DialogDescription className="text-slate-300">
                        Fill the form to get personalized investment advice
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="goal" className="text-slate-300">Investment Goal</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="retirement" className="text-white">Retirement</SelectItem>
                            <SelectItem value="education" className="text-white">Education</SelectItem>
                            <SelectItem value="house" className="text-white">House Purchase</SelectItem>
                            <SelectItem value="vacation" className="text-white">Vacation</SelectItem>
                            <SelectItem value="emergency" className="text-white">Emergency Fund</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeframe" className="text-slate-300">Time Horizon</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="1-3" className="text-white">1-3 years</SelectItem>
                            <SelectItem value="3-5" className="text-white">3-5 years</SelectItem>
                            <SelectItem value="5-10" className="text-white">5-10 years</SelectItem>
                            <SelectItem value="10+" className="text-white">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="risk" className="text-slate-300">Risk Tolerance</Label>
                        <Select>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="low" className="text-white">Conservative</SelectItem>
                            <SelectItem value="moderate" className="text-white">Moderate</SelectItem>
                            <SelectItem value="high" className="text-white">Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Request Call Back
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Portfolio</TabsTrigger>
            <TabsTrigger value="sip" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">SIP Tracker</TabsTrigger>
            <TabsTrigger value="performance" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Performance</TabsTrigger>
            <TabsTrigger value="tax" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Tax Insights</TabsTrigger>
            <TabsTrigger value="risk" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Risk Analysis</TabsTrigger>
            <TabsTrigger value="alerts" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Alerts</TabsTrigger>
            <TabsTrigger value="settings" className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset Allocation */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center space-x-2">
                      <PieChart className="w-5 h-5 text-purple-400" />
                      <span>Asset Allocation</span>
                    </span>
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
                            <span className="text-sm font-medium text-white">{asset.name}</span>
                          </div>
                          <div className="text-sm text-white">{asset.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span>Recent Transactions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.slice(0, 3).map((holding) => (
                      <div key={holding.schemeCode} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Building className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{holding.schemeName}</div>
                            <div className="text-sm text-slate-300">{holding.units} units</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{formatCurrency(holding.currentValue)}</div>
                          <div className={`text-sm ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatPercentage(holding.gainLossPercentage)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>Portfolio Holdings</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Fund Name</TableHead>
                      <TableHead className="text-slate-300">Units</TableHead>
                      <TableHead className="text-slate-300">NAV</TableHead>
                      <TableHead className="text-slate-300">Invested</TableHead>
                      <TableHead className="text-slate-300">Current Value</TableHead>
                      <TableHead className="text-slate-300">Gain/Loss</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.map((holding) => (
                      <TableRow key={holding.schemeCode}>
                        <TableCell className="text-white">
                          <div>
                            <div className="font-medium">{holding.schemeName}</div>
                            <div className="text-sm text-slate-300">{holding.schemeCode}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{holding.units.toFixed(2)}</TableCell>
                        <TableCell className="text-white">{formatCurrency(holding.nav)}</TableCell>
                        <TableCell className="text-white">{formatCurrency(holding.investedAmount)}</TableCell>
                        <TableCell className="text-white">{formatCurrency(holding.currentValue)}</TableCell>
                        <TableCell>
                          <div className={`${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            <div>{formatCurrency(holding.gainLoss)}</div>
                            <div className="text-sm">{formatPercentage(holding.gainLossPercentage)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700" onClick={() => toast({ title: "Viewing details..."})}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700" onClick={handleDownload}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIP Tracker Tab */}
          <TabsContent value="sip" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>SIP Tracker</span>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Start New SIP
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Fund Name</TableHead>
                      <TableHead className="text-slate-300">Amount</TableHead>
                      <TableHead className="text-slate-300">Frequency</TableHead>
                      <TableHead className="text-slate-300">Next Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Returns</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sips.map((sip) => (
                      <TableRow key={sip.id}>
                        <TableCell className="text-white">
                          <div>
                            <div className="font-medium">{sip.schemeName}</div>
                            <div className="text-sm text-slate-300">{sip.schemeCode}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{formatCurrency(sip.amount)}</TableCell>
                        <TableCell className="text-white">{sip.frequency}</TableCell>
                        <TableCell className="text-white">{sip.nextDate}</TableCell>
                        <TableCell>
                          <Badge className={sip.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                            {sip.status}
                          </Badge>
                        </TableCell>
                        <TableCell className={`${sip.returns >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercentage(sip.returns)}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Fund Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={portfolioGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={topPerformingFunds}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      />
                      <Bar dataKey="returns" fill="#10B981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tax Insights Tab */}
          <TabsContent value="tax" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Tax Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Short Term Gains</span>
                      <span className="text-red-400 font-medium">{formatCurrency(taxInsights.shortTermGains)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Long Term Gains</span>
                      <span className="text-green-400 font-medium">{formatCurrency(taxInsights.longTermGains)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Dividend Income</span>
                      <span className="text-blue-400 font-medium">{formatCurrency(taxInsights.dividendIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                      <span className="text-slate-300">Estimated Tax Liability</span>
                      <span className="text-red-400 font-medium">{formatCurrency(taxInsights.taxLiability)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Tax Saving Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-300">ELSS Investment</h3>
                          <p className="text-sm text-green-200 mt-1">
                            Invest in ELSS funds to save up to ₹1.5L under Section 80C
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-300">Long Term Benefits</h3>
                          <p className="text-sm text-blue-200 mt-1">
                            Hold equity funds for 1+ years for better tax treatment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Sector Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={sectorAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="allocation"
                      >
                        {sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Volatility</span>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">12.5%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Sharpe Ratio</span>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">1.8</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Max Drawdown</span>
                      <Badge variant="outline" className="border-red-500 text-red-400">-8.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">Beta</span>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">0.95</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Alerts & Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${
                      alert.priority === 'high' ? 'bg-red-500/10 border-red-500/30' :
                      alert.priority === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {alert.priority === 'high' ? (
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                          ) : alert.priority === 'medium' ? (
                            <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />
                          ) : (
                            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                          )}
                          <div>
                            <h3 className="font-medium text-white">{alert.message}</h3>
                            <p className="text-sm text-slate-300 mt-1">Due: {alert.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                          Action
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Profile & Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-slate-300">Email Notifications</Label>
                      <p className="text-sm text-slate-400">Receive updates via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications" className="text-slate-300">SMS Notifications</Label>
                      <p className="text-sm text-slate-400">Receive updates via SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="text-slate-300">Push Notifications</Label>
                      <p className="text-sm text-slate-400">Receive updates in browser</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
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
