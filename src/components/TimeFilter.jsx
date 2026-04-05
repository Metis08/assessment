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
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full mb-12 pt-6 gap-8">
            {/* Left: Filter Pills */}
            <div className="flex items-center bg-zinc-900/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md w-full sm:w-fit overflow-x-auto no-scrollbar justify-center sm:justify-start">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={cn(
                            "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 whitespace-nowrap",
                            selectedFilter === f
                                ? "bg-brand-yellow text-black shadow-[0_0_20px_rgba(212,244,85,0.3)]"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Right: Dynamic Selector */}
            <div className="relative flex items-center min-w-0 flex-1 sm:flex-none overflow-x-auto no-scrollbar scroll-smooth">
                {/* Monthly View */}
                {selectedFilter === 'Monthly' && (
                    <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
                        {months.map(m => (
                            <button
                                key={m}
                                onClick={() => onMonthChange(m)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border active:scale-95",
                                    selectedMonth === m
                                        ? "bg-white/10 text-brand-yellow border-brand-yellow/30 shadow-[0_0_15px_rgba(212,244,85,0.15)]"
                                        : "text-zinc-500 border-white/5 hover:text-zinc-300 hover:bg-white/5"
                                )}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                )}

                {/* Annually View */}
                {selectedFilter === 'Annually' && (
                    <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
                        {years.map(y => (
                            <button
                                key={y}
                                onClick={() => onYearChange(y)}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border active:scale-95",
                                    selectedYear === y
                                        ? "bg-white/10 text-brand-yellow border-brand-yellow/30 shadow-[0_0_15px_rgba(212,244,85,0.15)]"
                                        : "text-zinc-500 border-white/5 hover:text-zinc-300 hover:bg-white/5"
                                )}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                )}

                {/* Today View */}
                {selectedFilter === 'Today' && (
                    <div className="flex items-center space-x-3 text-zinc-400 animate-in fade-in slide-in-from-right-8 duration-500 px-4">
                        <Calendar size={14} className="text-zinc-500" />
                        <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">April 5, 2026</span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default TimeFilter;
