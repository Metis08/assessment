import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { cn } from '../utils/cn';
import { useInView } from '../hooks/useInView';

const MonthlyComparisonChart = ({ data }) => {
    const [ref, inView] = useInView({ triggerOnce: true });

    return (
        <div ref={ref} className={cn(
            "bg-card-bg p-6 sm:p-8 rounded-2xl h-[400px] border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-700 ease-out",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 text-center md:text-left">
                <div>
                    <h3 className="text-white text-2xl font-black tracking-tight">Monthly Comparison</h3>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Income vs Expenditure Strategy</p>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                        barGap={12}
                    >
                        <CartesianGrid vertical={false} stroke="#ffffff03" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10, fontWeight: '900' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10, fontWeight: '900' }}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'white', fillOpacity: 0.03 }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-[#121214]/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
                                            <p className="text-zinc-500 text-[10px] uppercase mb-3 font-black tracking-widest">{label} Report</p>
                                            <div className="space-y-2">
                                                {payload.map((entry, index) => (
                                                    <div key={index} className="flex justify-between items-center space-x-10">
                                                        <span className="text-zinc-400 text-xs font-bold uppercase">{entry.name}:</span>
                                                        <span className="font-black text-xs" style={{ color: entry.color }}>
                                                            ₹{entry.value.toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            name="Income"
                            dataKey="Income"
                            fill="#00F5FF"
                            radius={[6, 6, 0, 0]}
                            barSize={15}
                            isAnimationActive={inView}
                            animationDuration={800}
                        />

                        <Bar
                            name="Expense"
                            dataKey="Expense"
                            fill="#D4F455"
                            radius={[6, 6, 0, 0]}
                            barSize={15}
                            isAnimationActive={inView}
                            animationDuration={800}
                            animationDelay={150}
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Inflow</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-1.5 rounded-full bg-brand-yellow/80 shadow-[0_0_10px_rgba(212,244,85,0.3)]" />
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Outflow</span>
                </div>
            </div>
        </div>
    );
};

export default MonthlyComparisonChart;
