import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar, FloatingSupport } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { IntroLoader } from './components/IntroLoader';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { WishlistPage } from './pages/Wishlist';

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {!isIntroComplete && <IntroLoader onComplete={() => setIsIntroComplete(true)} />}
            
            <AnimatePresence mode="wait">
              {isIntroComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-screen flex flex-col bg-brand-black text-white selection:bg-brand-pink/30"
                >
                  <ScrollToTop />
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                  </main>
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
            {isIntroComplete && <FloatingSupport />}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
