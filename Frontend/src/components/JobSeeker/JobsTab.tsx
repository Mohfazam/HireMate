import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Job } from './index';
import { Search, Briefcase, MapPin, DollarSign, AlertCircle } from 'lucide-react';

interface JobsTabProps {
  onAnalyzeAndApply: (job: Job) => void;
}

const JobsTab: React.FC<JobsTabProps> = ({ onAnalyzeAndApply }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formatSalary = (min: number, max: number, currency: string = 'USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatPostedDate = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted yesterday';
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
    return `Posted on ${posted.toLocaleDateString()}`;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/jobs');
        setJobs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-black">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
          Job Opportunities
        </h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
          />
          <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
          <p className="text-sm text-zinc-400">Fetching opportunities...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg text-center">
          <Briefcase className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-zinc-200 mb-1">No jobs found</h3>
          <p className="text-zinc-500 text-sm">
            {searchTerm ? 'Try different keywords' : 'Check back later for new postings'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  <p className="text-emerald-400 text-sm">{job.company}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-400">
                  {formatPostedDate(job.posted)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-zinc-400">
                  <MapPin size={14} className="mr-2" />
                  {job.location}
                </div>
                {job.salary && (
                  <div className="flex items-center text-sm text-emerald-400">
                    <DollarSign size={14} className="mr-2" />
                    {formatSalary(job.salary.min, job.salary.max)}
                  </div>
                )}
              </div>

              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <span key={index} className="px-2.5 py-1 bg-zinc-800 rounded-full text-xs text-cyan-400">
                    {req}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onAnalyzeAndApply(job)}
                className="w-full py-2.5 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-cyan-400 hover:text-cyan-300"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsTab;