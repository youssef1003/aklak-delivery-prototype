import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function FilterBar({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'fastest', label: 'الأسرع توصيلاً' },
    { id: 'top_rated', label: 'الأعلى تقييماً' },
    { id: 'free_delivery', label: 'توصيل مجاني' },
    { id: 'offers', label: 'عروض' },
    { id: 'near_you', label: 'بالقرب منك' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
      <button className="flex items-center justify-center p-2 rounded-xl border border-gray-200 bg-white text-gray-600 shrink-0 hover:bg-gray-50 transition-colors">
        <SlidersHorizontal size={18} />
      </button>
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
            activeFilter === filter.id
              ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
