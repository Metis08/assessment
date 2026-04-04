import React from 'react';
import NumberTicker from './NumberTicker';

const StatsCard = ({ label, value, colorClass }) => {
    return (
        <div className="bg-card-bg px-8 py-5 rounded-xl border border-white/5 shadow-2xl flex flex-col justify-center min-w-[200px] transition-all duration-300 hover:scale-[1.02]">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1 opacity-60">{label}</span>
            <div className={`text-4xl font-black tracking-tighter ${colorClass} drop-shadow-[0_0_15px_rgba(212,244,85,0.2)]`}>
                <NumberTicker value={value} />
            </div>
        </div>
    );
};

export default StatsCard;
