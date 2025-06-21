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
  PieChart as PieChartIcon, BarChart, LineChart, AreaChart, UserPlus,
  UserCheck, UserX, Database, Server, Cpu, HardDrive, Network,
  AlertTriangle, Settings as SettingsIcon, Key, Lock, Unlock,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon2, Activity as ActivityIcon
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, AreaChart as RechartsAreaChart, Area } from "recharts";
import { useAuth } from "../context/AuthContext";
import DashboardNav from "../components/dashboard/DashboardNav";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSystemSettings, setShowSystemSettings] = useState(false);

  // Mock data for admin analytics
  const platformMetrics = {
    totalUsers: 15420,
    activeUsers: 12850,
    newUsersThisMonth: 1250,
    totalAUM: 12500000000, // 12.5B INR
    monthlyGrowth: 8.5,
    systemUptime: 99.8,
    pendingApprovals: 45,
    supportTickets: 23
  };

  const userGrowthData = [
    { month: 'Jan', users: 12000, growth: 5.2 },
    { month: 'Feb', users: 12500, growth: 4.2 },
    { month: 'Mar', users: 13100, growth: 4.8 },
    { month: 'Apr', users: 13800, growth: 5.3 },
    { month: 'May', users: 14500, growth: 5.1 },
    { month: 'Jun', users: 15420, growth: 6.3 },
  ];

  const userDistribution = [
    { role: 'Investors', count: 12000, percentage: 78, color: '#3B82F6' },
    { role: 'Sub-Brokers', count: 2800, percentage: 18, color: '#10B981' },
    { role: 'Admins', count: 620, percentage: 4, color: '#F59E0B' },
  ];

  const systemMetrics = {
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkLoad: 34,
    activeConnections: 1250,
    databaseQueries: 45000
  };

  const recentUsers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Investor', status: 'Active', joined: '2024-01-15', avatar: '/placeholder.svg' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Sub-Broker', status: 'Pending', joined: '2024-01-14', avatar: '/placeholder.svg' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'Investor', status: 'Active', joined: '2024-01-13', avatar: '/placeholder.svg' },
    { id: 4, name: 'Neha Singh', email: 'neha@example.com', role: 'Investor', status: 'Suspended', joined: '2024-01-12', avatar: '/placeholder.svg' },
    { id: 5, name: 'Vikram Mehta', email: 'vikram@example.com', role: 'Sub-Broker', status: 'Active', joined: '2024-01-11', avatar: '/placeholder.svg' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'KYC Verification', user: 'Priya Patel', submitted: '2024-01-15', priority: 'High' },
    { id: 2, type: 'Sub-Broker Registration', user: 'Rajesh Kumar', submitted: '2024-01-14', priority: 'Medium' },
    { id: 3, type: 'Document Upload', user: 'Sneha Reddy', submitted: '2024-01-13', priority: 'Low' },
  ];

  const supportTickets = [
    { id: 1, user: 'Rahul Sharma', issue: 'Login problem', status: 'Open', priority: 'High', created: '2024-01-15' },
    { id: 2, user: 'Priya Patel', issue: 'SIP setup issue', status: 'In Progress', priority: 'Medium', created: '2024-01-14' },
    { id: 3, user: 'Amit Kumar', issue: 'Portfolio not loading', status: 'Resolved', priority: 'Low', created: '2024-01-13' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <DashboardNav userRole="admin" notifications={notifications} />

      <div className="container mx-auto px-6 py-8">
        {/* Platform Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Total Users
                <Users className="w-5 h-5 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {formatNumber(platformMetrics.totalUsers)}
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Active: {formatNumber(platformMetrics.activeUsers)}
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{platformMetrics.monthlyGrowth}% this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Total AUM
                <DollarSign className="w-5 h-5 text-green-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                ₹12.5B
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Assets Under Management
              </div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.3% YoY
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-white text-lg">
                System Uptime
                <Server className="w-5 h-5 text-purple-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {platformMetrics.systemUptime}%
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Last 30 days
              </div>
              <div className="flex items-center text-sm text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                All systems operational
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Pending Actions
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {platformMetrics.pendingApprovals}
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Approvals needed
              </div>
              <div className="flex items-center text-sm text-orange-400">
                <Clock className="w-4 h-4 mr-1" />
                {platformMetrics.supportTickets} support tickets
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-slate-700">Overview</TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-slate-700">Users</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-slate-700">Analytics</TabsTrigger>
            <TabsTrigger value="system" className="text-white data-[state=active]:bg-slate-700">System</TabsTrigger>
            <TabsTrigger value="support" className="text-white data-[state=active]:bg-slate-700">Support</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-slate-700">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Growth Trend</CardTitle>
                  <CardDescription className="text-slate-300">Monthly user registration and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.3}
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Distribution */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Distribution</CardTitle>
                  <CardDescription className="text-slate-300">Breakdown by user roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={userDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ role, percentage }) => `${role}: ${percentage}%`}
                      >
                        {userDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-300">Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setShowAddUser(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve KYC
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-slate-300">Manage all platform users</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddUser(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="investor">Investors</SelectItem>
                        <SelectItem value="sub-broker">Sub-Brokers</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">User</TableHead>
                        <TableHead className="text-slate-300">Role</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Joined</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id} className="border-slate-700">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-slate-600 text-white text-sm">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-white">{user.name}</div>
                                <div className="text-slate-400 text-xs">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.role === 'Sub-Broker' ? 'secondary' : 'outline'}
                              className={user.role === 'Sub-Broker' ? 'bg-green-500/20 text-green-400' : 'border-slate-600 text-slate-300'}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.status === 'Active' ? 'secondary' : 'outline'}
                              className={user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                                       user.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                       'bg-red-500/20 text-red-400'}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{user.joined}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/20">
                                <UserX className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Performance */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Platform Performance</CardTitle>
                  <CardDescription className="text-slate-300">Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">User Engagement</span>
                      <span className="text-white font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Conversion Rate</span>
                      <span className="text-white font-medium">12.5%</span>
                    </div>
                    <Progress value={12.5} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Customer Satisfaction</span>
                      <span className="text-white font-medium">4.8/5</span>
                    </div>
                    <Progress value={96} className="h-2 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Analytics */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Analytics</CardTitle>
                  <CardDescription className="text-slate-300">Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Bar dataKey="growth" fill="#8B5CF6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">System Health</CardTitle>
                  <CardDescription className="text-slate-300">Real-time system metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300">CPU Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <HardDrive className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">Memory Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-purple-400" />
                        <span className="text-slate-300">Disk Usage</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.diskUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.diskUsage} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Network className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-300">Network Load</span>
                      </div>
                      <span className="text-white font-medium">{systemMetrics.networkLoad}%</span>
                    </div>
                    <Progress value={systemMetrics.networkLoad} className="h-2 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>

              {/* System Logs */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent System Logs</CardTitle>
                  <CardDescription className="text-slate-300">Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div className="flex-1">
                        <div className="text-white text-sm">Database backup completed successfully</div>
                        <div className="text-slate-400 text-xs">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <Info className="w-4 h-4 text-blue-400" />
                      <div className="flex-1">
                        <div className="text-white text-sm">New user registration: user_15421</div>
                        <div className="text-slate-400 text-xs">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <div className="flex-1">
                        <div className="text-white text-sm">High memory usage detected</div>
                        <div className="text-slate-400 text-xs">10 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div className="flex-1">
                        <div className="text-white text-sm">Security scan completed - no threats found</div>
                        <div className="text-slate-400 text-xs">15 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Pending Approvals</CardTitle>
                  <CardDescription className="text-slate-300">Actions requiring admin approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{approval.type}</div>
                          <div className="text-slate-400 text-sm">{approval.user}</div>
                          <div className="text-slate-500 text-xs">Submitted: {approval.submitted}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={approval.priority === 'High' ? 'destructive' : 'secondary'}
                            className={approval.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}
                          >
                            {approval.priority}
                          </Badge>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Support Tickets */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Support Tickets</CardTitle>
                  <CardDescription className="text-slate-300">Recent customer support requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{ticket.issue}</div>
                          <div className="text-slate-400 text-sm">{ticket.user}</div>
                          <div className="text-slate-500 text-xs">Created: {ticket.created}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={ticket.status === 'Open' ? 'destructive' : ticket.status === 'In Progress' ? 'secondary' : 'outline'}
                            className={ticket.status === 'Open' ? 'bg-red-500/20 text-red-400' : 
                                     ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : 
                                     'border-slate-600 text-slate-300'}
                          >
                            {ticket.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-slate-300">Configure platform settings and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Security Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-400" />
                      Security Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">Two-Factor Authentication</div>
                          <div className="text-slate-400 text-sm">Require 2FA for all users</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">Session Timeout</div>
                          <div className="text-slate-400 text-sm">Auto-logout after inactivity</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">IP Whitelist</div>
                          <div className="text-slate-400 text-sm">Restrict access to specific IPs</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-blue-400" />
                      Notification Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">Email Notifications</div>
                          <div className="text-slate-400 text-sm">Send email alerts for critical events</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">SMS Alerts</div>
                          <div className="text-slate-400 text-sm">Send SMS for urgent notifications</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">System Maintenance</div>
                          <div className="text-slate-400 text-sm">Notify users about maintenance</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Database Management</h3>
                      <p className="text-slate-400 text-sm">Manage database backups and maintenance</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                        <Download className="w-4 h-4 mr-2" />
                        Backup Now
                      </Button>
                      <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Optimize
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">First Name</Label>
                <Input id="firstName" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                <Input id="lastName" className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input id="email" type="email" className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <div>
              <Label htmlFor="role" className="text-white">Role</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="sub-broker">Sub-Broker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddUser(false)} className="border-slate-600 text-white hover:bg-slate-700">
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
