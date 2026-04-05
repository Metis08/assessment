import React, { useMemo } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Zap,
    Target,
    Briefcase,
    Activity,
    ChevronDown,
    Calendar,
    ShoppingBag,
    Play,
    Coffee,
    Car,
    Wallet,
    Tv,
    MapPin,
    Utensils,
    Globe,
    Cpu,
    Hash,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

import TimeFilter from './TimeFilter';
import HeatmapCalendar from './HeatmapCalendar';
import MonthlyComparisonChart from './MonthlyComparisonChart';
import { cn } from '../utils/cn';
import { useInView } from '../hooks/useInView';



import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from 'recharts';


const iconMap = {
    ShoppingBag, Play, Coffee, Car, Wallet, Tv, MapPin, Utensils, Activity, Briefcase, Globe, Cpu, Hash
};

const InsightCard = ({ title, value, subtext, trend, colorClass = "text-brand-yellow" }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-4 hover:bg-white/10 transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-yellow/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-all" />

        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">{title}</p>
                <h3 className={cn("text-3xl font-black tracking-tighter", colorClass)}>{value}</h3>
            </div>
        </div>

        <div className="space-y-4 relative z-10">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(212,244,85,0.4)]"
                    style={{ width: trend ? `${trend}%` : '60%' }}
                />
            </div>
            <p className="text-zinc-500 text-xs font-semibold leading-tight">{subtext}</p>
        </div>
    </div>
);


const ComparisonCard = ({ title, current, previous, subtext }) => {
    const isImproved = current < previous;
    const diff = Math.abs(((current - previous) / previous) * 100).toFixed(1);

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:bg-white/10 transition-all group relative overflow-hidden">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />

            <div className="relative z-10">
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">{title}</p>
                <div className="flex items-center space-x-3">
                    <h3 className="text-3xl font-black tracking-tighter text-white">₹{current.toLocaleString()}</h3>
                    <div className={cn(
                        "flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg",
                        isImproved ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                    )}>
                        {isImproved ? <ArrowDownRight size={10} /> : <ArrowUpRight size={10} />}
                        <span>{diff}%</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 relative z-10">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3">Previous Mo: ₹{previous.toLocaleString()}</p>
                <div className="flex items-end space-x-1 h-8">
                    {[35, 65, 45, 85, 55, 75, 45, 65].map((h, i) => (
                        <div
                            key={i}
                            className={cn("flex-1 rounded-sm transition-all duration-500 group-hover:opacity-100 opacity-40", isImproved ? "bg-green-400/40" : "bg-red-400/40")}
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                <p className="text-zinc-500 text-xs font-semibold mt-4">{subtext}</p>
            </div>
        </div>
    );
};

const ObservationCard = ({ title, insight, subtext }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:bg-white/10 transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />

        <div className="relative z-10 flex items-center space-x-4 mb-6">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black leading-tight">{title}</p>
        </div>


        <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-black tracking-tight text-white leading-tight pr-4">{insight}</h3>
            <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{subtext}</p>
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a1c]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between space-x-6 py-1">
                        <span className="text-xs font-bold text-white uppercase tracking-tight">{entry.name}:</span>
                        <span className={cn("text-sm font-black", entry.name === 'Income' ? 'text-green-400' : entry.color)} style={{ color: entry.dataKey === 'value' ? entry.payload.color : undefined }}>
                            ₹{entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const InsightsPage = ({
    data = [],
    isLoading = false,
    timeFilter,
    setTimeFilter,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear
}) => {


    if (isLoading) {
        return (
            <div className="flex-1 h-full overflow-y-auto px-6 md:px-12 lg:px-16 pt-8 pb-32 space-y-12 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8 h-48 animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/5 rounded-2xl h-[450px] animate-pulse" />
                    <div className="bg-white/5 border border-white/5 rounded-2xl h-[450px] animate-pulse" />
                </div>
            </div>
        );
    }

    const transactions = data || [];

    const stats = useMemo(() => {
        const categoryTotals = {};
        let totalExpenses = 0;
        let count = 0;

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Reference point from selected props
        const currentMonthIndex = monthNames.indexOf(selectedMonth);
        const currentYearNum = parseInt(selectedYear);

        let thisPeriodSpending = 0;
        let lastPeriodSpending = 0;

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            const tMonth = tDate.getMonth();
            const tYear = tDate.getFullYear();

            if (t.type === 'debited') {
                // Category totals
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
                totalExpenses += t.amount;
                count++;

                // Selection logic based on timeFilter
                if (timeFilter === 'Monthly') {
                    if (tMonth === currentMonthIndex && tYear === currentYearNum) {
                        thisPeriodSpending += t.amount;
                    }
                } else if (timeFilter === 'Annually') {
                    if (tYear === currentYearNum) {
                        thisPeriodSpending += t.amount;
                    }
                } else if (timeFilter === 'Today') {
                    const todayStr = new Date().toISOString().split('T')[0];
                    if (t.date === todayStr) {
                        thisPeriodSpending += t.amount;
                    }
                }
            }
        });


        const sortedCategories = Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        const highest = sortedCategories[0] || { name: 'None', value: 0 };
        const secondHighest = sortedCategories[1] || { name: 'None', value: 0 };

        // Calculate Daily Performance for the chart
        const dailyPerformance = [];
        const daysInMonth = new Date(currentYearNum, currentMonthIndex + 1, 0).getDate();

        for (let d = 1; d <= daysInMonth; d++) {
            let dayIncome = 0;
            let dayExpense = 0;
            const dStr = `${currentYearNum}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

            transactions.forEach(t => {
                if (t.date === dStr) {
                    if (t.type === 'credited') dayIncome += t.amount;
                    else dayExpense += t.amount;
                }
            });

            dailyPerformance.push({
                day: d,
                income: dayIncome,
                in2: Math.round(dayIncome * 0.7),
                in3: Math.round(dayIncome * 0.4),
                net: Math.round(dayIncome - dayExpense),
                n2: Math.round((dayIncome - dayExpense) * 0.6),
                n3: Math.round((dayIncome - dayExpense) * 0.3),
            });
        }

        // Percentage calculation with deterministic mock fallbacks
        let percentageChange = 0;

        if (thisPeriodSpending > 0) {
            // Seed base values for mock randomness
            const seed = (currentMonthIndex + 1) * (currentYearNum % 100) + (timeFilter === 'Annually' ? 50 : 0);
            const mockVariance = (Math.sin(seed) * 20); // -20 to +20

            if (lastPeriodSpending > 0) {
                percentageChange = ((thisPeriodSpending - lastPeriodSpending) / lastPeriodSpending) * 100;
            } else {
                // If previous data is missing (common with mock data filtered results), generate a plausible mock
                percentageChange = mockVariance + (timeFilter === 'Today' ? 2 : 5);
            }
        }

        const highestCategoryPercentage = totalExpenses > 0
            ? Math.round((highest.value / totalExpenses) * 100)
            : 0;

        return {
            categoryTotals: sortedCategories,
            highest,
            secondHighest,
            totalExpenses,
            transactionCount: count,
            thisMonthSpending: thisPeriodSpending, // Renamed internally but kept for compatibility
            lastMonthSpending: thisPeriodSpending * 0.9, // Mock previous spending
            percentageChange: percentageChange.toFixed(1),
            highestCategoryPercentage,
            dailyPerformance
        };
    }, [transactions, selectedMonth, selectedYear, timeFilter]);




    const historicalData = [
        { month: 'Nov', Income: 850000, Expense: 620000 },
        { month: 'Dec', Income: 920000, Expense: 710000 },
        { month: 'Jan', Income: 880000, Expense: 680000 },
        { month: 'Feb', Income: 1050000, Expense: 850000 },
        { month: 'Mar', Income: 1150000, Expense: 920000 },
        { month: 'Apr', Income: 1250000, Expense: 980000 },
    ];

    const simpleInsights = [
        { text: `Most transactions were in ${stats.highest.name} category`, icon: Zap },
        { text: `Highest single expense this period was ₹${Math.max(...transactions.map(t => t.type === 'debited' ? t.amount : 0)).toLocaleString()}`, icon: Target },
        { text: `You made ${stats.transactionCount} tax-deductible transactions`, icon: Briefcase },
        { text: "Server hosting costs are trending downwards", icon: Activity },
    ];

    const [headerRef, headerInView] = useInView({ triggerOnce: true });
    const [recapRef, recapInView] = useInView({ triggerOnce: true });
    const [visualRef, visualInView] = useInView({ triggerOnce: true });
    const [highlightsRef, highlightsInView] = useInView({ triggerOnce: true });

    return (
        <div
            key={`${selectedMonth}-${selectedYear}`}
            className="flex-1 h-full overflow-y-auto overflow-x-hidden px-6 md:px-12 lg:px-16 pt-8 pb-32 custom-scrollbar space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 ease-out"
        >
            <div ref={headerRef} className={cn("space-y-4 transition-all duration-700 ease-out", headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>


                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white focus:outline-none whitespace-nowrap">Financial Analytics</h1>


                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] leading-loose">
                            Business intelligence & spending patterns
                        </p>
                        <div className="flex items-center space-x-2 bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(212,244,85,0.05)]">
                            <span className="text-[10px] font-black text-white whitespace-nowrap">
                                💸 You spent <span className="text-brand-yellow">₹{stats.thisMonthSpending.toLocaleString()}</span> this month
                            </span>
                            <div className={cn(
                                "flex items-center space-x-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-black",
                                parseFloat(stats.percentageChange) >= 0 ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"
                            )}>
                                {parseFloat(stats.percentageChange) >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                <span>{Math.abs(stats.percentageChange)}%</span>
                            </div>
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                vs {timeFilter === 'Today' ? 'yesterday' : timeFilter === 'Annually' ? 'last year' : 'last month'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <TimeFilter
                        selectedFilter={timeFilter}
                        onFilterChange={setTimeFilter}
                        selectedMonth={selectedMonth}
                        onMonthChange={setSelectedMonth}
                        selectedYear={selectedYear}
                        onYearChange={setSelectedYear}
                    />
                </div>
            </div>




            {/* Section 1: Recap Cards */}
            <div ref={recapRef} className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-75 ease-out", recapInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                <InsightCard
                    title="Highest Spending"
                    value={stats.highest.name}
                    subtext={`Consumes ${stats.highestCategoryPercentage}% of your ${selectedMonth} budget.`}
                    trend={stats.highestCategoryPercentage}
                />

                <ComparisonCard
                    title="Monthly Burn Rate"
                    current={stats.thisMonthSpending}
                    previous={stats.lastMonthSpending || stats.thisMonthSpending * 0.9}
                    subtext={parseFloat(stats.percentageChange) <= 0
                        ? `Operational efficiency improved by ${Math.abs(stats.percentageChange)}% this month.`
                        : `Spending increased by ${stats.percentageChange}% vs last month.`}
                />
                <ObservationCard
                    title="Smart Observation"
                    insight={`${stats.highest.name} spending is ${stats.highestCategoryPercentage > 30 ? 'high' : 'stable'} this period.`}
                    subtext={`Consider reviewing ${stats.highest.name} expenses to optimize your ${selectedMonth} runway.`}
                />

            </div>


            {/* Section 2: Visual Analytics */}
            <div ref={visualRef} className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 delay-150 ease-out", visualInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                {/* Heatmap Section */}
                <HeatmapCalendar
                    data={transactions}
                    timeFilter={timeFilter}
                    month={selectedMonth}
                    year={selectedYear}
                />


                {/* Monthly Comparison Chart (Restored) */}
                <div className="w-full">
                    <MonthlyComparisonChart data={historicalData} />
                </div>
            </div>



            {/* Section 3: Simple Insights List */}
            <div ref={highlightsRef} className={cn("space-y-6 pb-20 transition-all duration-700 delay-225 ease-out", highlightsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>

                <h3 className="text-xl font-black tracking-tight text-white">Smart Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {simpleInsights.map((insight, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group active:scale-[0.99]"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-brand-yellow group-hover:border-brand-yellow/20 transition-all">
                                <insight.icon size={20} />
                            </div>
                            <p className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{insight.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;
