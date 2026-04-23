import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-brand-dark-gray flex items-center justify-center mb-8 text-gray-500">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-serif italic mb-4">Sua Bag está vazia</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Parece que você ainda não adicionou nenhuma peça incrível à sua seleção. Que tal explorar nossas novidades?
        </p>
        <Link to="/shop" className="btn-primary">
          Explorar a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif italic mb-12">Minha Bag ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-6 pb-8 border-b border-white/5"
              >
                <div className="w-24 sm:w-32 aspect-[3/4] rounded-sm overflow-hidden bg-brand-dark-gray shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link to={`/product/${item.id}`} className="font-bold text-lg hover:text-brand-pink transition-colors">
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-gray-500 hover:text-brand-pink transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Tamanho: <span className="text-brand-pink font-bold">{item.selectedSize}</span> | Cor: <span className="text-brand-pink font-bold">{item.selectedColor.name}</span>
                    </p>
                    <p className="text-brand-lilac font-bold mt-2">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-white/10 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="p-2 hover:text-brand-pink"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="p-2 hover:text-brand-pink"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold">
                      R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-morphism p-8 rounded-sm sticky top-32">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Resumo</h3>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Entrega</span>
                <span className="text-green-500 font-bold uppercase tracking-tighter">Grátis</span>
              </div>
              <div className="h-[1px] bg-white/10 my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-brand-pink">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
              Finalizar Pedido <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
