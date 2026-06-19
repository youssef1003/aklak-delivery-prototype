import { Link } from 'react-router-dom';
import { Smartphone, Store, LayoutDashboard, Truck, CheckCircle2, Globe, CreditCard, Activity, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            نسخة تجريبية (Sprint 1 Product Demo)
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-dark mb-6 tracking-tight">
            مرحباً بك في <span className="text-primary">أكلك Aklak</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            المنصة الأحدث لتوصيل الطعام. منصة متكاملة ومتعددة الأدوار (Multi-role Food Delivery Platform) تدعم دورة حياة الطلب بالكامل بين العميل، المطعم، والمندوب والإدارة.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/showcase" className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
              العرض التقديمي (Showcase)
            </Link>
            <a href="#prototypes" className="bg-white text-dark border border-gray-200 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
              تصفح كل الواجهات
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Prototypes Grid */}
        <section id="prototypes" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">واجهات النظام المتكامل</h2>
            <p className="text-gray-500">اختر الواجهة التي تريد معاينتها لاختبار تجربة المستخدم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/customer" className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">تطبيق العميل</h3>
              <p className="text-sm text-gray-500">تجربة طلب الطعام، السلة، الدفع، وتتبع التوصيل المباشر.</p>
            </Link>

            <Link to="/restaurant-dashboard" className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">لوحة المطعم</h3>
              <p className="text-sm text-gray-500">إدارة الطلبات، المنيو، الإيرادات، وتحليل الأداء.</p>
            </Link>

            <Link to="/admin-dashboard" className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">لوحة الإدارة</h3>
              <p className="text-sm text-gray-500">مراقبة النظام، إدارة الدول، المطاعم، والمستخدمين.</p>
            </Link>

            <Link to="/driver" className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">تطبيق المندوب</h3>
              <p className="text-sm text-gray-500">استلام الطلبات، تفاصيل التوصيل، والملاحة.</p>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-dark text-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">لماذا "أكلك" هو الأفضل؟</h2>
              <p className="text-gray-400">صُمم ليكون الجيل القادم من تطبيقات توصيل الطعام</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Globe size={24} />, title: 'دعم دول متعددة', desc: 'مهيأ للعمل في مصر (جنيه مصري) والسعودية (ريال سعودي) مع دعم كامل للمدن.' },
                { icon: <Activity size={24} />, title: 'تتبع مباشر للطلبات', desc: 'نظام تتبع ذكي يوضح حالة الطلب من وقت التأكيد حتى وصول المندوب.' },
                { icon: <CreditCard size={24} />, title: 'دفع متعدد', desc: 'دعم الدفع النقدي، البطاقات الائتمانية، مدى، أبل باي والمحافظ الإلكترونية.' },
                { icon: <Star size={24} />, title: 'برنامج الولاء', desc: 'نقاط "أكلك كوينز" لتشجيع العملاء على الطلب المستمر وزيادة المبيعات.' },
                { icon: <Store size={24} />, title: 'أدوات تحليلية للمطاعم', desc: 'لوحة تحكم احترافية تعطي المطعم رؤية واضحة عن الأداء والمبيعات.' },
                { icon: <CheckCircle2 size={24} />, title: 'عمولة عادلة', desc: 'نموذج عمل يعتمد على عمولة منخفضة لدعم المطاعم وزيادة أرباحهم.' }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>Aklak Delivery Prototype V1 © 2024</p>
        <p className="mt-2 text-xs">This is a UI Prototype. Backend and APIs are mocked.</p>
      </footer>
    </div>
  );
}
