import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: 'success' | 'error' | 'info';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, type = 'info' }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgGradient: 'from-emerald-500 to-teal-600',
          borderColor: 'border-emerald-500/30'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgGradient: 'from-red-500 to-rose-600',
          borderColor: 'border-red-500/30'
        };
      default:
        return {
          icon: AlertCircle,
          bgGradient: 'from-blue-500 to-indigo-600',
          borderColor: 'border-blue-500/30'
        };
    }
  };

  const { icon: Icon, bgGradient, borderColor } = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`
        bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300
        border ${borderColor} relative overflow-hidden
      `}>
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${bgGradient} p-6 text-white relative`}>
          <div className="flex items-center space-x-3">
            <Icon size={24} />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;