import { useState, useEffect } from 'react';
import api from '../services/api';
import { User, Trash2, Edit2, Loader2, X, Shield, Mail, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [showConfirm, setShowConfirm] = useState({ isOpen: false, id: null });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/users/getUsers');
      setUsers(data);
    } catch (error) {
      toast.error('Foydalanuvchilarni yuklashda xato');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!showConfirm.id) return;
    try {
      await api.delete(`/users/deleteUser/${showConfirm.id}`);
      toast.success('Foydalanuvchi o\'chirildi');
      fetchUsers();
    } catch (error) {
      toast.error('O\'chirishda xato');
    }
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setUserForm({
      userName: user.userName,
      email: user.email,
      password: '' // Parolni ko'rsatmaymiz, faqat yangilash uchun
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...userForm };
      if (!submitData.password) delete submitData.password; // Agar yangi parol yozilmasa, eski holicha qoladi

      await api.put(`/users/updateUser/${editingUser.id}`, submitData);
      toast.success('Foydalanuvchi yangilandi!');
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      toast.error('Yangilashda xato');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Foydalanuvchilar</h1>
          <p className="text-slate-400 font-medium">Barcha ro'yxatdan o'tgan mijozlarni boshqarish</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">
          <span className="text-slate-500 text-sm font-bold uppercase">Jami:</span>
          <span className="ml-3 text-2xl font-black text-blue-500">{users.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div key={u.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-[32px] backdrop-blur-xl group hover:border-blue-500/50 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="bg-blue-600/10 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <User className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(u)} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => setShowConfirm({ isOpen: true, id: u.id })} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white truncate">{u.userName}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>Qo'shilgan: {new Date(u.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Aktiv</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase font-black tracking-widest">ID: {u.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tahrirlash Modali */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[40px] p-10 shadow-2xl relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-3xl font-black text-white mb-8">Tahrirlash</h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Username</label>
                <input
                  type="text" required
                  value={userForm.userName} onChange={(e) => setUserForm({ ...userForm, userName: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Email</label>
                <input
                  type="email" required
                  value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Yangi Parol (ixtiyoriy)</label>
                <input
                  type="password" placeholder="O'zgartirish uchun yozing"
                  value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-colors">Bekor qilish</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all active:scale-95">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={showConfirm.isOpen}
        onClose={() => setShowConfirm({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="O'chirishni tasdiqlang"
        message="Haqiqatan ham ushbu foydalanuvchini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      />
    </div>
  );
};

export default Users;