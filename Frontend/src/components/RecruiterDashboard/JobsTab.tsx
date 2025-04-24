import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, ChevronUp, ChevronDown, Award, Check, MessageCircle, Star, Briefcase, Users, Calendar, Target } from 'lucide-react';

export const JobsTab: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'closed'>('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const jobsData = await response.json();
        
        // Transform API data to match our UI requirements
        const transformedJobs = jobsData.map((job: any) => ({
          id: job._id,
          title: job.title,
          description: job.description || "No description provided",
          location: job.location || "Remote",
          salary: job.salaryRange || "$80K - $120K",
          requirements: job.requirements || [],
          status: 'active',
          postedDate: '2d ago',
          // Mock candidates data since it's not provided by the API
          candidates: Array(Math.floor(Math.random() * 5) + 1).fill(null).map((_, i) => ({
            id: i + 1,
            name: ['Sarah Mitchell', 'John Anderson', 'Emily Brown', 'Michael Lee', 'Jessica Taylor'][i],
            match: Math.floor(Math.random() * 15) + 85,
            skills: job.requirements || ['JavaScript', 'React', 'Node.js'],
            experience: `${['Senior', 'Lead', 'Full Stack'][Math.floor(Math.random() * 3)]} Developer • ${Math.floor(Math.random() * 5) + 5} yrs exp`
          }))
        }));

        setJobs(transformedJobs);
        if (transformedJobs.length > 0) {
          setSelectedJob(transformedJobs[0]);
        }
      } catch (err) {
        setError('Failed to load jobs');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleJobExpand = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterStatus === 'all' || job.status === filterStatus)
  );

  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.candidates.length, 0);
  
  let totalMatchRate = 0;
  let totalCandidates = 0;
  
  jobs.forEach(job => {
    job.candidates.forEach((candidate: any) => {
      totalMatchRate += candidate.match;
      totalCandidates++;
    });
  });
  
  const avgQuality = totalCandidates > 0 ? Math.round(totalMatchRate / totalCandidates) : 0;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-500/20 text-red-100 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

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
        
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {[
              { icon: Briefcase, label: "Total Jobs", value: totalJobs.toString(), trend: "+12%" },
              { icon: Users, label: "Total Applicants", value: totalApplicants.toString(), trend: "+28%" },
              { icon: Star, label: "Avg. Quality", value: `${avgQuality}%`, trend: "+5%" },
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

          <div className="bg-zinc-900/30 backdrop-blur-xl rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-100 font-medium">Recruitment Pipeline</h3>
              <Target className="text-cyan-400" size={20} />
            </div>
            <div className="flex justify-between items-center">
              {[
                { stage: "Applied", count: totalApplicants, color: "bg-cyan-400" },
                { stage: "Screening", count: Math.round(totalApplicants * 0.5), color: "bg-emerald-400" },
                { stage: "Interview", count: Math.round(totalApplicants * 0.2), color: "bg-amber-400" },
                { stage: "Offer", count: Math.round(totalApplicants * 0.05), color: "bg-purple-400" },
                { stage: "Hired", count: Math.round(totalApplicants * 0.03), color: "bg-pink-400" }
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
          
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <motion.div 
                key={job.id}
                className={`bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-4 cursor-pointer overflow-hidden ${
                  selectedJob?.id === job.id ? 'ring-1 ring-cyan-400/50' : ''
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedJob(job)}
                layout
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-zinc-100 font-semibold text-lg">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-zinc-400 text-sm">
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
                      <div className="text-emerald-400 text-sm font-medium">
                        {job.status === 'active' ? 'Active' : job.status === 'pending' ? 'Pending' : 'Closed'}
                      </div>
                      <div className="text-zinc-500 text-xs">{job.postedDate}</div>
                    </div>
                    <button 
                      className="text-zinc-400 hover:text-zinc-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJobExpand(job.id);
                      }}
                    >
                      {expandedJob === job.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.requirements.map((req: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs"
                    >
                      {req}
                    </span>
                  ))}
                </div>
                
                <AnimatePresence>
                  {expandedJob === job.id && (
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
                          <div className="text-zinc-100 text-lg font-medium">{Math.floor(job.candidates.length / 3)}</div>
                        </div>
                        <div className="bg-zinc-800/50 rounded-xl p-3">
                          <div className="text-zinc-400 text-xs mb-1">Time Open</div>
                          <div className="text-zinc-100 text-lg font-medium">{job.postedDate}</div>
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
            ))
          ) : (
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 text-center">
              <h3 className="text-zinc-300 text-lg mb-2">No jobs found</h3>
              <p className="text-zinc-500">Try adjusting your search or filters</p>
            </div>
          )}
        </>
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
                    .sort((a: any, b: any) => b.match - a.match)
                    .map((candidate: any) => (
                      <motion.div 
                        key={candidate.id}
                        className="bg-zinc-800/50 backdrop-blur-xl rounded-xl p-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-zinc-100 font-medium">{candidate.name}</h4>
                            <div className="text-zinc-500 text-sm">{candidate.experience}</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-lg font-semibold text-emerald-400">{candidate.match}%</div>
                            <div className="text-zinc-500 text-xs">Match Rate</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {['Experience', 'Communication', 'Technical'].map((metric, index) => {
                            const score = Math.floor(Math.random() * 20) + 80;
                            const colors = ['bg-cyan-400', 'bg-emerald-400', 'bg-amber-400'];
                            const textColors = ['text-cyan-400', 'text-emerald-400', 'text-amber-400'];
                            
                            return (
                              <div key={metric} className="bg-zinc-900/50 rounded-lg p-2">
                                <div className="text-xs text-zinc-400 mb-1">{metric}</div>
                                <div className="flex items-center gap-1">
                                  <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                                    <motion.div 
                                      className={`h-full ${colors[index]}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${score}%` }}
                                      transition={{ duration: 1 }}
                                    />
                                  </div>
                                  <span className={`text-xs ${textColors[index]}`}>{score}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {candidate.skills.map((skill: string, index: number) => (
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

export default JobsTab;