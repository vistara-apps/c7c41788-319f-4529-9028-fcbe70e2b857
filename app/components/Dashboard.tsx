'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Users } from 'lucide-react';
import AdCard from './AdCard';

interface DashboardProps {
  generatedAds: any[];
  credits: number;
}

export default function Dashboard({ generatedAds, credits }: DashboardProps) {
  const totalViews = generatedAds.reduce((sum, ad) => sum + (ad.metrics?.views || 0), 0);
  const totalEngagement = generatedAds.reduce((sum, ad) => sum + (ad.metrics?.likes || 0) + (ad.metrics?.shares || 0), 0);
  const avgPerformance = generatedAds.length > 0 ? Math.round(totalEngagement / generatedAds.length) : 0;

  const stats = [
    {
      icon: BarChart3,
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      change: '+15.2%',
      color: 'text-accent'
    },
    {
      icon: TrendingUp,
      label: 'Engagement Rate',
      value: `${((totalEngagement / Math.max(totalViews, 1)) * 100).toFixed(1)}%`,
      change: '+8.1%',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      label: 'Ad Variations',
      value: generatedAds.length.toString(),
      change: 'Generated',
      color: 'text-primary'
    },
    {
      icon: Users,
      label: 'Avg Performance',
      value: avgPerformance.toString(),
      change: 'Interactions',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div 
        className="card text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Welcome to AdSpinner AI</h2>
        <p className="text-text-secondary mb-4">
          Your AI-powered ad generation platform. Create, test, and optimize ad variations with ease.
        </p>
        <div className="flex justify-center gap-4">
          <button className="button-primary">
            Start Creating Ads
          </button>
          <button className="button-secondary">
            View Tutorial
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Ads */}
      {generatedAds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Ad Variations</h3>
          <div className="grid gap-4">
            {generatedAds.slice(0, 3).map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AdCard ad={ad} variant="posted" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <Zap className="w-8 h-8 text-accent mb-2" />
            <span className="text-sm font-medium">Generate Ads</span>
          </button>
          <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium">View Analytics</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
