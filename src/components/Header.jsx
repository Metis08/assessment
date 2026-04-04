import React from 'react';
import { ChevronDown } from 'lucide-react';

const Header = ({ title }) => {
    return (
        <header className="flex justify-between items-center mb-8 pt-4">
            <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-card-bg px-6 py-3 rounded-xl flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
                    <span className="text-lg font-medium tracking-wide">Month</span>
                    <ChevronDown size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;
