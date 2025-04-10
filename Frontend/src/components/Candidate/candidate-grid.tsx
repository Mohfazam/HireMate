import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Code, Github, MapPin, Briefcase, Award, Star } from "lucide-react"

interface Candidate {
  id: number
  name: string
  role: string
  location: string
  experience: string
  matchScore: number
  status: 'shortlisted' | 'interview' | 'new' | 'pending' | 'matched' | null
  skills: Array<{ name: string; level: number }>
  github: { repos: number; stars: number; contributions: number }
  leetcode: { solved: number; contests: number; ranking: string }
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "7 years",
    matchScore: 92,
    status: 'shortlisted',
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TailwindCSS", level: 88 },
    ],
    github: { repos: 32, stars: 450, contributions: 1240 },
    leetcode: { solved: 320, contests: 15, ranking: "Top 5%" },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Full Stack Engineer",
    location: "New York, NY",
    experience: "5 years",
    matchScore: 88,
    status: 'interview',
    skills: [
      { name: "Node.js", level: 92 },
      { name: "React", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "GraphQL", level: 78 },
    ],
    github: { repos: 24, stars: 320, contributions: 980 },
    leetcode: { solved: 280, contests: 12, ranking: "Top 10%" },
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Backend Developer",
    location: "Austin, TX",
    experience: "4 years",
    matchScore: 85,
    status: 'new',
    skills: [
      { name: "Python", level: 90 },
      { name: "Django", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "Docker", level: 75 },
    ],
    github: { repos: 18, stars: 210, contributions: 760 },
    leetcode: { solved: 240, contests: 8, ranking: "Top 15%" },
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "UI/UX Developer",
    location: "Seattle, WA",
    experience: "6 years",
    matchScore: 90,
    status: 'pending',
    skills: [
      { name: "Figma", level: 95 },
      { name: "React", level: 88 },
      { name: "CSS/SCSS", level: 92 },
      { name: "Animation", level: 90 },
    ],
    github: { repos: 22, stars: 380, contributions: 920 },
    leetcode: { solved: 180, contests: 5, ranking: "Top 25%" },
  },
  {
    id: 5,
    name: "David Kim",
    role: "DevOps Engineer",
    location: "Chicago, IL",
    experience: "8 years",
    matchScore: 87,
    status: 'matched',
    skills: [
      { name: "Kubernetes", level: 92 },
      { name: "AWS", level: 90 },
      { name: "Terraform", level: 85 },
      { name: "CI/CD", level: 88 },
    ],
    github: { repos: 28, stars: 290, contributions: 1050 },
    leetcode: { solved: 150, contests: 3, ranking: "Top 30%" },
  },
  {
    id: 6,
    name: "Olivia Wilson",
    role: "Mobile Developer",
    location: "Portland, OR",
    experience: "5 years",
    matchScore: 84,
    status: null,
    skills: [
      { name: "React Native", level: 90 },
      { name: "Swift", level: 85 },
      { name: "Kotlin", level: 82 },
      { name: "Firebase", level: 80 },
    ],
    github: { repos: 20, stars: 240, contributions: 820 },
    leetcode: { solved: 210, contests: 7, ranking: "Top 20%" },
  },
]

const getSkillColor = (level: number) => {
  if (level >= 90) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  if (level >= 80) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  if (level >= 70) return "bg-blue-500/20 text-blue-300 border-blue-500/30"
  return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
}

interface CandidateGridProps {
  sortMethod: string
  onSortChange?: (method: string) => void
}

export default function CandidateGrid({ sortMethod = "default" }: CandidateGridProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const constraintsRef = useRef(null)

  const getFilteredCandidates = () => {
    let filtered = [...candidates]

    // First apply status filters
    switch (sortMethod) {
      case "shortlisted":
        filtered = filtered.filter(c => c.status === 'shortlisted')
        break
      case "interview":
        filtered = filtered.filter(c => c.status === 'interview')
        break
      case "new":
        filtered = filtered.filter(c => c.status === 'new')
        break
      case "pending":
        filtered = filtered.filter(c => c.status === 'pending')
        break
      case "matches":
        filtered = filtered.filter(c => c.status === 'matched')
        break
    }

    // Then apply sorting
    switch (sortMethod) {
      case "default":
        return filtered.sort((a, b) => b.matchScore - a.matchScore)
      case "shortlisted":
      case "interview":
      case "new":
      case "pending":
      case "matches":
        return filtered.sort((a, b) => b.matchScore - a.matchScore)
      default:
        return filtered
    }
  }

  const filteredCandidates = getFilteredCandidates()

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-emerald-500/20 text-emerald-300'
      case 'interview':
        return 'bg-amber-500/20 text-amber-300'
      case 'new':
        return 'bg-blue-500/20 text-blue-300'
      case 'pending':
        return 'bg-purple-500/20 text-purple-300'
      case 'matched':
        return 'bg-cyan-500/20 text-cyan-300'
      default:
        return 'bg-zinc-500/20 text-zinc-300'
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {sortMethod === "default" ? "All Candidates" : 
           sortMethod === "shortlisted" ? "Shortlisted Candidates" :
           sortMethod === "interview" ? "Interview Stage" :
           sortMethod === "new" ? "New Applications" :
           sortMethod === "pending" ? "Pending Review" :
           sortMethod === "matches" ? "Top Matches" : "Candidates"}
           {filteredCandidates.length > 0 && ` (${filteredCandidates.length})`}
        </h2>
      </div>

      <motion.div ref={constraintsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidate === candidate.id}
            onSelect={() => setSelectedCandidate(candidate.id === selectedCandidate ? null : candidate.id)}
            //@ts-ignore
            constraintsRef={constraintsRef}
            statusColor={getStatusColor(candidate.status)}
          />
        ))}
      </motion.div>
    </div>
  )
}

interface CandidateCardProps {
  candidate: Candidate
  isSelected: boolean
  onSelect: () => void
  constraintsRef: React.RefObject<HTMLDivElement>
  statusColor: string
}

function CandidateCard({ candidate, isSelected, onSelect, constraintsRef, statusColor }: CandidateCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const springX = useSpring(x, { stiffness: 400, damping: 25 })
  const springY = useSpring(y, { stiffness: 400, damping: 25 })
  const springRotateX = useSpring(rotateX, { stiffness: 400, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 400, damping: 25 })

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.05, zIndex: 20 }}
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
      }}
      onClick={onSelect}
      className={`
        relative bg-zinc-900/70 backdrop-blur-lg rounded-xl overflow-hidden
        border border-zinc-800 hover:border-cyan-500/30 transition-all duration-300
        ${isSelected ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20" : ""}
      `}
    >
      <div className="absolute top-4 right-4 flex items-center justify-center">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#1e293b" strokeWidth="4" />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={`${candidate.matchScore >= 90 ? "#10b981" : candidate.matchScore >= 80 ? "#06b6d4" : "#3b82f6"}`}
              strokeWidth="4"
              strokeDasharray={`${candidate.matchScore * 1.256} 126`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{candidate.matchScore}%</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-2xl font-semibold">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{candidate.name}</h3>
            <p className="text-zinc-400 text-sm">{candidate.role}</p>
            <div className="flex items-center gap-1 mt-1 text-zinc-500 text-xs">
              <MapPin size={12} />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-zinc-500 text-xs">
              <Briefcase size={12} />
              <span>{candidate.experience}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <div key={skill.name} className={`px-2 py-1 text-xs rounded-md border ${getSkillColor(skill.level)}`}>
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {candidate.status && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 text-xs rounded-md ${statusColor}`}>
              {candidate.status === 'shortlisted' && <Star size={10} className="mr-1" />}
              {candidate.status === 'matched' && <Award size={10} className="mr-1" />}
              {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Github size={14} className="text-zinc-400" />
              <h4 className="text-xs font-medium text-zinc-300">GitHub</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-zinc-400">Repos</p>
                <p className="text-sm font-medium">{candidate.github.repos}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Stars</p>
                <p className="text-sm font-medium">{candidate.github.stars}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Contrib</p>
                <p className="text-sm font-medium">{candidate.github.contributions}</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Code size={14} className="text-zinc-400" />
              <h4 className="text-xs font-medium text-zinc-300">LeetCode</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-zinc-400">Solved</p>
                <p className="text-sm font-medium">{candidate.leetcode.solved}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Contests</p>
                <p className="text-sm font-medium">{candidate.leetcode.contests}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Rank</p>
                <p className="text-sm font-medium text-cyan-400">{candidate.leetcode.ranking}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
          >
            View Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-md transition-colors"
          >
            Contact
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}