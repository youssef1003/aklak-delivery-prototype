import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Share2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useDemo();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('medium');

  // Static mock item for prototype
  const item = {
    id: id || 'item_1',
    name: 'وجبة هارت أتاك',
    description: '3 قطع دجاج مقرمش بخلطة هارت أتاك السرية، يقدم مع بطاطس مقلية، كول سلو، خبز طازج ومشروب من اختيارك.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  // Mock restaurant for demo context
  const restaurant = { id: 'r1', name: 'Heart Attack - المهندسين' };

  const handleAdd = () => {
    addToCart(item, restaurant, quantity);
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header Image */}
      <div className="h-72 relative bg-gray-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent"></div>
        
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 -mt-6 bg-white rounded-t-3xl relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-dark">{item.name}</h1>
          <p className="text-xl font-bold text-primary whitespace-nowrap">{item.price} ج.م</p>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.description}</p>

        {/* Options */}
        <div className="space-y-6">
          {/* Size */}
          <div>
            <div className="flex justify-between items-center mb-3 text-sm">
              <h3 className="font-bold text-dark">الحجم</h3>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded text-xs">إجباري</span>
            </div>
            <div className="space-y-3">
              {[
                { id: 'small', label: 'عادي', price: '+0 ج.م' },
                { id: 'medium', label: 'وسط', price: '+25 ج.م' },
                { id: 'large', label: 'كبير', price: '+45 ج.م' },
              ].map(opt => (
                <label key={opt.id} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${size === opt.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${size === opt.id ? 'border-primary' : 'border-gray-300'}`}>
                      {size === opt.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                    <span className="font-medium text-dark text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{opt.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <div className="flex justify-between items-center mb-3 text-sm">
              <h3 className="font-bold text-dark">إضافات</h3>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded text-xs">اختياري</span>
            </div>
            <div className="space-y-3">
              {[
                { id: 'cheese', label: 'صوص جبنة', price: '+15 ج.م' },
                { id: 'fries', label: 'بطاطس إضافي', price: '+20 ج.م' },
              ].map(opt => (
                <label key={opt.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-gray-300"></div>
                    <span className="font-medium text-dark text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{opt.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-bold text-dark text-sm mb-3">ملاحظات خاصة</h3>
            <textarea 
              placeholder="مثال: بدون بصل، كاتشب إضافي..." 
              className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-20 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)] flex gap-4 items-center">
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 w-32 shrink-0">
          <button 
            onClick={() => quantity > 1 && setQuantity(q => q - 1)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-dark shadow-sm disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus size={18} />
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg shadow-sm"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <button onClick={handleAdd} className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-primary/30">
          <span>إضافة للسلة</span>
          <span className="text-white/80">•</span>
          <span>{item.price * quantity} ج.م</span>
        </button>
      </div>
    </div>
  );
}
