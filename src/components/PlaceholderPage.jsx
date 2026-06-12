import { Hammer, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlaceholderPage({ title, module }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 h-full min-h-[60vh] text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
        <Hammer size={48} className="text-primary animate-bounce" />
        <Sparkles size={24} className="text-yellow-400 absolute -top-2 -right-2" />
      </div>
      
      <h2 className="text-2xl font-bold text-dark mb-3">{title}</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        هذه الصفحة جزء من وحدة <span className="font-bold text-primary">{module}</span>. جاري العمل على تطويرها وتجهيزها للنسخة القادمة لتقديم أفضل تجربة مستخدم.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full text-right mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-start">
          <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm mb-1">تحديثات مستمرة</h4>
            <p className="text-xs text-gray-500">نعمل على إضافة ميزات جديدة بشكل دوري.</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-start">
          <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm mb-1">تجربة متكاملة</h4>
            <p className="text-xs text-gray-500">نهدف لتوفير واجهة سهلة واحترافية تلبي احتياجاتك.</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
      >
        <ArrowRight size={18} /> العودة للصفحة السابقة
      </button>
    </div>
  );
}
