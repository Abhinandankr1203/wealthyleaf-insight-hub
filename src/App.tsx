import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import InvestorDashboard from "./pages/InvestorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubBrokerDashboard from "./pages/SubBrokerDashboard";
import NotFound from "./pages/NotFound";
import PortfolioValuation from "./pages/PortfolioValuation";
import PortfolioSummary from "./pages/PortfolioSummary";
import AssetAllocation from "./pages/AssetAllocation";
import TransactionsEntry from "./pages/TransactionsEntry";
import CapitalGainRealized from "./pages/CapitalGainRealized";
import CapitalGainUnrealized from "./pages/CapitalGainUnrealized";
import ProfitLoss from "./pages/ProfitLoss";
import PortfolioPerformance from "./pages/PortfolioPerformance";
import InvestmentJourney from "./pages/InvestmentJourney";
import PortfolioRebalancing from "./pages/PortfolioRebalancing";
import PortfolioSnapshot from "./pages/PortfolioSnapshot";
import TransactionReport from "./pages/TransactionReport";
import InvestOnlineNSE from "./pages/InvestOnlineNSE";
import InvestOnlineMFU from "./pages/InvestOnlineMFU";
import MyDocuments from "./pages/MyDocuments";
import RiskProfiling from "./pages/RiskProfiling";
import Watchlist from "./pages/Watchlist";
import MyFolios from "./pages/MyFolios";
import MySIPs from "./pages/MySIPs";
import GoalPlanner from "./pages/GoalPlanner";
import Insurance from "./pages/Insurance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/sub-broker" element={<SubBrokerDashboard />} />
            <Route path="/dashboard/report/portfolio-valuation" element={<PortfolioValuation />} />
            <Route path="/dashboard/report/portfolio-summary" element={<PortfolioSummary />} />
            <Route path="/dashboard/report/asset-allocation" element={<AssetAllocation />} />
            <Route path="/dashboard/report/capital-gain-realized" element={<CapitalGainRealized />} />
            <Route path="/dashboard/report/capital-gain-unrealized" element={<CapitalGainUnrealized />} />
            <Route path="/dashboard/report/profit-loss" element={<ProfitLoss />} />
            <Route path="/dashboard/report/portfolio-performance" element={<PortfolioPerformance />} />
            <Route path="/dashboard/report/investment-journey" element={<InvestmentJourney />} />
            <Route path="/dashboard/report/portfolio-rebalancing" element={<PortfolioRebalancing />} />
            <Route path="/dashboard/report/portfolio-snapshot" element={<PortfolioSnapshot />} />
            <Route path="/dashboard/report/transaction-report" element={<TransactionReport />} />
            <Route path="/dashboard/invest-online-nse" element={<InvestOnlineNSE />} />
            <Route path="/dashboard/invest-online-mfu" element={<InvestOnlineMFU />} />
            <Route path="/dashboard/my-documents" element={<MyDocuments />} />
            <Route path="/dashboard/risk-profiling" element={<RiskProfiling />} />
            <Route path="/dashboard/watchlist" element={<Watchlist />} />
            <Route path="/dashboard/my-folios" element={<MyFolios />} />
            <Route path="/dashboard/my-sips" element={<MySIPs />} />
            <Route path="/dashboard/goal-planner" element={<GoalPlanner />} />
            <Route path="/dashboard/transactions-entry" element={<TransactionsEntry />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
