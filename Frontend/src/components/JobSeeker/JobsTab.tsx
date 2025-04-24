import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Job } from '../types';
import { Search, Briefcase, MapPin, Building, DollarSign, Calendar } from 'lucide-react';

interface JobsTabProps {
  onAnalyzeAndApply: (job: Job) => void;
}

// JobCard component (embedded to stay within 4 file limit)
const JobCard: React.FC<{ job: Job; onAnalyzeAndApply: (job: Job) => void }> = ({ job, onAnalyzeAndApply }) => {
  // Format salary range
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  // Format posted date
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

  return (
    <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-5 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/5">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {job.title}
          </h3>
          <span className="text-xs px-2 py-1 bg-zinc-700/50 rounded-full text-zinc-400">
            {formatPostedDate(job.posted)}
          </span>
        </div>
        <div className="flex items-center mt-1 text-emerald-400">
          <Building size={16} className="mr-1" />
          <span>{job.company}</span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-zinc-400">
          <MapPin size={16} className="mr-2 text-zinc-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-zinc-400">
          <DollarSign size={16} className="mr-2 text-zinc-500" />
          <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-zinc-300 text-sm line-clamp-2">{job.description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span key={index} className="bg-zinc-700/50 text-zinc-300 text-xs px-2 py-1 rounded-full">
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="bg-zinc-700/50 text-zinc-300 text-xs px-2 py-1 rounded-full">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>
      
      <button
        onClick={() => onAnalyzeAndApply(job)}
        className="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg font-medium text-white hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Analyze & Apply
      </button>
    </div>
  );
};

// Main JobsTab component
const JobsTab: React.FC<JobsTabProps> = ({ onAnalyzeAndApply }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would use the actual backend URL
        const response = await axios.get('http://localhost:3000/api/jobs');
        setJobs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        // Using fallback mock data
        setJobs([
          {
            id: '1',
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'San Francisco, CA (Remote)',
            salary: {
              min: 90000,
              max: 120000,
              currency: 'USD',
            },
            description: 'We are looking for a skilled Frontend Developer to join our team and help build beautiful, responsive web applications.',
            requirements: ['React', 'TypeScript', 'CSS', 'Responsive Design', '3+ years experience'],
            posted: '2023-05-15',
          },
          {
            id: '2',
            title: 'Full Stack Engineer',
            company: 'InnovateSoft',
            location: 'New York, NY (Hybrid)',
            salary: {
              min: 110000,
              max: 140000,
              currency: 'USD',
            },
            description: 'Join our dynamic team developing cutting-edge web applications with modern technologies.',
            requirements: ['Node.js', 'React', 'MongoDB', 'AWS', '4+ years experience'],
            posted: '2023-05-10',
          },
          {
            id: '3',
            title: 'UI/UX Designer',
            company: 'DesignWorks',
            location: 'Austin, TX (Onsite)',
            salary: {
              min: 85000,
              max: 110000,
              currency: 'USD',
            },
            description: 'Create beautiful user experiences and interfaces for our client projects.',
            requirements: ['Figma', 'Adobe Suite', 'User Research', 'Prototyping', '2+ years experience'],
            posted: '2023-05-05',
          },
          {
            id: '4',
            title: 'DevOps Engineer',
            company: 'CloudSystems',
            location: 'Seattle, WA (Remote)',
            salary: {
              min: 120000,
              max: 150000,
              currency: 'USD',
            },
            description: 'Help us build and maintain robust CI/CD pipelines and cloud infrastructure.',
            requirements: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', '5+ years experience'],
            posted: '2023-05-01',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Jobs</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-zinc-400">Loading jobs...</p>
        </div>
      ) : error && jobs.length === 0 ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-xl font-medium text-zinc-400 mb-2">No jobs found</h3>
          <p className="text-zinc-500">
            {searchTerm ? 'Try different search terms' : 'Check back later for new opportunities'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onAnalyzeAndApply={onAnalyzeAndApply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsTab;