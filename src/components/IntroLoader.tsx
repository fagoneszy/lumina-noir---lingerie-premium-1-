import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
      // Wait for exit animation to finish before calling onComplete
      setTimeout(onComplete, 1200);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] bg-brand-black flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
              transition: { duration: 1.5, ease: 'easeOut' } 
            }}
            exit={{ 
              opacity: 0, 
              y: -20, 
              filter: 'blur(10px)',
              transition: { duration: 0.8, ease: 'easeIn' } 
            }}
            className="text-center px-6"
          >
            <motion.h1 
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255, 0, 127, 0)",
                  "0 0 20px rgba(255, 0, 127, 0.3)",
                  "0 0 0px rgba(255, 0, 127, 0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-2xl md:text-4xl font-serif italic tracking-[0.2em] text-white brightness-110"
            >
              um lugar de <span className="text-brand-pink not-italic font-sans font-bold">conforto</span>
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '40px' }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="h-[1px] bg-brand-lilac/30 mx-auto mt-6"
            />
          </motion.div>

          {/* Background Ambient Glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-pink rounded-full blur-[120px] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
