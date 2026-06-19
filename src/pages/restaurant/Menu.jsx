import { useState, useEffect } from 'react';
import { Plus, Edit2, EyeOff, Trash2, Search, Eye } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { storageAdapter } from '../../services/adapters/localStorageAdapter';
import SectionHeader from '../../components/shared/SectionHeader';
import EmptyState from '../../components/shared/EmptyState';
import { MOCK_MENU } from '../../data/mockData';

export default function Menu() {
  const { restaurantMenu } = useDemo();
  const [localMenu, setLocalMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  
  useEffect(() => {
    // Seed default menu if empty
    if (!restaurantMenu || restaurantMenu.length === 0) {
      const defaultMenu = MOCK_MENU['r2'] || [];
      storageAdapter.setState({ restaurantMenu: defaultMenu });
      setLocalMenu(defaultMenu);
      if (defaultMenu.length > 0) setActiveCategory(defaultMenu[0].category);
    } else {
      setLocalMenu(restaurantMenu);
      if (!activeCategory && restaurantMenu.length > 0) setActiveCategory(restaurantMenu[0].category);
    }
  }, [restaurantMenu]);

  const categories = localMenu.map(c => c.category);
  const currentCategory = localMenu.find(c => c.category === activeCategory);

  const handleToggleHide = (catIndex, itemIndex) => {
    const updatedMenu = [...localMenu];
    const item = updatedMenu[catIndex].items[itemIndex];
    item.isHidden = !item.isHidden;
    storageAdapter.setState({ restaurantMenu: updatedMenu });
  };

  const handleDelete = (catIndex, itemIndex) => {
    if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
      const updatedMenu = [...localMenu];
      updatedMenu[catIndex].items.splice(itemIndex, 1);
      storageAdapter.setState({ restaurantMenu: updatedMenu });
    }
  };

  const handleAddCategory = () => {
    const name = prompt('أدخل اسم التصنيف الجديد:');
    if (name) {
      const updatedMenu = [...localMenu, { category: name, items: [] }];
      storageAdapter.setState({ restaurantMenu: updatedMenu });
      setActiveCategory(name);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="إدارة المنيو" 
        subtitle="تعديل وإضافة الأصناف، التصنيفات، والأسعار"
        action={{ label: 'إضافة صنف', icon: <Plus size={16} />, onClick: () => alert('جاري التطوير في هذا الديمو') }}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
        {/* Categories Sidebar */}
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
            <button 
              onClick={handleAddCategory}
              className="whitespace-nowrap px-4 py-3 rounded-xl text-sm font-medium text-gray-500 border border-dashed border-gray-300 text-center hover:bg-gray-50 mt-2 flex justify-center items-center gap-2"
            >
              <Plus size={16} /> تصنيف جديد
            </button>
          </div>

          {/* Items Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">{activeCategory}</h2>
              <span className="text-sm text-gray-500">{currentCategory?.items?.length || 0} أصناف</span>
            </div>

            {(!currentCategory?.items || currentCategory.items.length === 0) ? (
              <EmptyState 
                title="لا توجد أصناف هنا" 
                message="لم يتم إضافة أي أصناف لهذا التصنيف بعد."
              />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {currentCategory.items.map((item, itemIdx) => {
                  const catIdx = localMenu.findIndex(c => c.category === activeCategory);
                  return (
                    <div key={item.id || itemIdx} className={`border ${item.isHidden ? 'border-gray-200 bg-gray-50 opacity-70' : 'border-gray-200 bg-white'} rounded-xl p-4 flex gap-4 group hover:border-primary transition-colors`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-200 relative">
                        <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-bold ${item.isHidden ? 'text-gray-500 line-through' : 'text-dark'}`}>{item.name}</h3>
                            <p className="font-bold text-primary">{item.price} ج.م</p>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => alert('جاري التطوير')} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors" title="تعديل">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleToggleHide(catIdx, itemIdx)} 
                            className="p-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors" 
                            title={item.isHidden ? "إظهار في المنيو" : "إخفاء من المنيو"}
                          >
                            {item.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(catIdx, itemIdx)} 
                            className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors" 
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
