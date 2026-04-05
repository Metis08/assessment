import React from 'react';
import NumberTicker from './NumberTicker';

const StatsCard = ({ label, value, colorClass = "text-brand-yellow" }) => {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 flex-1 shadow-2xl hover:bg-white/10 transition-all group overflow-hidden relative min-w-0">
            <div className="absolute -right-4 -top-4 w-16 h-16 sm:w-20 sm:h-20 bg-brand-yellow/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-all" />
            <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-black mb-0.5 sm:mb-1 opacity-60 block truncate">{label}</span>
            <div className={`text-sm sm:text-2xl lg:text-3xl font-black tracking-tight ${colorClass} drop-shadow-[0_0_15px_rgba(212,244,85,0.2)] whitespace-nowrap`}>
                ₹<NumberTicker value={value} />
            </div>
        </div>
    );
};


export default StatsCard;
