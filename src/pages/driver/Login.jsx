import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/driver/orders');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white p-6">
      <div className="mt-12 mb-8 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Truck size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-2">تطبيق المندوب</h1>
        <p className="text-gray-500">سجل دخولك لاستقبال الطلبات</p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
          <input 
            type="tel" 
            placeholder="01012345678" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all dir-ltr text-left"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all dir-ltr text-left"
            required 
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg mt-4 hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30">
          تسجيل الدخول
        </button>

        <p className="text-center text-gray-500 mt-auto pb-4 text-sm">
          تريد الانضمام كطيار؟ <a href="#" className="text-green-600 font-bold">سجل هنا</a>
        </p>
      </form>
    </div>
  );
}
