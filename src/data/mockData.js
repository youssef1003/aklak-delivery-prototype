// Mock Data for Aklak Delivery Prototype

export const MOCK_CITIES = {
  Egypt: [
    { id: 'eg-cai', name: 'Cairo', nameAr: 'القاهرة' },
    { id: 'eg-giz', name: 'Giza', nameAr: 'الجيزة' },
    { id: 'eg-alx', name: 'Alexandria', nameAr: 'الإسكندرية' }
  ],
  'Saudi Arabia': [
    { id: 'sa-riy', name: 'Riyadh', nameAr: 'الرياض' },
    { id: 'sa-jed', name: 'Jeddah', nameAr: 'جدة' },
    { id: 'sa-dam', name: 'Dammam', nameAr: 'الدمام' }
  ]
};

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Burger', nameAr: 'برجر', icon: '🍔' },
  { id: 2, name: 'Pizza', nameAr: 'بيتزا', icon: '🍕' },
  { id: 3, name: 'Shawarma', nameAr: 'شاورما', icon: '🌯' },
  { id: 4, name: 'Fried Chicken', nameAr: 'دجاج مقلي', icon: '🍗' },
  { id: 5, name: 'Local', nameAr: 'شعبي', icon: '🍲' },
  { id: 6, name: 'Desserts', nameAr: 'حلويات', icon: '🍰' }
];

export const MOCK_RESTAURANTS = [
  {
    id: 'r1',
    name: 'كبدة ومخ طارق الشرقاوي',
    image: 'https://images.unsplash.com/photo-1627522460108-215683bdc9ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.5,
    deliveryTime: '25-35',
    deliveryFee: 15,
    minOrder: 50,
    tags: ['شعبي', 'سندوتشات'],
    country: 'Egypt',
    city: 'Cairo',
    isFastest: true,
  },
  {
    id: 'r2',
    name: 'Heart Attack',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    deliveryTime: '30-45',
    deliveryFee: 20,
    minOrder: 100,
    tags: ['دجاج مقلي', 'برجر'],
    country: 'Egypt',
    city: 'Cairo',
    isPopular: true,
  },
  {
    id: 'r3',
    name: 'Buffalo Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.6,
    deliveryTime: '35-50',
    deliveryFee: 25,
    minOrder: 80,
    tags: ['برجر', 'أمريكي'],
    country: 'Egypt',
    city: 'Giza',
  },
  {
    id: 'r4',
    name: 'Al Baik',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    deliveryTime: '20-30',
    deliveryFee: 10,
    minOrder: 30,
    tags: ['دجاج مقلي', 'سريع'],
    country: 'Saudi Arabia',
    city: 'Riyadh',
    isFastest: true,
    isPopular: true,
  },
  {
    id: 'r5',
    name: 'Shawarma House',
    image: 'https://images.unsplash.com/photo-1648937402636-f08ea96b02f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.7,
    deliveryTime: '30-40',
    deliveryFee: 15,
    minOrder: 40,
    tags: ['شاورما', 'عربي'],
    country: 'Saudi Arabia',
    city: 'Jeddah',
  },
  {
    id: 'r6',
    name: 'Maestro Pizza',
    image: 'https://images.unsplash.com/photo-1604381536140-10a905a5d204?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    rating: 4.4,
    deliveryTime: '40-55',
    deliveryFee: 12,
    minOrder: 50,
    tags: ['بيتزا', 'إيطالي'],
    country: 'Saudi Arabia',
    city: 'Dammam',
  }
];

export const MOCK_MENU = {
  'r2': [ // Heart Attack Menu
    {
      category: 'وجبات',
      items: [
        {
          id: 'm1',
          name: 'وجبة هارت أتاك',
          description: '3 قطع دجاج، بطاطس، كول سلو، خبز ومشروب',
          price: 180,
          image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 'm2',
          name: 'وجبة التوفير',
          description: '9 قطع دجاج، بطاطس عائلي، كول سلو عائلي، 3 خبز',
          price: 450,
          image: 'https://images.unsplash.com/photo-1626082929543-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        }
      ]
    },
    {
      category: 'سندوتشات',
      items: [
        {
          id: 'm3',
          name: 'برجر دجاج كلاسيك',
          description: 'قطعة دجاج مقرمش، خس، مايونيز',
          price: 120,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        }
      ]
    }
  ],
  'r4': [ // Al Baik
    {
      category: 'الوجبات',
      items: [
        {
          id: 'm4',
          name: 'وجبة دجاج مسحب',
          description: '10 قطع دجاج مسحب، بطاطس، صلصة ثوم، خبز',
          price: 18,
          image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 'm5',
          name: 'برجر فيليه دجاج',
          description: 'فيليه دجاج، مخلل، صلصة البيك المميزة',
          price: 12,
          image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        }
      ]
    }
  ]
};

// Use generic data for other restaurants if they don't have specific menus
export const GENERIC_MENU = [
  {
    category: 'الأكثر مبيعاً',
    items: [
      {
        id: 'g1',
        name: 'وجبة كلاسيكية',
        description: 'وجبة محضرة من أفضل المكونات الطازجة',
        price: 150,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 'g2',
        name: 'سندوتش سوبر',
        description: 'سندوتش كبير مع صوص خاص وبطاطس',
        price: 90,
        image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      }
    ]
  }
];

export const MOCK_ORDERS = [
  {
    id: '#ORD-10234',
    customer: 'أحمد محمد',
    restaurant: 'Heart Attack',
    items: ['وجبة هارت أتاك (x2)', 'بطاطس إضافي'],
    total: 390,
    status: 'Preparing',
    time: '10:30 AM',
    date: '2023-10-24',
  },
  {
    id: '#ORD-10235',
    customer: 'سارة خالد',
    restaurant: 'Heart Attack',
    items: ['وجبة التوفير'],
    total: 470,
    status: 'Accepted',
    time: '10:45 AM',
    date: '2023-10-24',
  },
  {
    id: '#ORD-10236',
    customer: 'محمد علي',
    restaurant: 'Buffalo Burger',
    items: ['برجر دجاج كلاسيك', 'مشروب غازي'],
    total: 145,
    status: 'Ready for pickup',
    time: '11:00 AM',
    date: '2023-10-24',
  },
  {
    id: '#ORD-10237',
    customer: 'عمر حسن',
    restaurant: 'Al Baik',
    items: ['وجبة دجاج مسحب'],
    total: 18,
    status: 'Completed',
    time: '09:15 AM',
    date: '2023-10-24',
  }
];

export const MOCK_DRIVERS = [
  { id: 'd1', name: 'محمود السيد', phone: '01012345678', status: 'Active', rating: 4.8 },
  { id: 'd2', name: 'كريم مصطفى', phone: '01123456789', status: 'Busy', rating: 4.5 },
  { id: 'd3', name: 'ياسر عبدالعزيز', phone: '0501234567', status: 'Offline', rating: 4.9 },
];

export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'أحمد محمد', phone: '01011122233', ordersCount: 15, joinedDate: '2023-01-15' },
  { id: 'c2', name: 'سارة خالد', phone: '01222233344', ordersCount: 8, joinedDate: '2023-05-20' },
  { id: 'c3', name: 'محمد علي', phone: '0555666777', ordersCount: 32, joinedDate: '2022-11-10' },
];
