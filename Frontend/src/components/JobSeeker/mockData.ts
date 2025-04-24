import { Job, Application } from './index';

export const jobs: Job[] = [
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
];

export const applications: Application[] = [
  {
    id: 'a1',
    jobId: '1',
    status: 'applied',
    appliedDate: '2023-05-16',
    resumeText: 'John Doe - Frontend Developer with 4 years of experience in React, TypeScript, and responsive web design.',
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
];