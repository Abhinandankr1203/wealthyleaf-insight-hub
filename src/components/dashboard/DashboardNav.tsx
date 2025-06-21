import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  Home,
  BarChart3,
  MessageCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

interface DashboardNavProps {
  userRole: 'investor' | 'admin' | 'sub-broker';
  notifications?: number;
}

const DashboardNav = ({ userRole, notifications = 0 }: DashboardNavProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roleConfig = {
    investor: {
      title: 'Investor Dashboard',
      color: 'bg-blue-500',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: TrendingUp
    },
    admin: {
      title: 'Admin Dashboard',
      color: 'bg-purple-500',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      icon: Shield
    },
    'sub-broker': {
      title: 'Sub-Broker Dashboard',
      color: 'bg-emerald-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: Users
    }
  };

  const config = roleConfig[userRole];

  const handleDashboardSwitch = (role: string) => {
    navigate(`/dashboard/${role}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardIcon = (role: string) => {
    switch (role) {
      case 'investor':
        return <TrendingUp className="w-4 h-4" />;
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'sub-broker':
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <header className="bg-slate-800/50 border-b border-slate-700 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">WealthyLeaf</h1>
          </div>
          <Badge variant="secondary" className={config.badgeColor}>
            {config.title}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dashboard Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-slate-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Switch Dashboard
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
              <DropdownMenuLabel>Available Dashboards</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleDashboardSwitch('investor')}
                className={`hover:bg-slate-700 ${userRole === 'investor' ? 'bg-blue-500/20' : ''}`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Investor Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDashboardSwitch('sub-broker')}
                className={`hover:bg-slate-700 ${userRole === 'sub-broker' ? 'bg-emerald-500/20' : ''}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Sub-Broker Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDashboardSwitch('admin')}
                className={`hover:bg-slate-700 ${userRole === 'admin' ? 'bg-purple-500/20' : ''}`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Home Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-slate-700"
          >
            <Home className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-slate-700">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={user?.name} />
                  <AvatarFallback className="bg-slate-700 text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-slate-400">{user?.email || 'user@example.com'}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-slate-700">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-slate-700 text-red-400">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav; 