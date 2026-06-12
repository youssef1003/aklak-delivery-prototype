import { useState } from 'react';
import { Plus, Edit2, EyeOff, Trash2, Search, Filter } from 'lucide-react';
import { MOCK_MENU } from '../../data/mockData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(MOCK_MENU['r2'][0].category);
  const categories = MOCK_MENU['r2'].map(c => c.category);
  
  const currentCategory = MOCK_MENU['r2'].find(c => c.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-dark">إدارة المنيو</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحث عن صنف..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm shadow-primary/30 hover:bg-primary/90 transition-colors">
            <Plus size={16} /> إضافة صنف
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
        {/* Categories Sidebar for Desktop / Tabs for Mobile */}
        <div className="flex flex-col md:flex-row border-b border-gray-100">
          <div className="md:w-64 border-l border-gray-100 bg-gray-50/50 p-4 overflow-x-auto md:overflow-visible hide-scrollbar flex md:flex-col gap-2">
            <h3 className="font-bold text-dark mb-2 hidden md:block">التصنيفات</h3>
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm font-medium transition-colors text-right flex justify-between items-center ${activeCategory === cat ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <span>{cat}</span>
              </button>
            ))}
            <button className="whitespace-nowrap px-4 py-3 rounded-xl text-sm font-medium text-gray-500 border border-dashed border-gray-300 text-center hover:bg-gray-50 mt-2 flex justify-center items-center gap-2">
              <Plus size={16} /> تصنيف جديد
            </button>
          </div>

          {/* Items Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">{activeCategory}</h2>
              <span className="text-sm text-gray-500">{currentCategory?.items.length || 0} أصناف</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {currentCategory?.items.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-4 group hover:border-primary transition-colors">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-dark">{item.name}</h3>
                        <p className="font-bold text-primary">{item.price} ج.م</p>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors" title="تعديل">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors" title="إخفاء من المنيو">
                        <EyeOff size={16} />
                      </button>
                      <button className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors" title="حذف">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
