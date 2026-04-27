import React from 'react';
import { ArrowRight, Wallet, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '../utils/cn';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-brand-yellow selection:text-black">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 bg-grid-checker opacity-40 pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yellow/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-gray-400">Introducing Metis08 Finance v2.0</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          MANAGE YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-white to-brand-cyan">WEALTH</span> <br />
          LIKE NEVER BEFORE
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          A powerful, futuristic dashboard to track, analyze, and optimize your financial life. 
          Real-time insights, deep analytics, and total security.
        </p>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-300 transform bg-brand-yellow rounded-full hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(212,244,85,0.4)] animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300"
        >
          <span>Get Started</span>
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <FeatureCard 
            icon={<Wallet className="w-6 h-6 text-brand-yellow" />}
            title="Real-time Tracking"
            description="Every transaction, every penny, tracked with surgical precision."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6 text-brand-cyan" />}
            title="Smart Insights"
            description="AI-powered trends to help you save and invest smarter."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-brand-purple" />}
            title="Total Security"
            description="Your data stays yours. Encrypted, private, and secure."
          />
        </div>
      </section>

      {/* Footer Decoration */}
      <footer className="relative z-10 pb-12 text-center">
        <div className="text-gray-600 text-sm tracking-widest uppercase font-bold opacity-30 animate-pulse">
          Metis08 Finance • 2026 Edition
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-card-bg/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm hover:border-white/20 transition-all duration-300 group text-left">
    <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
