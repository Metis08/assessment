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
import { useInView } from './hooks/useInView';
import { cn } from './utils/cn';

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
  const loadData = async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
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
    // Only show loading for the very first fetch or tab switch if needed
    // Otherwise, background update for seamless feel
    loadData(allTransactions.length > 0);
  }, [timeFilter, selectedMonth, selectedYear]);


  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data to defaults?')) {
      clearStorage();
      await loadData(false);
    }
  };


  const [dashHeaderRef, dashHeaderInView] = useInView({ triggerOnce: true, threshold: 0 });
  const [dashChartsRef, dashChartsInView] = useInView({ triggerOnce: true, threshold: 0 });
  const [pieRef, pieInView] = useInView({ triggerOnce: true, threshold: 0 });
  const [dashTransRef, dashTransInView] = useInView({ triggerOnce: true, threshold: 0 });


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
        <div
          key={activeTab}
          className="h-full overflow-y-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-8 custom-scrollbar animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-700 ease-out fill-mode-both"
        >
          {activeTab === 'dashboard' ? (
            <div key={selectedMonth} className="space-y-12 transition-all duration-500">

              <div ref={dashHeaderRef} className={cn("transition-all duration-700 ease-out", dashHeaderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-6 md:space-y-0">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white focus:outline-none">Dashboard</h1>

                  <div className="flex flex-row items-center gap-2 sm:gap-6 w-full overflow-hidden">
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
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div ref={dashChartsRef} className={cn("lg:col-span-2 space-y-8 flex flex-col transition-all duration-700 delay-150 ease-out", dashChartsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <BalanceTrendChart data={dashboardStats.balanceTrend} />
                    <ExpenseTrendChart data={dashboardStats.expenseTrend} />
                  </div>
                  <div className="flex-1">
                    <IncomeExpenseChart data={dashboardStats.dailyPerformance} />
                  </div>
                </div>
                <div ref={pieRef} className={cn("h-full transition-all duration-700 delay-225 ease-out", pieInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                  <CategoricalExpenseChart data={dashboardStats.categories} isVisible={pieInView} />
                </div>
              </div>

              {/* Transactions List */}
              <div ref={dashTransRef} className={cn("mt-12 mb-12 transition-all duration-700 delay-300 ease-out", dashTransInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                <TransactionsList
                  data={isLoading ? [] : allTransactions.slice(0, 5)}
                  isLoading={isLoading}
                  onViewAll={() => setActiveTab('transactions')}
                />
              </div>
            </div>
          ) : activeTab === 'insights' ? (
            <div>
              <InsightsPage
                data={allTransactions}
                isLoading={isLoading}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            </div>
          ) : activeTab === 'transactions' ? (
            <div>
              <TransactionsPage
                data={allTransactions}
                isLoading={isLoading}
                role={role}
                setRole={setRole}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
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
