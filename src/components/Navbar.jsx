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
    closed: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
              <ShoppingBag className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
            </div>
            <span className="text-lg xs:text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">InternetShop</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-bold transition-all ${location.pathname === '/' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>Asosiy</Link>
            <Link to="/shop" className={`text-sm font-bold transition-all ${location.pathname === '/shop' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>Do'kon</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`text-sm font-bold flex items-center gap-1 transition-all ${location.pathname.startsWith('/admin') ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            {user && (
              <button 
                onClick={logout} 
                className="text-sm font-bold flex items-center gap-1 text-slate-400 hover:text-red-500 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Chiqish</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 xs:gap-4">
            <Link to="/wishlist" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Heart className={`w-5 h-5 ${wishlistItems.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
              {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950">{cartItems.length}</span>}
            </Link>
            
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-[#000000] z-[60]"
            />
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              style={{ backgroundColor: '#1e3a8a' }}
              className="fixed top-0 right-0 bottom-0 w-[300px] border-l border-blue-500/30 z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Menu className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-black text-white uppercase tracking-widest">Menyu</span>
                </div>
                <button onClick={toggleMenu} className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow space-y-4">
                <Link 
                  to="/" 
                  onClick={toggleMenu}
                  className={`flex items-center gap-4 p-5 rounded-[20px] transition-all ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-lg font-black">Asosiy Sahifa</span>
                </Link>
                <Link 
                  to="/shop" 
                  onClick={toggleMenu}
                  className={`flex items-center gap-4 p-5 rounded-[20px] transition-all ${location.pathname === '/shop' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                >
                  <Store className="w-6 h-6" />
                  <span className="text-lg font-black">Mahsulotlar</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={toggleMenu}
                    className={`flex items-center gap-4 p-5 rounded-[20px] transition-all ${location.pathname.startsWith('/admin') ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                  >
                    <Settings className="w-6 h-6" />
                    <span className="text-lg font-black">Admin Panel</span>
                  </Link>
                )}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-800">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-900/50 rounded-3xl border border-slate-800">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-xl">
                    {user?.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-black truncate max-w-[120px]">{user?.userName}</p>
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{user?.role === 'admin' ? 'Administrator' : 'Mijoz'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { toggleMenu(); logout(); }}
                  className="w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-5 rounded-[20px] font-black text-lg transition-all active:scale-95"
                >
                  <LogOut className="w-6 h-6" />
                  <span>Tizimdan Chiqish</span>
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
