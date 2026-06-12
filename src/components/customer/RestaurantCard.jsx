import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function RestaurantCard({ restaurant }) {
  const { favorites, toggleFavorite } = useDemo();
  const isFavorite = favorites?.restaurants?.includes(restaurant.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(restaurant.id, 'restaurants');
  };

  return (
    <Link to={`/customer/restaurant/${restaurant.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group relative">
      <div className="h-40 relative overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur text-dark text-xs px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
            <Star size={14} className="text-yellow-500 fill-yellow-500" /> {restaurant.rating}
          </div>
          {restaurant.isPopular && (
            <div className="bg-primary text-white text-[10px] px-2 py-1 rounded-lg font-bold shadow-sm">
              مميز
            </div>
          )}
          {restaurant.deliveryFee === 0 && (
            <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-lg font-bold shadow-sm">
              توصيل مجاني
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 left-3 bg-white/95 backdrop-blur p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
        >
          <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Bottom Tags (Image overlay) */}
        <div className="absolute bottom-3 right-3 text-white">
          <p className="text-[10px] font-medium opacity-90 drop-shadow-md">{restaurant.tags.join(' • ')}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-dark text-base truncate">{restaurant.name}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-xs gap-4 mt-3 pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" /> {restaurant.deliveryTime} دقيقة
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400" /> توصيل {restaurant.deliveryFee} ج.م
          </span>
        </div>
      </div>
    </Link>
  );
}
