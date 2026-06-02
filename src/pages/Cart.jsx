import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + (item.product?.price * item.quantity), 0);

  if (cartItems.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800"><ShoppingCart className="w-10 h-10 text-slate-500" /></div>
      <h2 className="text-3xl font-bold text-white mb-4">Savatchangiz bo'sh</h2>
      <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all"><span>Xaridni boshlash</span><ArrowRight className="w-5 h-5" /></Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-white mb-10 flex items-center gap-4"><ShoppingCart className="w-10 h-10 text-blue-500" /><span>Savatcha</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group transition-all hover:border-slate-700">
              <div className="w-32 h-32 bg-slate-800 rounded-2xl overflow-hidden shrink-0"><img src={item.product?.imageUrl || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.product?.name}</h3><p className="text-xl font-black text-white">${item.product?.price}</p></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center text-white font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-500 transition-colors p-2"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl sticky top-32">
            <h2 className="text-2xl font-bold text-white mb-6">Xulosa</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400"><span>Mahsulotlar:</span><span className="text-white font-medium">{cartItems.length} ta</span></div>
              <div className="h-px bg-slate-800 my-4"></div>
              <div className="flex justify-between text-xl font-bold"><span className="text-white">Jami:</span><span className="text-blue-500">${total.toFixed(2)}</span></div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"><span>To'lov qilish</span><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
