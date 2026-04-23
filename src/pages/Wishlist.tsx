import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { user, login } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts().then(all => {
      const filtered = all.filter(p => wishlist.includes(p.id));
      setProducts(filtered);
      setLoading(false);
    });
  }, [wishlist]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando seus desejos...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-brand-dark-gray flex items-center justify-center mb-8 text-gray-500">
          <Heart size={48} />
        </div>
        <h2 className="text-3xl font-serif italic mb-4">Sua Wishlist está vazia</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Salve as peças que você mais amou para encontrá-las facilmente depois. Que tal começar agora?
        </p>
        <Link to="/shop" className="btn-primary">
          Explorar a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-serif italic">Meus Desejos ({wishlist.length})</h1>
        
        {!user && (
          <div className="bg-brand-pink/10 border border-brand-pink/20 p-4 rounded-sm flex items-center gap-4 max-w-md">
            <p className="text-xs text-gray-300">
              <span className="font-bold text-brand-pink">Salve permanentemente!</span> Faça login para acessar sua lista em qualquer dispositivo.
            </p>
            <button 
              onClick={() => login()}
              className="text-xs font-bold uppercase tracking-widest text-brand-pink hover:underline shrink-0"
            >
              Fazer Login
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
