// Mock data for recruiter dashboard
export interface Candidate {
    id: number;
    name: string;
    match: number;
    skills: string[];
  }
  
  export interface Job {
    id: number;
    title: string;
    location: string;
    salary: string;
    requirements: string[];
    description: string;
    candidates: Candidate[];
  }
  
  export const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior React Developer",
      location: "Remote",
      salary: "$120k-$160k",
      description: "We're looking for an experienced React developer to join our team and build amazing web applications. The ideal candidate will have a strong foundation in front-end architecture and performance optimization.",
      requirements: ["React", "TypeScript", "Redux", "GraphQL", "Performance Optimization"],
      candidates: [
        {
          id: 1,
          name: "John Anderson",
          match: 92,
          skills: ["React", "Next.js", "Redux", "TypeScript", "GraphQL"]
        },
        {
          id: 2,
          name: "Sarah Mitchell",
          match: 87,
          skills: ["React", "TypeScript", "Node.js", "AWS", "System Design"]
        }
      ]
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      location: "San Francisco, CA",
      salary: "$140k-$180k",
      description: "Join our team to develop scalable web applications with modern technologies. You'll be working on critical infrastructure and helping scale our platform to millions of users.",
      requirements: ["JavaScript", "Node.js", "React", "MongoDB", "Microservices"],
      candidates: [
        {
          id: 3,
          name: "Michael Chen",
          match: 89,
          skills: ["JavaScript", "Node.js", "React", "Express", "MongoDB"]
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          match: 81,
          skills: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes"]
        }
      ]
    },
    {
      id: 3,
      title: "Senior Backend Engineer",
      location: "New York, NY",
      salary: "$150k-$190k",
      description: "Looking for a senior backend engineer to architect and implement scalable services. Experience with high-load systems and distributed architecture is essential.",
      requirements: ["Go", "PostgreSQL", "Redis", "gRPC", "System Design"],
      candidates: [
        {
          id: 5,
          name: "David Kumar",
          match: 95,
          skills: ["Go", "PostgreSQL", "Kubernetes", "System Design", "Redis"]
        }
      ]
    }
  ];
  
  export const locations = [
    "Remote",
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Chicago, IL",
    "Los Angeles, CA"
  ];
  
  export const commonRequirements = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "GraphQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "System Design",
    "Vue.js",
    "Angular",
    "Python",
    "Django",
    "Flask",
    "Ruby on Rails",
    "Java",
    "Spring Boot",
    "Go",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Swift",
    "Kotlin",
    "Flutter",
    "React Native"
  ];