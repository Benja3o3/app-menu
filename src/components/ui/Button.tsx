import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090d16] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:ring-indigo-500 rounded-xl',
    secondary: 'bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] border border-slate-700/60 hover:border-slate-600 focus:ring-slate-500 rounded-xl',
    outline: 'bg-transparent border border-indigo-500/40 hover:bg-indigo-500/10 text-indigo-400 hover:text-indigo-300 focus:ring-indigo-500 rounded-xl',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-[#f8fafc] focus:ring-slate-500 rounded-lg',
    success: 'bg-[#10b981] hover:bg-[#059669] text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:ring-emerald-500 rounded-xl',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};
