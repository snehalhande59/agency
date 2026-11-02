import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  rightElement,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] ml-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#3898D8] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-[#F8FAFC] border rounded-2xl py-2.5 text-sm text-[#153B5B] font-semibold placeholder-[#94A3B8] focus:outline-none focus:bg-white transition-all ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${
            rightElement ? 'pr-10' : 'pr-3.5'
          } ${
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
              : 'border-[#E5EDF5] hover:border-[#CBD5E1] focus:border-[#3898D8] focus:ring-1 focus:ring-[#3898D8]/50'
          } ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-500 font-medium ml-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#64748B] ml-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';