import React from 'react';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Sparkle } from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, onToggle }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
        { id: 'insights', label: 'Insights', icon: TrendingUp },
    ];

    return (
        <div className={cn(
            "h-full bg-dashboard-bg flex flex-col transition-all duration-500 ease-in-out relative rounded-2xl border border-white/5 shadow-2xl",
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
                                ? "bg-white/10 dark:bg-white/5 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-white/5"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {/* Active Indicator Collapsed */}
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
                                    activeTab === item.id ? "text-brand-yellow drop-shadow-[0_0_8px_rgba(212,244,85,0.4)]" : "group-hover:scale-110"
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

            {/* Bottom Section Decoration Line (from image style) */}
            <div className="p-8">
                <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent mx-auto opacity-20" />
            </div>
        </div>
    );
};

export default Sidebar;
