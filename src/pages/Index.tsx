import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowRight, 
  Star,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Globe,
  Award
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const roles = [
    {
      id: 'investor',
      title: 'Investor Dashboard',
      description: 'Track your mutual fund portfolio, manage SIPs, and get personalized investment insights',
      icon: TrendingUp,
      color: 'bg-blue-500',
      features: [
        'Portfolio Overview & Performance',
        'SIP Tracker & Management',
        'Fund Performance Analysis',
        'Tax Insights & Calculations',
        'Risk & Diversification Tools',
        'Smart Recommendations'
      ]
    },
    {
      id: 'sub-broker',
      title: 'Sub Broker Dashboard',
      description: 'Manage clients, track commissions, and grow your mutual fund business',
      icon: Users,
      color: 'bg-green-500',
      features: [
        'Client Portfolio Management',
        'Commission Tracking',
        'Fund Recommendations',
        'Sales Analytics',
        'Client Communication Tools',
        'Compliance & Alerts'
      ]
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Platform management, user oversight, and comprehensive analytics',
      icon: Shield,
      color: 'bg-purple-500',
      features: [
        'User Management & KYC',
        'Fund & SIP Analytics',
        'Transaction Monitoring',
        'Revenue & Commission Tracking',
        'System Health & Logs',
        'Compliance & Security'
      ]
    }
  ];

  const handleLogin = async (role: string) => {
    if (!email || !password) {
      setLoginError("Please enter both email and password");
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const success = await login(email, password, role);
      if (success) {
        // Navigate to the appropriate dashboard
        navigate(`/dashboard/${role}`);
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">WealthyLeaf</h1>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              Mutual Fund Platform
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-slate-700">
              About Us
            </Button>
            <Button variant="ghost" className="text-white hover:bg-slate-700">
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Smart Mutual Fund Investing
            <span className="text-green-400"> Made Simple</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Track your portfolio, manage SIPs, and get expert insights. Join thousands of investors 
            who trust WealthyLeaf for their mutual fund journey.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Tracking</h3>
              <p className="text-slate-300">Live NAV updates and portfolio performance tracking</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Goal-based Investing</h3>
              <p className="text-slate-300">Plan and track your financial goals with SIPs</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Insights</h3>
              <p className="text-slate-300">AI-powered recommendations and market analysis</p>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Dashboard
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {roles.map((role) => (
              <Card 
                key={role.id} 
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedRole === role.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className={`w-full mt-6 ${role.color} hover:opacity-90`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Login as {role.title.split(' ')[0]}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Login to {role.title}
                        </DialogTitle>
                        <DialogDescription className="text-slate-300">
                          Enter your credentials to access your dashboard
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {loginError && (
                          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">{loginError}</p>
                          </div>
                        )}
                        <div>
                          <Label htmlFor="email" className="text-slate-300">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                            disabled={isLoggingIn}
                          />
                        </div>
                        <div>
                          <Label htmlFor="password" className="text-slate-300">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                            disabled={isLoggingIn}
                          />
                        </div>
                        <Button 
                          className={`w-full ${role.color} hover:opacity-90`}
                          onClick={() => handleLogin(role.id)}
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? "Logging in..." : "Login"}
                        </Button>
                        <div className="text-center text-xs text-slate-400">
                          <p>Demo credentials:</p>
                          <p>Email: {role.id}@wealthyleaf.com</p>
                          <p>Password: password123</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">₹500Cr+</div>
              <div className="text-slate-300">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">50,000+</div>
              <div className="text-slate-300">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">1,200+</div>
              <div className="text-slate-300">Mutual Funds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">4.8★</div>
              <div className="text-slate-300">User Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-slate-300 mb-6">
            Join thousands of investors who trust WealthyLeaf for their mutual fund investments
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700 px-6 py-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">WealthyLeaf</span>
          </div>
          <p className="text-slate-300">
            © 2024 WealthyLeaf. All rights reserved. | 
            <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">Privacy Policy</a> | 
            <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index; 