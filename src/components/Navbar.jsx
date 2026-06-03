import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ShoppingCart, Heart, LogOut, Settings, Menu, X, Home, Store, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
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

            {user && (
              <button 
                onClick={() => setIsLogoutModalOpen(true)} 
                className="hidden md:flex p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-90 items-center justify-center"
                title="Chiqish"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
            
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
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#1e3a8a] border-l border-blue-500/30 z-[70] p-8 shadow-2xl flex flex-col"
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
                  onClick={() => { toggleMenu(); setIsLogoutModalOpen(true); }}
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

      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[320px] bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
              
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 mt-2 shadow-inner">
                <LogOut className="w-8 h-8 text-blue-400 ml-1" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Chiqish</h3>
              <p className="text-sm text-slate-400 mb-6">Tizimdan rostdan ham chiqmoqchimisiz?</p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
                >
                  Bekor qilish
                </button>
                <button 
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    logout();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                  Ha, chiqish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
