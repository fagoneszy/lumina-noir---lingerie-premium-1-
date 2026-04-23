import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { productService } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevant');
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    productService.getProducts().then(allProducts => {
      setProducts(allProducts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...products];
    
    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // URL Param Filters
    const filterType = searchParams.get('filter');
    if (filterType === 'novidades') result = result.filter(p => p.isNew);
    if (filterType === 'sale') result = result.filter(p => p.price < 150); // Ajustado mock sale

    // Sorting Logic
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [products, activeCategory, sortBy, searchParams]);

  const categories = [
    { name: 'Todos', slug: 'all' },
    { name: 'Conjuntos', slug: 'conjuntos' },
    { name: 'Calcinhas', slug: 'calcinhas' },
    { name: 'Sutiãs', slug: 'sutias' },
    { name: 'Bodies & Vestidos', slug: 'vestidos' }
  ];

  const sortOptions = [
    { name: 'Mais Relevantes', value: 'relevant' },
    { name: 'Menor Preço', value: 'price-asc' },
    { name: 'Maior Preço', value: 'price-desc' },
    { name: 'Melhor Avaliados', value: 'rating' }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-serif italic mb-4">A Coleção</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap cursor-pointer",
                  activeCategory === cat.slug 
                    ? "bg-brand-pink border-brand-pink text-white shadow-neon-pink" 
                    : "border-white/10 hover:border-brand-lilac hover:text-brand-lilac"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold group cursor-pointer"
            >
              <SlidersHorizontal size={18} className="group-hover:text-brand-pink" />
              Filtros
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowOrderDropdown(!showOrderDropdown)}
                className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold cursor-pointer hover:text-brand-pink transition-colors"
              >
                Ordenar por <ChevronDown size={18} className={cn("transition-transform", showOrderDropdown && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showOrderDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowOrderDropdown(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-56 bg-brand-dark-gray border border-white/10 p-2 rounded-sm z-50 shadow-2xl"
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowOrderDropdown(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all rounded-sm",
                            sortBy === option.value ? "bg-brand-pink text-white" : "hover:bg-brand-pink/10"
                          )}
                        >
                          {option.name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="aspect-[3/4] bg-brand-dark-gray rounded-sm" />
              <div className="h-4 bg-brand-dark-gray w-2/3" />
              <div className="h-4 bg-brand-dark-gray w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-400 italic">Nenhum produto encontrado nesta categoria.</p>
          <button 
            onClick={() => setActiveCategory('all')}
            className="mt-4 text-brand-pink underline"
          >
            Ver todos os produtos
          </button>
        </div>
      )}
    </div>
  );
};
