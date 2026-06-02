import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, toggleLike, addToCart } = useCart();

  if (wishlistItems.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800"><Heart className="w-10 h-10 text-slate-500" /></div>
      <h2 className="text-3xl font-bold text-white mb-4">Sevimlilar bo'sh</h2>
      <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all"><span>Mahsulotlarni ko'rish</span><ArrowRight className="w-5 h-5" /></Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-white mb-10 flex items-center gap-4"><Heart className="w-10 h-10 text-red-500 fill-current" /><span>Sevimlilar</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden transition-all hover:border-blue-500/30">
            <div className="relative aspect-square overflow-hidden bg-slate-800">
              <img src={item.product?.imageUrl || 'https://via.placeholder.com/400'} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <button onClick={() => toggleLike(item.product_id)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"><Heart className="w-4 h-4 fill-current" /></button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.product?.name}</h3>
              <p className="text-blue-500 font-black mb-4">${item.product?.price}</p>
              <button onClick={() => addToCart(item.product_id)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl transition-all active:scale-95"><ShoppingCart className="w-4 h-4" /><span>Savatga o'tkazish</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
