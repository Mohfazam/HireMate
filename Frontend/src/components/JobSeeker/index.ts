export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: {
      min: number;
      max: number;
      currency: string;
    };
    description: string;
    requirements: string[];
    posted: string;
  }
  
  export interface Application {
    id: string;
    jobId: string;
    status: 'applied' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
    appliedDate: string;
    resumeText: string;
    analysis?: AnalysisResult;
  }
  
  export interface AnalysisResult {
    score: number;
    skillsMatch: {
      skill: string;
      match: number;
    }[];
    experienceMatch: string;
    recommendations: string[];
  }
  
  export type TabType = 'jobs' | 'applications' | 'profile';