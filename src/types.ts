export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'conjuntos' | 'calcinhas' | 'sutias' | 'vestidos' | 'acessorios';
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}
