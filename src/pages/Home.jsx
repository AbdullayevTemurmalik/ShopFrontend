import { useAuth } from '../context/AuthContext';
import { LogOut, ShoppingBag, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-600/20 mb-4">
          <ShoppingBag className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl xs:text-5xl md:text-6xl font-black text-white tracking-tighter">
          Xush kelibsiz, <span className="text-blue-500">{user?.userName}!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Tizim backend bilan to'liq integratsiya qilingan. Barcha mahsulotlarni ko'rish, savatchaga qo'shish va boshqarish imkoniyati tayyor.
        </p>

        <div className="flex flex-col xs:flex-row items-center justify-center gap-4 xs:gap-6 pt-8">
          <Link to="/shop" className="w-full xs:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95">
            <span>Xaridni boshlash</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="w-full xs:w-auto bg-slate-800 hover:bg-slate-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95 border border-slate-700">
              <Settings className="w-6 h-6" />
              <span>Admin Paneli</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
