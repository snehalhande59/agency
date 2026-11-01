import React from 'react';

export const Card = ({
  children,
  variant = 'glass',
  hoverEffect = true,
  className = '',
  onClick
}) => {
  const variantStyles = {
    glass: 'glass-panel border-slate-800',
    elevated: 'bg-navy-900/90 border-electric-500/20 shadow-2xl',
    outline: 'bg-navy-950/60 border-slate-800',
    highlight: 'glass-card border-electric-500/40 shadow-glow'
  };

  const hoverStyles = hoverEffect
    ? 'hover:border-electric-500/50 hover:shadow-glow-sm transition-all duration-300'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border p-5 sm:p-6 ${variantStyles[variant] || variantStyles.glass} ${hoverStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
