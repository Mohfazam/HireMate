import React, { useState } from 'react';
import JobSeekerSidebar from './JobSeekerSidebar';
import JobsTab from './JobsTab';
import ApplyModal from './ApplyModal';
import { Job, TabType, AnalysisResult } from '../types';
import { Clock, CheckCircle, XCircle, UserCheck, MessageSquare, Briefcase, User, FileText } from 'lucide-react';

// Application Tab Component (embedded to stay within 4 file limit)
const ApplicationsTab: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    // In a real app, you'd fetch applications from the API
    // For demo purposes, loading mock data
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // This would be a real API call in production
        // const response = await axios.get('/api/applications');
        // setApplications(response.data);

        // Using mock data for demo
        setApplications([
          {
            id: 'a1',
            jobId: '1',
            status: 'applied',
            appliedDate: '2023-05-16',
            resumeText: 'John Doe - Frontend Developer with 4 years of experience in React, TypeScript, and responsive web design.',
            job: {
              title: 'Frontend Developer',
              company: 'TechCorp'
            },
            analysis: {
              score: 85,
              skillsMatch: [
                { skill: 'React', match: 90 },
                { skill: 'TypeScript', match: 80 },
                { skill: 'CSS', match: 85 },
                { skill: 'Responsive Design', match: 90 },
              ],
              experienceMatch: 'Excellent',
              recommendations: [
                'Highlight more TypeScript projects in your resume',
                'Add examples of responsive design implementation',
              ],
            },
          },
          {
            id: 'a2',
            jobId: '2',
            status: 'reviewing',
            appliedDate: '2023-05-12',
            resumeText: 'John Doe - Full Stack Developer with experience in Node.js, React, and MongoDB.',
            job: {
              title: 'Full Stack Engineer',
              company: 'InnovateSoft'
            },
            analysis: {
              score: 70,
              skillsMatch: [
                { skill: 'Node.js', match: 75 },
                { skill: 'React', match: 90 },
                { skill: 'MongoDB', match: 60 },
                { skill: 'AWS', match: 40 },
              ],
              experienceMatch: 'Good',
              recommendations: [
                'Add more details about AWS experience',
                'Highlight MongoDB projects more prominently',
              ],
            },
          },
        ]);
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="text-cyan-500" size={20} />;
      case 'reviewing':
        return <MessageSquare className="text-amber-500" size={20} />;
      case 'interviewed':
        return <UserCheck className="text-emerald-500" size={20} />;
      case 'offered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-cyan-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-cyan-500/10 text-cyan-500';
      case 'reviewing':
        return 'bg-amber-500/10 text-amber-500';
      case 'interviewed':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'offered':
        return 'bg-green-500/10 text-green-500';
      case 'rejected':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-cyan-500/10 text-cyan-500';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Applications</h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-zinc-400">Loading applications...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-xl font-medium text-zinc-400 mb-2">No applications yet</h3>
          <p className="text-zinc-500">
            Start applying to jobs to track your applications here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div 
              key={application.id}
              className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{application.job.title}</h3>
                  <p className="text-cyan-400 text-sm">{application.job.company}</p>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status}</span>
                    </span>
                    <span className="text-zinc-500 text-xs ml-2">
                      Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold">
                    Score: {application.analysis.score}/100
                  </div>
                  <button className="mt-2 px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Profile Tab Component (embedded to stay within 4 file limit)
const ProfileTab: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced frontend developer with a passion for creating beautiful and functional user interfaces.',
    skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'Responsive Design'],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Berkeley',
        year: '2019'
      }
    ],
    experience: [
      {
        title: 'Frontend Developer',
        company: 'TechCorp',
        duration: 'Jan 2020 - Present',
        description: 'Developing responsive web applications using React and TypeScript.'
      },
      {
        title: 'Web Developer Intern',
        company: 'StartupXYZ',
        duration: 'Jun 2019 - Dec 2019',
        description: 'Assisted in developing and maintaining company website.'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditedProfile({
      ...editedProfile,
      skills
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isEditing
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-cyan-500 hover:bg-cyan-600'
          } transition-colors duration-200`}
        >
          {isEditing ? <div>Save Changes</div> : <div>Edit Profile</div>}
        </button>
      </div>

      <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 p-6 mb-6">
        <div className="mb-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
                className="text-2xl font-bold bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2 w-full mb-2"
              />
            ) : (
              <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
            )}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-zinc-400">
                <Mail size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                    className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-2 py-1"
                  />
                ) : (
                  profile.email
                )}
              </div>
              <div className="flex items-center text-zinc-400">
                <Phone size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                    className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-2 py-1"
                  />
                ) : (
                  profile.phone
                )}
              </div>
              <div className="flex items-center text-zinc-400">
                <MapPin size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedProfile.location}
                    onChange={handleChange}
                    className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-2 py-1"
                  />
                ) : (
                  profile.location
                )}
              </div>
            </div>
          </div>
          {!isEditing && (
            <div>
              <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg flex items-center gap-2">
                <div>Upload Resume</div>
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About Me</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={editedProfile.bio}
              onChange={handleChange}
              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2"
              rows={4}
            />
          ) : (
            <p className="text-zinc-300">{profile.bio}</p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.skills.join(', ')}
              onChange={handleSkillChange}
              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-2"
              placeholder="Separate skills with commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-cyan-500/50 pl-4 py-1">
                <h4 className="font-medium text-white">{exp.title}</h4>
                <p className="text-cyan-400">{exp.company}</p>
                <p className="text-zinc-400 text-sm">{exp.duration}</p>
                <p className="text-zinc-300 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-emerald-500/50 pl-4 py-1">
                <h4 className="font-medium text-white">{edu.degree}</h4>
                <p className="text-emerald-400">{edu.institution}</p>
                <p className="text-zinc-400 text-sm">Graduated: {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component that ties everything together
const JobSeekerDashboard: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Handle job selection and open apply modal
  const handleAnalyzeAndApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  // Close apply modal and reset state
  const handleCloseModal = () => {
    setShowApplyModal(false);
    // Keep the analysis result for a bit in case we need it
    setTimeout(() => {
      if (!showApplyModal) setAnalysisResult(null);
    }, 500);
  };

  // Handle successful analysis
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <JobSeekerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeTab === 'jobs' && (
            <JobsTab onAnalyzeAndApply={handleAnalyzeAndApply} />
          )}
          
          {activeTab === 'applications' && (
            <ApplicationsTab />
          )}
          
          {activeTab === 'profile' && (
            <ProfileTab />
          )}
        </div>
      </div>
      
      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <ApplyModal 
          job={selectedJob} 
          onClose={handleCloseModal}
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}
    </div>
  );
};

export default JobSeekerDashboard;