import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function MealCard({ item, restaurant }) {
  const { addToCart, favorites, toggleFavorite } = useDemo();
  const isFavorite = favorites?.meals?.includes(item.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(item.id, 'meals');
  };

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 relative group">
      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
        >
          <Heart size={14} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          <h4 className="font-bold text-dark text-sm mb-1 truncate">{item.name}</h4>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="font-bold text-primary text-sm">{item.price} ج.م</span>
          <button 
            onClick={() => addToCart(item, restaurant)}
            className="bg-gray-50 hover:bg-primary hover:text-white text-primary w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm border border-gray-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
