'use client';

import { useState } from 'react';
import AppShell from './components/AppShell';
import Dashboard from './components/Dashboard';
import ImageUploader from './components/ImageUploader';
import AdVariations from './components/AdVariations';
import CreditCounter from './components/CreditCounter';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedAds, setGeneratedAds] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(10); // Mock initial credits

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload', label: 'Upload' },
    { id: 'variations', label: 'Ad Variations' },
    { id: 'copywriter', label: 'Copy Generator' },
    { id: 'profile', label: 'Test Profile' },
  ];

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setActiveTab('variations');
  };

  const handleGenerateAds = async (prompt: string) => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    
    // Mock API call - replace with actual OpenAI integration
    setTimeout(() => {
      const mockAds = [
        {
          id: 1,
          imageUrl: uploadedImage,
          copy: "🔥 Transform your style with this amazing product! Perfect for any occasion. #StyleUpgrade #MustHave",
          platform: 'instagram',
          metrics: { views: 1250, likes: 89, shares: 12 }
        },
        {
          id: 2,
          imageUrl: uploadedImage,
          copy: "Don't miss out on this game-changer! ✨ Your friends will ask where you got it. Limited time offer!",
          platform: 'tiktok',
          metrics: { views: 2100, likes: 156, shares: 23 }
        },
        {
          id: 3,
          imageUrl: uploadedImage,
          copy: "Elevate your everyday with this incredible find 🚀 Quality meets style. Get yours now!",
          platform: 'farcaster',
          metrics: { views: 890, likes: 67, shares: 8 }
        }
      ];
      
      setGeneratedAds(mockAds);
      setCredits(prev => Math.max(0, prev - 5)); // Consume 5 credits
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <AppShell>
      <div className="content-container">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AdSpinner AI
          </h1>
          <p className="text-lg text-white/80 mb-6">
            Spin ad variations & go viral, amplified by AI
          </p>
          <CreditCounter credits={credits} />
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex overflow-x-auto mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <Dashboard 
                generatedAds={generatedAds}
                credits={credits}
              />
            )}
            
            {activeTab === 'upload' && (
              <ImageUploader 
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />
            )}
            
            {activeTab === 'variations' && (
              <AdVariations
                uploadedImage={uploadedImage}
                generatedAds={generatedAds}
                isGenerating={isGenerating}
                onGenerateAds={handleGenerateAds}
              />
            )}
            
            {activeTab === 'copywriter' && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">AI Copywriting Assistant</h2>
                <p className="text-text-secondary mb-4">
                  Generate compelling ad copy for your variations. This feature will be enhanced based on your uploaded images and target platforms.
                </p>
                <textarea
                  className="input-field min-h-32 mb-4"
                  placeholder="Describe your product or paste your current copy to improve..."
                />
                <button className="button-primary">
                  Generate Copy Variations
                </button>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Test Profile Management</h2>
                <p className="text-text-secondary mb-4">
                  Connect and manage your test social media profiles for automated posting.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Farcaster Profile</h3>
                      <p className="text-sm text-text-secondary">Not connected</p>
                    </div>
                    <button className="button-secondary">Connect</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                    <div>
                      <h3 className="font-medium">Instagram Test Account</h3>
                      <p className="text-sm text-text-secondary">Coming soon</p>
                    </div>
                    <button className="button-secondary" disabled>Connect</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
