import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '../utils/cn';

const CyanGlowingDot = (props) => {
    const { cx, cy, payload, index } = props;

    // First dot pulsing animation
    if (index === 0) {
        return (
            <g className="animate-in fade-in zoom-in duration-700">
                <circle cx={cx} cy={cy} r={8} fill="#00F5FF" className="opacity-20 animate-pulse blur-[4px]" />
                <circle cx={cx} cy={cy} r={4} fill="#00F5FF" className="shadow-[0_0_10px_#00F5FF]" />
                <circle cx={cx} cy={cy} r={2} fill="#121214" />
            </g>
        );
    }

    if (payload.time !== '6') return null;

    return (
        <g>
            <circle cx={cx} cy={cy} r={7} fill="#00F5FF" className="opacity-30 blur-[4px]" />
            <circle cx={cx} cy={cy} r={4} fill="#00F5FF" />
            <circle cx={cx} cy={cy} r={2} fill="#121214" />
        </g>
    );
};

const ExpenseTrendChart = ({ data }) => {
    return (
        <div className="bg-card-bg p-6 rounded-2xl h-[220px] shadow-2xl border border-white/5 relative overflow-hidden">
            <h3 className="text-gray-400 text-xl font-bold mb-4 tracking-tight">Expense Trend</h3>
            <div className="h-[140px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, left: -25, right: 5, bottom: 0 }}>
                        <defs>
                            <linearGradient id="expGrad1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="expGrad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
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
                        <Area type="monotone" dataKey="e3" stroke="none" fill="url(#expGrad2)" animationDuration={2000} animationEasing="ease-in-out" />
                        <Area type="monotone" dataKey="e2" stroke="none" fill="url(#expGrad1)" animationDuration={2200} animationEasing="ease-in-out" />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#00F5FF"
                            strokeWidth={3}
                            fill="url(#expGrad1)"
                            dot={<CyanGlowingDot />}
                            animationDuration={2500}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="absolute bottom-6 right-8">
                <span className="text-[10px] font-bold text-white opacity-80">₹125,890.00</span>
            </div>
        </div>
    );
};

export default ExpenseTrendChart;
