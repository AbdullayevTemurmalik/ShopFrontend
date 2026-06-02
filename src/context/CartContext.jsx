import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user || !user.id) return;
    try {
      const { data } = await api.get(`/carts/user/${user.id}`);
      setCartItems(data);
    } catch (error) {
      console.error('Cart fetch error:', error);
    }
  };

  const fetchWishlist = async () => {
    if (!user || !user.id) return;
    try {
      const { data } = await api.get(`/likes/user/${user.id}`);
      setWishlistItems(data);
    } catch (error) {
      console.error('Wishlist fetch error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
    } else {
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/carts/add', { user_id: user.id, product_id: productId, quantity });
      toast.success('Savatga qo\'shildi');
      fetchCart();
    } catch (error) {
      toast.error('Xatolik');
    }
  };

  const toggleLike = async (productId) => {
    const isLiked = wishlistItems.find(item => item.product_id === productId);
    try {
      if (isLiked) {
        await api.delete(`/likes/remove/${isLiked.id}`);
      } else {
        await api.post('/likes/add', { user_id: user.id, product_id: productId });
      }
      fetchWishlist();
    } catch (error) {
      toast.error('Xatolik');
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/carts/updateCart/${cartId}`, { quantity });
      fetchCart();
    } catch (error) {
      toast.error('Xatolik');
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/carts/remove/${cartId}`);
      fetchCart();
    } catch (error) {
      toast.error('Xatolik');
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, wishlistItems, addToCart, toggleLike, updateQuantity, removeFromCart, fetchCart, fetchWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
