import React, { useMemo, useState } from 'react';
import { cn } from '../utils/cn';
import { useInView } from '../hooks/useInView';


const HeatmapCalendar = ({ data = [], timeFilter = 'Monthly', month = 'April', year = '2026' }) => {
    const [hoveredDay, setHoveredDay] = useState(null);

    const heatmapData = useMemo(() => {
        const dailyStats = {};
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthIndex = monthNames.indexOf(month);
        const yearNum = parseInt(year);

        // 1. Determine date range
        let startDate, endDate;
        if (timeFilter === 'Annually') {
            startDate = new Date(yearNum, 0, 1);
            endDate = new Date(yearNum, 11, 31);
        } else {
            startDate = new Date(yearNum, monthIndex, 1);
            endDate = new Date(yearNum, monthIndex + 1, 0);
        }

        // 2. Initialize daily stats for the range
        const days = [];
        let curr = new Date(startDate);

        const formatDate = (d) => {
            const yearStr = d.getFullYear();
            const monthStr = String(d.getMonth() + 1).padStart(2, '0');
            const dayStr = String(d.getDate()).padStart(2, '0');
            return `${yearStr}-${monthStr}-${dayStr}`;
        };

        while (curr <= endDate) {
            const dateKey = formatDate(curr);
            dailyStats[dateKey] = { amount: 0, count: 0, date: new Date(curr) };
            curr.setDate(curr.getDate() + 1);
        }

        // 3. Aggregate transaction data
        data.forEach(t => {
            if (t.type === 'debited') {
                const dateKey = typeof t.date === 'string' ? t.date : t.date.toISOString().split('T')[0];
                if (dailyStats[dateKey]) {
                    dailyStats[dateKey].amount += t.amount;
                    dailyStats[dateKey].count += 1;
                }
            }
        });



        const statsArray = Object.entries(dailyStats).map(([date, stats]) => ({
            date,
            ...stats
        }));

        const maxAmount = Math.max(...statsArray.map(s => s.amount), 1);

        return {
            stats: statsArray,
            maxAmount
        };
    }, [data, timeFilter]);

    const getColor = (amount, max) => {
        if (amount === 0) return 'bg-white/5';
        const ratio = amount / max;
        if (ratio < 0.25) return 'bg-brand-yellow/20';
        if (ratio < 0.5) return 'bg-brand-yellow/40';
        if (ratio < 0.75) return 'bg-brand-yellow/70';
        return 'bg-brand-yellow';
    };

    const [ref, isInView] = useInView({ triggerOnce: true });

    return (
        <div ref={ref} className={cn(
            "bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 sm:space-y-8 flex flex-col h-[400px] sm:h-[450px] transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>

            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black tracking-tight text-white">Spending Heatmap</h3>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">Daily expenditure intensity</p>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span className="hidden xs:inline">Less</span>
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5" />
                        <div className="w-3 h-3 rounded-sm bg-brand-yellow/20" />
                        <div className="w-3 h-3 rounded-sm bg-brand-yellow/40" />
                        <div className="w-3 h-3 rounded-sm bg-brand-yellow/70" />
                        <div className="w-3 h-3 rounded-sm bg-brand-yellow" />
                    </div>
                    <span className="hidden xs:inline">More</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative mt-2 sm:mt-4">
                <div className={cn(
                    "grid gap-1 sm:gap-2 justify-items-center mb-6",
                    timeFilter === 'Annually'
                        ? "grid-cols-7 sm:grid-cols-14 md:grid-cols-21 lg:grid-cols-28"
                        : "grid-cols-7 sm:grid-cols-7"
                )}>
                    {heatmapData.stats.map((day, idx) => (

                        <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={cn(
                                "w-full aspect-square rounded-sm transition-all duration-300 relative group cursor-crosshair",
                                getColor(day.amount, heatmapData.maxAmount),
                                hoveredDay?.date === day.date ? "ring-2 ring-white/20 scale-110 z-10" : "hover:scale-105"
                            )}
                        >
                        </div>
                    ))}
                </div>


                {/* Legend & Tooltip Overlay */}
                {hoveredDay && (
                    <div className="absolute top-0 right-0 bg-[#1a1a1c] border border-white/10 p-3 rounded-xl shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">
                            {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <div className="space-y-1">
                            <div className="flex justify-between space-x-4">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Spent:</span>
                                <span className="text-xs font-black text-brand-yellow">₹{hoveredDay.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Transactions:</span>
                                <span className="text-xs font-black text-white">{hoveredDay.count}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {timeFilter === 'Annually' && (
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center">
                    Showing full year activity grid
                </p>
            )}
        </div>
    );
};

export default HeatmapCalendar;
