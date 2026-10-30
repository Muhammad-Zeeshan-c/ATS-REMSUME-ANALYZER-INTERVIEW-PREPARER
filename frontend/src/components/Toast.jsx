import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-white border-emerald-500 text-emerald-700',
  error: 'bg-white border-red-500 text-red-700',
  info: 'bg-white border-blue-500 text-blue-700',
};

const iconStyles = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

export const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const Icon = icons[toast.type] || CheckCircle;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border-l-4 shadow-lg max-w-sm ${styles[toast.type]}`}>
        <Icon size={18} className={`mt-0.5 flex-shrink-0 ${iconStyles[toast.type]}`} />
        <p className="text-sm font-medium text-slate-800 flex-1">{toast.message}</p>
        <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
