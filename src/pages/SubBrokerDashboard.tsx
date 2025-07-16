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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  TrendingUp, DollarSign, Users, Bell, CheckCircle, AlertTriangle, Leaf, Download, Search, MessageCircle, UserPlus, FileText, Settings, Star, Clock,
  LogOut, User, PlusCircle, Target, BarChart3, PieChart, X
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from "recharts";
import { useAuth } from "../context/AuthContext";
import { AppSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { NotificationDropdown } from "@/components/ui/notification-dropdown";

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard/sub-broker" },
  { label: "Client Management", path: "/dashboard/sub-broker/clients" },
  { label: "SIP Management", path: "/dashboard/sub-broker/sips" },
  { label: "Portfolio Monitoring", path: "/dashboard/sub-broker/portfolios" },
  { label: "Commission", path: "/dashboard/sub-broker/commission" },
  { label: "Reports", path: "/dashboard/sub-broker/reports" },
  { label: "Communications", path: "/dashboard/sub-broker/communications" },
];

const kpiCards = [
  { label: "Total Clients", value: "120", icon: <Users className="text-blue-600" />, change: "+5 this month", changeType: "positive" },
  { label: "Total AUM", value: "₹2.5Cr", icon: <DollarSign className="text-green-600" />, change: "+8% this month", changeType: "positive" },
  { label: "Monthly Commission", value: "₹48,000", icon: <Star className="text-yellow-600" />, change: "+12% from last month", changeType: "positive" },
  { label: "Pending Actions", value: "3", icon: <AlertTriangle className="text-orange-600" />, change: "2 urgent", changeType: "warning" },
];

const clientGrowthData = [
  { month: 'Jan', clients: 80 },
  { month: 'Feb', clients: 90 },
  { month: 'Mar', clients: 100 },
  { month: 'Apr', clients: 110 },
  { month: 'May', clients: 115 },
  { month: 'Jun', clients: 120 },
];

const riskDistribution = [
  { risk: 'Low', value: 40, color: '#10B981' },
  { risk: 'Medium', value: 60, color: '#3B82F6' },
  { risk: 'High', value: 20, color: '#F59E0B' },
];

// SIP Management Data
const sipManagementData = [
  { 
    id: 1, 
    clientName: "Rahul Sharma", 
    scheme: "HDFC Equity Fund", 
    amount: "₹5,000", 
    frequency: "Monthly", 
    startDate: "2024-01-15", 
    status: "Active", 
    nextDate: "2024-02-15",
    totalInvested: "₹25,000",
    currentValue: "₹27,500",
    returns: "+10.0%"
  },
  { 
    id: 2, 
    clientName: "Priya Patel", 
    scheme: "ICICI Bluechip Fund", 
    amount: "₹3,000", 
    frequency: "Monthly", 
    startDate: "2024-01-10", 
    status: "Active", 
    nextDate: "2024-02-10",
    totalInvested: "₹15,000",
    currentValue: "₹16,200",
    returns: "+8.0%"
  },
  { 
    id: 3, 
    clientName: "Amit Kumar", 
    scheme: "Axis Midcap Fund", 
    amount: "₹2,500", 
    frequency: "Monthly", 
    startDate: "2024-01-20", 
    status: "Paused", 
    nextDate: "2024-02-20",
    totalInvested: "₹12,500",
    currentValue: "₹13,750",
    returns: "+10.0%"
  },
];

const clientPortfolioData = [
  { clientName: "Rahul Sharma", totalSIPs: 3, totalAmount: "₹15,000", totalValue: "₹16,500", returns: "+10.0%", riskProfile: "Moderate" },
  { clientName: "Priya Patel", totalSIPs: 2, totalAmount: "₹8,000", totalValue: "₹8,640", returns: "+8.0%", riskProfile: "Conservative" },
  { clientName: "Amit Kumar", totalSIPs: 1, totalAmount: "₹2,500", totalValue: "₹2,750", returns: "+10.0%", riskProfile: "Aggressive" },
];

const commissionData = [
  { month: "Jan", commission: 2500, clients: 15, newSIPs: 8 },
  { month: "Feb", commission: 3200, clients: 18, newSIPs: 12 },
  { month: "Mar", commission: 2800, clients: 20, newSIPs: 6 },
  { month: "Apr", commission: 3500, clients: 22, newSIPs: 10 },
  { month: "May", commission: 4200, clients: 25, newSIPs: 15 },
  { month: "Jun", commission: 3800, clients: 28, newSIPs: 8 },
];

const pendingRequests = [
  { id: 1, clientName: "Rahul Sharma", type: "SIP Modification", request: "Increase amount to ₹7,000", date: "2024-01-20", priority: "High" },
  { id: 2, clientName: "Priya Patel", type: "New SIP", request: "Start SIP in Axis Small Cap Fund", date: "2024-01-19", priority: "Medium" },
  { id: 3, clientName: "Amit Kumar", type: "SIP Pause", request: "Pause SIP for 3 months", date: "2024-01-18", priority: "Low" },
];

const clients = [
  { id: 1, name: 'Amit Kumar', email: 'amit@example.com', portfolio: 350000, status: 'Active', risk: 'Medium' },
  { id: 2, name: 'Neha Singh', email: 'neha@example.com', portfolio: 420000, status: 'Active', risk: 'Low' },
  { id: 3, name: 'Vikram Mehta', email: 'vikram@example.com', portfolio: 180000, status: 'Inactive', risk: 'High' },
  { id: 4, name: 'Priya Patel', email: 'priya@example.com', portfolio: 500000, status: 'Active', risk: 'Low' },
  { id: 5, name: 'Rajesh Kumar', email: 'rajesh@example.com', portfolio: 280000, status: 'Active', risk: 'Medium' },
];

const supportTickets = [
  { id: 1, subject: 'Client KYC pending', status: 'Open', created: '2024-06-01', priority: 'High' },
  { id: 2, subject: 'Commission payout delay', status: 'Resolved', created: '2024-05-28', priority: 'Medium' },
  { id: 3, subject: 'Portfolio rebalancing request', status: 'In Progress', created: '2024-05-25', priority: 'Low' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const user = { name: "Jane Broker", avatar: "/logo.svg" };

// Mock notifications data for sub-broker
const mockNotifications = [
  { id: 1, title: "New Client Onboarded", message: "Rahul Sharma has been successfully onboarded", time: "2 hours ago", read: false },
  { id: 2, title: "Commission Earned", message: "You earned ₹2,500 commission this month", time: "1 day ago", read: false },
  { id: 3, title: "Client Request", message: "Priya Patel requested portfolio review", time: "2 days ago", read: false },
];

const SubBrokerDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedSIPAction, setSelectedSIPAction] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleAction = (title: string, description: string) => {
    toast({ title, description });
  };

  const handleAddClient = () => {
    handleAction("Client Added", "New client has been successfully onboarded.");
    setShowAddClient(false);
  };

  const handleSIPAction = (action: string, clientName: string) => {
    setSelectedSIPAction(action);
    setSelectedClient(clientName);
    handleAction(`${action} Request`, `SIP ${action.toLowerCase()} request submitted for ${clientName}`);
  };

  const handleSaveChanges = () => {
    handleAction("Settings Saved", "Your profile settings have been updated.");
  };

  const handleLogout = () => {
    toast({ 
      title: "Logged Out", 
      description: "You have been successfully logged out." 
    });
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-100 to-green-100">
      <AppSidebar items={sidebarItems} />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Wealthyleaf Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-teal-700">Wealthyleaf Sub-Broker</span>
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
            {/* Client Growth Chart */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Client Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#374151' }} />
                      <Line type="monotone" dataKey="clients" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution Pie Chart */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Client Risk Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          dataKey="value"
                          label={({ risk, value }) => `${risk}: ${value}`}
                          labelLine={false}
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#374151' }} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, flexWrap: 'wrap', gap: '12px' }}>
                    {riskDistribution.map((item) => (
                      <div key={item.risk} style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                        <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: item.color, marginRight: 6 }}></span>
                        <span style={{ fontWeight: 500 }}>{item.risk} {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Actions, SIP Management, Pending Requests */}
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
                    onClick={() => setShowAddClient(true)}
                  >
                    <UserPlus aria-hidden="true" /> Add Client
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                    <FileText aria-hidden="true" /> View Reports
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500">
                    <Download aria-hidden="true" /> Download Statements
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SIP Management Overview */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">SIP Management Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">28</div>
                      <div className="text-sm text-gray-600">Active SIPs</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₹1.2L</div>
                      <div className="text-sm text-gray-600">Total SIP Amount</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">₹12.5K</div>
                    <div className="text-sm text-gray-600">This Month's Commission</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-medium text-gray-500">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{request.clientName}</div>
                        <div className="text-sm text-gray-600">{request.type}: {request.request}</div>
                        <div className="text-xs text-gray-400">{request.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800' :
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.priority}
                        </span>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
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

        {/* SIP Management Table */}
        <div className="px-8 pb-8">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-500">Client SIP Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Client</th>
                      <th className="px-4 py-2 text-left">Scheme</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Next Date</th>
                      <th className="px-4 py-2 text-left">Returns</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sipManagementData.map((sip) => (
                      <tr key={sip.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{sip.clientName}</td>
                        <td className="px-4 py-2">{sip.scheme}</td>
                        <td className="px-4 py-2">{sip.amount}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sip.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {sip.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{sip.nextDate}</td>
                        <td className="px-4 py-2 text-green-600 font-medium">{sip.returns}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSIPAction('Modify', sip.clientName)}
                            >
                              Modify
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSIPAction('Pause', sip.clientName)}
                            >
                              Pause
                            </Button>
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

        {/* Add Client Dialog */}
        <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Onboard a new client to your portfolio.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter client's full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="risk">Risk Profile</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddClient(false)}>Cancel</Button>
                <Button onClick={handleAddClient}>Add Client</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubBrokerDashboard;
