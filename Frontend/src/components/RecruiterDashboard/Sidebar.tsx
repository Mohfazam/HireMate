import React from 'react';
import { motion } from 'framer-motion';
import { ListChecks, PlusCircle, BarChart3, Bot } from 'lucide-react';

interface SidebarProps {
  activeTab: 'jobs' | 'post' | 'analytics' | 'assistant';
  setTab: (tab: 'jobs' | 'post' | 'analytics' | 'assistant') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setTab }) => {
  return (
    <motion.div 
      className="w-20 md:w-24 bg-zinc-900/70 backdrop-blur-xl h-screen flex flex-col items-center py-8 border-r border-zinc-800"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-2 mb-8">
        <motion.div 
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-zinc-900 font-bold text-lg">R</span>
        </motion.div>
        <span className="text-zinc-500 text-xs">Recruiter</span>
      </div>
      
      <div className="flex flex-col gap-6 items-center">
        <SidebarButton 
          icon={<ListChecks size={24} />} 
          label="Jobs"
          isActive={activeTab === 'jobs'} 
          onClick={() => setTab('jobs')}
        />
        <SidebarButton 
          icon={<PlusCircle size={24} />} 
          label="Post Job"
          isActive={activeTab === 'post'} 
          onClick={() => setTab('post')}
        />
        <SidebarButton 
          icon={<BarChart3 size={24} />} 
          label="Analytics"
          isActive={activeTab === 'analytics'} 
          onClick={() => setTab('analytics')}
        />
        <SidebarButton 
          icon={<Bot size={24} />} 
          label="Assistant"
          isActive={activeTab === 'assistant'} 
          onClick={() => setTab('assistant')}
        />
      </div>
    </motion.div>
  );
};

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <motion.button
      className={`relative w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 group ${
        isActive ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div 
          className="absolute left-0 w-1 h-2/3 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-r-md"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      
      <span className={`${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        {icon}
      </span>
      <span className={`text-xs ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        {label}
      </span>
    </motion.button>
  );
};

export default Sidebar;