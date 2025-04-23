import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { recruiterSignup } from '../../api/auth';

interface RecruiterSignupProps {
  toggleAuthMode: () => void;
}

const RecruiterSignup: React.FC<RecruiterSignupProps> = ({ toggleAuthMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});
      
      await recruiterSignup(formData);
      toast.success('Account created successfully!');
      toggleAuthMode();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto mt-12"
    >
      <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
          Create Recruiter Account
        </h1>
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 
                         border border-zinc-300 dark:border-zinc-700 
                         rounded-lg outline-none
                         text-zinc-900 dark:text-zinc-100 
                         placeholder-zinc-500 dark:placeholder-zinc-400
                         focus:ring-2 focus:ring-cyan-500/20 
                         focus:border-cyan-500"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 
                         border border-zinc-300 dark:border-zinc-700 
                         rounded-lg outline-none
                         text-zinc-900 dark:text-zinc-100 
                         placeholder-zinc-500 dark:placeholder-zinc-400
                         focus:ring-2 focus:ring-cyan-500/20 
                         focus:border-cyan-500"
              />
            </div>
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 
                         border border-zinc-300 dark:border-zinc-700 
                         rounded-lg outline-none
                         text-zinc-900 dark:text-zinc-100 
                         placeholder-zinc-500 dark:placeholder-zinc-400
                         focus:ring-2 focus:ring-cyan-500/20 
                         focus:border-cyan-500"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 
                         border border-zinc-300 dark:border-zinc-700 
                         rounded-lg outline-none
                         text-zinc-900 dark:text-zinc-100 
                         placeholder-zinc-500 dark:placeholder-zinc-400
                         focus:ring-2 focus:ring-cyan-500/20 
                         focus:border-cyan-500"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full flex items-center justify-center gap-2 
              bg-cyan-600 hover:bg-cyan-700 
              text-white font-semibold
              px-6 py-2.5 rounded-lg
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          <div className="text-center text-zinc-600 dark:text-zinc-400">
            <p>
              Already have an account?{" "}
              <button 
                onClick={toggleAuthMode}
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecruiterSignup;