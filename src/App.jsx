import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import BalanceTrendChart from './components/BalanceTrendChart';
import ExpenseTrendChart from './components/ExpenseTrendChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import CategoricalExpenseChart from './components/CategoricalExpenseChart';
import TransactionsList from './components/TransactionsList';
import TransactionsPage from './components/TransactionsPage';
import InsightsPage from './components/InsightsPage';
import TimeFilter from './components/TimeFilter';
import { getMonthlyData } from './utils/mockData';
import { fetchTransactions } from './services/api';
import { clearStorage } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('Admin');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Monthly');

  // Data State
  const [allTransactions, setAllTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Static stats for the dashboard (sync with selected month)
  const dashboardStats = useMemo(() => getMonthlyData(selectedMonth), [selectedMonth]);

  // Fetch initial data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTransactions(timeFilter, selectedMonth, selectedYear);
      setAllTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [timeFilter, selectedMonth, selectedYear]);

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data to defaults?')) {
      clearStorage();
      await loadData();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans transition-colors duration-500 overflow-hidden p-4 lg:p-6 lg:space-x-6 bg-black text-white">
      {/* Sidebar */}
      <div className="h-auto lg:h-full">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onResetData={handleResetData}
        />
      </div>

      <main className="flex-1 overflow-hidden relative rounded-2xl shadow-2xl border-t border-white/5 pb-32 lg:pb-0 transition-all duration-500 bg-dashboard-bg bg-grid-checker">
        <div className="h-full overflow-y-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-8 custom-scrollbar">
          {activeTab === 'dashboard' ? (
            <div className="animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-6 md:space-y-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Dashboard</h1>

                <div className="flex items-center space-x-4 overflow-x-auto pb-4 md:pb-0 custom-scrollbar-h">
                  <StatsCard
                    label="Total Balance"
                    value={dashboardStats.stats.totalBalance}
                    colorClass="text-brand-yellow"
                  />
                  <StatsCard
                    label="Income"
                    value={dashboardStats.stats.income}
                    colorClass="text-brand-yellow"
                  />
                  <StatsCard
                    label="Expenses"
                    value={dashboardStats.stats.expenses}
                    colorClass="text-brand-yellow"
                  />
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div className="lg:col-span-2 space-y-8 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <BalanceTrendChart data={dashboardStats.balanceTrend} />
                    <ExpenseTrendChart data={dashboardStats.expenseTrend} />
                  </div>
                  <div className="flex-1">
                    <IncomeExpenseChart data={dashboardStats.dailyPerformance} />
                  </div>
                </div>
                <div className="h-full">
                  <CategoricalExpenseChart data={dashboardStats.categories} />
                </div>
              </div>

              {/* Transactions List */}
              <div className="mt-12 mb-12">
                <TransactionsList
                  data={isLoading ? [] : allTransactions.slice(0, 5)}
                  isLoading={isLoading}
                  onViewAll={() => setActiveTab('transactions')}
                />
              </div>
            </div>
          ) : activeTab === 'insights' ? (
            <div className="animate-in fade-in duration-700">
              <div className="max-w-6xl mx-auto mb-4">
                <TimeFilter
                  selectedFilter={timeFilter}
                  onFilterChange={setTimeFilter}
                  selectedMonth={selectedMonth}
                  onMonthChange={setSelectedMonth}
                  selectedYear={selectedYear}
                  onYearChange={setSelectedYear}
                />
              </div>
              <InsightsPage data={allTransactions} isLoading={isLoading} />
            </div>
          ) : activeTab === 'transactions' ? (
            <div className="animate-in fade-in duration-700">
              <TransactionsPage
                data={allTransactions}
                isLoading={isLoading}
                role={role}
                setRole={setRole}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                showHeaderFilters={false}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-3xl font-bold text-gray-700 uppercase tracking-[0.2em]">Coming Soon</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
