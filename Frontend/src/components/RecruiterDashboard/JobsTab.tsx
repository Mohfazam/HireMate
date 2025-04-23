import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, DollarSign, Check, MessageCircle, ChevronDown, ChevronUp, Briefcase, Users, Star, Award, TrendingUp, Calendar, Filter, Search, BriefcaseIcon, CheckCircle2, Target } from 'lucide-react';
import { Job, mockJobs } from '../../assets/mockData';

export const JobsTab: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(mockJobs[0]);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'closed'>('all');

  const toggleJobExpand = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Jobs Column */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-auto pb-4 pr-2">
        <div className="flex items-center justify-between">
          <h2 className="text-zinc-100 text-xl font-semibold">Open Positions</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-zinc-400">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span className="text-zinc-400">Pending Review</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800/50 text-zinc-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'closed')}
            className="bg-zinc-800/50 text-zinc-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {[
            { icon: Briefcase, label: "Total Jobs", value: "24", trend: "+12%" },
            { icon: Users, label: "Total Applicants", value: "847", trend: "+28%" },
            { icon: Star, label: "Avg. Quality", value: "86%", trend: "+5%" },
            { icon: Calendar, label: "Time to Hire", value: "18d", trend: "-22%" }
          ].map((stat, index) => (
            <div key={index} className="bg-zinc-900/30 backdrop-blur-xl rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={18} className="text-zinc-400" />
                <span className="text-zinc-400 text-sm">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-zinc-100 text-2xl font-semibold">{stat.value}</span>
                <span className={`text-xs ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Overview */}
        <div className="bg-zinc-900/30 backdrop-blur-xl rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-100 font-medium">Recruitment Pipeline</h3>
            <Target className="text-cyan-400" size={20} />
          </div>
          <div className="flex justify-between items-center">
            {[
              { stage: "Applied", count: 847, color: "bg-cyan-400" },
              { stage: "Screening", count: 423, color: "bg-emerald-400" },
              { stage: "Interview", count: 164, color: "bg-amber-400" },
              { stage: "Offer", count: 38, color: "bg-purple-400" },
              { stage: "Hired", count: 24, color: "bg-pink-400" }
            ].map((stage, index, array) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <div className="text-zinc-100 font-medium">{stage.count}</div>
                  <div className="text-zinc-400 text-sm">{stage.stage}</div>
                </div>
                {index < array.length - 1 && (
                  <div className="h-1 w-16 bg-zinc-800 relative">
                    <motion.div 
                      className={`absolute h-full ${stage.color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {filteredJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            isSelected={selectedJob?.id === job.id}
            isExpanded={expandedJob === job.id}
            onSelect={() => setSelectedJob(job)}
            onToggleExpand={() => toggleJobExpand(job.id)}
          />
        ))}
      </div>
      
      {/* Candidates Column */}
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-zinc-100 text-xl font-semibold">Top Candidates</h2>
          <button className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
            View All
          </button>
        </div>
        
        {selectedJob ? (
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedJob.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {selectedJob.candidates.length > 0 ? (
                  selectedJob.candidates
                    .sort((a, b) => b.match - a.match)
                    .map(candidate => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))
                ) : (
                  <div className="flex-1 flex items-center justify-center text-zinc-500">
                    No candidates found for this position
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            Select a job to view candidates
          </div>
        )}
        
        {selectedJob && selectedJob.candidates.length > 0 && (
          <>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h3 className="text-zinc-300 font-medium mb-4">Candidate Analytics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-3">
                  <div className="text-zinc-400 text-sm mb-1">Experience Level</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-cyan-400">Senior</span>
                  </div>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-3">
                  <div className="text-zinc-400 text-sm mb-1">Skill Match</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-xs text-emerald-400">88%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Distribution */}
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h3 className="text-zinc-300 font-medium mb-4">Candidate Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: "Experience", distribution: [15, 35, 40, 10] },
                  { label: "Location", distribution: [45, 30, 15, 10] },
                  { label: "Education", distribution: [20, 45, 25, 10] }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="text-zinc-400 text-sm mb-2">{item.label}</div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      {item.distribution.map((percentage, i) => (
                        <motion.div
                          key={i}
                          className={`h-full ${
                            i === 0 ? 'bg-cyan-400' :
                            i === 1 ? 'bg-emerald-400' :
                            i === 2 ? 'bg-amber-400' :
                            'bg-purple-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Schedule */}
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-300 font-medium">Upcoming Interviews</h3>
                <button className="text-xs text-cyan-400 hover:text-cyan-300">View Calendar</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah Mitchell", time: "Today, 2:00 PM", stage: "Technical" },
                  { name: "John Anderson", time: "Tomorrow, 11:00 AM", stage: "Culture Fit" }
                ].map((interview, index) => (
                  <div key={index} className="bg-zinc-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-zinc-200">{interview.name}</div>
                        <div className="text-zinc-500 text-sm">{interview.time}</div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-400">
                        {interview.stage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  isSelected, 
  isExpanded,
  onSelect,
  onToggleExpand
}) => {
  return (
    <motion.div 
      className={`bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-4 cursor-pointer overflow-hidden ${
        isSelected ? 'ring-1 ring-cyan-400/50' : ''
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      layout
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-zinc-100 font-semibold text-lg">{job.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-zinc-400 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Full-time</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="text-emerald-400 text-sm font-medium">Active</div>
            <div className="text-zinc-500 text-xs">2d ago</div>
          </div>
          <button 
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {job.requirements.map((req, index) => (
          <span 
            key={index} 
            className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs"
          >
            {req}
          </span>
        ))}
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <p className="text-zinc-400 text-sm mb-4">{job.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-zinc-800/50 rounded-xl p-3">
                <div className="text-zinc-400 text-xs mb-1">Applications</div>
                <div className="text-zinc-100 text-lg font-medium">{job.candidates.length}</div>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-3">
                <div className="text-zinc-400 text-xs mb-1">Interviews</div>
                <div className="text-zinc-100 text-lg font-medium">4</div>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-3">
                <div className="text-zinc-400 text-xs mb-1">Time Open</div>
                <div className="text-zinc-100 text-lg font-medium">12d</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-400" />
                <span className="text-zinc-300">Top applicants from previous roles</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <Check size={16} />
                Actively hiring
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    match: number;
    skills: string[];
  };
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  // Calculate various metrics
  const experienceScore = Math.floor(Math.random() * 20) + 80; // 80-100
  const communicationScore = Math.floor(Math.random() * 20) + 80; // 80-100
  const technicalScore = Math.floor(Math.random() * 15) + 85; // 85-100
  
  return (
    <motion.div 
      className="bg-zinc-800/50 backdrop-blur-xl rounded-xl p-4"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-zinc-100 font-medium">{candidate.name}</h4>
          <div className="text-zinc-500 text-sm">Senior Developer • 8 yrs exp</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-lg font-semibold text-emerald-400">{candidate.match}%</div>
          <div className="text-zinc-500 text-xs">Match Rate</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-zinc-900/50 rounded-lg p-2">
          <div className="text-xs text-zinc-400 mb-1">Experience</div>
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${experienceScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-xs text-cyan-400">{experienceScore}%</span>
          </div>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-2">
          <div className="text-xs text-zinc-400 mb-1">Communication</div>
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${communicationScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-xs text-emerald-400">{communicationScore}%</span>
          </div>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-2">
          <div className="text-xs text-zinc-400 mb-1">Technical</div>
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${technicalScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-xs text-amber-400">{technicalScore}%</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {candidate.skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-0.5 rounded-md bg-zinc-700/70 text-zinc-300 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 text-sm font-medium flex items-center justify-center gap-1 hover:from-cyan-500/30 hover:to-emerald-500/30 transition-colors">
          <MessageCircle size={16} />
          Contact
        </button>
        <button className="px-4 py-2 rounded-lg bg-zinc-700/30 text-zinc-400 text-sm font-medium hover:bg-zinc-700/50 transition-colors">
          <Star size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default JobsTab;