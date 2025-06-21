import axios from 'axios';

// Base URL for Indian mutual fund APIs
const MFAPI_BASE_URL = 'https://api.mfapi.in/mf';
const AMFI_BASE_URL = 'https://www.amfiindia.com/spages/NAVAll.txt';

export interface MutualFund {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  amc: string;
  type: 'Equity' | 'Debt' | 'Hybrid' | 'Liquid' | 'Others';
  riskLevel: 'Low' | 'Moderate' | 'High';
  expenseRatio: number;
  minInvestment: number;
  returns: {
    '1Y': number;
    '3Y': number;
    '5Y': number;
    sinceInception: number;
  };
}

export interface PortfolioHolding {
  schemeCode: string;
  schemeName: string;
  units: number;
  nav: number;
  investedAmount: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  sipAmount?: number;
  sipDate?: string;
}

export interface SIP {
  id: string;
  schemeCode: string;
  schemeName: string;
  amount: number;
  frequency: 'Monthly' | 'Weekly' | 'Daily';
  startDate: string;
  nextDate: string;
  status: 'Active' | 'Paused' | 'Stopped';
  totalInvested: number;
  currentValue: number;
  returns: number;
}

// Mock data for development (replace with real API calls)
export const mockMutualFunds: MutualFund[] = [
  {
    schemeCode: '100001',
    schemeName: 'HDFC Mid-Cap Opportunities Fund - Growth',
    nav: 45.67,
    date: '2024-01-15',
    category: 'Equity - Mid Cap',
    amc: 'HDFC Mutual Fund',
    type: 'Equity',
    riskLevel: 'High',
    expenseRatio: 1.75,
    minInvestment: 5000,
    returns: {
      '1Y': 18.5,
      '3Y': 12.3,
      '5Y': 15.7,
      sinceInception: 14.2
    }
  },
  {
    schemeCode: '100002',
    schemeName: 'ICICI Prudential Bluechip Fund - Growth',
    nav: 67.89,
    date: '2024-01-15',
    category: 'Equity - Large Cap',
    amc: 'ICICI Prudential Mutual Fund',
    type: 'Equity',
    riskLevel: 'Moderate',
    expenseRatio: 1.85,
    minInvestment: 5000,
    returns: {
      '1Y': 15.2,
      '3Y': 10.8,
      '5Y': 13.4,
      sinceInception: 12.1
    }
  },
  {
    schemeCode: '100003',
    schemeName: 'SBI Magnum Gilt Fund - Growth',
    nav: 23.45,
    date: '2024-01-15',
    category: 'Debt - Gilt',
    amc: 'SBI Mutual Fund',
    type: 'Debt',
    riskLevel: 'Low',
    expenseRatio: 1.25,
    minInvestment: 5000,
    returns: {
      '1Y': 8.5,
      '3Y': 7.2,
      '5Y': 6.8,
      sinceInception: 6.5
    }
  },
  {
    schemeCode: '100004',
    schemeName: 'Axis Balanced Advantage Fund - Growth',
    nav: 34.56,
    date: '2024-01-15',
    category: 'Hybrid - Balanced',
    amc: 'Axis Mutual Fund',
    type: 'Hybrid',
    riskLevel: 'Moderate',
    expenseRatio: 1.95,
    minInvestment: 5000,
    returns: {
      '1Y': 12.3,
      '3Y': 9.8,
      '5Y': 11.2,
      sinceInception: 10.5
    }
  }
];

export const mockPortfolio: PortfolioHolding[] = [
  {
    schemeCode: '100001',
    schemeName: 'HDFC Mid-Cap Opportunities Fund - Growth',
    units: 100,
    nav: 45.67,
    investedAmount: 4500,
    currentValue: 4567,
    gainLoss: 67,
    gainLossPercentage: 1.49,
    sipAmount: 5000,
    sipDate: '2024-01-01'
  },
  {
    schemeCode: '100002',
    schemeName: 'ICICI Prudential Bluechip Fund - Growth',
    units: 75,
    nav: 67.89,
    investedAmount: 5000,
    currentValue: 5091.75,
    gainLoss: 91.75,
    gainLossPercentage: 1.84
  }
];

export const mockSIPs: SIP[] = [
  {
    id: 'sip1',
    schemeCode: '100001',
    schemeName: 'HDFC Mid-Cap Opportunities Fund - Growth',
    amount: 5000,
    frequency: 'Monthly',
    startDate: '2024-01-01',
    nextDate: '2024-02-01',
    status: 'Active',
    totalInvested: 5000,
    currentValue: 4567,
    returns: -8.66
  }
];

// API Functions
export const mutualFundApi = {
  // Get all mutual funds
  async getAllFunds(): Promise<MutualFund[]> {
    try {
      // In production, replace with real API call
      // const response = await axios.get(`${MFAPI_BASE_URL}/search`);
      // return response.data;
      
      // For now, return mock data
      return mockMutualFunds;
    } catch (error) {
      console.error('Error fetching mutual funds:', error);
      return mockMutualFunds;
    }
  },

  // Get fund details by scheme code
  async getFundDetails(schemeCode: string): Promise<MutualFund | null> {
    try {
      // In production, replace with real API call
      // const response = await axios.get(`${MFAPI_BASE_URL}/${schemeCode}`);
      // return response.data;
      
      const fund = mockMutualFunds.find(f => f.schemeCode === schemeCode);
      return fund || null;
    } catch (error) {
      console.error('Error fetching fund details:', error);
      return null;
    }
  },

  // Get NAV history
  async getNavHistory(schemeCode: string, days: number = 30): Promise<any[]> {
    try {
      // In production, replace with real API call
      // const response = await axios.get(`${MFAPI_BASE_URL}/${schemeCode}/nav`);
      // return response.data;
      
      // Mock NAV history
      const history = [];
      const today = new Date();
      for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        history.push({
          date: date.toISOString().split('T')[0],
          nav: Math.random() * 50 + 20
        });
      }
      return history;
    } catch (error) {
      console.error('Error fetching NAV history:', error);
      return [];
    }
  },

  // Search funds
  async searchFunds(query: string): Promise<MutualFund[]> {
    try {
      const allFunds = await this.getAllFunds();
      return allFunds.filter(fund => 
        fund.schemeName.toLowerCase().includes(query.toLowerCase()) ||
        fund.amc.toLowerCase().includes(query.toLowerCase()) ||
        fund.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching funds:', error);
      return [];
    }
  },

  // Get funds by category
  async getFundsByCategory(category: string): Promise<MutualFund[]> {
    try {
      const allFunds = await this.getAllFunds();
      return allFunds.filter(fund => 
        fund.category.toLowerCase().includes(category.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching funds by category:', error);
      return [];
    }
  },

  // Get top performing funds
  async getTopPerformingFunds(period: '1Y' | '3Y' | '5Y' = '1Y', limit: number = 10): Promise<MutualFund[]> {
    try {
      const allFunds = await this.getAllFunds();
      return allFunds
        .sort((a, b) => b.returns[period] - a.returns[period])
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching top performing funds:', error);
      return [];
    }
  }
};

// Portfolio API Functions
export const portfolioApi = {
  // Get user portfolio
  async getUserPortfolio(userId: string): Promise<PortfolioHolding[]> {
    try {
      // In production, this would fetch from your backend
      return mockPortfolio;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return [];
    }
  },

  // Get user SIPs
  async getUserSIPs(userId: string): Promise<SIP[]> {
    try {
      // In production, this would fetch from your backend
      return mockSIPs;
    } catch (error) {
      console.error('Error fetching SIPs:', error);
      return [];
    }
  },

  // Calculate portfolio metrics
  calculatePortfolioMetrics(holdings: PortfolioHolding[]) {
    const totalInvested = holdings.reduce((sum, holding) => sum + holding.investedAmount, 0);
    const totalCurrentValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
    const totalGainLoss = totalCurrentValue - totalInvested;
    const totalGainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    return {
      totalInvested,
      totalCurrentValue,
      totalGainLoss,
      totalGainLossPercentage
    };
  }
};

// Real API integration functions (for production)
export const realApi = {
  // Fetch live NAV from AMFI
  async fetchLiveNav(): Promise<any> {
    try {
      const response = await axios.get(AMFI_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching live NAV:', error);
      throw error;
    }
  },

  // Parse AMFI NAV data
  parseAmfiData(data: string): any[] {
    const lines = data.split('\n');
    const funds = [];
    
    for (const line of lines) {
      if (line.trim() && !line.startsWith('Scheme Code')) {
        const parts = line.split(';');
        if (parts.length >= 4) {
          funds.push({
            schemeCode: parts[0].trim(),
            isin: parts[1].trim(),
            schemeName: parts[2].trim(),
            nav: parseFloat(parts[3].trim()) || 0,
            date: parts[4]?.trim() || new Date().toISOString().split('T')[0]
          });
        }
      }
    }
    
    return funds;
  }
}; 