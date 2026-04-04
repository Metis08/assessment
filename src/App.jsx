import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import BalanceTrendChart from './components/BalanceTrendChart';
import ExpenseTrendChart from './components/ExpenseTrendChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import CategoricalExpenseChart from './components/CategoricalExpenseChart';
import TransactionsList from './components/TransactionsList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('admin');
  const [selectedMonth, setSelectedMonth] = useState('February');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex h-screen bg-black font-sans text-white overflow-hidden p-6 space-x-6">
      {/* Sidebar */}
      <div className="h-full">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <main className="flex-1 overflow-y-auto px-12 py-8 custom-scrollbar relative bg-dashboard-bg bg-grid-checker rounded-2xl shadow-2xl border-t border-white/5">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-6xl font-bold tracking-tight py-4">Dashboard</h1>

          <div className="flex items-center space-x-6">
            <StatsCard
              label="Total Balance"
              value={10000}
              colorClass="text-brand-yellow"
            />
            <StatsCard
              label="Income"
              value={100000}
              colorClass="text-brand-yellow"
            />
            <StatsCard
              label="Expenses"
              value={5000}
              colorClass="text-brand-yellow"
            />
          </div>
        </div>

        {/* Month Selector Row */}
        <div className="mb-8 relative z-50">
          <button
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="bg-card-bg px-6 py-2 rounded-lg flex items-center space-x-4 text-gray-400 hover:text-white transition-colors border border-white/5 shadow-xl"
          >
            <span className="text-lg font-medium tracking-wide">{selectedMonth}</span>
            <span className={`text-gray-500 text-lg transition-transform duration-200 ${isMonthDropdownOpen ? 'rotate-180' : ''}`}>⌵</span>
          </button>

          {isMonthDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card-bg border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 backdrop-blur-md">
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`w-full px-6 py-2 text-left hover:bg-white/10 transition-colors ${selectedMonth === month ? 'text-brand-yellow bg-white/5' : 'text-gray-400'}`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left Side: Charts */}
          <div className="lg:col-span-2 space-y-8 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BalanceTrendChart />
              <ExpenseTrendChart />
            </div>
            <div className="flex-1">
              <IncomeExpenseChart />
            </div>
          </div>

          {/* Right Side: Tall Donut Chart */}
          <div className="h-full">
            <CategoricalExpenseChart />
          </div>
        </div>

        {/* Transactions List (Added as per text requirement, below the main charts) */}
        <div className="mt-12 mb-12">
          <TransactionsList />
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #121214;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}

export default App;
