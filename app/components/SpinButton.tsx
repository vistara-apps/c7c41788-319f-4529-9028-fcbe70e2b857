'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SpinButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  variant: 'loading' | 'disabled';
  children: React.ReactNode;
}

export default function SpinButton({ 
  onClick, 
  isLoading, 
  disabled, 
  variant, 
  children 
}: SpinButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full relative overflow-hidden rounded-lg font-semibold py-4 px-6 transition-all duration-200 ${
        isDisabled 
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
          : 'bg-gradient-brand text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      }`}
      whileHover={!isDisabled ? { y: -1 } : {}}
      whileTap={!isDisabled ? { y: 0 } : {}}
    >
      {/* Background animation when loading */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
      
      <div className="relative flex items-center justify-center gap-2">
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-5 h-5" />
          </motion.div>
        )}
        
        <span>{children}</span>
        
        {!isLoading && !isDisabled && (
          <motion.span
            className="text-xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            🔄
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
