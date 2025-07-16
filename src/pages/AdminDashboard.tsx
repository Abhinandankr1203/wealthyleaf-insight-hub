import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Plus, Minus, Eye, Settings, CheckCircle, AlertCircle, Leaf,
  Wallet, Building, ArrowUpRight, ArrowDownRight, Activity, Calendar,
  Users, Shield, Zap, Star, Clock, Download, Share2, Search,
  Filter, RefreshCw, Info, Calculator, FileText, TrendingUp as TrendingUpIcon,
  PieChart as PieChartIcon, BarChart, LineChart, AreaChart, UserPlus,
  UserCheck, UserX, Database, Server, Cpu, HardDrive, Network,
  AlertTriangle, Settings as SettingsIcon, Key, Lock, Unlock,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon2, Activity as ActivityIcon,
  LogOut, User, PlusCircle
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, AreaChart as RechartsAreaChart, Area } from "recharts";
import { useAuth } from "../context/AuthContext";
import { AppSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard/admin" },
  { label: "SIP Management", path: "/dashboard/admin/sips" },
  { label: "Broker Management", path: "/dashboard/admin/brokers" },
  { label: "Compliance", path: "/dashboard/admin/compliance" },
  { label: "Analytics", path: "/dashboard/admin/analytics" },
  { label: "System Settings", path: "/dashboard/admin/settings" },
  { label: "Reports", path: "/dashboard/admin/reports" },
];

const kpiCards = [
  { label: "Total Users", value: "15,420", icon: <Users className="text-blue-600" />, change: "+8.5%", changeType: "positive" },
  { label: "Total AUM", value: "₹12.5B", icon: <DollarSign className="text-green-600" />, change: "+12.3%", changeType: "positive" },
  { label: "System Uptime", value: "99.8%", icon: <Server className="text-purple-600" />, change: "Operational", changeType: "neutral" },
  { label: "Pending Actions", value: "45", icon: <AlertTriangle className="text-orange-600" />, change: "23 tickets", changeType: "warning" },
];

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

// System-wide SIP Data
const systemSIPData = [
  { 
    id: 1, 
    brokerName: "Jane Broker", 
    clientName: "Rahul Sharma", 
    scheme: "HDFC Equity Fund", 
    amount: "₹5,000", 
    status: "Active", 
    startDate: "2024-01-15",
    totalInvested: "₹25,000",
    currentValue: "₹27,500",
    returns: "+10.0%",
    compliance: "Compliant"
  },
  { 
    id: 2, 
    brokerName: "John Broker", 
    clientName: "Priya Patel", 
    scheme: "ICICI Bluechip Fund", 
    amount: "₹3,000", 
    status: "Active", 
    startDate: "2024-01-10",
    totalInvested: "₹15,000",
    currentValue: "₹16,200",
    returns: "+8.0%",
    compliance: "Compliant"
  },
  { 
    id: 3, 
    brokerName: "Mike Broker", 
    clientName: "Amit Kumar", 
    scheme: "Axis Midcap Fund", 
    amount: "₹2,500", 
    status: "Paused", 
    startDate: "2024-01-20",
    totalInvested: "₹12,500",
    currentValue: "₹13,750",
    returns: "+10.0%",
    compliance: "Under Review"
  },
];

const brokerPerformanceData = [
  { 
    brokerName: "Jane Broker", 
    totalClients: 28, 
    totalSIPs: 45, 
    totalAUM: "₹2.5Cr", 
    commission: "₹1.2L", 
    performance: "+15.2%",
    complianceScore: 98
  },
  { 
    brokerName: "John Broker", 
    totalClients: 22, 
    totalSIPs: 38, 
    totalAUM: "₹1.8Cr", 
    commission: "₹95K", 
    performance: "+12.8%",
    complianceScore: 95
  },
  { 
    brokerName: "Mike Broker", 
    totalClients: 18, 
    totalSIPs: 32, 
    totalAUM: "₹1.2Cr", 
    commission: "₹75K", 
    performance: "+10.5%",
    complianceScore: 92
  },
];

const complianceAlerts = [
  { id: 1, type: "KYC Expiry", broker: "Jane Broker", client: "Rahul Sharma", severity: "High", dueDate: "2024-02-15" },
  { id: 2, type: "Document Missing", broker: "John Broker", client: "Priya Patel", severity: "Medium", dueDate: "2024-02-20" },
  { id: 3, type: "Risk Assessment", broker: "Mike Broker", client: "Amit Kumar", severity: "Low", dueDate: "2024-02-25" },
];

const systemMetrics = {
  cpuUsage: 45,
  memoryUsage: 62,
  diskUsage: 78,
  networkLoad: 34,
  activeConnections: 1250,
  databaseQueries: 45000,
  totalSIPs: 1250,
  totalAUM: "₹15.2Cr",
  activeBrokers: 45,
  complianceRate: 96.5
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

const formatNumber = (num: number) => new Intl.NumberFormat('en-IN').format(num);

const user = { name: "Admin User", avatar: "/logo.svg" };

// Mock notifications data for admin
const mockNotifications = [
  { id: 1, title: "New User Registration", message: "Priya Patel has completed KYC verification", time: "1 hour ago", read: false },
  { id: 2, title: "System Alert", message: "High CPU usage detected on server", time: "3 hours ago", read: false },
  { id: 3, title: "Support Ticket", message: "New high priority ticket from Rahul Sharma", time: "5 hours ago", read: false },
];

const AdminDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedComplianceAction, setSelectedComplianceAction] = useState<string | null>(null);

  const handleAction = (title: string, description: string) => {
    toast({ title, description });
  };

  const handleCreateUser = () => {
    handleAction("User Created", "New user has been added to the platform.");
    setShowAddUser(false);
  };

  const handleComplianceAction = (action: string, alertId: number) => {
    setSelectedComplianceAction(action);
    handleAction(`${action} Completed`, `Compliance action ${action.toLowerCase()} completed for alert #${alertId}`);
  };

  const handleLogout = () => {
    toast({ 
      title: "Logged Out", 
      description: "You have been successfully logged out." 
    });
    logout();
    // The AuthContext will handle redirecting to the login page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="ml-4 text-white text-xl">Loading admin dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Wealthyleaf Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-teal-700">Wealthyleaf Admin</span>
          </div>
          <div className="text-lg font-medium text-gray-700">Welcome back, {user.name}!</div>
          <div className="flex items-center gap-4">
            <NotificationDropdown 
              notifications={notifications}
              onNotificationsChange={setNotifications}
            />
            <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-teal-500" />
            <button className="flex items-center gap-1 text-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" aria-label="Logout" onClick={handleLogout}>
              <LogOut size={18} aria-hidden="true" /> Logout
            </button>
          </div>
        </header>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 pt-6">
          {kpiCards.map((card) => (
            <Card key={card.label} className="shadow-md hover:shadow-lg transition rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-500">{card.label}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800 mb-1">{card.value}</div>
                <div className={`text-sm ${
                  card.changeType === 'positive' ? 'text-green-600' : 
                  card.changeType === 'warning' ? 'text-orange-600' : 
                  'text-gray-500'
                }`}>
                  {card.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8">
          {/* Left: Charts */}
          <div className="flex flex-col gap-8">
            {/* User Growth Trend */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#374151' }} />
                      <Area type="monotone" dataKey="users" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* System-wide SIP Overview */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">System-wide SIP Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{systemMetrics.totalSIPs.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total SIPs</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{systemMetrics.totalAUM}</div>
                      <div className="text-sm text-gray-600">Total AUM</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{systemMetrics.complianceRate}%</div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Actions, System Status, Recent Activity */}
          <div className="flex flex-col gap-8">
            {/* Quick Actions */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" 
                    onClick={() => setShowAddUser(true)}
                  >
                    <UserPlus aria-hidden="true" /> Add User
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    <Settings aria-hidden="true" /> System Settings
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">
                    <BarChart3 aria-hidden="true" /> View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">CPU Usage</span>
                      <span className="text-gray-800 font-medium">{systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="text-gray-800 font-medium">{systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Disk Usage</span>
                      <span className="text-gray-800 font-medium">{systemMetrics.diskUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.diskUsage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Active Connections:</span>
                      <span className="ml-2 font-medium">{systemMetrics.activeConnections.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Active Brokers:</span>
                      <span className="ml-2 font-medium">{systemMetrics.activeBrokers}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Alerts */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{alert.type}</div>
                        <div className="text-sm text-gray-600">{alert.broker} - {alert.client}</div>
                        <div className="text-xs text-gray-400">Due: {alert.dueDate}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.severity}
                        </span>
                        <Button 
                          size="sm" 
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                          onClick={() => handleComplianceAction('Review', alert.id)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Broker Performance Table */}
        <div className="px-8 pb-8">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Broker Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Broker</th>
                      <th className="px-4 py-2 text-left">Clients</th>
                      <th className="px-4 py-2 text-left">SIPs</th>
                      <th className="px-4 py-2 text-left">AUM</th>
                      <th className="px-4 py-2 text-left">Commission</th>
                      <th className="px-4 py-2 text-left">Performance</th>
                      <th className="px-4 py-2 text-left">Compliance</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerPerformanceData.map((broker) => (
                      <tr key={broker.brokerName} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{broker.brokerName}</td>
                        <td className="px-4 py-2">{broker.totalClients}</td>
                        <td className="px-4 py-2">{broker.totalSIPs}</td>
                        <td className="px-4 py-2">{broker.totalAUM}</td>
                        <td className="px-4 py-2">{broker.commission}</td>
                        <td className="px-4 py-2 text-green-600 font-medium">{broker.performance}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            broker.complianceScore >= 95 ? 'bg-green-100 text-green-800' :
                            broker.complianceScore >= 90 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {broker.complianceScore}%
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="outline">Generate Report</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System-wide SIP Management Table */}
        <div className="px-8 pb-8">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">System-wide SIP Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Broker</th>
                      <th className="px-4 py-2 text-left">Client</th>
                      <th className="px-4 py-2 text-left">Scheme</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Returns</th>
                      <th className="px-4 py-2 text-left">Compliance</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemSIPData.map((sip) => (
                      <tr key={sip.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{sip.brokerName}</td>
                        <td className="px-4 py-2">{sip.clientName}</td>
                        <td className="px-4 py-2">{sip.scheme}</td>
                        <td className="px-4 py-2">{sip.amount}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sip.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {sip.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-green-600 font-medium">{sip.returns}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sip.compliance === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {sip.compliance}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Audit</Button>
                            <Button size="sm" variant="outline">Report</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add User Dialog */}
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account for the platform.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="sub-broker">Sub-Broker</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddUser(false)}>Cancel</Button>
                <Button onClick={handleCreateUser}>Create User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
