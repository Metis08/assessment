import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const TransactionsList = ({ data = [], isLoading = false, onViewAll }) => {
    return (
        <div className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-gray-400 text-xl font-medium tracking-tight">Recent Transactions</h1>
                <button
                    onClick={onViewAll}
                    disabled={isLoading}
                    className="text-[10px] font-black uppercase tracking-widest text-brand-yellow hover:opacity-80 transition-opacity disabled:opacity-30"
                >
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    // Skeleton Loading Rows
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/5" />
                                <div className="space-y-2">
                                    <div className="w-24 h-3 bg-white/5 rounded" />
                                    <div className="w-16 h-2 bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="w-20 h-4 bg-white/5 rounded" />
                        </div>
                    ))
                ) : data.length > 0 ? (
                    data.slice(0, 5).map((t) => (
                        <div key={t.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="flex flex-col">
                                <span className="font-semibold text-white group-hover:text-brand-yellow transition-colors">{t.category}</span>
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t.date}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`font-bold text-sm ${t.type === 'Income' ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{t.status}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-sm italic">No recent transactions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionsList;
