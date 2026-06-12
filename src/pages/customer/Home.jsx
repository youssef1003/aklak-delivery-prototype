import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Home as HomeIcon, ShoppingCart, User, ReceiptText, ChevronDown } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_RESTAURANTS } from '../../data/mockData';
import { useDemo } from '../../context/DemoContext';
import FilterBar from '../../components/customer/FilterBar';
import RestaurantCard from '../../components/customer/RestaurantCard';

export default function Home() {
  const navigate = useNavigate();
  const { cart, location, user } = useDemo();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRestaurants = useMemo(() => {
    let result = MOCK_RESTAURANTS;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter
    switch (activeFilter) {
      case 'fastest':
        result = result.filter(r => r.isFastest).sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'top_rated':
        result = result.filter(r => r.rating >= 4.5).sort((a, b) => b.rating - a.rating);
        break;
      case 'free_delivery':
        result = result.filter(r => r.deliveryFee === 0);
        break;
      case 'offers':
        result = result.filter(r => r.hasOffers); // assuming we add this flag or logic
        break;
      case 'near_you':
        // Mock sorting by delivery time for "near you"
        result = [...result].sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 rounded-b-[2rem] shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full text-primary flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium mb-0.5">التوصيل إلى</p>
              <p className="text-sm font-bold text-dark flex items-center gap-1.5 cursor-pointer">
                {location.city}، {location.country === 'EG' ? 'مصر' : 'السعودية'} <ChevronDown size={14} className="text-primary" />
              </p>
            </div>
          </div>
          <button className="relative w-10 h-10 bg-gray-50 rounded-full text-gray-600 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مطعم، أو وجبة..." 
            className="w-full bg-gray-50 px-5 py-3.5 pr-12 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all border border-transparent"
          />
          <Search size={20} className="absolute right-4 top-3.5 text-gray-400" />
        </div>

        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        
        {!searchQuery && activeFilter === 'all' && (
          <>
            {/* Premium Offers Carousel */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 snap-x">
              <div className="min-w-[300px] h-40 bg-gradient-to-br from-primary to-orange-500 rounded-3xl p-5 text-white relative overflow-hidden snap-center shadow-md shadow-primary/20">
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <span className="bg-white/20 backdrop-blur-md text-[10px] px-2.5 py-1 rounded-lg mb-2 inline-block w-max font-bold tracking-wide">عروض حصرية</span>
                  <h3 className="text-2xl font-black mb-1 drop-shadow-sm">خصم 50%</h3>
                  <p className="text-sm mb-3 opacity-90">على أول 3 طلبات لك</p>
                </div>
                <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" alt="burger" className="absolute left-0 top-0 h-full w-32 object-cover object-right opacity-40 mix-blend-overlay" />
              </div>
              <div className="min-w-[300px] h-40 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-5 text-white relative overflow-hidden snap-center shadow-md shadow-blue-500/20">
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <span className="bg-white/20 backdrop-blur-md text-[10px] px-2.5 py-1 rounded-lg mb-2 inline-block w-max font-bold tracking-wide">توصيل مجاني</span>
                  <h3 className="text-2xl font-black mb-1 drop-shadow-sm">أطلب ببلاش</h3>
                  <p className="text-sm mb-3 opacity-90">من مطاعمك المفضلة</p>
                </div>
                <div className="absolute -left-6 -bottom-6 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-black text-dark">ماذا تشتهي اليوم؟</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {MOCK_CATEGORIES.map(cat => (
                  <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-3xl group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-700">{cat.nameAr}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Restaurants Feed */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-black text-dark">
              {searchQuery ? 'نتائج البحث' : activeFilter !== 'all' ? 'المطاعم المتاحة' : 'المطاعم القريبة منك'}
            </h2>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm mt-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">لا توجد نتائج!</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                لم نتمكن من العثور على مطاعم تطابق بحثك أو الفلاتر المحددة. جرب تغيير كلمات البحث.
              </p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveFilter('all');}}
                className="bg-primary/10 text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 fixed bottom-0 w-full max-w-md px-6 py-4 flex justify-between items-center z-40 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === 'home' ? 'bg-primary/10' : ''}`}>
            <HomeIcon size={22} className={activeTab === 'home' ? 'fill-primary/20' : ''} />
          </div>
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button onClick={() => { setActiveTab('orders'); navigate('/customer/tracking'); }} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'orders' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === 'orders' ? 'bg-primary/10' : ''}`}>
            <ReceiptText size={22} />
          </div>
          <span className="text-[10px] font-bold">الطلبات</span>
        </button>
        <button onClick={() => { setActiveTab('cart'); navigate('/customer/cart'); }} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'cart' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'} relative`}>
          <div className={`p-1.5 rounded-xl ${activeTab === 'cart' ? 'bg-primary/10' : ''}`}>
            <ShoppingCart size={22} />
          </div>
          {cart.length > 0 && (
            <span className="absolute top-0 right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-white">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          <span className="text-[10px] font-bold">السلة</span>
        </button>
        <button onClick={() => { setActiveTab('profile'); navigate('/customer/profile'); }} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === 'profile' ? 'bg-primary/10' : ''}`}>
            <User size={22} />
          </div>
          <span className="text-[10px] font-bold">حسابي</span>
        </button>
      </nav>
    </div>
  );
}
