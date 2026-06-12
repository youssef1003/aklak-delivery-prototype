import React from 'react';
import { Star, Shield, Award } from 'lucide-react';

export default function PointsCard({ points }) {
  // Determine tier based on points
  let tier = 'Bronze';
  let tierNameAr = 'برونزي';
  let nextTier = 500;
  let colors = 'from-orange-400 to-amber-600';
  let icon = <Shield size={32} className="text-white opacity-80" />;

  if (points >= 1500) {
    tier = 'Gold';
    tierNameAr = 'ذهبي';
    nextTier = 5000;
    colors = 'from-yellow-400 to-yellow-600';
    icon = <Award size={32} className="text-white opacity-80" />;
  } else if (points >= 500) {
    tier = 'Silver';
    tierNameAr = 'فضي';
    nextTier = 1500;
    colors = 'from-gray-300 to-gray-500';
    icon = <Star size={32} className="text-white opacity-80" />;
  }

  const progress = Math.min((points / nextTier) * 100, 100);

  return (
    <div className={`rounded-3xl p-6 text-white relative overflow-hidden bg-gradient-to-br ${colors} shadow-lg shadow-black/10`}>
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">{tier} TIER</p>
          <h2 className="text-2xl font-black mb-1 drop-shadow-sm">{points} نقطة</h2>
          <p className="text-sm opacity-90">مستوى {tierNameAr}</p>
        </div>
        <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between text-xs font-bold mb-2 text-white/90">
          <span>التقدم للمستوى التالي</span>
          <span>{nextTier} نقطة</span>
        </div>
        <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
    </div>
  );
}
