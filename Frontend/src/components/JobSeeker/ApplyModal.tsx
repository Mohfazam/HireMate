import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, AlertCircle, CheckCircle, Edit3, Percent } from 'lucide-react';
import { Job, AnalysisResult } from '../types';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

// Analysis Result Component (embedded to stay within 4 file limit)
const AnalysisResultDisplay: React.FC<{ analysis: AnalysisResult; job: Job }> = ({ analysis, job }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getMatchColor = (match: number) => {
    if (match >= 80) return 'bg-emerald-500';
    if (match >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Analysis</h3>
        <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
          <span>{analysis.score}/100</span>
          <span className="text-sm ml-1 font-normal text-zinc-400">match score</span>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Percent size={16} />
          Skills Match
        </h4>
        <div className="space-y-3">
          {analysis.skillsMatch.map((skill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>{skill.skill}</span>
                <span className={getScoreColor(skill.match)}>{skill.match}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getMatchColor(skill.match)} transition-all duration-500 ease-out`} 
                  style={{ width: `${skill.match}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <CheckCircle size={16} />
          Experience Match
        </h4>
        <p className={`${getScoreColor(analysis.score)} font-medium`}>{analysis.experienceMatch}</p>
      </div>

      <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Edit3 size={16} />
          Improvement Recommendations
        </h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="text-zinc-300 flex gap-2">
              <span className="text-amber-500 flex-shrink-0">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-zinc-400 text-sm">
          <p>Analyzed for: <span className="text-white">{job.title}</span> at <span className="text-white">{job.company}</span></p>
        </div>
        <div className="text-xs text-zinc-500">
          Powered by AI
        </div>
      </div>
    </div>
  );
};

// Main ApplyModal component
const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle AI analysis
  const handleAIAnalysis = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // In a real app, this would use an actual API key
      const apiKey = "AIzaSyDpW4QlVgizirsBlBr4zncCbIsmuI1NS40";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Analyze this resume for the ${job.title} role. Job requirements: ${job.requirements.join(', ')}. 
        Return a JSON object with these properties:
        - score: number (0-100) representing overall match
        - skillsMatch: array of objects with 'skill' and 'match' (percentage 0-100) properties
        - experienceMatch: string ('Excellent', 'Good', 'Average', or 'Below Average')
        - recommendations: array of strings with improvement suggestions

        Resume:
        ${resumeText}
        
        Format your response ONLY as a valid JSON object with no explanation or preamble.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      try {
        const parsedResult = JSON.parse(text);
        setAnalysis(parsedResult);
        
        if (onAnalysisComplete) {
          onAnalysisComplete(parsedResult);
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setError("Failed to parse analysis. Please try again.");
        
        // Fallback with mock data for demo purposes
        const mockResult: AnalysisResult = {
          score: 75,
          skillsMatch: job.requirements.map(req => ({
            skill: req,
            match: Math.floor(Math.random() * 40) + 60 // Random between 60-100
          })),
          experienceMatch: "Good",
          recommendations: [
            "Add more specific examples of your work with " + job.requirements[0],
            "Highlight quantifiable achievements",
            "Include relevant certifications"
          ]
        };
        
        setAnalysis(mockResult);
        if (onAnalysisComplete) {
          onAnalysisComplete(mockResult);
        }
      }
    } catch (err) {
      console.error("Error during analysis:", err);
      setError("Failed to analyze resume. Please try again.");
      
      // Fallback with mock data for demo purposes
      const mockResult: AnalysisResult = {
        score: 75,
        skillsMatch: job.requirements.map(req => ({
          skill: req,
          match: Math.floor(Math.random() * 40) + 60 // Random between 60-100
        })),
        experienceMatch: "Good",
        recommendations: [
          "Add more specific examples of your work with " + job.requirements[0],
          "Highlight quantifiable achievements",
          "Include relevant certifications"
        ]
      };
      
      setAnalysis(mockResult);
      if (onAnalysisComplete) {
        onAnalysisComplete(mockResult);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle application submission
  const handleSubmit = async () => {
    if (!analysis) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real app, this would use an actual backend endpoint
      // const response = await axios.post(`http://localhost:3000/api/jobs/${job.id}/apply`, {
      //  name: "John Doe", // From user profile
      //  email: "john.doe@example.com", // From user profile
      //  resume: resumeText,
      //  analysis
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close modal after successful submission
      onClose();
      
      // Show success notification (in a real app)
      console.log("Application submitted successfully!");
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm z-10 flex justify-between items-center border-b border-zinc-800 p-4">
          <h2 className="text-xl font-semibold">
            {analysis ? "Resume Analysis Results" : `Apply for ${job.title}`}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-800/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          {!analysis ? (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <span className="text-cyan-400">{job.company}</span>
                </div>
                <p className="text-zinc-300 mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="bg-zinc-800 text-zinc-300 text-sm px-2 py-1 rounded-full">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-zinc-300 mb-2">
                  Paste your resume text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full h-64 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Paste your complete resume text here for AI analysis against job requirements..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAIAnalysis}
                  disabled={!resumeText.trim() || isAnalyzing}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                    !resumeText.trim() || isAnalyzing
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600'
                  } transition-all duration-300`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Resume</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <AnalysisResultDisplay analysis={analysis} job={job} />
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  Edit Resume
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    isSubmitting
                      ? 'bg-cyan-700 cursor-not-allowed'
                      : 'bg-cyan-500 hover:bg-cyan-600'
                  } transition-colors`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cyan-300 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Confirm Application</span>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;