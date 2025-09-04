'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Eye, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';

interface AdCardProps {
  ad: {
    id: number;
    imageUrl: string;
    copy: string;
    platform: string;
    metrics?: {
      views: number;
      likes: number;
      shares: number;
    };
  };
  variant: 'preview' | 'posted';
}

export default function AdCard({ ad, variant }: AdCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(ad.copy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const platformColors = {
    instagram: 'from-pink-500 to-purple-600',
    tiktok: 'from-black to-gray-800',
    farcaster: 'from-purple-500 to-indigo-600',
  };

  const platformColor = platformColors[ad.platform as keyof typeof platformColors] || 'from-gray-500 to-gray-700';

  return (
    <motion.div 
      className="ad-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Platform Badge */}
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r ${platformColor}`}>
        <span className="text-white text-xs font-medium capitalize">{ad.platform}</span>
      </div>

      {/* Image */}
      <div className="relative aspect-square">
        <img
          src={ad.imageUrl}
          alt="Ad variation"
          className="w-full h-full object-cover rounded-t-lg"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-t-lg flex items-center justify-center">
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={copyToClipboard}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Copy Text */}
        <div className="mb-4">
          <p className="text-text-primary text-sm leading-relaxed line-clamp-3">
            {ad.copy}
          </p>
        </div>

        {/* Metrics (if posted) */}
        {variant === 'posted' && ad.metrics && (
          <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{ad.metrics.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{ad.metrics.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{ad.metrics.shares}</span>
              </div>
            </div>
            <button className="text-text-secondary hover:text-text-primary">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {variant === 'preview' ? (
            <>
              <button className="flex-1 button-primary text-sm py-2">
                Post to {ad.platform}
              </button>
              <button 
                onClick={copyToClipboard}
                className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                  isCopied 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                {isCopied ? '✓' : <Copy className="w-4 h-4" />}
              </button>
            </>
          ) : (
            <>
              <button className="flex-1 button-secondary text-sm py-2">
                View Performance
              </button>
              <button 
                onClick={copyToClipboard}
                className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                  isCopied 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                {isCopied ? '✓' : <Copy className="w-4 h-4" />}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
