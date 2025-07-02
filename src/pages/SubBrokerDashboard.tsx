import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  TrendingUp, DollarSign, Users, Bell, CheckCircle, AlertTriangle, Leaf, Download, Search, MessageCircle, UserPlus, FileText, Settings, Star, Clock
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from "recharts";
import { useAuth } from "../context/AuthContext";
import DashboardNav from "../components/dashboard/DashboardNav";
import { useToast } from "@/components/ui/use-toast";

const SubBrokerDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(2);
  const [showAddClient, setShowAddClient] = useState(false);

  // Mock data
  const summary = {
    totalClients: 120,
    totalAUM: 25000000,
    monthlyCommission: 48000,
    pendingActions: 3
  };

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

  const clients = [
    { id: 1, name: 'Amit Kumar', email: 'amit@example.com', portfolio: 350000, status: 'Active' },
    { id: 2, name: 'Neha Singh', email: 'neha@example.com', portfolio: 420000, status: 'Active' },
    { id: 3, name: 'Vikram Mehta', email: 'vikram@example.com', portfolio: 180000, status: 'Inactive' },
    { id: 4, name: 'Priya Patel', email: 'priya@example.com', portfolio: 500000, status: 'Active' },
  ];

  const commissionData = [
    { month: 'Jan', commission: 35000 },
    { month: 'Feb', commission: 37000 },
    { month: 'Mar', commission: 40000 },
    { month: 'Apr', commission: 42000 },
    { month: 'May', commission: 45000 },
    { month: 'Jun', commission: 48000 },
  ];

  const supportTickets = [
    { id: 1, subject: 'Client KYC pending', status: 'Open', created: '2024-06-01' },
    { id: 2, subject: 'Commission payout delay', status: 'Resolved', created: '2024-05-28' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAction = (title: string, description: string) => {
    toast({ title, description });
  };

  const handleAddClient = () => {
    handleAction("Client Added", "New client has been successfully onboarded.");
    setShowAddClient(false);
  };

  const handleSaveChanges = () => {
    handleAction("Settings Saved", "Your profile settings have been updated.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 text-white">
      {/* Header */}
      <DashboardNav userRole="sub-broker" notifications={notifications} />

      <div className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Total Clients
                <Users className="w-5 h-5 text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{summary.totalClients}</div>
              <div className="text-sm text-slate-300 mb-2">Managed by you</div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5 this month
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Total AUM
                <DollarSign className="w-5 h-5 text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{formatCurrency(summary.totalAUM)}</div>
              <div className="text-sm text-slate-300 mb-2">Assets Under Management</div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8% this month
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Monthly Commission
                <Star className="w-5 h-5 text-yellow-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{formatCurrency(summary.monthlyCommission)}</div>
              <div className="text-sm text-slate-300 mb-2">Earned this month</div>
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white text-lg">
                Pending Actions
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{summary.pendingActions}</div>
              <div className="text-sm text-slate-300 mb-2">To be completed</div>
              <div className="flex items-center text-sm text-orange-400">
                <Clock className="w-4 h-4 mr-1" />
                2 urgent
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-slate-700">Overview</TabsTrigger>
            <TabsTrigger value="clients" className="text-white data-[state=active]:bg-slate-700">Clients</TabsTrigger>
            <TabsTrigger value="commissions" className="text-white data-[state=active]:bg-slate-700">Commissions</TabsTrigger>
            <TabsTrigger value="support" className="text-white data-[state=active]:bg-slate-700">Support</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-slate-700">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Client Growth Chart */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Client Growth</CardTitle>
                  <CardDescription className="text-slate-300">Monthly client onboarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsLineChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                      <Line type="monotone" dataKey="clients" stroke="#10B981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              {/* Risk Distribution Pie */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Client Risk Profile</CardTitle>
                  <CardDescription className="text-slate-300">Distribution by risk category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie data={riskDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ risk, value }) => `${risk}: ${value}` }>
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-300">Manage clients and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setShowAddClient(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />Add Client
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => handleAction("Viewing Reports", "Generating client reports.")}>
                    <FileText className="w-4 h-4 mr-2" />View Reports
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => handleAction("Downloading Statements", "Client statements are being prepared for download.")}>
                    <Download className="w-4 h-4 mr-2" />Download Statements
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => setActiveTab("support")}>
                    <MessageCircle className="w-4 h-4 mr-2" />Request Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Client Management</CardTitle>
                    <CardDescription className="text-slate-300">Manage your clients</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddClient(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />Add Client
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input placeholder="Search clients..." className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Name</TableHead>
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">Portfolio Value</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id} className="border-slate-700">
                          <TableCell>
                            <div className="font-medium text-white">{client.name}</div>
                          </TableCell>
                          <TableCell className="text-slate-300">{client.email}</TableCell>
                          <TableCell className="text-slate-300">{formatCurrency(client.portfolio)}</TableCell>
                          <TableCell>
                            <Badge variant={client.status === 'Active' ? 'secondary' : 'outline'} className={client.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                                <FileText className="w-4 h-4" />
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

          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Commission Details</CardTitle>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700" onClick={() => handleAction("Download Statement", "Commission statement is being generated.")}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                  </Button>
                </div>
                <CardDescription className="text-slate-300">Your commission earnings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsBarChart data={commissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                    <Bar dataKey="commission" fill="#F59E0B" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Support Center</CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleAction("New Request Raised", "Your support request has been submitted.")}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Raise New Request
                  </Button>
                </div>
                <CardDescription className="text-slate-300">View and manage your support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{ticket.subject}</div>
                        <div className="text-slate-400 text-sm">Created: {ticket.created}</div>
                      </div>
                      <Badge variant={ticket.status === 'Open' ? 'destructive' : 'secondary'} className={ticket.status === 'Open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                        {ticket.status}
                      </Badge>
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
                <CardTitle className="text-white">Profile Settings</CardTitle>
                <CardDescription className="text-slate-300">Update your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" defaultValue={user?.name || ''} className="bg-slate-700 border-slate-600 text-white" />
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" defaultValue={user?.email || ''} className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-white">Notification Preferences</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Email Alerts</span>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 bg-slate-700 border-slate-600 rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">SMS Alerts</span>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-emerald-600 bg-slate-700 border-slate-600 rounded" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription className="text-slate-400">
              Onboard a new client by providing their details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="clientName" className="text-white">Name</Label>
            <Input id="clientName" className="bg-slate-700 border-slate-600 text-white" />
            <Label htmlFor="clientEmail" className="text-white">Email</Label>
            <Input id="clientEmail" type="email" className="bg-slate-700 border-slate-600 text-white" />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddClient(false)} className="border-slate-600 text-white hover:bg-slate-700">
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubBrokerDashboard;
