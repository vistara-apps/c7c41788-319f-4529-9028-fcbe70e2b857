'use client';

import { motion } from 'framer-motion';
import { Coins, Plus } from 'lucide-react';

interface CreditCounterProps {
  credits: number;
}

export default function CreditCounter({ credits }: CreditCounterProps) {
  const isLowCredits = credits < 5;

  return (
    <motion.div 
      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={isLowCredits ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: isLowCredits ? Infinity : 0 }}
        >
          <Coins className={`w-5 h-5 ${isLowCredits ? 'text-amber-400' : 'text-accent'}`} />
        </motion.div>
        <div>
          <div className="text-white font-semibold">
            {credits} Credits
          </div>
          {isLowCredits && (
            <div className="text-amber-200 text-xs">
              Running low!
            </div>
          )}
        </div>
      </div>
      
      <button className="flex items-center gap-1 bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Buy More
      </button>
    </motion.div>
  );
}
