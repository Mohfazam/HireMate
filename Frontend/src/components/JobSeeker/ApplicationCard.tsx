import React from 'react';
import { Application } from './index';

interface ApplicationCardProps {
  application: Application;
  statusIcon: React.ReactNode;
  statusColor: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, statusIcon, statusColor }) => {
  // Match job info from application
  const jobInfo = {
    title: 'Loading...',
    company: 'Loading...',
  };

  // In a real app, this would fetch job details from the API or use a cached version
  // For simplicity, we'll use the mockData for now
  React.useEffect(() => {
    import('./mockData').then(({ jobs }) => {
      const job = jobs.find(j => j.id === application.jobId);
      if (job) {
        jobInfo.title = job.title;
        jobInfo.company = job.company;
      }
    });
  }, [application.jobId]);

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">{jobInfo.title}</h3>
          <p className="text-cyan-400 text-sm">{jobInfo.company}</p>
          <div className="flex items-center mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
              {statusIcon}
              <span className="ml-1 capitalize">{application.status}</span>
            </span>
            <span className="text-zinc-500 text-xs ml-2">
              Applied on {new Date(application.appliedDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="text-right">
          {application.analysis && (
            <div className="text-emerald-400 font-semibold">
              Score: {application.analysis.score}/100
            </div>
          )}
          <button className="mt-2 px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;