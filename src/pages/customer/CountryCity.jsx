import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CITIES } from '../../data/mockData';
import { MapPin, ChevronLeft } from 'lucide-react';

export default function CountryCity() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('Egypt');
  const [city, setCity] = useState('');

  const handleContinue = () => {
    if (city) {
      navigate('/customer/home');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white p-6">
      <div className="mt-8 mb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100">
          <ChevronLeft size={24} className="text-dark" />
        </button>
        <h1 className="text-2xl font-bold text-dark">اختر موقعك</h1>
      </div>

      <div className="mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <MapPin size={32} className="text-primary" />
        </div>
        <p className="text-gray-500 text-sm">حدد دولتك ومدينتك لنعرض لك أفضل المطاعم المتاحة في منطقتك.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-dark mb-3">اختر الدولة</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCountry('Egypt')}
              className={`py-3 px-4 rounded-xl border text-center font-medium transition-colors ${country === 'Egypt' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              مصر 🇪🇬
            </button>
            <button 
              onClick={() => setCountry('Saudi Arabia')}
              className={`py-3 px-4 rounded-xl border text-center font-medium transition-colors ${country === 'Saudi Arabia' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              السعودية 🇸🇦
            </button>
          </div>
        </div>

        {country && (
          <div>
            <label className="block text-sm font-bold text-dark mb-3">اختر المدينة</label>
            <div className="space-y-2">
              {MOCK_CITIES[country].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCity(c.name)}
                  className={`w-full py-4 px-4 rounded-xl border flex items-center justify-between transition-colors ${city === c.name ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                >
                  <span className={`font-medium ${city === c.name ? 'text-primary' : 'text-dark'}`}>{c.nameAr}</span>
                  {city === c.name && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <button 
          onClick={handleContinue}
          disabled={!city}
          className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${city ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          متابعة
        </button>
      </div>
    </div>
  );
}
