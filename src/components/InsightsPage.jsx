import React, { useMemo } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Zap,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Play,
    Coffee,
    Car,
    Wallet,
    Tv,
    MapPin,
    Utensils,
    Activity,
    Briefcase,
    Globe,
    Cpu,
    Hash
} from 'lucide-react';
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
import { cn } from '../utils/cn';

const iconMap = {
    ShoppingBag, Play, Coffee, Car, Wallet, Tv, MapPin, Utensils, Activity, Briefcase, Globe, Cpu, Hash
};

const InsightCard = ({ title, value, subtext, indicator, trend, colorClass = "text-brand-yellow" }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-4 hover:bg-white/10 transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-yellow/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-all" />

        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">{title}</p>
                <h3 className={cn("text-3xl font-black tracking-tighter", colorClass)}>{value}</h3>
            </div>
            {indicator && (
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-zinc-400 group-hover:text-brand-yellow transition-all")}>
                    {indicator}
                </div>
            )}
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

const ObservationCard = ({ title, insight, icon: Icon, subtext }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col justify-between hover:bg-white/10 transition-all group overflow-hidden relative">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all" />

        <div className="relative z-10 flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-brand-yellow/10 text-brand-yellow shadow-lg shadow-brand-yellow/5">
                <Icon size={24} />
            </div>
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

const InsightsPage = ({ data = [], isLoading = false }) => {
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

        transactions.forEach(t => {
            if (t.type === 'debited') {
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
                totalExpenses += t.amount;
                count++;
            }
        });

        const sortedCategories = Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        const highest = sortedCategories[0] || { name: 'None', value: 0 };
        const secondHighest = sortedCategories[1] || { name: 'None', value: 0 };

        return {
            categoryTotals: sortedCategories,
            highest,
            secondHighest,
            totalExpenses,
            transactionCount: count
        };
    }, [transactions]);

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

    return (
        <div className="flex-1 h-full overflow-y-auto px-6 md:px-12 lg:px-16 pt-8 pb-32 custom-scrollbar space-y-12">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Financial Analytics</h1>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Business intelligence & spending patterns</p>
            </div>

            {/* Section 1: Recap Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InsightCard
                    title="Highest Spending"
                    value={stats.highest.name}
                    subtext="Consumes 42% of your monthly operational budget."
                    trend={42}
                    indicator={React.createElement(iconMap[transactions.find(t => t.category === stats.highest.name)?.icon] || ShoppingBag, { size: 20 })}
                />
                <ComparisonCard
                    title="Monthly Burn Rate"
                    current={stats.totalExpenses}
                    previous={stats.totalExpenses * 0.92} // Mocked historical
                    subtext="Your operational efficiency improved by 8% this month."
                />
                <ObservationCard
                    title="Smart Observation"
                    insight="SaaS subscriptions increased by 12% vs last month."
                    icon={Zap}
                    subtext="Consider consolidating redundant communication tools as you scale."
                />
            </div>

            {/* Section 2: Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Breakdown (Horizontal Bar) */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-8 h-[450px] flex flex-col">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-white">Category Breakdown</h3>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">Expense distribution by department</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500">
                            <Activity size={20} />
                        </div>
                    </div>

                    <div className="flex-1 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stats.categoryTotals.slice(0, 6)}
                                layout="vertical"
                                margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
                                barSize={14}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 10, fontWeight: 900 }}
                                    width={120}
                                    interval={0}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {stats.categoryTotals.slice(0, 6).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? '#D4F455' : index === 1 ? '#60a5fa' : index === 2 ? '#f472b6' : '#27272a'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Income vs Expense (Stacked Bar) */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl space-y-8 h-[450px] flex flex-col">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-white">Monthly Overview</h3>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">Revenue vs Expenditure comparison</p>
                        </div>
                        <div className="flex items-center space-x-6 mr-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-brand-yellow" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Income</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Expense</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={historicalData}
                                margin={{ top: 20, right: 10, left: 40, bottom: 0 }}
                                barGap={12}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 10, fontWeight: 900 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 10, fontWeight: 900 }}
                                    width={60}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar dataKey="Income" fill="#D4F455" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Expense" fill="#3b82f6" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Section 3: Simple Insights List */}
            <div className="space-y-6 pb-20">
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
