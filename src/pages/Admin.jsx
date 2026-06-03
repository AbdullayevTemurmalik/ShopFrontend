import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Package, ListTree, Trash2, Edit2, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';
import CategorySelect from '../components/CategorySelect';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category_id: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products/getProducts'),
        api.get('/categories/getCategories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      toast.error('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'products') {
        const payload = { ...formData };
        if (editingId) {
          await api.put(`/products/updateProduct/${editingId}`, payload);
          toast.success('Yangilandi');
        } else {
          await api.post('/products/createProduct', payload);
          toast.success('Yaratildi');
        }
      } else {
        const payload = { name: formData.name };
        if (editingId) {
          await api.put(`/categories/updateCategory/${editingId}`, payload);
          toast.success('Yangilandi');
        } else {
          await api.post('/categories/createCategory', payload);
          toast.success('Yaratildi');
        }
      }
      setShowModal(false);
      setFormData({ name: '', description: '', price: '', imageUrl: '', category_id: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Form submit error:", error);
      toast.error(error.response?.data?.message || 'Xatolik yuz berdi');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    if (activeTab === 'products') {
      setFormData({
        name: item.name,
        description: item.description || '',
        price: item.price,
        imageUrl: item.imageUrl || '',
        category_id: item.category_id || ''
      });
    } else {
      setFormData({ ...formData, name: item.name });
    }
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!showConfirm.id) return;
    try {
      if (activeTab === 'products') {
        await api.delete(`/products/deleteProduct/${showConfirm.id}`);
      } else {
        await api.delete(`/categories/deleteCategory/${showConfirm.id}`);
      }
      toast.success('O\'chirildi');
      fetchData();
      setShowConfirm({ isOpen: false, id: null });
    } catch (error) {
      toast.error('O\'chirishda xato');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Mahsulotlar</span>
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'categories' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <ListTree className="w-5 h-5" />
            <span>Kategoriyalar</span>
          </button>
          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all bg-slate-900 text-slate-400 hover:bg-slate-800"
          >
            <span className="w-5 h-5 flex items-center justify-center">👥</span>
            <span>Foydalanuvchilar</span>
          </button>
        </div>

        <div className="flex-grow bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white capitalize">{activeTab === 'products' ? 'Mahsulotlar' : 'Kategoriyalar'}</h2>
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', description: '', price: '', imageUrl: '', category_id: '' });
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Qo'shish</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-blue-500 animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-sm uppercase font-black">
                    <th className="pb-4">Nomi</th>
                    {activeTab === 'products' && (
                      <>
                        <th className="pb-4">Kategoriya</th>
                        <th className="pb-4">Narxi</th>
                      </>
                    )}
                    <th className="pb-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(activeTab === 'products' ? products : categories).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 text-white font-medium">{item.name}</td>
                      {activeTab === 'products' && (
                        <>
                          <td className="py-4 text-slate-400">{item.category?.name || '—'}</td>
                          <td className="py-4 text-blue-400 font-bold">${item.price}</td>
                        </>
                      )}
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setShowConfirm({ isOpen: true, id: item.id })} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-white mb-6">{editingId ? 'Tahrirlash' : (activeTab === 'products' ? 'Yangi Mahsulot' : 'Yangi Kategoriya')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder={activeTab === 'products' ? "Mahsulot nomi" : "Kategoriya nomi"} required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
              />
              {activeTab === 'products' && (
                <>
                  <textarea 
                    placeholder="Tavsif" 
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  ></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" step="0.01" placeholder="Narxi ($)" required
                      value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <CategorySelect 
                      value={formData.category_id} 
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})} 
                      options={categories} 
                      placeholder="Kategoriya tanlang" 
                    />
                  </div>
                  <input 
                    type="text" placeholder="Rasm URL manzili"
                    value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </>
              )}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95">Saqlash</button>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={showConfirm.isOpen}
        onClose={() => setShowConfirm({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="O'chirishni tasdiqlang"
        message="Haqiqatan ham ushbu ma'lumotni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
};

export default Admin;
