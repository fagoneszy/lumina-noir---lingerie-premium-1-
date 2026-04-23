import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Share2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { productService } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    if (id) {
      productService.getProductById(id).then(res => {
        if (res) {
          setProduct(res);
          setSelectedSize(res.sizes[0]);
          setSelectedColor(res.colors[0]);
        }
      });
    }
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center">Carregando...</div>;

  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      // Optional: Add some haptic or visual feedback
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] rounded-sm overflow-hidden bg-brand-dark-gray"
          >
            <img 
              src={product.images[activeImgIdx]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={cn(
                  "aspect-[4/5] rounded-sm overflow-hidden border-2 transition-all",
                  activeImgIdx === idx ? "border-brand-pink" : "border-transparent opacity-50"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <nav className="flex gap-2 text-xs uppercase tracking-widest text-gray-500 mb-2">
              <span className="hover:text-white cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
              <span>/</span>
              <span className="text-gray-300">{product.category}</span>
            </nav>
            <div className="flex gap-4">
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn("transition-colors", isInWishlist(product.id) ? "text-brand-pink" : "text-gray-400 hover:text-brand-pink")}
              >
                <Heart size={20} className={isInWishlist(product.id) ? "fill-current" : ""} />
              </button>
              <button className="text-gray-400 hover:text-brand-pink transition-colors"><Share2 size={20} /></button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-6 mb-8">
            <p className="text-3xl font-bold text-brand-pink">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} />)}
              </div>
              <span className="text-xs text-gray-500">({product.reviewsCount} avaliações)</span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          {/* Configuration */}
          <div className="space-y-8 mb-12">
            {/* Colors */}
            <div>
              <span className="block text-sm uppercase tracking-widest font-bold mb-4">Escolha a Cor: {selectedColor?.name}</span>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 p-1 transition-all",
                      selectedColor?.hex === color.hex ? "border-brand-pink scale-110" : "border-transparent"
                    )}
                  >
                    <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="block text-sm uppercase tracking-widest font-bold">Tamanho</span>
                <button className="text-xs text-brand-pink underline uppercase tracking-widest">Guia de Medidas</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-14 h-14 border flex items-center justify-center text-sm font-bold transition-all rounded-sm",
                      selectedSize === size 
                        ? "bg-brand-pink border-brand-pink text-white shadow-neon-pink" 
                        : "border-white/10 hover:border-brand-lilac"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6">
              <span className="block text-sm uppercase tracking-widest font-bold">Quantidade</span>
              <div className="flex items-center border border-white/10 rounded-sm">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:text-brand-pink transition-colors"><Minus size={16} /></button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:text-brand-pink transition-colors"><Plus size={16} /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-[2] btn-primary py-5 rounded-sm flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} /> Adicionar à Bag
            </button>
            <button className="flex-1 btn-secondary py-5 rounded-sm bg-white/5 border-white/10 text-white hover:bg-brand-lilac hover:text-black">
              Comprar Agora
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4 text-xs">
              <Truck className="text-brand-pink shrink-0" size={24} />
              <div>
                <p className="font-bold uppercase tracking-wider">Frete Grátis</p>
                <p className="text-gray-500">Em compras acima de R$ 300</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <RefreshCw className="text-brand-pink shrink-0" size={24} />
              <div>
                <p className="font-bold uppercase tracking-wider">Troca Fácil</p>
                <p className="text-gray-500">Até 30 dias para devolução</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
