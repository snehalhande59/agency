import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const Dropdown = ({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  className = '',
  icon: Icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] ml-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#F8FAFC] border border-[#E5EDF5] hover:border-[#CBD5E1] rounded-2xl py-2.5 px-3.5 text-sm text-left text-[#153B5B] focus:outline-none focus:border-[#3898D8] focus:ring-1 focus:ring-[#3898D8]/50 transition-all font-semibold"
      >
        <div className="flex items-center gap-2.5 truncate">
          {Icon && <Icon className="w-4 h-4 text-[#3898D8] shrink-0" />}
          <span className={selectedOption ? 'text-[#153B5B] font-bold' : 'text-[#94A3B8]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#3898D8]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 p-1.5 bg-white border border-[#E5EDF5] rounded-2xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 text-[#153B5B]">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  isSelected
                    ? 'bg-[#3898D8] text-white shadow-sm'
                    : 'text-[#153B5B] hover:bg-[#EFF7FC]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon && <opt.icon className="w-4 h-4 text-[#3898D8]" />}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};