import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                cornerRadius={12}
            />
        </g>
    );
};

const CategoricalExpenseChart = ({ data, isVisible = true }) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(-1);
    };

    const activeItem = activeIndex !== -1 ? data[activeIndex] : null;

    return (
        <div className="bg-card-bg p-6 rounded-2xl flex flex-col h-full border border-white/5 shadow-2xl transition-all duration-500 overflow-hidden">
            <h3 className="text-gray-300 text-2xl font-medium mb-4 text-center tracking-tight">Categorical Expense</h3>

            <div className="h-[280px] w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, bottom: 0 }}>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            innerRadius={75}
                            outerRadius={95}
                            paddingAngle={8}
                            cornerRadius={10}
                            stroke="none"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            animationBegin={0}
                            animationDuration={1500}
                            animationEasing="ease-out"
                            isAnimationActive={isVisible}
                        >

                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    style={{
                                        filter: activeIndex === index ? `drop-shadow(0 0 20px ${entry.color}cc)` : 'none',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    {activeItem ? (
                        <div className="text-center animate-in fade-in zoom-in duration-300">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-1">
                                {activeItem.name}
                            </span>
                            <span className="text-2xl font-bold tracking-wider text-white">
                                ₹{activeItem.value.toLocaleString()}
                            </span>
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-1">Total</span>
                            <span className="text-3xl font-bold tracking-wider text-white opacity-90 animate-in fade-in duration-500">₹10.5K</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-3 mt-auto px-6 border-t border-white/5 pt-6 pb-2">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center space-x-4 transition-all duration-300 ${activeIndex === index ? 'translate-x-2' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(-1)}
                    >
                        <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${activeIndex === index ? 'scale-125 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}
                            style={{ backgroundColor: item.color }}
                        />
                        <span className={`text-[15px] transition-colors duration-300 ${activeIndex === index ? 'text-white font-bold' : 'text-gray-400'}`}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoricalExpenseChart;
