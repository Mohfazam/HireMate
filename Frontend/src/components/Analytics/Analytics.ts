export interface Candidate {
    id: string;
    name: string;
    skills: string[];
    matchScore: number;
    githubStats: {
      stars: number;
      repos: number;
      contributions: number;
      location: {
        lat: number;
        lng: number;
      };
    };
    leetcode: {
      solved: number;
      ranking: number;
      contests: number;
    };
    status: 'new' | 'shortlisted' | 'interview' | 'matched' | 'pending';
    daysInStage: number;
  }
  
  export interface AnalyticsMode {
    id: string;
    label: string;
    icon: string;
  }