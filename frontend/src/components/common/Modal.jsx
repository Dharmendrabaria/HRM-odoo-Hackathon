import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className={cn(
                "relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200",
                className
            )}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-50">
              <h3 className="text-xl font-black text-primary tracking-tight">{title}</h3>
              <button 
                onClick={onClose} 
                className="p-1.5 text-slate-300 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
