import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

const TimeFilter = ({
    selectedFilter,
    onFilterChange,
    selectedMonth,
    onMonthChange,
    selectedYear,
    onYearChange
}) => {
    const filters = ['Today', 'Monthly', 'Annually'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = ['2024', '2025', '2026'];

    return (
        <div className="flex items-center justify-between w-full mb-8 pt-4">
            {/* Left: Filter Pills */}
            <div className="flex items-center bg-zinc-900/50 p-1 rounded-full border border-white/5 backdrop-blur-md">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95",
                            selectedFilter === f
                                ? "bg-brand-yellow text-black shadow-[0_0_15px_rgba(212,244,85,0.4)]"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Right: Dynamic Selector */}
            <div className="relative overflow-hidden h-10 flex items-center min-w-[160px] justify-end">
                {/* Today View */}
                {selectedFilter === 'Today' && (
                    <div className="flex items-center space-x-3 text-zinc-400 animate-in fade-in slide-in-from-right-4 duration-500">
                        <Calendar size={14} className="text-zinc-500" />
                        <span className="text-xs font-black uppercase tracking-widest">April 5, 2026</span>
                    </div>
                )}

                {/* Monthly View */}
                {selectedFilter === 'Monthly' && (
                    <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-4 duration-500">
                        <select
                            value={selectedMonth}
                            onChange={(e) => onMonthChange(e.target.value)}
                            className="bg-zinc-900 text-zinc-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-zinc-800 outline-none hover:border-zinc-700 transition-colors appearance-none pr-10 cursor-pointer min-w-[140px] shadow-2xl"
                        >
                            {months.map(m => (
                                <option key={m} value={m}>{m} 2026</option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none text-zinc-500">
                            <ChevronDown size={14} />
                        </div>
                    </div>
                )}

                {/* Annually View */}
                {selectedFilter === 'Annually' && (
                    <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-4 duration-500">
                        <select
                            value={selectedYear}
                            onChange={(e) => onYearChange(e.target.value)}
                            className="bg-zinc-900 text-zinc-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-zinc-800 outline-none hover:border-zinc-700 transition-colors appearance-none pr-10 cursor-pointer min-w-[100px] shadow-2xl"
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none text-zinc-500">
                            <ChevronDown size={14} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeFilter;
