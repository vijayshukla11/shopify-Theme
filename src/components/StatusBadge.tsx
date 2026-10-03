import React from 'react';
import { StatusLabel } from '../types/phase8';

interface StatusBadgeProps {
  status: StatusLabel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', className = '' }) => {
  const getBadgeStyle = (s: StatusLabel) => {
    switch (s) {
      case 'REAL':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
      case 'DEMONSTRATION':
        return 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800';
      case 'TEMPLATE':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
      case 'PLACEHOLDER':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getSizeStyle = (sz: string) => {
    switch (sz) {
      case 'sm':
        return 'text-[10px] px-2 py-0.5 tracking-wider';
      case 'md':
        return 'text-xs px-2.5 py-1 tracking-wider';
      case 'lg':
        return 'text-sm px-3 py-1.5 tracking-widest';
      default:
        return 'text-[10px] px-2 py-0.5 tracking-wider';
    }
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-bold uppercase rounded-md border shadow-xs whitespace-nowrap ${getBadgeStyle(
        status
      )} ${getSizeStyle(size)} ${className}`}
      title={`Data Status: ${status}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};
