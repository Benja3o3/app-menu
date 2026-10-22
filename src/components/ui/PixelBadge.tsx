import React from 'react';

export interface PixelBadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'purple' | 'cyan' | 'neutral' | 'amber' | 'rose';
  icon?: React.ReactNode;
  pixelBorder?: boolean;
  size?: 'sm' | 'md';
}

export const PixelBadge: React.FC<PixelBadgeProps> = ({
  label,
  variant = 'primary',
  icon,
  pixelBorder = false,
  size = 'md',
}) => {
  const variantStyles = {
    primary: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full transition-all duration-200 select-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${pixelBorder ? 'pixel-corners font-mono tracking-wide' : ''}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
