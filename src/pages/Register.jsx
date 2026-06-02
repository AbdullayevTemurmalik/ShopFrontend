import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Calendar, Users, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: 'male',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 py-12">
      <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl mb-4 shadow-lg shadow-blue-500/20">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Ro'yxatdan o'tish</h1>
          <p className="text-slate-400 mt-2">Yangi hisob yarating</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="userName"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ism</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Temur"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Familiya</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Malik"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="dev@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Yosh</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="25"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Jins</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
                <option value="other">Boshqa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Parol</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Parolni tasdiqlang</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95 mt-4"
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Akkauntingiz bormi?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
