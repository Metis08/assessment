import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '../utils/cn';

const GlowingDot = (props) => {
    const { cx, cy, payload, index } = props;

    // First dot pulsing animation
    if (index === 0) {
        return (
            <g className="animate-in fade-in zoom-in duration-700">
                <circle cx={cx} cy={cy} r={10} fill="#00F5FF" className="opacity-20 animate-pulse blur-[6px]" />
                <circle cx={cx} cy={cy} r={5} fill="#00F5FF" className="shadow-[0_0_15px_#00F5FF]" />
                <circle cx={cx} cy={cy} r={2} fill="#121214" />
            </g>
        );
    }

    // Show glow on a few high points (indices 5, 12, 19, 26)
    if (![5, 12, 19, 26].includes(index)) return null;

    return (
        <g>
            <circle cx={cx} cy={cy} r={8} fill="#00F5FF" className="opacity-20 blur-[5px]" />
            <circle cx={cx} cy={cy} r={4} fill="#00F5FF" />
            <circle cx={cx} cy={cy} r={2} fill="#121214" />
        </g>
    );
};

const IncomeExpenseChart = ({ data }) => {
    return (
        <div className="bg-card-bg p-6 rounded-2xl h-[400px] border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h3 className="text-gray-300 text-2xl font-bold tracking-tight">Daily Performance</h3>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Universal Financial Delta</p>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Inflow</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow-[0_0_10px_rgba(212,244,85,0.5)]" />
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Profit</span>
                    </div>
                </div>
            </div>

            <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>

                        <defs>
                            <linearGradient id="inFlowGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4F455" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#D4F455" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={true} horizontal={false} stroke="#ffffff03" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={({ x, y, payload }) => {
                                const day = payload.value;
                                if (day === 1 || day === 8 || day === 15 || day === 22 || day === 29) {
                                    return (
                                        <text x={x} y={y + 20} fill="#374151" fontSize={10} fontWeight="900" textAnchor="middle">
                                            {`W${Math.floor(day / 7) + 1}`}
                                        </text>
                                    );
                                }
                                return null;
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#1F2937', fontSize: 10, fontWeight: '900' }}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const income = payload.find(p => p.dataKey === 'income')?.value || 0;
                                    const net = payload.find(p => p.dataKey === 'net')?.value || 0;
                                    return (
                                        <div className="bg-[#121214]/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl z-[200]">
                                            <p className="text-gray-500 text-[9px] uppercase mb-3 font-black tracking-widest text-center">Day {label}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center space-x-10">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Inflow:</span>
                                                    <span className="text-cyan-400 font-black text-xs">${income.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center space-x-10 border-t border-white/5 pt-2">
                                                    <span className="text-gray-400 text-[10px] font-bold uppercase">Net Delta:</span>
                                                    <span className="text-brand-yellow font-black text-xs">${net.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        {/* Layered Income Areas */}
                        <Area type="monotone" dataKey="in3" stroke="none" fill="url(#inFlowGrad)" fillOpacity={0.4} animationDuration={2000} animationEasing="ease-in-out" />
                        <Area type="monotone" dataKey="in2" stroke="none" fill="url(#inFlowGrad)" fillOpacity={0.6} animationDuration={2200} animationEasing="ease-in-out" />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#00F5FF"
                            strokeWidth={3}
                            fill="url(#inFlowGrad)"
                            dot={<GlowingDot />}
                            animationDuration={2500}
                            animationEasing="ease-in-out"
                        />
                        {/* Layered Profit Areas */}
                        <Area type="monotone" dataKey="n3" stroke="none" fill="url(#profitGrad)" fillOpacity={0.3} animationDuration={2000} animationEasing="ease-in-out" />
                        <Area type="monotone" dataKey="n2" stroke="none" fill="url(#profitGrad)" fillOpacity={0.5} animationDuration={2200} animationEasing="ease-in-out" />
                        <Area
                            type="monotone"
                            dataKey="net"
                            stroke="#D4F455"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            fill="url(#profitGrad)"
                            animationDuration={2500}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
