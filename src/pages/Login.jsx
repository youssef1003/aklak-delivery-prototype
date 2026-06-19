import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { currentAuthMode, isDemoAuthEnabled, isSupabaseAuthEnabled } from '../services/auth/authModeSelector';
import { supabaseAuthService } from '../services/auth/supabaseAuthService';
import { profileService } from '../services/auth/profileService';
import { AlertCircle, User, Shield, Truck, Store, ArrowRight, Database } from 'lucide-react';

const Login = () => {
  const { login, supabaseLoginSuccess } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(isDemoAuthEnabled ? 'demo' : 'supabase');
  
  // Demo States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demoError, setDemoError] = useState('');

  // Supabase States
  const [isRegistering, setIsRegistering] = useState(false);
  const [realEmail, setRealEmail] = useState('');
  const [realPassword, setRealPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [realPhone, setRealPhone] = useState('');
  const [realError, setRealError] = useState('');
  const [realLoading, setRealLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const navigateBasedOnRole = (role) => {
    if (from === '/' || from === '/login') {
      switch (role) {
        case 'admin': navigate('/admin-dashboard'); break;
        case 'driver': navigate('/driver'); break;
        case 'restaurant': navigate('/restaurant-dashboard'); break;
        default: navigate('/customer/home'); break;
      }
    } else {
      navigate(from);
    }
  };

  const handleDemoLogin = (e, presetEmail = null) => {
    e?.preventDefault();
    const loginEmail = presetEmail || email;
    const loginPassword = presetEmail ? '123456' : password;

    const result = login(loginEmail, loginPassword);
    
    if (result.success) {
      navigateBasedOnRole(result.user.role);
    } else {
      setDemoError(result.error);
    }
  };

  const handleRealLogin = async (e) => {
    e.preventDefault();
    setRealError('');
    setRealLoading(true);

    const { data, error } = await supabaseAuthService.signInWithEmail(realEmail, realPassword);
    
    if (error) {
      setRealError(error.message || 'فشل تسجيل الدخول. تأكد من البيانات.');
      setRealLoading(false);
      return;
    }

    if (data?.user) {
      // Fetch profile to get role
      const profile = await profileService.getUserProfile(data.user.id);
      const role = profile?.data?.role || 'customer';
      
      const userState = {
        id: data.user.id,
        email: data.user.email,
        name: profile?.data?.full_name || 'مستخدم حقيقي',
        phone: profile?.data?.phone || '',
      };

      supabaseLoginSuccess(userState, role);
      navigateBasedOnRole(role);
    }
    
    setRealLoading(false);
  };

  const handleRealRegister = async (e) => {
    e.preventDefault();
    setRealError('');
    setRealLoading(true);

    const { data, error } = await supabaseAuthService.signUpCustomer({
      email: realEmail,
      password: realPassword,
      name: realName,
      phone: realPhone
    });

    if (error) {
      setRealError(error.message || 'فشل إنشاء الحساب.');
      setRealLoading(false);
      return;
    }

    if (data?.user) {
      // Attempt to create customer profile
      await profileService.createCustomerProfile(data.user.id, { name: realName, phone: realPhone });
      
      // Since email confirmation might be off or on, let's just log them in if session exists
      if (data.session) {
        supabaseLoginSuccess({
          id: data.user.id,
          email: data.user.email,
          name: realName,
          phone: realPhone
        }, 'customer');
        navigateBasedOnRole('customer');
      } else {
        setRealError('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.');
      }
    }

    setRealLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تسجيل الدخول
        </h2>
        {currentAuthMode === 'hybrid' && (
          <p className="mt-2 text-center text-sm font-bold text-blue-600 bg-blue-50 py-1 rounded">
            وضع Pilot: يمكنك استخدام الديمو أو الحسابات الحقيقية
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {currentAuthMode === 'hybrid' && (
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex-1 py-2 text-center font-medium text-sm border-b-2 ${activeTab === 'demo' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('demo')}
              >
                حسابات الديمو
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium text-sm border-b-2 ${activeTab === 'supabase' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('supabase')}
              >
                المصادقة الحقيقية (Pilot)
              </button>
            </div>
          )}

          {/* DEMO TAB */}
          {activeTab === 'demo' && isDemoAuthEnabled && (
            <div>
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
                <button onClick={() => handleDemoLogin(null, 'customer@aklak.demo')} className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <div className="flex items-center"><User className="h-5 w-5 text-gray-400 ml-2" /> الدخول كعميل</div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                <button onClick={() => handleDemoLogin(null, 'restaurant@aklak.demo')} className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <div className="flex items-center"><Store className="h-5 w-5 text-gray-400 ml-2" /> الدخول كمدير مطعم</div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                <button onClick={() => handleDemoLogin(null, 'driver@aklak.demo')} className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <div className="flex items-center"><Truck className="h-5 w-5 text-gray-400 ml-2" /> الدخول كمندوب توصيل</div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                <button onClick={() => handleDemoLogin(null, 'admin@aklak.demo')} className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <div className="flex items-center"><Shield className="h-5 w-5 text-gray-400 ml-2" /> الدخول كمدير نظام</div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">أو الدخول اليدوي (ديمو)</span></div>
              </div>

              <form className="space-y-6" onSubmit={(e) => handleDemoLogin(e)}>
                {demoError && <div className="text-red-500 text-sm text-center mb-4">{demoError}</div>}
                <div>
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                  تسجيل الدخول الديمو
                </button>
              </form>
            </div>
          )}

          {/* REAL SUPABASE TAB */}
          {activeTab === 'supabase' && isSupabaseAuthEnabled && (
            <div>
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md flex items-start gap-3">
                <Database className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  هذا الوضع متصل بقاعدة بيانات <strong>Supabase</strong> الحقيقية. متاح حالياً لتسجيل دخول <strong>العملاء فقط</strong>.
                </p>
              </div>

              <form className="space-y-4" onSubmit={isRegistering ? handleRealRegister : handleRealLogin}>
                {realError && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{realError}</div>}
                
                {isRegistering && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">الاسم بالكامل</label>
                      <input required type="text" value={realName} onChange={(e) => setRealName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                      <input required type="tel" value={realPhone} onChange={(e) => setRealPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <input required type="email" value={realEmail} onChange={(e) => setRealEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
                  <input required type="password" value={realPassword} onChange={(e) => setRealPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>

                <button disabled={realLoading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 mt-4">
                  {realLoading ? 'جاري المعالجة...' : isRegistering ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button type="button" onClick={() => { setIsRegistering(!isRegistering); setRealError(''); }} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  {isRegistering ? 'لديك حساب بالفعل؟ سجل دخولك' : 'مستخدم جديد؟ إنشاء حساب عميل'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
