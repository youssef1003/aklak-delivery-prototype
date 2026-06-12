import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, Star, Clock, Home as HomeIcon, ShoppingCart, User, ReceiptText } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_RESTAURANTS } from '../../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 rounded-b-2xl shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full text-primary">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">التوصيل إلى</p>
              <p className="text-sm font-bold text-dark flex items-center gap-1">المنزل، شارع التحرير <span className="text-primary text-xs">▼</span></p>
            </div>
          </div>
          <button className="relative p-2 bg-gray-50 rounded-full text-gray-600">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="ابحث عن مطعم، أو وجبة..." 
            className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Search size={18} className="absolute right-3 top-3.5 text-gray-400" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Offers Carousel */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 snap-x">
          <div className="min-w-[280px] bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-4 text-white relative overflow-hidden snap-center">
            <div className="relative z-10">
              <span className="bg-white/20 text-xs px-2 py-1 rounded-md mb-2 inline-block">خصم خاص</span>
              <h3 className="text-xl font-bold mb-1">خصم 50%</h3>
              <p className="text-sm mb-3">على أول 3 طلبات لك</p>
              <button className="bg-white text-primary text-sm font-bold px-4 py-1.5 rounded-full">اطلب الآن</button>
            </div>
            <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
          <div className="min-w-[280px] bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-4 text-white relative overflow-hidden snap-center">
            <div className="relative z-10">
              <span className="bg-white/20 text-xs px-2 py-1 rounded-md mb-2 inline-block">توصيل مجاني</span>
              <h3 className="text-xl font-bold mb-1">توصيل ببلاش</h3>
              <p className="text-sm mb-3">من هارديز وكنتاكي</p>
              <button className="bg-white text-blue-600 text-sm font-bold px-4 py-1.5 rounded-full">تصفح المطاعم</button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-lg font-bold text-dark">التصنيفات</h2>
            <a href="#" className="text-primary text-sm font-medium">الكل</a>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {MOCK_CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-600">{cat.nameAr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="bg-dark rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
          <div>
            <p className="text-gray-400 text-xs mb-1">نقاط ولائك (أكلك كوينز)</p>
            <p className="text-xl font-bold text-yellow-400">1,250 نقطة</p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition-colors">
            استبدل الآن
          </button>
        </div>

        {/* Popular Restaurants */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-lg font-bold text-dark">مطاعم مميزة</h2>
            <a href="#" className="text-primary text-sm font-medium">الكل</a>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {MOCK_RESTAURANTS.filter(r => r.isPopular || r.rating > 4.6).map(restaurant => (
              <Link to={`/customer/restaurant/${restaurant.id}`} key={restaurant.id} className="min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
                <div className="h-32 relative">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-dark text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" /> {restaurant.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-dark text-sm mb-1 truncate">{restaurant.name}</h3>
                  <div className="flex text-gray-500 text-xs gap-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {restaurant.deliveryTime} دقيقة</span>
                    <span>•</span>
                    <span>توصيل {restaurant.deliveryFee} ج.م</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fastest Delivery */}
        <div>
          <h2 className="text-lg font-bold text-dark mb-3">الأسرع توصيلاً</h2>
          <div className="space-y-3">
            {MOCK_RESTAURANTS.filter(r => r.isFastest).map(restaurant => (
              <Link to={`/customer/restaurant/${restaurant.id}`} key={restaurant.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 items-center">
                <img src={restaurant.image} alt={restaurant.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-dark text-sm mb-1 truncate">{restaurant.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">{restaurant.tags.join(' • ')}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md"><Clock size={12} /> {restaurant.deliveryTime} دقيقة</span>
                    <span className="flex items-center gap-1 text-gray-500"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {restaurant.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md px-6 py-3 flex justify-between items-center z-20 pb-safe">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-gray-400'}`}>
          <HomeIcon size={24} className={activeTab === 'home' ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-medium">الرئيسية</span>
        </button>
        <button onClick={() => { setActiveTab('orders'); navigate('/customer/tracking'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-primary' : 'text-gray-400'}`}>
          <ReceiptText size={24} />
          <span className="text-[10px] font-medium">الطلبات</span>
        </button>
        <button onClick={() => { setActiveTab('cart'); navigate('/customer/cart'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'cart' ? 'text-primary' : 'text-gray-400'} relative`}>
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
          <span className="text-[10px] font-medium">السلة</span>
        </button>
        <button onClick={() => { setActiveTab('profile'); navigate('/customer/profile'); }} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-primary' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-[10px] font-medium">حسابي</span>
        </button>
      </nav>
    </div>
  );
}
