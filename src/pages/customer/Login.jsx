import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/customer/location');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white p-6">
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">مرحباً بك! 👋</h1>
        <p className="text-gray-500">سجل دخولك لتستمتع بأشهى الوجبات</p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
          <div className="relative">
            <input 
              type="tel" 
              placeholder="01012345678" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dir-ltr text-left"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dir-ltr text-left"
            required 
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-primary focus:ring-primary" />
            <span className="text-gray-600">تذكرني</span>
          </label>
          <a href="#" className="text-primary font-medium">نسيت كلمة المرور؟</a>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg mt-4 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
          تسجيل الدخول
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gray-200"></div>
          <span className="text-gray-400 text-sm">أو</span>
          <div className="h-[1px] flex-1 bg-gray-200"></div>
        </div>

        <button type="button" className="w-full bg-gray-50 text-dark py-3.5 rounded-xl font-medium border border-gray-200 mt-2 hover:bg-gray-100 transition-colors">
          المتابعة كزائر
        </button>

        <p className="text-center text-gray-500 mt-auto pb-4 text-sm">
          ليس لديك حساب؟ <a href="#" className="text-primary font-bold">سجل الآن</a>
        </p>
      </form>
    </div>
  );
}
