import React from 'react';
import { motion } from 'framer-motion';
import { Activity, GitBranch, Star } from 'lucide-react';
import { Candidate } from './Analytics';

interface Props {
  candidates: Candidate[];
}

export const CodeActivitySphere: React.FC<Props> = ({ candidates }) => {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-gray-900 rounded-xl overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute right-4 top-4 w-80 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Activity size={16} className="text-purple-400" />
          Activity Overview
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">GitHub Stars</span>
              <span className="text-white flex items-center gap-1">
                <Star size={14} className="text-yellow-400" />
                {candidates.reduce((acc, curr) => acc + curr.githubStats.stars, 0)}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-400"
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Active Repositories</span>
              <span className="text-white flex items-center gap-1">
                <GitBranch size={14} className="text-purple-400" />
                {candidates.reduce((acc, curr) => acc + curr.githubStats.repos, 0)}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-400"
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-2">Top Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.slice(0, 3).map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/50 p-3 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">{candidate.name}</span>
                <span className="text-purple-400 text-sm">{candidate.leetcode.ranking}🏆</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <Star size={12} className="text-yellow-400" />
                {candidate.githubStats.stars}
                <span>•</span>
                <GitBranch size={12} className="text-purple-400" />
                {candidate.githubStats.repos}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};