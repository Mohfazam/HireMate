import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Star } from 'lucide-react';
import { Candidate } from './Analytics';

interface Props {
  candidates: Candidate[];
}

export const TalentFlow: React.FC<Props> = ({ candidates }) => {
  const stages = ['new', 'shortlisted', 'interview', 'matched', 'pending'];
  
  const getCandidatesByStage = (stage: string) => 
    candidates.filter(c => c.status === stage);

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'shortlisted': return 'cyan';
      case 'interview': return 'purple';
      case 'matched': return 'emerald';
      case 'pending': return 'amber';
      default: return 'gray';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gray-900 rounded-xl overflow-hidden p-6">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 grid grid-cols-5 gap-4 h-full">
        {stages.map((stage, index) => {
          const stageColor = getStageColor(stage);
          const stageCandidates = getCandidatesByStage(stage);
          
          return (
            <div 
              key={stage}
              className="flex flex-col h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700 mb-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold capitalize">{stage}</h3>
                  <span className={`text-${stageColor}-400 text-sm`}>
                    {stageCandidates.length}
                  </span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-${stageColor}-400`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stageCandidates.length / candidates.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {stageCandidates.map((candidate, candidateIndex) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (candidateIndex * 0.05) }}
                    className={`bg-gray-800/60 backdrop-blur-sm p-3 rounded-lg border border-${stageColor}-400/20`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{candidate.name}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} className={`text-${stageColor}-400`} />
                        <span className="text-xs text-gray-400">{candidate.matchScore}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={12} />
                      {candidate.daysInStage}d
                      <span>•</span>
                      <Users size={12} />
                      {candidate.skills.length} skills
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};