import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../utils/cn';

const TimeFilter = ({
    selectedFilter,
    onFilterChange,
    selectedMonth,
    onMonthChange,
    selectedYear,
    onYearChange
}) => {
    const scrollRef = useRef(null);
    const filters = ['Today', 'Monthly', 'Annually'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = ['2024', '2025', '2026'];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-12 pt-6 gap-8">
            {/* Left: Filter Pills */}
            <div className="flex items-center bg-zinc-900/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md w-full lg:w-fit shrink-0 overflow-x-auto no-scrollbar justify-center lg:justify-start">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => onFilterChange(f)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 whitespace-nowrap",
                            selectedFilter === f
                                ? "bg-brand-yellow text-black shadow-[0_0_25px_rgba(212,244,85,0.25)]"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Right: Dynamic Selector with Static Frame & Sliding List */}
            <div className="relative flex items-center w-full lg:max-w-2xl bg-zinc-900/30 rounded-2xl border border-white/5 p-1 group">
                {/* Scroll Buttons (visible on hover/active if content overflows) */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-2 z-10 p-2 bg-zinc-900/80 rounded-xl border border-white/10 text-zinc-400 hover:text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hidden sm:block"
                >
                    <ChevronLeft size={16} />
                </button>

                <div
                    ref={scrollRef}
                    className="flex-1 flex items-center overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-12 py-1"
                >
                    {/* Monthly View */}
                    {selectedFilter === 'Monthly' && (
                        <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
                            {months.map(m => (
                                <button
                                    key={m}
                                    onClick={() => onMonthChange(m)}
                                    className={cn(
                                        "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border active:scale-95",
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
                                        "px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border active:scale-95",
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
                        <div className="flex items-center space-x-4 text-zinc-400 animate-in fade-in slide-in-from-right-8 duration-500 py-2">
                            <Calendar size={16} className="text-brand-yellow opacity-70" />
                            <span className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap text-white">April 5, 2026</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-2 z-10 p-2 bg-zinc-900/80 rounded-xl border border-white/10 text-zinc-400 hover:text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hidden sm:block"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default TimeFilter;
