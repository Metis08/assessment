import React from 'react';

const transactions = [
    { id: 1, category: 'Food', date: '2024-03-28', amount: 50, type: 'expense' },
    { id: 2, category: 'Salary', date: '2024-03-25', amount: 3000, type: 'income' },
    { id: 3, category: 'Rent', date: '2024-03-01', amount: 1200, type: 'expense' },
    { id: 4, category: 'Shopping', date: '2024-03-15', amount: 200, type: 'expense' },
    { id: 5, category: 'Freelance', date: '2024-03-20', amount: 500, type: 'income' },
];

const TransactionsList = () => {
    return (
        <div className="bg-card-bg p-6 rounded-3xl border border-white/5">
            <h3 className="text-gray-400 text-xl font-medium mb-6">Recent Transactions</h3>
            <div className="space-y-4">
                {transactions.map((t) => (
                    <div key={t.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-semibold text-white">{t.category}</span>
                            <span className="text-xs text-gray-500">{t.date}</span>
                        </div>
                        <span className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {t.type === 'income' ? '+' : '-'}${t.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionsList;
