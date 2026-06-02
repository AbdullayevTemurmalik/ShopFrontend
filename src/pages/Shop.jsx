import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import CategorySelect from '../components/CategorySelect';

const PriceFilter = ({ maxPrice, setMaxPrice }) => {
  const [localPrice, setLocalPrice] = useState(maxPrice || 100000);
  
  useEffect(() => {
    setLocalPrice(maxPrice || 100000);
  }, [maxPrice]);

  return (
    <div className="flex flex-col justify-center w-full sm:w-56 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
      <div className="flex justify-between items-center text-xs text-slate-400 font-bold mb-2">
        <span>Narx:</span>
        <span className="text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">${localPrice} gacha</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100000" 
        step="50"
        value={localPrice} 
        onChange={(e) => setLocalPrice(e.target.value)} 
        onMouseUp={() => setMaxPrice(localPrice)}
        onTouchEnd={() => setMaxPrice(localPrice)}
        className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer"
      />
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories/getCategories');
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products/getProducts';
        if (search) {
          url = `/products/search?query=${search}`;
        } else if (selectedCategory || minPrice || maxPrice) {
          const params = new URLSearchParams();
          if (selectedCategory) params.append('category_id', selectedCategory);
          if (minPrice) params.append('minPrice', minPrice);
          if (maxPrice) params.append('maxPrice', maxPrice);
          url = `/products/filter?${params.toString()}`;
        }
        const { data } = await api.get(url);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timeout);
  }, [search, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div><h1 className="text-4xl font-black text-white mb-2">Mahsulotlar</h1></div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Qidirish..." />
          </div>
          <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          <div className="w-full sm:w-64">
            <CategorySelect 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              options={categories} 
              placeholder="Barcha Kategoriyalar" 
              icon={SlidersHorizontal} 
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20"><Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" /></div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-lg">Mahsulotlar topilmadi.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
