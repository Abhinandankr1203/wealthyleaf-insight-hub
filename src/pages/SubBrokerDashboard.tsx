
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, DollarSign, Target, TrendingUp, Phone, Mail, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const SubBrokerDashboard = () => {
  const navigate = useNavigate();

  const commissionData = [
    { month: 'Jan', commission: 32000 },
    { month: 'Feb', commission: 38000 },
    { month: 'Mar', commission: 42000 },
    { month: 'Apr', commission: 39000 },
    { month: 'May', commission: 45000 },
    { month: 'Jun', commission: 48000 },
  ];

  const salesFunnel = [
    { stage: 'Leads', count: 45, conversion: 100 },
    { stage: 'Qualified', count: 28, conversion: 62 },
    { stage: 'Proposal', count: 18, conversion: 40 },
    { stage: 'Onboarded', count: 12, conversion: 27 },
  ];

  const clients = [
    { name: 'Rajesh Gupta', aum: 450000, sips: 3, lastTransaction: '2024-06-15', status: 'Active', phone: '+91 98765 43210' },
    { name: 'Meera Sharma', aum: 680000, sips: 5, lastTransaction: '2024-06-12', status: 'Active', phone: '+91 87654 32109' },
    { name: 'Vikram Singh', aum: 320000, sips: 2, lastTransaction: '2024-06-10', status: 'Inactive', phone: '+91 76543 21098' },
    { name: 'Priya Nair', aum: 890000, sips: 7, lastTransaction: '2024-06-18', status: 'Active', phone: '+91 65432 10987' },
  ];

  const leads = [
    { name: 'Amit Kumar', source: 'Referral', stage: 'Qualified', priority: 'High', contact: '+91 54321 09876', followUp: '2024-06-21' },
    { name: 'Sunita Patel', source: 'Website', stage: 'Lead', priority: 'Medium', contact: '+91 43210 98765', followUp: '2024-06-22' },
    { name: 'Rohit Jain', source: 'Cold Call', stage: 'Proposal', priority: 'High', contact: '+91 32109 87654', followUp: '2024-06-20' },
  ];

  const monthlyTargets = {
    commission: { target: 50000, achieved: 48000, percentage: 96 },
    clients: { target: 15, achieved: 12, percentage: 80 },
    aum: { target: 5000000, achieved: 4200000, percentage: 84 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sub-Broker Dashboard</h1>
              <p className="text-gray-600">Welcome, Rajesh Kumar</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Client
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Commission</p>
                  <p className="text-2xl font-bold text-gray-800">₹48,000</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5% vs last month</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-800">45</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600">38 active</span>
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
                  <p className="text-sm text-gray-600">Client AUM</p>
                  <p className="text-2xl font-bold text-gray-800">₹1.25 Cr</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8.2% growth</span>
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
                  <p className="text-sm text-gray-600">Active Leads</p>
                  <p className="text-2xl font-bold text-gray-800">28</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-orange-600">12 follow-ups due</span>
                  </div>
                </div>
                <Phone className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Targets */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Monthly Targets</CardTitle>
            <CardDescription>Progress towards monthly goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Commission Target</span>
                  <span className="text-sm text-gray-600">{monthlyTargets.commission.percentage}%</span>
                </div>
                <Progress value={monthlyTargets.commission.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>₹{(monthlyTargets.commission.achieved / 1000).toFixed(0)}K achieved</span>
                  <span>₹{(monthlyTargets.commission.target / 1000).toFixed(0)}K target</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Client Acquisition</span>
                  <span className="text-sm text-gray-600">{monthlyTargets.clients.percentage}%</span>
                </div>
                <Progress value={monthlyTargets.clients.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{monthlyTargets.clients.achieved} acquired</span>
                  <span>{monthlyTargets.clients.target} target</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">AUM Growth</span>
                  <span className="text-sm text-gray-600">{monthlyTargets.aum.percentage}%</span>
                </div>
                <Progress value={monthlyTargets.aum.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>₹{(monthlyTargets.aum.achieved / 10000000).toFixed(1)}Cr achieved</span>
                  <span>₹{(monthlyTargets.aum.target / 10000000).toFixed(1)}Cr target</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Commission Trend */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Commission Trend</CardTitle>
                  <CardDescription>Monthly commission earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={commissionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="commission" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sales Funnel */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Sales Funnel</CardTitle>
                  <CardDescription>Lead conversion progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesFunnel}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Client Portfolio</CardTitle>
                <CardDescription>Overview of your client base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.phone} • Last: {client.lastTransaction}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">AUM</p>
                          <p className="font-medium">₹{(client.aum / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">SIPs</p>
                          <p className="font-medium">{client.sips}</p>
                        </div>
                        <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>Track and convert your leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50">
                      <div className="flex-1">
                        <h4 className="font-medium">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.contact} • Source: {lead.source}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Follow-up</p>
                          <p className="text-xs font-medium">{lead.followUp}</p>
                        </div>
                        <Badge variant={lead.stage === 'Proposal' ? 'default' : 'secondary'}>
                          {lead.stage}
                        </Badge>
                        <Badge variant={
                          lead.priority === 'High' ? 'destructive' : 
                          lead.priority === 'Medium' ? 'default' : 'secondary'
                        }>
                          {lead.priority}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Calendar className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commission" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Commission Breakdown</CardTitle>
                  <CardDescription>Earnings by client and product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { client: 'Rajesh Gupta', product: 'SIP Commission', amount: 1250, type: 'Monthly' },
                      { client: 'Meera Sharma', product: 'Lumpsum', amount: 3400, type: 'One-time' },
                      { client: 'Priya Nair', product: 'SIP Commission', amount: 2100, type: 'Monthly' },
                      { client: 'Vikram Singh', product: 'Redemption', amount: 850, type: 'Exit Load' },
                    ].map((commission, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                        <div>
                          <h4 className="font-medium text-sm">{commission.client}</h4>
                          <p className="text-xs text-gray-600">{commission.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{commission.amount}</p>
                          <p className="text-xs text-gray-600">{commission.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                  <CardDescription>Quarterly commission overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">₹1,38,000</p>
                      <p className="text-sm text-gray-600">Total Quarterly Earnings</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Trail Commission</span>
                        <span className="font-medium">₹89,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Upfront Commission</span>
                        <span className="font-medium">₹34,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Incentives</span>
                        <span className="font-medium">₹15,000</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Net Earnings</span>
                        <span>₹1,38,000</span>
                      </div>
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

export default SubBrokerDashboard;
