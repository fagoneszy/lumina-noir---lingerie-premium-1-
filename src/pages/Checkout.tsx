import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const { subtotal } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 px-6 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink mb-8"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <h1 className="text-4xl font-serif italic mb-4">Pedido Confirmado!</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Obrigada por escolher a LUMINA NOIR. Seu pedido foi processado e você receberá uma confirmação por e-mail em instantes.
        </p>
        <Link to="/" className="btn-primary">
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/cart" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-pink transition-all">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-4xl font-serif italic">Finalizar Compra</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* Section 1: Data */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-brand-pink flex items-center justify-center text-sm font-sans text-brand-pink">1</span>
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome Completo" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors col-span-2" />
              <input type="email" placeholder="E-mail" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors col-span-2" />
              <input type="tel" placeholder="Telefone / WhatsApp" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors col-span-2" />
            </div>
          </div>

          {/* Section 2: Shipping */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-brand-pink flex items-center justify-center text-sm font-sans text-brand-pink">2</span>
              Entrega (Discreta)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="CEP" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors" />
              <input type="text" placeholder="Cidade" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors" />
              <input type="text" placeholder="Endereço" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors col-span-2" />
              <input type="text" placeholder="Número" required className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors" />
              <input type="text" placeholder="Complemento" className="bg-brand-dark-gray border border-white/5 p-4 rounded-sm outline-none focus:border-brand-pink transition-colors" />
            </div>
          </div>

          {/* Section 3: Payment */}
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-brand-pink flex items-center justify-center text-sm font-sans text-brand-pink">3</span>
              Pagamento
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-brand-pink rounded-sm bg-brand-pink/5 cursor-pointer">
                <input type="radio" name="pay" defaultChecked className="accent-brand-pink" />
                <span className="font-bold">Cartão de Crédito</span>
              </label>
              <div className="grid grid-cols-2 gap-4 p-4 border border-white/5 rounded-sm bg-brand-dark-gray">
                <input type="text" placeholder="Número do Cartão" className="bg-black/20 border border-white/10 p-3 rounded-sm col-span-2" />
                <input type="text" placeholder="Validade" className="bg-black/20 border border-white/10 p-3 rounded-sm" />
                <input type="text" placeholder="CVV" className="bg-black/20 border border-white/10 p-3 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-morphism p-8 rounded-sm sticky top-32">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Lock size={18} className="text-brand-pink" /> Checkout Seguro</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-glow-pink">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3">
              <ShieldCheck /> Confirmar Pedido
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
