import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import JobSeekerSignup from './JobSeekerSignup';
import JobSeekerLogin from './JobSeekerLogin';
import RecruiterSignup from './RecruiterSignup';
import RecruiterLogin from './RecruiterLogin';

type UserType = 'jobseeker' | 'recruiter';
type AuthMode = 'login' | 'signup';

const AuthLayout = () => {
  const [userType, setUserType] = useState<UserType>('jobseeker');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  const toggleUserType = () => {
    setUserType(userType === 'jobseeker' ? 'recruiter' : 'jobseeker');
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 p-4 sm:p-8">
      {/* Role Toggle */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <button 
          onClick={toggleUserType}
          className="px-4 py-2 text-sm bg-zinc-800/50 backdrop-blur-xl rounded-lg border border-zinc-700/30 text-zinc-300 hover:bg-zinc-700/50 transition-colors"
        >
          Switch to {userType === 'jobseeker' ? 'Recruiter' : 'Job Seeker'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {userType === 'jobseeker' ? (
          authMode === 'login' ? (
            <JobSeekerLogin key="jobseeker-login" toggleAuthMode={toggleAuthMode} />
          ) : (
            <JobSeekerSignup key="jobseeker-signup" toggleAuthMode={toggleAuthMode} />
          )
        ) : (
          authMode === 'login' ? (
            <RecruiterLogin key="recruiter-login" toggleAuthMode={toggleAuthMode} />
          ) : (
            <RecruiterSignup key="recruiter-signup" toggleAuthMode={toggleAuthMode} />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;