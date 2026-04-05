import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Zap, Sparkle, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, onToggle, onResetData }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'insights', label: 'Insights', icon: Zap },
        { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    ];



    return (
        <>
            {/* Desktop Sidebar */}
            <div className={cn(
                "hidden lg:flex h-full bg-dashboard-bg flex-col transition-all duration-500 ease-in-out relative rounded-2xl border border-white/5 shadow-2xl overflow-hidden",
                isCollapsed ? "w-20" : "w-64"
            )}>
                {/* Top Menu Icon */}
                <div className="p-4 mb-8">
                    <button
                        onClick={onToggle}
                        className={cn(
                            "flex items-center group transition-all duration-300",
                            isCollapsed ? "justify-center" : "space-x-4 px-2"
                        )}
                    >
                        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <Sparkle size={22} className="text-white" fill="currentColor" />
                        </div>
                        {!isCollapsed && <span className="font-bold text-2xl text-white tracking-tighter">Menu</span>}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "flex items-center w-full transition-all duration-300 relative group",
                                isCollapsed ? "justify-center py-4 rounded-xl" : "px-5 py-4 rounded-xl",
                                activeTab === item.id
                                    ? "bg-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/5"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isCollapsed && activeTab === item.id && (
                                <div className="absolute w-12 h-12 bg-white/10 rounded-full -z-10 shadow-lg border border-white/5" />
                            )}

                            <div className={cn(
                                "flex items-center flex-1",
                                isCollapsed ? "justify-center" : ""
                            )}>
                                <item.icon
                                    size={22}
                                    className={cn(
                                        "transition-all duration-300",
                                        activeTab === item.id
                                            ? "text-brand-yellow drop-shadow-[0_0_8px_rgba(212,244,85,0.4)]"
                                            : "group-hover:scale-110"
                                    )}
                                />
                                {!isCollapsed && (
                                    <span className={cn(
                                        "ml-4 font-bold text-[15px] tracking-tight transition-all duration-300",
                                        activeTab === item.id ? "text-white" : ""
                                    )}>
                                        {item.label}
                                    </span>
                                )}
                            </div>

                            {!isCollapsed && activeTab === item.id && (
                                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(212,244,85,1)]" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Bottom Section: Reset Only */}
                <div className="p-4 mt-auto mb-4 border-t border-white/5 mx-4 pt-6">
                    <button
                        onClick={onResetData}
                        className={cn(
                            "flex items-center w-full transition-all duration-300 rounded-xl group",
                            isCollapsed ? "justify-center py-4" : "px-5 py-4 hover:bg-red-500/10"
                        )}
                        title="Reset all data"
                    >
                        <RotateCcw size={20} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                        {!isCollapsed && (
                            <span className="ml-4 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-red-400 transition-colors">
                                Reset Data
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-around items-center p-3 z-[100] shadow-2xl transition-colors duration-500">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "flex flex-col items-center p-3 rounded-2xl transition-all duration-300 relative",
                            activeTab === item.id ? "text-brand-yellow" : "text-gray-500 hover:text-white"
                        )}
                    >
                        {activeTab === item.id && (
                            <div className="absolute inset-0 bg-white/5 rounded-2xl animate-in fade-in zoom-in duration-300" />
                        )}
                        <item.icon size={22} className={cn("relative z-10", activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(212,244,85,0.4)]" : "")} />
                        <span className="text-[10px] font-bold mt-1 relative z-10 uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </nav>
        </>
    );
};

export default Sidebar;
