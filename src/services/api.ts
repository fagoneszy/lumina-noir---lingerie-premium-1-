import { Product, Category } from '../types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Conjunto Noite Estelar',
    price: 289.90,
    description: 'Conjunto em renda francesa com detalhes em tule e alças reguláveis. Perfeito para momentos especiais.',
    category: 'conjuntos',
    images: ['https://images.unsplash.com/photo-1610419356340-a9cd7097f48e?q=80&w=1200&auto=format&fit=crop'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ name: 'Black Noir', hex: '#000000' }, { name: 'Deep Pink', hex: '#ff007f' }],
    featured: true,
    bestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 124
  },
  {
    id: '2',
    name: 'Sutiã Glow Neon',
    price: 145.00,
    description: 'Sutiã com aro e bojo suave, acabamento em viés neon para um toque moderno e ousado.',
    category: 'sutias',
    images: ['https://images.unsplash.com/photo-1594934986631-995c91bf4b67?q=80&w=1200&auto=format&fit=crop'],
    sizes: ['40', '42', '44', '46'],
    colors: [{ name: 'Lilac Glow', hex: '#b19cd9' }, { name: 'Black', hex: '#000000' }],
    featured: true,
    rating: 4.7,
    reviewsCount: 88
  },
  {
    id: '3',
    name: 'Body Rendado Midnight',
    price: 198.00,
    description: 'Body cavado com transparência estratégica e decote profundo nas costas.',
    category: 'vestidos',
    images: ['https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1200&auto=format&fit=crop'],
    sizes: ['P', 'M', 'G'],
    colors: [{ name: 'Midnight Black', hex: '#000000' }],
    bestSeller: true,
    rating: 5.0,
    reviewsCount: 45
  },
  {
    id: '4',
    name: 'Calcinha Silk Rose',
    price: 49.90,
    description: 'Calcinha em seda pura com laterais finas e regulagem metálica dourada.',
    category: 'calcinhas',
    images: ['https://images.unsplash.com/photo-1606132962295-8e40428d098e?q=80&w=1200&auto=format&fit=crop'],
    sizes: ['P', 'M', 'G'],
    colors: [{ name: 'Pink Silk', hex: '#ff007f' }, { name: 'Black', hex: '#000000' }],
    isNew: true,
    rating: 4.8,
    reviewsCount: 230
  }
];

const CATEGORIES: Category[] = [
  { id: '1', name: 'Conjuntos', slug: 'conjuntos', image: 'https://images.unsplash.com/photo-1594934986631-995c91bf4b67?q=80&w=600' },
  { id: '2', name: 'Calcinhas', slug: 'calcinhas', image: 'https://images.unsplash.com/photo-1606132962295-8e40428d098e?q=80&w=600' },
  { id: '3', name: 'Sutiãs', slug: 'sutias', image: 'https://images.unsplash.com/photo-1610419356340-a9cd7097f48e?q=80&w=600' },
  { id: '4', name: 'Bodies & Vestidos', slug: 'vestidos', image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=600' }
];

export const productService = {
  getProducts: async () => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return PRODUCTS;
  },
  getProductById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return PRODUCTS.find(p => p.id === id);
  },
  getFeaturedProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return PRODUCTS.filter(p => p.featured);
  },
  getCategories: async () => {
    return CATEGORIES;
  }
};
