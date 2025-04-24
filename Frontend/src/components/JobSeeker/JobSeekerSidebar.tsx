import React from 'react';
import { Briefcase, FileText, User } from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const JobSeekerSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'jobs' as TabType, icon: <Briefcase size={20} />, label: 'Job Listings' },
    { id: 'applications' as TabType, icon: <FileText size={20} />, label: 'My Applications' },
    { id: 'profile' as TabType, icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <div className="w-64 h-full bg-zinc-900 border-r border-zinc-800 p-4">
      <div className="flex items-center mb-8 pl-2">
        <Briefcase className="text-cyan-500 mr-2" size={24} />
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-transparent bg-clip-text">
          JobSeeker
        </h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                <span className={`mr-3 ${activeTab === tab.id ? 'text-cyan-500' : ''}`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="ml-auto w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default JobSeekerSidebar;