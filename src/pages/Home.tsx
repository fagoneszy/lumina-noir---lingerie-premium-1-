import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { productService } from '../services/api';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';

export const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    productService.getFeaturedProducts().then(setFeatured);
    productService.getCategories().then(setCategories);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-[120%] object-cover scale-110"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-pink font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              Coleção Midnight Essence
            </span>
            <h1 className="text-5xl md:text-8xl font-serif italic mb-8 leading-[1.1]">
              A Elegância do <span className="text-white not-italic font-sans font-bold block md:inline">Ouro Negro</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
                Explorar Coleção <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/shop?filter=novidades" className="btn-secondary w-full sm:w-auto justify-center">
                Ver Novidades
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <div className="w-[2px] h-12 bg-gradient-to-b from-brand-pink to-transparent" />
        </motion.div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-2 italic">Descubra sua Essência</h2>
            <p className="text-gray-400">Explore nossas categorias exclusivas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative group overflow-hidden rounded-sm h-[400px]",
                idx === 0 && "lg:col-span-2",
                idx === 3 && "lg:col-span-2"
              )}
            >
              <Link to={`/shop?category=${cat.slug}`} className="block h-full">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-brand-pink text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-dark-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-glow-pink text-3xl md:text-5xl font-serif italic mb-4">Mais Desejados</h2>
            <div className="w-20 h-[2px] bg-brand-pink mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold">Compra Segura</h3>
          <p className="text-gray-400 text-sm">Seus dados protegidos com criptografia de ponta a ponta.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-lilac/10 flex items-center justify-center text-brand-lilac">
            <Truck size={32} />
          </div>
          <h3 className="text-xl font-bold">Entrega Discreta</h3>
          <p className="text-gray-400 text-sm">Embalagens premium sem identificação externa para sua total privacidade.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
            <Sparkles size={32} />
          </div>
          <h3 className="text-xl font-bold">Qualidade Premium</h3>
          <p className="text-gray-400 text-sm">Tecidos importados e acabamento artesanal de alta costura.</p>
        </div>
      </section>
    </div>
  );
};
