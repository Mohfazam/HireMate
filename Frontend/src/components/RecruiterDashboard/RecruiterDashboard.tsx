import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import JobsTab from './JobsTab';
import PostJobTab from './PostJobTab';
import AnalyticsTab from './AnalyticsTab';
import AIAssistantTab from './AIAssistantTab';

export const RecruiterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'post' | 'analytics' | 'assistant'>('jobs');
  
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setTab={setActiveTab} />
      
      <main className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'jobs' && <JobsTab key="jobs" />}
          {activeTab === 'post' && <PostJobTab key="post" />}
          {activeTab === 'analytics' && <AnalyticsTab key="analytics" />}
          {activeTab === 'assistant' && <AIAssistantTab key="assistant" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RecruiterDashboard;