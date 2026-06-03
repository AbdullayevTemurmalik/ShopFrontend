import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ShoppingCart, Heart, LogOut, Search, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, wishlistItems } = useCart();
  const location = useLocation();

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

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><Search className="w-5 h-5" /></button>
            <Link to="/wishlist" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Heart className={`w-5 h-5 ${wishlistItems.length > 0 ? 'fill-blue-500 text-blue-500' : ''}`} />
              {wishlistItems.length > 0 && <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cartItems.length}</span>}
            </Link>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-white">{user?.userName}</p>
                <p className="text-[10px] text-slate-500">{user?.role === 'admin' ? 'Admin' : 'Mijoz'}</p>
              </div>
              <button onClick={logout} className="p-2 bg-slate-900 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
