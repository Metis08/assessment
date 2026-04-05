import React from 'react';
import NumberTicker from './NumberTicker';

const StatsCard = ({ label, value, colorClass = "text-brand-yellow" }) => {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-6 min-w-[220px] flex-1 shadow-2xl hover:bg-white/10 transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-yellow/5 rounded-full blur-3xl group-hover:bg-brand-yellow/10 transition-all" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1 opacity-60">{label}</span>
            <div className={`text-3xl lg:text-4xl font-black tracking-tighter ${colorClass} drop-shadow-[0_0_15px_rgba(212,244,85,0.2)]`}>
                <NumberTicker value={value} />
            </div>
        </div>
    );
};

export default StatsCard;
