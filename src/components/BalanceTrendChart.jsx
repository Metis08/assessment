import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '../utils/cn';

const GlowingDot = (props) => {
    const { cx, cy, payload, index } = props;

    // First dot pulsing animation
    if (index === 0) {
        return (
            <g className="animate-in fade-in zoom-in duration-700">
                <circle cx={cx} cy={cy} r={8} fill="#D4F455" className="opacity-20 animate-pulse blur-[4px]" />
                <circle cx={cx} cy={cy} r={4} fill="#D4F455" className="shadow-[0_0_10px_#D4F455]" />
                <circle cx={cx} cy={cy} r={2} fill="#121214" />
            </g>
        );
    }

    if (payload.day !== '6') return null;

    return (
        <g>
            <circle cx={cx} cy={cy} r={6} fill="#D4F455" className="opacity-40 blur-[4px]" />
            <circle cx={cx} cy={cy} r={3} fill="#D4F455" />
            <circle cx={cx} cy={cy} r={1.5} fill="#121214" />
        </g>
    );
};

const BalanceTrendChart = ({ data }) => {
    return (
        <div className="bg-card-bg p-6 rounded-2xl h-[220px] shadow-2xl border border-white/5 relative overflow-hidden">
            <h3 className="text-gray-400 text-xl font-bold mb-4 tracking-tight">Balance Trend</h3>
            <div className="h-[140px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, left: -20, right: 5, bottom: 0 }}>

                        <defs>
                            <linearGradient id="balGrad1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4F455" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#D4F455" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="balGrad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4F455" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#D4F455" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} vertical={true} stroke="#ffffff05" strokeDasharray="1 0" />
                        <XAxis
                            dataKey="display"
                            axisLine={{ stroke: '#ffffff40' }}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 8, fontWeight: 'bold' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={{ stroke: '#ffffff40' }}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 8, fontWeight: 'bold' }}
                            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#121214]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl">
                                            <p className="text-white font-bold text-lg">₹{payload[0].value.toLocaleString()}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area type="monotone" dataKey="b3" stroke="none" fill="url(#balGrad2)" animationDuration={2000} animationEasing="ease-in-out" />
                        <Area type="monotone" dataKey="b2" stroke="none" fill="url(#balGrad1)" animationDuration={2200} animationEasing="ease-in-out" />
                        <Area
                            type="monotone"
                            dataKey="balance"
                            stroke="#D4F455"
                            strokeWidth={3}
                            fill="url(#balGrad1)"
                            dot={<GlowingDot />}
                            animationDuration={2500}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="absolute bottom-6 right-8">
                <span className="text-[10px] font-bold text-brand-yellow tracking-tighter">+₹1,400</span>
            </div>
        </div>
    );
};

export default BalanceTrendChart;
