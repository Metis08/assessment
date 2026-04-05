import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Clock,
    ShoppingBag,
    Play,
    Coffee,
    Car,
    Wallet,
    Tv,
    MapPin,
    Utensils,
    Activity,
    Briefcase,
    Edit2,
    Trash2,
    ArrowUpRight,
    ArrowDownLeft,
    X,
    ChevronDown,
    ShieldAlert,
    ShieldCheck,
    ArrowUp,
    ArrowDown,
    ArrowUpDown
} from 'lucide-react';
import { cn } from '../utils/cn';

const iconMap = {
    ShoppingBag,
    Play,
    Coffee,
    Car,
    Wallet,
    Tv,
    MapPin,
    Utensils,
    Activity,
    Briefcase,
};

const FilterPill = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap active:scale-95",
            active
                ? "bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20"
                : "text-zinc-500 hover:text-white hover:bg-white/5"
        )}
    >
        {label}
    </button>
);

const StatusBadge = ({ status }) => {
    const config = {
        Completed: { color: 'text-green-400 bg-green-400/10 border-green-500/20', dot: 'bg-green-400' },
        Pending: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20', dot: 'bg-yellow-400' },
        Processing: { color: 'text-blue-400 bg-blue-400/10 border-blue-500/20', dot: 'bg-blue-400' },
    };
    const { color, dot } = config[status] || config.Pending;

    return (
        <span className={cn("inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border", color)}>
            <span className={cn("w-1 h-1 rounded-full", dot)} />
            <span>{status}</span>
        </span>
    );
};

const RBACModal = ({ isOpen, onClose, title, message, type = 'restricted', onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
            <div className={cn(
                "bg-[#1a1a1c] border border-white/5 rounded-2xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300",
                type === 'admin' ? 'border-brand-yellow/20' : 'border-red-500/20'
            )}>
                <div className="p-10 text-center">
                    <div className={cn(
                        "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-8",
                        type === 'admin' ? 'bg-brand-yellow/10 text-brand-yellow' : 'bg-red-500/10 text-red-500'
                    )}>
                        {type === 'admin' ? <ShieldCheck size={40} /> : <ShieldAlert size={40} />}
                    </div>

                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
                    <p className="text-zinc-500 font-medium leading-relaxed mb-10 text-sm">{message}</p>

                    <div className="flex flex-col space-y-3">
                        {type === 'admin' ? (
                            <>
                                <button
                                    onClick={onConfirm}
                                    className="w-full bg-brand-yellow text-black font-black py-4 rounded-2xl hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-brand-yellow/20"
                                >
                                    Continue
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full bg-white/5 text-zinc-400 font-black py-4 rounded-2xl hover:text-white transition-all transform active:scale-95"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClose}
                                className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-95 shadow-xl"
                            >
                                OK
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
            <div className="bg-[#1a1a1c] border border-white/5 rounded-[2rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
                                {React.createElement(iconMap[transaction.icon] || Wallet, { size: 22, className: "text-brand-yellow" })}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">{transaction.name}</h3>
                                <p className="text-zinc-500 font-medium text-xs tracking-wide">{transaction.category}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                            <X size={20} className="text-zinc-500 hover:text-white" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Status</span>
                            <StatusBadge status={transaction.status} />
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Date & Time</span>
                            <span className="text-white font-bold text-sm">{transaction.date} • {transaction.time}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Type</span>
                            <span className={cn("font-bold text-xs capitalize px-2 py-0.5 rounded-md", transaction.type === 'credited' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400')}>
                                {transaction.type}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Amount</span>
                            <span className={cn("text-3xl font-black tracking-tighter", transaction.type === 'credited' ? 'text-green-400' : 'text-white')}>
                                {transaction.type === 'credited' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button className="w-full mt-10 bg-brand-yellow text-black font-black py-4 rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-brand-yellow/10">
                        Download Statement
                    </button>
                </div>
            </div>
        </div>
    );
};

const TransactionsPage = ({ data, role = 'Admin', setRole, timeFilter, setTimeFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [showAdminConfirmModal, setShowAdminConfirmModal] = useState(false);
    const [showRestrictedModal, setShowRestrictedModal] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsRoleDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRoleSelect = (targetRole) => {
        if (targetRole === role) {
            setIsRoleDropdownOpen(false);
            return;
        }

        if (targetRole === 'Admin' && role === 'Viewer') {
            setShowAdminConfirmModal(true);
        } else {
            setRole(targetRole);
        }
        setIsRoleDropdownOpen(false);
    };

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setTimeFilter('Monthly');
        setStatusFilter('All');
        setTypeFilter('All');
    };

    const filteredTransactions = useMemo(() => {
        let result = data.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
            const matchesType = typeFilter === 'All' || t.type === typeFilter.toLowerCase();
            return matchesSearch && matchesStatus && matchesType;
        });

        result.sort((a, b) => {
            if (sortConfig.key === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortConfig.key === 'amount') {
                return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
            return 0;
        });

        return result;
    }, [data, searchQuery, statusFilter, typeFilter, sortConfig]);

    const todayStr = useMemo(() => {
        if (timeFilter === 'Today') return "Today, April 5, 2026";
        if (timeFilter === 'Monthly') return "April 2026";
        return "Financial Year 2025-26";
    }, [timeFilter]);

    return (
        <div className="flex-1 h-full overflow-hidden flex flex-col bg-transparent scroll-smooth">
            {/* Header Content */}
            <div className="px-6 pt-8 pb-4 md:px-12 lg:px-16 space-y-6 flex-shrink-0">
                {/* Top Row: Title & Role Switcher */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Transactions</h1>
                        <p className="text-zinc-500 text-xs font-medium">Activity log for your connected accounts.</p>
                    </div>

                    {/* Role Selector Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex flex-col items-end space-y-1.5">
                            <button
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all px-4 py-2 rounded-xl border border-white/5 group"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Role:</span>
                                <div className="flex items-center space-x-2">
                                    <div className={cn("w-2 h-2 rounded-full shadow-[0_0_8px_rgba(212,244,85,0.5)]", role === 'Admin' ? 'bg-brand-yellow animate-pulse' : 'bg-zinc-600')} />
                                    <span className="text-xs font-bold text-white">{role}</span>
                                    <ChevronDown size={14} className={cn("text-zinc-500 transition-transform duration-300", isRoleDropdownOpen ? 'rotate-180' : '')} />
                                </div>
                            </button>
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest pr-1">
                                Demo mode: switch roles to preview access levels
                            </span>
                        </div>

                        {isRoleDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a1c] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                {['Viewer', 'Admin'].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => handleRoleSelect(r)}
                                        className={cn(
                                            "w-full px-5 py-2.5 text-left text-xs font-bold transition-all flex items-center justify-between",
                                            role === r ? "bg-brand-yellow/10 text-brand-yellow" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <span>{r}</span>
                                        {role === r && <ShieldCheck size={12} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Filters Row (Compact Umbrella Style) */}
                <div className="flex items-center space-x-3 overflow-x-auto custom-scrollbar-h pb-2 md:pb-0">
                    {/* Time Umbrella */}
                    <div className="flex items-center bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/5 flex-shrink-0">
                        {['Today', 'Monthly', 'Annually'].map(f => (
                            <FilterPill key={f} label={f} active={timeFilter === f} onClick={() => setTimeFilter(f)} />
                        ))}
                    </div>

                    {/* Status Umbrella */}
                    <div className="flex items-center bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/5 flex-shrink-0">
                        {['All', 'Completed', 'Pending', 'Processing'].map(f => (
                            <FilterPill key={f} label={f} active={statusFilter === f} onClick={() => setStatusFilter(f)} />
                        ))}
                    </div>

                    {/* Type Umbrella */}
                    <div className="flex items-center bg-white/5 backdrop-blur-md p-0.5 rounded-full border border-white/5 flex-shrink-0">
                        {['All', 'Credited', 'Debited'].map(f => (
                            <FilterPill key={f} label={f} active={typeFilter === f} onClick={() => setTypeFilter(f)} />
                        ))}
                    </div>
                </div>

                {/* Date & Search Row */}
                <div className="flex items-center justify-between pt-2">
                    <h3 className="text-white font-bold text-sm tracking-tight text-zinc-300">{todayStr}</h3>

                    <div className="flex items-center space-x-4">
                        <div className="relative group w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-yellow transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 backdrop-blur-md border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-yellow/30 transition-all font-medium"
                            />
                        </div>

                        <button
                            onClick={() => role === 'Viewer' && setShowRestrictedModal(true)}
                            className={cn(
                                "flex items-center space-x-2 px-6 py-2 rounded-xl text-[10px] font-black transition-all transform active:scale-95 shadow-lg flex-shrink-0",
                                role === 'Admin'
                                    ? "bg-brand-yellow text-black hover:bg-white shadow-brand-yellow/20"
                                    : "bg-white/5 text-zinc-600 cursor-not-allowed opacity-50"
                            )}
                        >
                            <Plus size={14} strokeWidth={3} />
                            <span>ADD TRANSACTION</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Area (Horizontal Scrollable) */}
            <div className="flex-1 overflow-x-auto px-6 md:px-12 lg:px-16 custom-scrollbar pb-10">
                <div className="min-w-[900px] border border-white/5 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th
                                    className={cn(
                                        "py-4 px-6 text-[10px] uppercase tracking-widest font-black cursor-pointer transition-colors select-none",
                                        sortConfig.key === 'date' ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                    onClick={() => handleSort('date')}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>Date</span>
                                        {sortConfig.key === 'date' ? (
                                            sortConfig.direction === 'desc' ? <ArrowDown size={12} className="text-brand-yellow" /> : <ArrowUp size={12} className="text-brand-yellow" />
                                        ) : (
                                            <ArrowUpDown size={12} className="text-white/10 group-hover:text-white/30" />
                                        )}
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-zinc-500 underline decoration-brand-yellow/20 underline-offset-4">Description / Category</th>
                                <th
                                    className={cn(
                                        "py-4 px-6 text-[10px] uppercase tracking-widest font-black text-right cursor-pointer transition-colors select-none",
                                        sortConfig.key === 'amount' ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                    onClick={() => handleSort('amount')}
                                >
                                    <div className="flex items-center justify-end space-x-2">
                                        <span>Amount / Type</span>
                                        {sortConfig.key === 'amount' ? (
                                            sortConfig.direction === 'desc' ? <ArrowDown size={12} className="text-brand-yellow" /> : <ArrowUp size={12} className="text-brand-yellow" />
                                        ) : (
                                            <ArrowUpDown size={12} className="text-white/10 group-hover:text-white/30" />
                                        )}
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-zinc-400 text-center">Status</th>
                                <th className="py-4 px-6 text-[10px] uppercase tracking-widest font-black text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t, index) => (
                                    <tr
                                        key={t.id}
                                        onClick={() => setSelectedTransaction(t)}
                                        className="group hover:bg-zinc-800/30 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-1"
                                        style={{ animationDelay: `${index * 20}ms` }}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="text-xs font-bold text-white tracking-tight">
                                                {timeFilter === 'Annually' ? new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' }) : t.date}
                                            </div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-tighter font-medium">{t.time}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-brand-yellow group-hover:border-brand-yellow/20 transition-all shadow-lg">
                                                    {React.createElement(iconMap[t.icon] || Wallet, { size: 16 })}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors uppercase tracking-tight">{t.name}</div>
                                                    <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{t.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <span className={cn(
                                                    "inline-flex px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest",
                                                    t.type === 'credited' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                                                )}>
                                                    {t.type}
                                                </span>
                                                <span className={cn(
                                                    "text-sm font-black tracking-tight",
                                                    t.type === 'credited' ? 'text-green-400' : 'text-white'
                                                )}>
                                                    {t.type === 'credited' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <StatusBadge status={t.status} />
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end space-x-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (role === 'Viewer') setShowRestrictedModal(true);
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all",
                                                        role === 'Admin' ? "text-zinc-600 hover:text-white hover:bg-zinc-800" : "text-zinc-700 cursor-not-allowed"
                                                    )}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (role === 'Viewer') setShowRestrictedModal(true);
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all",
                                                        role === 'Admin' ? "text-zinc-600 hover:text-red-400 hover:bg-red-500/10" : "text-zinc-700 cursor-not-allowed"
                                                    )}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-32 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                            <div className="w-20 h-20 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] flex items-center justify-center text-zinc-700 shadow-xl shadow-black/20">
                                                <Search size={32} strokeWidth={1.5} />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-zinc-200 font-black text-xl tracking-tight">No transactions found</p>
                                                <p className="text-zinc-500 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">Try adjusting your filters or search to find what you're looking for.</p>
                                            </div>
                                            <button
                                                onClick={clearFilters}
                                                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 border border-white/5"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transition Modals */}
            <RBACModal
                isOpen={showAdminConfirmModal}
                onClose={() => setShowAdminConfirmModal(false)}
                onConfirm={() => {
                    setRole('Admin');
                    setShowAdminConfirmModal(false);
                }}
                title="Admin Access"
                message="You are now viewing the dashboard as an Admin. In a real application, this access would require authentication and authorization."
                type="admin"
            />

            <RBACModal
                isOpen={showRestrictedModal}
                onClose={() => setShowRestrictedModal(false)}
                title="Access Restricted"
                message="You do not have permission to perform this action. Switch to Admin mode to enable editing."
                type="restricted"
            />

            {/* Detail Modal */}
            <TransactionModal
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
            />

            <style jsx>{`
                .custom-scrollbar-h::-webkit-scrollbar {
                    height: 4px;
                }
            `}</style>
        </div>
    );
};

export default TransactionsPage;
