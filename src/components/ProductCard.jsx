import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleLike, wishlistItems } = useCart();
  const isLiked = wishlistItems.some(item => item.product_id === product.id);

  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden transition-all hover:border-blue-500/50">
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link to={`/product/${product.id}`} className="p-3 bg-white text-slate-900 rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110"><Eye className="w-5 h-5" /></Link>
          <button onClick={() => toggleLike(product.id)} className={`p-3 rounded-full transition-all transform hover:scale-110 ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-slate-900 hover:bg-red-500 hover:text-white'}`}><Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} /></button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div><p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">{product.category?.name}</p><h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3></div>
          <p className="text-lg font-black text-white">${product.price}</p>
        </div>
        <button onClick={() => addToCart(product.id)} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl transition-all"><ShoppingCart className="w-5 h-5" /><span>Savatga</span></button>
      </div>
    </div>
  );
};

export default ProductCard;
