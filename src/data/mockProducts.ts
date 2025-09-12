export interface MockProduct {
  id: number;
  attributes: {
    name: string;
    price: number;
    status: 'in-stock' | 'sold-out' | 'limited' | 'trending';
    slug: string;
    image: string;
  };
}

export const mockTrendingProducts: MockProduct[] = [
  {
    id: 1,
    attributes: {
      name: "Vintage Wood Frame - Oak",
      price: 89.99,
      status: 'trending',
      slug: 'vintage-wood-frame-oak',
      image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Modern Black Metal Frame",
      price: 65.50,
      status: 'in-stock',
      slug: 'modern-black-metal-frame',
      image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Antique Gold Frame",
      price: 120.00,
      status: 'limited',
      slug: 'antique-gold-frame',
      image: "https://images.pexels.com/photos/6271020/pexels-photo-6271020.jpeg"
    }
  },
  {
    id: 4,
    attributes: {
      name: "Minimalist White Frame",
      price: 45.99,
      status: 'trending',
      slug: 'minimalist-white-frame',
      image: "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg"
    }
  },
  {
    id: 5,
    attributes: {
      name: "Rustic Barn Wood Frame",
      price: 95.00,
      status: 'sold-out',
      slug: 'rustic-barn-wood-frame',
      image: "https://images.pexels.com/photos/1194025/pexels-photo-1194025.jpeg"
    }
  },
  {
    id: 6,
    attributes: {
      name: "Contemporary Silver Frame",
      price: 78.50,
      status: 'in-stock',
      slug: 'contemporary-silver-frame',
      image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg"
    }
  },
  {
    id: 7,
    attributes: {
      name: "Distressed White Frame",
      price: 55.00,
      status: 'trending',
      slug: 'distressed-white-frame',
      image: "https://images.pexels.com/photos/5708082/pexels-photo-5708082.jpeg"
    }
  },
  {
    id: 8,
    attributes: {
      name: "Classic Mahogany Frame",
      price: 110.00,
      status: 'limited',
      slug: 'classic-mahogany-frame',
      image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
    }
  }
];
