import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon, trend, trendValue, colorClass }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 ${colorClass}`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${colorClass}`}>
          {icon}
        </div>
        {trendValue && (
          <span className={`text-sm font-bold flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'text-success bg-success/10' : 'text-red-500 bg-red-50'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />} 
            {trendValue}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-gray-500 text-sm mb-1 font-medium">{title}</p>
        <h3 className="text-3xl font-black text-dark tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
