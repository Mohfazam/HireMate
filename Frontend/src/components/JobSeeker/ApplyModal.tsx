import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, AlertCircle, CheckCircle, Edit3, Percent, Loader, User, Mail } from 'lucide-react';
import { Job, AnalysisResult } from './index';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

interface AnalysisValidation extends AnalysisResult {
  score: number;
  skillsMatch: Array<{ skill: string; match: number }>;
  experienceMatch: string;
  recommendations: string[];
}

interface UserFormData {
  name: string;
  email: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
  id: number;
}

const isValidAnalysis = (obj: any): obj is AnalysisValidation => {
  return (
    typeof obj.score === 'number' &&
    Array.isArray(obj.skillsMatch) &&
    obj.skillsMatch.every((item: any) => 
      typeof item.skill === 'string' &&
      typeof item.match === 'number'
    ) &&
    typeof obj.experienceMatch === 'string' &&
    Array.isArray(obj.recommendations) &&
    obj.recommendations.every((item: any) => typeof item === 'string')
  );
};

const Toast: React.FC<{ toast: Toast, onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
        toast.type === 'success' 
          ? 'bg-emerald-500/90 text-white' 
          : 'bg-red-500/90 text-white'
      }`}
    >
      {toast.type === 'success' ? (
        <CheckCircle size={20} className="flex-shrink-0" />
      ) : (
        <AlertCircle size={20} className="flex-shrink-0" />
      )}
      <p>{toast.message}</p>
      <button 
        onClick={onDismiss} 
        className="ml-2 p-1 rounded-full hover:bg-black/20 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

const AnalysisResultDisplay: React.FC<{ analysis: AnalysisResult; job: Job }> = ({ analysis, job }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getMatchColor = (match: number) => {
    if (match >= 80) return 'bg-emerald-400/20';
    if (match >= 60) return 'bg-amber-400/20';
    return 'bg-red-400/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
          Resume Analysis
        </h3>
        <div className={`text-3xl font-bold ${getScoreColor(analysis.score)} flex items-baseline gap-2`}>
          <span>{analysis.score}</span>
          <span className="text-base font-normal text-zinc-400">/100</span>
        </div>
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 space-y-4">
        <h4 className="font-medium flex items-center gap-2 text-zinc-200">
          <Percent size={18} className="text-cyan-400" />
          Skills Match
        </h4>
        <div className="space-y-4">
          {analysis.skillsMatch.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-300">{skill.skill}</span>
                <span className={getScoreColor(skill.match)}>{skill.match}%</span>
              </div>
              <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getMatchColor(skill.match)} transition-all duration-500 ease-out`} 
                  style={{ width: `${skill.match}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
        <h4 className="font-medium flex items-center gap-2 text-zinc-200 mb-3">
          <CheckCircle size={18} className="text-emerald-400" />
          Experience Match
        </h4>
        <p className={`${getScoreColor(analysis.score)} font-medium`}>{analysis.experienceMatch}</p>
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6">
        <h4 className="font-medium flex items-center gap-2 text-zinc-200 mb-3">
          <Edit3 size={18} className="text-amber-400" />
          Improvement Recommendations
        </h4>
        <ul className="space-y-3">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex gap-3 text-zinc-300">
              <span className="text-amber-400 flex-shrink-0">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-500 mt-4">
        <div>
          Analyzed for: <span className="text-zinc-300">{job.title}</span> at <span className="text-zinc-300">{job.company}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          Powered by AI
        </div>
      </div>
    </div>
  );
};

const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: ''
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      message,
      type,
      id: Date.now()
    });
  };

  const dismissToast = () => {
    setToast(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAIAnalysis = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const apiKey = "AIzaSyCpjHkojeQ3BhzbyEKssnRCo9Jo7X89KjU";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Analyze this resume for the ${job.title} role. Job requirements: ${job.requirements.join(', ')}. 
        Return a JSON object with these properties:
        - score: number (0-100) representing overall match
        - skillsMatch: array of objects with 'skill' and 'match' (percentage 0-100) properties
        - experienceMatch: string ('Excellent', 'Good', 'Average', or 'Below Average')
        - recommendations: array of strings with improvement suggestions

        Resume:
        ${resumeText}
        
        Return ONLY the raw JSON object without any markdown formatting, explanations, or additional text.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean the response
      const cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^JSON\s*/i, '')
        .trim();

      const parsedResult = JSON.parse(cleanedText);

      if (!isValidAnalysis(parsedResult)) {
        throw new Error("Invalid analysis format received from AI");
      }

      setAnalysis(parsedResult);
      if (onAnalysisComplete) {
        onAnalysisComplete(parsedResult);
      }
      
      showToast("Resume analysis completed successfully!", "success");
      
    } catch (err) {
      console.error("Analysis Error:", err);
      const errorMsg = err instanceof SyntaxError ? "Invalid analysis format received" :
        err instanceof Error ? err.message :
        "Failed to analyze resume. Please try again.";
        
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleProceedToUserInfo = () => {
    setShowUserForm(true);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!analysis || !job) return;
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Fix: Use the job's _id property instead of id
      const jobId = job._id || job.id;
      
      if (!jobId) {
        throw new Error("Invalid job ID");
      }
      
      const response = await axios.post(
        `http://localhost:3000/api/jobs/${jobId}/apply`,
        {
          name: formData.name,
          email: formData.email,
          resume: resumeText,
          analysis
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        console.log("Application submitted successfully:", response.data);
        showToast(`Application for ${job.title} submitted successfully!`, "success");
        
        // Close modal after a brief delay to allow toast to be seen
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      
      let errorMessage = "Failed to submit application. Please try again.";
      if (axios.isAxiosError(err)) {
        console.error("Axios error details:", err.response?.data);
        errorMessage = err.response?.data?.message || 
                      err.response?.data?.error ||
                      err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderUserForm = () => (
    <div className="space-y-4 mt-6 bg-zinc-800/30 p-6 rounded-xl border border-zinc-700">
      <h3 className="text-lg font-medium text-zinc-200 mb-4">Enter Your Information</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
              <User size={18} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-zinc-800/70 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-zinc-800/70 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-sm placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm z-10 flex justify-between items-center border-b border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white">
              {!analysis ? `Apply to ${job.title}` : 
              showUserForm ? "Complete Application" : "Analysis Results"}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-3 text-red-400">
                <AlertCircle size={18} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!analysis ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                      <p className="text-emerald-400 text-sm">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-400">{job.location}</p>
                      {job.salary && (
                        <p className="text-emerald-400 text-sm">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: job.salary.currency,
                            maximumFractionDigits: 0
                          }).formatRange(job.salary.min, job.salary.max)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="px-2.5 py-1 bg-zinc-800 rounded-full text-sm text-cyan-400">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-zinc-200">
                    Paste your resume
                    <span className="text-xs text-zinc-500 ml-2">(plain text recommended)</span>
                  </label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full h-48 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 text-sm placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none"
                    placeholder="Paste your complete resume text here..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAIAnalysis}
                    disabled={!resumeText.trim() || isAnalyzing}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg font-medium text-sm hover:from-cyan-500 hover:to-emerald-500 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {isAnalyzing && <Loader className="animate-spin" size={18} />}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <AnalysisResultDisplay analysis={analysis} job={job} />
                
                {showUserForm && renderUserForm()}
                
                <div className="flex justify-between pt-6 border-t border-zinc-800">
                  {showUserForm ? (
                    <>
                      <button
                        onClick={() => setShowUserForm(false)}
                        className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                      >
                        Back to Analysis
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg font-medium text-sm hover:from-cyan-500 hover:to-emerald-500 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                      >
                        {isSubmitting && <Loader className="animate-spin" size={18} />}
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setAnalysis(null)}
                        className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                      >
                        Edit Resume
                      </button>
                      <button
                        onClick={handleProceedToUserInfo}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg font-medium text-sm hover:from-cyan-500 hover:to-emerald-500 transition-all"
                      >
                        Continue
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast toast={toast} onDismiss={dismissToast} />}
    </>
  );
};

export default ApplyModal;