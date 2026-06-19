import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { 
  Rocket, Users, Store, Truck, ShieldCheck, CheckCircle2, 
  Map, CreditCard, Database, ArrowRight, LayoutDashboard, MonitorSmartphone
} from 'lucide-react';

export default function Showcase() {
  const navigate = useNavigate();
  const { login } = useDemo();

  const handleDemoLogin = (roleEmail) => {
    const result = login(roleEmail, '123456');
    if (result.success) {
      switch (result.user.role) {
        case 'admin': navigate('/admin-dashboard'); break;
        case 'driver': navigate('/driver'); break;
        case 'restaurant': navigate('/restaurant-dashboard'); break;
        default: navigate('/customer/home'); break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Prototype v1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Aklak Delivery <br/>
            <span className="text-primary-200 text-3xl md:text-5xl">منصة التوصيل المتكاملة للشرق الأوسط</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            تطبيق توصيل طعام تجريبي (Prototype) مبني للسوق المصري والسعودي. يغطي دورة الطلب بالكامل عبر 4 منصات: تطبيق العميل، لوحة المطعم، تطبيق المندوب، ولوحة تحكم الإدارة.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleDemoLogin('customer@aklak.demo')}
              className="bg-white text-primary-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 shadow-lg"
            >
              <MonitorSmartphone size={20} /> ابدأ تجربة العميل
            </button>
            <button 
              onClick={() => handleDemoLogin('admin@aklak.demo')}
              className="bg-primary-800 text-white border border-primary-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition"
            >
              <LayoutDashboard size={20} /> لوحة الإدارة
            </button>
          </div>
        </div>
      </section>

      {/* 2. Demo Accounts Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">حسابات التجربة السريعة</h2>
          <p className="text-gray-600">تسجيل دخول بنقرة واحدة لتجربة مختلف أدوار المنصة (كلمة المرور لجميع الحسابات: 123456)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AccountCard 
            title="حساب العميل" 
            email="customer@aklak.demo" 
            icon={<Users className="text-blue-500" size={32} />} 
            onClick={() => handleDemoLogin('customer@aklak.demo')}
          />
          <AccountCard 
            title="حساب المطعم" 
            email="restaurant@aklak.demo" 
            icon={<Store className="text-orange-500" size={32} />} 
            onClick={() => handleDemoLogin('restaurant@aklak.demo')}
          />
          <AccountCard 
            title="حساب المندوب" 
            email="driver@aklak.demo" 
            icon={<Truck className="text-green-500" size={32} />} 
            onClick={() => handleDemoLogin('driver@aklak.demo')}
          />
          <AccountCard 
            title="حساب الإدارة" 
            email="admin@aklak.demo" 
            icon={<ShieldCheck className="text-purple-500" size={32} />} 
            onClick={() => handleDemoLogin('admin@aklak.demo')}
          />
        </div>
      </section>

      {/* 3. Guided Demo Journey */}
      <section className="py-16 bg-white border-y border-gray-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">كيفية اختبار المنصة (الرحلة الكاملة)</h2>
            <p className="text-gray-600">اتبع هذه الخطوات لتجربة دورة حياة الطلب بالكامل</p>
          </div>

          <div className="space-y-6">
            <JourneyStep num="1" title="الدخول كعميل" desc="تصفح المطاعم، أضف وجبة للسلة، استخدم كود الخصم AKLAK10 وأتمم الطلب." color="bg-blue-100 text-blue-700" />
            <JourneyStep num="2" title="الدخول كمطعم" desc="انتقل للوحة تحكم المطعم، شاهد الطلب الجديد، وقم بتغيير حالته إلى 'جاهز للاستلام'." color="bg-orange-100 text-orange-700" />
            <JourneyStep num="3" title="الدخول كمندوب" desc="افتح تطبيق المندوب، اقبل الطلب الجاهز، ثم قم بتسجيل 'تم التوصيل'." color="bg-green-100 text-green-700" />
            <JourneyStep num="4" title="الدخول كمدير" desc="راقب الطلب من لوحة المراقبة الشاملة، وتابع الأرباح والتقارير." color="bg-purple-100 text-purple-700" />
          </div>
        </div>
      </section>

      {/* 4. Product Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">المميزات الرئيسية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureGroup 
            title="تطبيق العميل" 
            features={['تصفح المطاعم والبحث', 'إدارة السلة وإتمام الطلب', 'أكواد الخصم والنقاط', 'تتبع الطلبات والمفضلة']} 
            borderColor="border-blue-200"
          />
          <FeatureGroup 
            title="لوحة المطعم" 
            features={['إدارة الطلبات الحية', 'إدارة المنيو والوجبات', 'العروض والخصومات', 'تقارير المبيعات والأرباح']} 
            borderColor="border-orange-200"
          />
          <FeatureGroup 
            title="تطبيق المندوب" 
            features={['استقبال الطلبات المتاحة', 'تتبع تفاصيل التوصيل', 'محفظة الأرباح', 'سجل الرحلات']} 
            borderColor="border-green-200"
          />
          <FeatureGroup 
            title="لوحة الإدارة" 
            features={['مراقبة الطلبات الحية', 'إدارة المستخدمين', 'إدارة المطاعم والمناديب', 'إعدادات النظام والمالية']} 
            borderColor="border-purple-200"
          />
        </div>
      </section>

      {/* 5. Technical Readiness & Status */}
      <section className="py-16 bg-gray-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Database className="text-primary-400" /> الجاهزية التقنية</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> بناء هيكل الواجهات (Frontend) مكتمل ومتجاوب.</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> خوارزميات العمليات المشتركة Multi-role جاهزة.</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> نموذج البيانات يعمل حالياً بالاعتماد على التخزين المحلي (LocalStorage) لضمان استقرار العرض التجريبي.</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> البنية التحتية لـ Supabase تم تحضيرها برمجياً تمهيداً للانتقال السلس لاحقاً.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Rocket className="text-primary-400" /> خريطة الطريق (Next)</h2>
            <div className="bg-gray-800 rounded-xl p-6 space-y-4 border border-gray-700">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span>نموذج العرض (Demo Mode)</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">مكتمل 100%</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span>ربط قواعد البيانات (Supabase)</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">قيد العمل (Pilot)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="flex items-center gap-2"><CreditCard size={16}/> بوابة الدفع الإلكتروني</span>
                <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">مرحلة قادمة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Map size={16}/> خرائط وتتبع GPS</span>
                <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">مرحلة قادمة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <footer className="bg-primary-900 text-center py-16 px-6">
        <h2 className="text-2xl font-bold text-white mb-4">جاهز لعرض المشروع أمام المستثمرين!</h2>
        <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
          هذا النموذج يعكس تجربة مستخدم عالية الجودة وقابلة للتطوير (Scalable Prototype)، مصمم لتأكيد الرؤية قبل استكمال ربط الواجهات الخلفية (Backend Integration).
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-primary-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 shadow-lg"
        >
          ابدأ التجربة الآن
        </button>
      </footer>
    </div>
  );
}

function AccountCard({ title, email, icon, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition flex flex-col items-center gap-4 cursor-pointer" onClick={onClick}>
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-2 border border-gray-100">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500" dir="ltr">{email}</p>
      </div>
      <button className="w-full mt-2 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
        دخول <ArrowRight size={16} />
      </button>
    </div>
  );
}

function JourneyStep({ num, title, desc, color }) {
  return (
    <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 ${color}`}>
        {num}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FeatureGroup({ title, features, borderColor }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border-t-4 shadow-sm ${borderColor}`}>
      <h3 className="font-bold text-gray-900 text-lg mb-6 text-center">{title}</h3>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="text-green-500 shrink-0" size={16} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
