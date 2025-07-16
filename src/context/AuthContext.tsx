import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'sub-broker' | 'admin';
  avatar?: string;
  kycStatus: 'pending' | 'completed' | 'rejected';
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'investor@wealthyleaf.com',
    name: 'John Investor',
    role: 'investor',
    kycStatus: 'completed',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15'
  },
  {
    id: '2',
    email: 'broker@wealthyleaf.com',
    name: 'Jane Broker',
    role: 'sub-broker',
    kycStatus: 'completed',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15'
  },
  {
    id: '3',
    email: 'admin@wealthyleaf.com',
    name: 'Admin User',
    role: 'admin',
    kycStatus: 'completed',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('wealthyleaf_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('wealthyleaf_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email and role
      const foundUser = mockUsers.find(u => 
        u.email === email && u.role === role
      );
      
      if (foundUser) {
        // In production, verify password with backend
        if (password === 'password123') { // Mock password
          setUser(foundUser);
          localStorage.setItem('wealthyleaf_user', JSON.stringify(foundUser));
          setIsLoading(false);
          return true;
        }
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wealthyleaf_user');
    // Redirect to home page after logout
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 