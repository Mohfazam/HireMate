import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Globe2, Users, Brain } from 'lucide-react';
import { MetricCosmos } from './MetricCosmos';
import { CodeActivitySphere } from './CodeActivitySphere';
import { TalentFlow } from './TalentFlow';
import { AnalyticsMode, Candidate } from './Analytics';

// Mock data - replace with real data in production
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    skills: ['React', 'TypeScript', 'Node.js'],
    matchScore: 94,
    githubStats: {
      stars: 520,
      repos: 35,
      contributions: 1200,
      location: { lat: 40.7128, lng: -74.0060 }
    },
    leetcode: {
      solved: 300,
      ranking: 95,
      contests: 20
    },
    status: 'shortlisted',
    daysInStage: 3
  },
  // Add more mock candidates here
];

const analyticsModes: AnalyticsMode[] = [
  { id: 'skills', label: 'Skill Galaxy', icon: 'BarChart3' },
  { id: 'code', label: 'Code Planet', icon: 'Globe2' },
  { id: 'talent', label: 'Talent Stream', icon: 'Users' },
  { id: 'ai', label: 'AI Insights', icon: 'Brain' }
];

export const AnalyticsLayout: React.FC = () => {
  const [activeMode, setActiveMode] = useState('skills');
  
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'BarChart3': return <BarChart3 size={18} />;
      case 'Globe2': return <Globe2 size={18} />;
      case 'Users': return <Users size={18} />;
      case 'Brain': return <Brain size={18} />;
      default: return null;
    }
  };

  const renderContent = () => {
    switch(activeMode) {
      case 'skills':
        return <MetricCosmos candidates={mockCandidates} />;
      case 'code':
        return <CodeActivitySphere candidates={mockCandidates} />;
      case 'talent':
        return <TalentFlow candidates={mockCandidates} />;
      case 'ai':
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">AI Insights Coming Soon</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
          <div className="flex items-center gap-2">
            {analyticsModes.map((mode) => (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMode(mode.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  ${activeMode === mode.id 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800'}
                  transition-all duration-200
                `}
              >
                {renderIcon(mode.icon)}
                <span className="text-sm">{mode.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden h-[calc(100vh-8rem)]"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};