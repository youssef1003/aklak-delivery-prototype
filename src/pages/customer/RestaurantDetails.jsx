import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Share2, Search, Star, Clock, Info, Plus } from 'lucide-react';
import { MOCK_RESTAURANTS, MOCK_MENU, GENERIC_MENU } from '../../data/mockData';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === id) || MOCK_RESTAURANTS[0];
  const menu = MOCK_MENU[id] || GENERIC_MENU;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="h-60 relative bg-gray-200">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <button className="w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Search size={20} />
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Restaurant Info Card */}
      <div className="px-4 -mt-12 relative z-10 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <h1 className="text-xl font-bold text-dark mb-1">{restaurant.name}</h1>
          <p className="text-gray-500 text-sm mb-3">{restaurant.tags.join(' • ')}</p>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 text-dark">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1 text-dark">
              <Clock size={16} className="text-primary" />
              <span>{restaurant.deliveryTime} دقيقة</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <button className="flex items-center gap-1 text-primary">
              <Info size={16} />
              <span>معلومات</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="px-4 mb-4 overflow-x-auto hide-scrollbar flex gap-2">
        {menu.map((category, index) => (
          <button 
            key={index}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-colors ${index === 0 ? 'bg-primary text-white' : 'bg-white text-dark border border-gray-200'}`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-6">
        {menu.map((category, index) => (
          <div key={index}>
            <h2 className="text-lg font-bold text-dark mb-3">{category.category}</h2>
            <div className="space-y-3">
              {category.items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 h-32 relative">
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <h3 className="font-bold text-dark text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <p className="font-bold text-primary">{item.price} ج.م</p>
                  </div>
                  <div className="w-24 h-full relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    <button 
                      onClick={() => navigate(`/customer/product/${item.id}`)}
                      className="absolute -bottom-2 -left-2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-primary shadow-md hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating View Cart Button */}
      <div className="fixed bottom-0 w-full max-w-md px-4 py-4 bg-white/80 backdrop-blur border-t border-gray-100 z-20 pb-safe">
        <button onClick={() => navigate('/customer/cart')} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-between px-6 shadow-lg shadow-primary/30">
          <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded text-sm">
            <span>2</span>
          </div>
          <span>عرض السلة</span>
          <span>360 ج.م</span>
        </button>
      </div>
    </div>
  );
}
