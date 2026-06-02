import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, ArrowLeft, Loader2, Star, ShieldCheck, Truck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleLike, wishlistItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/getProduct/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (<div className="flex flex-col items-center justify-center min-h-[60vh]"><Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" /></div>);
  if (!product) return (<div className="text-center py-20"><p className="text-slate-400">Topilmadi.</p></div>);

  const isLiked = wishlistItems.some(item => item.product_id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10"><ArrowLeft className="w-5 h-5" /><span>Orqaga</span></Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="relative group">
          <div className="aspect-square bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden"><img src={product.imageUrl || 'https://via.placeholder.com/800'} alt="" className="w-full h-full object-cover" /></div>
          <button onClick={() => toggleLike(product.id)} className={`absolute top-6 right-6 p-4 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:text-red-500'}`}><Heart className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-8"><span className="text-blue-500 text-xs font-bold uppercase tracking-widest">{product.category?.name}</span><h1 className="text-5xl font-black text-white mt-6 mb-4">{product.name}</h1><p className="text-3xl font-black text-blue-500">${product.price}</p></div>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 border-b border-slate-800 pb-10">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center bg-slate-900 border border-slate-800 p-2 rounded-2xl"><button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 text-white text-2xl font-bold">-</button><span className="w-16 text-center text-xl font-black text-white">{quantity}</span><button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 text-white text-2xl font-bold">+</button></div>
            <button onClick={() => addToCart(product.id, quantity)} className="flex-grow flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-xl transition-all"> <ShoppingCart className="w-6 h-6" /><span>Savatga Qo'shish</span></button>
          </div>
          <div className="grid grid-cols-2 gap-4"><div className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800"><ShieldCheck className="text-blue-500" /><div><p className="text-white text-xs font-bold uppercase">Kafolat</p></div></div><div className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800"><Truck className="text-blue-500" /><div><p className="text-white text-xs font-bold uppercase">Yetkazish</p></div></div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
