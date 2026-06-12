import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Search, Star, Clock, Info, Heart, MapPin } from 'lucide-react';
import { MOCK_RESTAURANTS, MOCK_MENU, GENERIC_MENU } from '../../data/mockData';
import { useDemo } from '../../context/DemoContext';
import MealCard from '../../components/customer/MealCard';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, favorites, toggleFavorite } = useDemo();
  
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id) || MOCK_RESTAURANTS[0];
  const menu = MOCK_MENU[id] || GENERIC_MENU;

  const isFavorite = favorites?.restaurants?.includes(restaurant.id);
  
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryRefs = useRef([]);

  // Calculate cart totals for this specific restaurant if needed, or total cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const scrollToCategory = (index) => {
    setActiveCategory(index);
    if (categoryRefs.current[index]) {
      const yOffset = -120; // Offset for sticky header
      const y = categoryRefs.current[index].getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Simple scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentIdx = 0;
      categoryRefs.current.forEach((ref, idx) => {
        if (ref && ref.offsetTop <= scrollPosition) {
          currentIdx = idx;
        }
      });
      setActiveCategory(currentIdx);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header Image */}
      <div className="h-64 relative bg-gray-200">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <button onClick={() => toggleFavorite(restaurant.id, 'restaurants')} className="w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10">
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Restaurant Info Card */}
      <div className="px-4 -mt-16 relative z-10 mb-6">
        <div className="bg-white rounded-3xl p-5 shadow-xl shadow-black/5 border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-black text-dark">{restaurant.name}</h1>
            <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg font-bold">مفتوح الآن</div>
          </div>
          <p className="text-gray-500 text-sm mb-4 font-medium">{restaurant.tags.join(' • ')}</p>
          
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-3">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-dark font-bold">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-[10px] text-gray-500">تقييمات +1K</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-dark font-bold">
                <Clock size={16} className="text-primary" />
                <span>{restaurant.deliveryTime} د</span>
              </div>
              <span className="text-[10px] text-gray-500">وقت التوصيل</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-dark font-bold">
                <MapPin size={16} className="text-blue-500" />
                <span>{restaurant.deliveryFee} ج.م</span>
              </div>
              <span className="text-[10px] text-gray-500">رسوم التوصيل</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Menu Categories */}
      <div className="sticky top-0 bg-gray-50/90 backdrop-blur-md z-20 py-3 border-b border-gray-200 shadow-sm">
        <div className="px-4 overflow-x-auto hide-scrollbar flex gap-2">
          {menu.map((category, index) => (
            <button 
              key={index}
              onClick={() => scrollToCategory(index)}
              className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === index 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-8">
        {menu.map((category, index) => (
          <div key={index} ref={el => categoryRefs.current[index] = el} className="scroll-mt-32">
            <h2 className="text-xl font-black text-dark mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map(item => (
                <MealCard key={item.id} item={item} restaurant={restaurant} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating View Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 w-full max-w-md px-4 py-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-30 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('/customer/cart')} className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-between px-6 shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-sm">
              <span>{cartItemCount}</span>
            </div>
            <span className="text-lg">عرض السلة</span>
            <span className="text-lg">{cartTotal} ج.م</span>
          </button>
        </div>
      )}
    </div>
  );
}
