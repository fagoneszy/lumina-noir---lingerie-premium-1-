import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth, handleFirestoreError } from '../lib/firebase';
import { collection, doc, setDoc, query, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: string[]; // Array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Local storage persistence for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // Firestore sync for logged-in users
  useEffect(() => {
    if (!user) return;

    const wishlistCol = collection(db, 'users', user.uid, 'wishlist');
    const q = query(wishlistCol);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => doc.id);
      setWishlist(items);
      // Update local storage so it matches if they log out
      localStorage.setItem('wishlist', JSON.stringify(items));
    }, (error) => {
      console.error("Wishlist sync error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleWishlist = async (productId: string) => {
    const exists = wishlist.includes(productId);

    if (user) {
      const itemRef = doc(db, 'users', user.uid, 'wishlist', productId);
      try {
        if (exists) {
          await deleteDoc(itemRef);
        } else {
          await setDoc(itemRef, {
            productId,
            addedAt: serverTimestamp()
          });
        }
      } catch (error) {
        handleFirestoreError(error, exists ? 'delete' : 'create', itemRef.path);
      }
    } else {
      // Guest local state
      setWishlist(prev => 
        exists ? prev.filter(id => id !== productId) : [...prev, productId]
      );
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
