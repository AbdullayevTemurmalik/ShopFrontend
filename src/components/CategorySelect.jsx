import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CategorySelect = ({ value, onChange, options, placeholder, icon: Icon, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.id.toString() === value?.toString());

  return (
    <div ref={wrapperRef} className={`relative w-full ${className || ''}`}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-full bg-slate-900 border border-slate-800 text-white px-4 py-3.5 rounded-2xl cursor-pointer hover:border-slate-700 hover:bg-slate-800/50 transition-all select-none"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-slate-500" />}
          <span className={selectedOption ? 'text-white font-medium' : 'text-slate-400'}>
            {selectedOption ? selectedOption.name : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2">
          <div className="max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <div 
              onClick={() => { onChange({ target: { value: '' } }); setIsOpen(false); }}
              className={`px-4 py-3 rounded-xl cursor-pointer transition-all ${!value ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {placeholder}
            </div>
            {options.map((opt) => (
              <div 
                key={opt.id}
                onClick={() => { onChange({ target: { value: opt.id } }); setIsOpen(false); }}
                className={`px-4 py-3 rounded-xl cursor-pointer transition-all ${value?.toString() === opt.id.toString() ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {opt.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
