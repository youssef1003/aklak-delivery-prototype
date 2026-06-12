import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/customer/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 bg-primary flex flex-col items-center justify-center min-h-screen text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
      
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl animate-bounce">
        <Utensils size={48} className="text-primary" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Aklak</h1>
      <p className="text-white/80 text-lg">أسرع ديليفري في مصر والسعودية</p>
    </div>
  );
}
