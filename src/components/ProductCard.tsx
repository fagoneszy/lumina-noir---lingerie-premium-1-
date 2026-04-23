import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-brand-dark-gray">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-pink text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-neon-pink">
              Novo
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-brand-lilac text-brand-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-neon-lilac">
              Hit
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-white hover:text-brand-pink transition-colors group/heart"
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-all", 
              isWishlisted ? "fill-brand-pink text-brand-pink scale-110" : "group-hover/heart:scale-110"
            )} 
          />
        </button>

        {/* Image */}
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
        </Link>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <button 
            onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
            className="flex-1 bg-white text-black text-xs font-bold uppercase py-3 flex items-center justify-center gap-2 hover:bg-brand-pink hover:text-white transition-colors"
          >
            <ShoppingCart size={16} /> Add
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="p-3 bg-black/50 backdrop-blur-md text-white hover:bg-brand-lilac hover:text-black transition-colors"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-medium group-hover:text-brand-pink transition-colors truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-brand-pink font-bold">
          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  );
};
