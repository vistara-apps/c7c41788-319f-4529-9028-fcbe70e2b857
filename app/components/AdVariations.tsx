'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Loader2, Copy, Share2 } from 'lucide-react';
import AdCard from './AdCard';
import SpinButton from './SpinButton';

interface AdVariationsProps {
  uploadedImage: string | null;
  generatedAds: any[];
  isGenerating: boolean;
  onGenerateAds: (prompt: string) => void;
}

export default function AdVariations({ uploadedImage, generatedAds, isGenerating, onGenerateAds }: AdVariationsProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
    { id: 'farcaster', name: 'Farcaster', color: 'bg-purple-500' },
  ];

  const handleGenerate = () => {
    if (!uploadedImage || isGenerating) return;
    onGenerateAds(prompt || 'Create engaging social media ads for this product');
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Generation Form */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Generate Ad Variations</h2>
        
        {!uploadedImage ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-text-secondary mb-2">No Image Uploaded</h3>
            <p className="text-text-secondary">
              Please upload a product image first to generate ad variations.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Product Preview */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src={uploadedImage} 
                alt="Product" 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">Product Image Ready</h3>
                <p className="text-sm text-text-secondary">AI will analyze this image for ad generation</p>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Target Platforms</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? `${platform.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Prompt (Optional)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-field min-h-24 resize-none"
                placeholder="Describe your target audience, tone, or specific requirements..."
              />
            </div>

            {/* Generate Button */}
            <SpinButton
              onClick={handleGenerate}
              isLoading={isGenerating}
              disabled={!uploadedImage || selectedPlatforms.length === 0}
              variant="loading"
            >
              {isGenerating ? 'Generating Variations...' : 'Generate 5 Ad Variations'}
            </SpinButton>

            <p className="text-sm text-text-secondary">
              💡 This will consume 5 credits and generate unique variations optimized for your selected platforms.
            </p>
          </div>
        )}
      </motion.div>

      {/* Generation Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-primary">AI is Working Its Magic</h3>
                <p className="text-sm text-text-secondary">
                  Analyzing your image and generating creative variations...
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-brand h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Variations */}
      <AnimatePresence>
        {generatedAds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Generated Variations ({generatedAds.length})
            </h3>
            
            <div className="grid gap-6">
              {generatedAds.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AdCard ad={ad} variant="preview" />
                </motion.div>
              ))}
            </div>

            {/* Bulk Actions */}
            <motion.div 
              className="card mt-6 bg-accent/5 border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Bulk Actions</h4>
              <div className="flex gap-3">
                <button className="button-primary flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Post All to Farcaster
                </button>
                <button className="button-secondary flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy All Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
