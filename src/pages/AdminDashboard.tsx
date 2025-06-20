
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, DollarSign, AlertTriangle, TrendingUp, Shield, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const aumData = [
    { month: 'Jan', aum: 450 },
    { month: 'Feb', aum: 485 },
    { month: 'Mar', aum: 512 },
    { month: 'Apr', aum: 498 },
    { month: 'May', aum: 535 },
    { month: 'Jun', aum: 568 },
  ];

  const clientData = [
    { category: 'New Clients', count: 45, change: '+12%' },
    { category: 'Active SIPs', count: 238, change: '+8%' },
    { category: 'Pending KYC', count: 12, change: '-5%' },
    { category: 'Risk Profiles', count: 89, change: '+15%' },
  ];

  const subBrokerPerformance = [
    { name: 'Rajesh Kumar', clients: 45, aum: 12500000, commission: 45000, status: 'Active' },
    { name: 'Priya Sharma', clients: 38, aum: 9800000, commission: 38500, status: 'Active' },
    { name: 'Amit Patel', clients: 32, aum: 8200000, commission: 32000, status: 'Active' },
    { name: 'Sunita Joshi', clients: 28, aum: 7100000, commission: 28500, status: 'Inactive' },
  ];

  const pendingApprovals = [
    { client: 'John Doe', type: 'KYC Update', amount: '-', priority: 'High', date: '2024-06-20' },
    { client: 'Jane Smith', type: 'Redemption', amount: '₹2,50,000', priority: 'Medium', date: '2024-06-19' },
    { client: 'Robert Wilson', type: 'SIP Modification', amount: '₹15,000', priority: 'Low', date: '2024-06-18' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Platform Overview & Management</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total AUM</p>
                  <p className="text-2xl font-bold text-gray-800">₹568 Cr</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+6.2% MoM</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-800">2,847</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+45 this month</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sub-Brokers</p>
                  <p className="text-2xl font-bold text-gray-800">24</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">21 active</span>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-sm text-orange-600">Requires attention</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="brokers">Sub-Brokers</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* AUM Growth Chart */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>AUM Growth Trend</CardTitle>
                  <CardDescription>Assets Under Management over 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={aumData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="aum" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Client Metrics */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Client Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clientData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Overview of all registered clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', pan: 'ABCDE1234F', aum: 450000, status: 'Active', kyc: 'Verified', broker: 'Rajesh Kumar' },
                    { name: 'Jane Smith', pan: 'FGHIJ5678K', aum: 680000, status: 'Active', kyc: 'Pending', broker: 'Priya Sharma' },
                    { name: 'Robert Wilson', pan: 'LMNOP9012Q', aum: 320000, status: 'Inactive', kyc: 'Verified', broker: 'Amit Patel' },
                    { name: 'Sarah Johnson', pan: 'RSTUV3456W', aum: 890000, status: 'Active', kyc: 'Verified', broker: 'Sunita Joshi' },
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-gray-600">PAN: {client.pan} • Broker: {client.broker}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">AUM</p>
                          <p className="font-medium">₹{(client.aum / 1000).toFixed(0)}K</p>
                        </div>
                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                        <Badge variant={client.kyc === 'Verified' ? 'default' : 'destructive'}>
                          {client.kyc}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brokers" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Sub-Broker Performance</CardTitle>
                <CardDescription>Performance metrics for all sub-brokers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subBrokerPerformance.map((broker, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{broker.name}</h4>
                        <p className="text-sm text-gray-600">{broker.clients} clients</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">AUM</p>
                          <p className="font-medium">₹{(broker.aum / 10000000).toFixed(1)}Cr</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Commission</p>
                          <p className="font-medium">₹{(broker.commission / 1000).toFixed(0)}K</p>
                        </div>
                        <Badge variant={broker.status === 'Active' ? 'default' : 'secondary'}>
                          {broker.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring administrative approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{approval.client}</h4>
                        <p className="text-sm text-gray-600">{approval.type} • {approval.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium">{approval.amount}</p>
                        </div>
                        <Badge variant={
                          approval.priority === 'High' ? 'destructive' : 
                          approval.priority === 'Medium' ? 'default' : 'secondary'
                        }>
                          {approval.priority}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Approve</Button>
                          <Button size="sm" variant="ghost">Reject</Button>
                        </div>
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

export default AdminDashboard;
