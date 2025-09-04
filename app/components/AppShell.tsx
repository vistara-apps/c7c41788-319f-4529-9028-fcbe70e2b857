'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Sparkles, Zap, Coins } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <motion.div
          className="floating-shape w-20 h-20 bg-accent/20 rounded-full blur-xl"
          style={{ top: '10%', left: '10%' }}
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-shape w-32 h-32 bg-primary/20 rounded-full blur-2xl"
          style={{ top: '60%', right: '15%' }}
          animate={{ 
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-shape w-16 h-16 bg-purple-400/20 rounded-full blur-lg"
          style={{ bottom: '20%', left: '20%' }}
          animate={{ 
            x: [0, 20, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-shape"
          style={{ top: '30%', right: '30%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-accent/40" />
        </motion.div>
        <motion.div
          className="floating-shape"
          style={{ bottom: '40%', left: '60%' }}
          animate={{ 
            rotate: [0, -180, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-6 h-6 text-primary/40" />
        </motion.div>
        <motion.div
          className="floating-shape"
          style={{ top: '70%', left: '80%' }}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Coins className="w-7 h-7 text-accent/30" />
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🔄</span>
            </div>
            <span className="text-white font-semibold text-lg">AdSpinner AI</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ConnectWallet 
              text="Connect Wallet"
            />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center">
        <motion.p 
          className="text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Powered by AI • Built on Base
        </motion.p>
      </footer>
    </div>
  );
}
