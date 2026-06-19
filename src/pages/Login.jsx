import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { AlertCircle, User, Shield, Truck, Store, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e, presetEmail = null) => {
    e?.preventDefault();
    const loginEmail = presetEmail || email;
    const loginPassword = presetEmail ? '123456' : password;

    const result = login(loginEmail, loginPassword);
    
    if (result.success) {
      // Determine where to redirect based on role if no specific "from" was intended
      // or if "from" is just root portal.
      if (from === '/' || from === '/login') {
        switch (result.user.role) {
          case 'admin': navigate('/admin-dashboard'); break;
          case 'driver': navigate('/driver'); break;
          case 'restaurant': navigate('/restaurant-dashboard'); break;
          default: navigate('/customer/home'); break;
        }
      } else {
        navigate(from);
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تسجيل الدخول (نسخة تجريبية)
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          هذه النسخة للعرض فقط. اختر دورك لتجربة التطبيق.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-yellow-700">
                  كلمة المرور لجميع الحسابات التجريبية هي <strong>123456</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <button
              onClick={() => handleLogin(null, 'customer@aklak.demo')}
              className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 ml-2" />
                الدخول كعميل
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleLogin(null, 'restaurant@aklak.demo')}
              className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <Store className="h-5 w-5 text-gray-400 ml-2" />
                الدخول كمدير مطعم
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleLogin(null, 'driver@aklak.demo')}
              className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 ml-2" />
                الدخول كمندوب توصيل
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>

            <button
              onClick={() => handleLogin(null, 'admin@aklak.demo')}
              className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 ml-2" />
                الدخول كمدير نظام
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">أو تسجيل الدخول اليدوي</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
