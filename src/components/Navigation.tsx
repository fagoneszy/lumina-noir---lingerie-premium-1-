import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, User, Search, MessageCircle, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, login, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Novidades', path: '/shop?filter=novidades' },
    { name: 'Conjuntos', path: '/shop?filter=conjuntos' },
    { name: 'Essenciais', path: '/shop' },
    { name: 'Sale', path: '/shop?filter=sale' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass-morphism py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => setIsOpen(true)} className="lg:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-sm uppercase tracking-widest hover:text-brand-pink transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/" className="text-2xl font-serif italic tracking-tighter absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          LUMINA <span className="text-brand-pink font-sans font-bold not-italic">NOIR</span>
        </Link>

        <div className="flex items-center gap-5">
          <button className="hidden sm:block hover:text-brand-pink transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/wishlist" className="relative group">
            <Heart className={cn("w-5 h-5 group-hover:text-brand-pink transition-colors", wishlist.length > 0 && "fill-brand-pink text-brand-pink")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-white text-brand-black text-[8px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-6 h-6 group-hover:text-brand-pink transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-neon-pink">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 group relative">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-brand-pink/30 group-hover:border-brand-pink transition-all" />
              <div className="absolute top-full right-0 mt-2 bg-brand-dark-gray border border-white/10 rounded-sm p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all w-48 shadow-lg">
                <p className="text-xs font-bold mb-4 truncate text-gray-300">{user.displayName}</p>
                <button 
                  onClick={() => logout()}
                  className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 w-full"
                >
                  <LogOut size={14} /> Sair
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => login()} className="hover:text-brand-pink transition-colors">
              <User className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif">LUMINA NOIR</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light hover:text-brand-pink transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const FloatingSupport = () => {
  return (
    <motion.a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-shadow hover:shadow-[#25D366]/40"
    >
      <MessageCircle size={28} fill="white" />
    </motion.a>
  );
};
