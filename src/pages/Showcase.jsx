import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { 
  Rocket, Users, Store, Truck, ShieldCheck, CheckCircle2, 
  Map, CreditCard, Database, ArrowRight, LayoutDashboard, MonitorSmartphone,
  Link as LinkIcon, Copy, Check
} from 'lucide-react';

export default function Showcase() {
  const navigate = useNavigate();
  const { login } = useDemo();
  const [copied, setCopied] = useState(false);

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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6 border border-white/20 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
            Prototype v1.0 (Live Demo)
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Aklak Delivery <br/>
            <span className="text-primary-200 text-3xl md:text-5xl font-extrabold mt-2 block">منصة التوصيل المتكاملة للشرق الأوسط</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            تطبيق توصيل طعام (Prototype) مبني للسوق المصري والسعودي. يغطي دورة حياة الطلب بالكامل عبر 4 منصات مترابطة: تطبيق العميل، لوحة المطعم، تطبيق المندوب، ولوحة تحكم الإدارة.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('demo-accounts').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <MonitorSmartphone size={20} /> ابدأ استعراض المستثمرين
            </button>
            <button 
              onClick={copyLink}
              className="bg-primary-800 text-white border border-primary-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition"
            >
              {copied ? <Check size={20} className="text-green-400"/> : <LinkIcon size={20} />} 
              {copied ? 'تم النسخ!' : 'نسخ رابط العرض'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Demo Accounts Section */}
      <section id="demo-accounts" className="py-16 px-6 max-w-6xl mx-auto">
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

      {/* 3. Guided Demo Journey (The Best Demo Order) */}
      <section className="py-16 bg-white border-y border-gray-100 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-wider text-sm mb-2 block uppercase">Best Demo Order</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">التسلسل الموصى به للعرض التقديمي</h2>
            <p className="text-gray-600">اتبع هذه الخطوات الأربع لتجربة دورة حياة الطلب بالكامل وبشكل مترابط.</p>
          </div>

          <div className="space-y-6">
            <JourneyStep num="1" title="الدخول كعميل (Customer)" desc="تصفح المطاعم، أضف وجبة للسلة، استخدم كود الخصم AKLAK10 وأتمم عملية الدفع (محاكاة)." color="bg-blue-100 text-blue-700" />
            <JourneyStep num="2" title="الدخول كمطعم (Restaurant)" desc="انتقل للوحة تحكم المطعم، شاهد الطلب الجديد في لوحة العمليات، وقم بتغيير حالته إلى 'جاهز للاستلام'." color="bg-orange-100 text-orange-700" />
            <JourneyStep num="3" title="الدخول كمندوب (Driver)" desc="افتح تطبيق المندوب، اقبل الطلب الجاهز من قائمة الطلبات المتاحة، ثم قم بتسجيل 'تم التوصيل'." color="bg-green-100 text-green-700" />
            <JourneyStep num="4" title="الدخول كمدير (Admin)" desc="افتح لوحة الإدارة لمراقبة الطلب من لوحة المراقبة الشاملة، ومتابعة الأرباح والتقارير المالية المحدثة." color="bg-purple-100 text-purple-700" />
          </div>
        </div>
      </section>

      {/* 4. Product Features */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">أدوار ووظائف المنصة الأساسية</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureGroup 
            title="تطبيق العميل" 
            features={['تصفح المطاعم والبحث', 'إدارة السلة وإتمام الطلب', 'أكواد الخصم ونظام النقاط', 'تتبع الطلبات والمفضلة']} 
            borderColor="border-blue-200"
          />
          <FeatureGroup 
            title="لوحة المطعم" 
            features={['إدارة الطلبات الحية', 'إدارة المنيو والوجبات', 'العروض الترويجية', 'تقارير المبيعات والأرباح']} 
            borderColor="border-orange-200"
          />
          <FeatureGroup 
            title="تطبيق المندوب" 
            features={['استقبال الطلبات المتاحة', 'تتبع تفاصيل التوصيل', 'محفظة الأرباح الفورية', 'سجل الرحلات']} 
            borderColor="border-green-200"
          />
          <FeatureGroup 
            title="لوحة الإدارة" 
            features={['مراقبة الطلبات الحية', 'إدارة قاعدة المستخدمين', 'إدارة المطاعم والمناديب', 'النظام والمالية']} 
            borderColor="border-purple-200"
          />
        </div>
      </section>

      {/* 5. Technical Readiness & Status */}
      <section className="py-16 bg-gray-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Database className="text-green-400" /> الجاهزية التقنية (ما يعمل الآن)</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> بناء هيكل الواجهات (Frontend) مكتمل ومتجاوب.</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> خوارزميات العمليات المشتركة Multi-role جاهزة ومترابطة.</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-green-400 shrink-0" size={20} /> دمج أذونات الأدوار وحماية المسارات (Protected Routes).</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-blue-400 shrink-0" size={20} /> البيانات تعمل محلياً (LocalStorage) لضمان سرعة وثبات العرض التقديمي.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Rocket className="text-primary-400" /> خريطة الطريق (ما القادم؟)</h2>
            <div className="bg-gray-800 rounded-xl p-6 space-y-4 border border-gray-700">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span>نموذج العرض (Demo Mode)</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">مكتمل للإنتاج</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span>ربط قواعد البيانات (Supabase Backend)</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/30">تجريبي (Pilot Ready)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="flex items-center gap-2"><CreditCard size={16}/> بوابات الدفع (Stripe/Paymob)</span>
                <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">المرحلة القادمة</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Map size={16}/> خرائط حية وتتبع (Google Maps)</span>
                <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">المرحلة القادمة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <footer className="bg-primary-900 text-center py-16 px-6 border-t border-primary-800">
        <h2 className="text-2xl font-bold text-white mb-4">هل أنت جاهز لتجربة النموذج؟</h2>
        <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
          تم تصميم هذا النموذج التجريبي ليعكس تجربة مستخدم عالية الجودة وقابلة للتوسع السريع، مما يؤكد صحة النموذج البرمجي قبل الدمج المعقد لقواعد البيانات بفضل هيكل (Decoupled Frontend).
        </p>
        <button 
          onClick={() => document.getElementById('demo-accounts').scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-primary-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
        >
          ابدأ استعراض المستثمرين الآن
        </button>
      </footer>
    </div>
  );
}

function AccountCard({ title, email, icon, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl transition flex flex-col items-center gap-4 cursor-pointer group" onClick={onClick}>
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-2 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500" dir="ltr">{email}</p>
      </div>
      <button className="w-full mt-2 py-2.5 bg-gray-50 text-primary-700 rounded-lg text-sm font-bold hover:bg-primary-50 flex items-center justify-center gap-2 transition-colors">
        دخول كـ {title.split(' ')[1]} <ArrowRight size={16} />
      </button>
    </div>
  );
}

function JourneyStep({ num, title, desc, color }) {
  return (
    <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-inner ${color}`}>
        {num}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}

function FeatureGroup({ title, features, borderColor }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border-t-4 shadow-sm hover:shadow-lg transition-shadow ${borderColor}`}>
      <h3 className="font-bold text-gray-900 text-lg mb-6 text-center">{title}</h3>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
            <span className="leading-tight">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
