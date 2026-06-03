import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ShoppingCart, Heart, LogOut, Settings, Menu, X, Home, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
            </div>
            <span className="hidden xs:block text-lg xs:text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">InternetShop</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>Asosiy</Link>
            <Link to="/shop" className={`text-sm font-medium transition-colors ${location.pathname === '/shop' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>Do'kon</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`text-sm font-medium flex items-center gap-1 transition-colors ${location.pathname.startsWith('/admin') ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 xs:gap-4">
            <Link to="/wishlist" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Heart className={`w-5 h-5 ${wishlistItems.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
              {wishlistItems.length > 0 && <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cartItems.length}</span>}
            </Link>
            
            <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
              <div className="text-right">
                <p className="text-xs font-medium text-white">{user?.userName}</p>
                <p className="text-[10px] text-slate-500">{user?.role === 'admin' ? 'Admin' : 'Mijoz'}</p>
              </div>
              <button onClick={logout} className="p-2 bg-slate-900 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"><LogOut className="w-5 h-5" /></button>
            </div>

            <button onClick={toggleMenu} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-slate-950 border-l border-slate-800 z-[60] p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold text-white">Menyu</span>
                <button onClick={toggleMenu} className="p-2 text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <Link 
                  to="/" 
                  onClick={toggleMenu}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-bold">Asosiy</span>
                </Link>
                <Link 
                  to="/shop" 
                  onClick={toggleMenu}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === '/shop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Store className="w-5 h-5" />
                  <span className="font-bold">Do'kon</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={toggleMenu}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname.startsWith('/admin') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-bold">Admin Panel</span>
                  </Link>
                )}
              </div>

              <div className="absolute bottom-10 left-6 right-6 pt-10 border-t border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-900 p-3 rounded-2xl">
                    <ShoppingBag className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{user?.userName}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{user?.role === 'admin' ? 'Admin' : 'Mijoz'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { toggleMenu(); logout(); }}
                  className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-4 rounded-2xl font-bold transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Chiqish</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
