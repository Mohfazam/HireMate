"use client"

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
  skills: Array<{ name: string; level: number }>
  github: { repos: number; stars: number; contributions: number }
  leetcode: { solved: number; contests: number; ranking: string }
  image: string
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "7 years",
    matchScore: 92,
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TailwindCSS", level: 88 },
    ],
    github: { repos: 32, stars: 450, contributions: 1240 },
    leetcode: { solved: 320, contests: 15, ranking: "Top 5%" },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Full Stack Engineer",
    location: "New York, NY",
    experience: "5 years",
    matchScore: 88,
    skills: [
      { name: "Node.js", level: 92 },
      { name: "React", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "GraphQL", level: 78 },
    ],
    github: { repos: 24, stars: 320, contributions: 980 },
    leetcode: { solved: 280, contests: 12, ranking: "Top 10%" },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Backend Developer",
    location: "Austin, TX",
    experience: "4 years",
    matchScore: 85,
    skills: [
      { name: "Python", level: 90 },
      { name: "Django", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "Docker", level: 75 },
    ],
    github: { repos: 18, stars: 210, contributions: 760 },
    leetcode: { solved: 240, contests: 8, ranking: "Top 15%" },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "UI/UX Developer",
    location: "Seattle, WA",
    experience: "6 years",
    matchScore: 90,
    skills: [
      { name: "Figma", level: 95 },
      { name: "React", level: 88 },
      { name: "CSS/SCSS", level: 92 },
      { name: "Animation", level: 90 },
    ],
    github: { repos: 22, stars: 380, contributions: 920 },
    leetcode: { solved: 180, contests: 5, ranking: "Top 25%" },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "David Kim",
    role: "DevOps Engineer",
    location: "Chicago, IL",
    experience: "8 years",
    matchScore: 87,
    skills: [
      { name: "Kubernetes", level: 92 },
      { name: "AWS", level: 90 },
      { name: "Terraform", level: 85 },
      { name: "CI/CD", level: 88 },
    ],
    github: { repos: 28, stars: 290, contributions: 1050 },
    leetcode: { solved: 150, contests: 3, ranking: "Top 30%" },
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Olivia Wilson",
    role: "Mobile Developer",
    location: "Portland, OR",
    experience: "5 years",
    matchScore: 84,
    skills: [
      { name: "React Native", level: 90 },
      { name: "Swift", level: 85 },
      { name: "Kotlin", level: 82 },
      { name: "Firebase", level: 80 },
    ],
    github: { repos: 20, stars: 240, contributions: 820 },
    leetcode: { solved: 210, contests: 7, ranking: "Top 20%" },
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Function to get color based on skill level
const getSkillColor = (level: number) => {
  if (level >= 90) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  if (level >= 80) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
  if (level >= 70) return "bg-blue-500/20 text-blue-300 border-blue-500/30"
  return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
}

// Update the component props to include sortMethod
interface CandidateGridProps {
  sortMethod: string
  onSortChange?: (method: string) => void
}

// Update the component definition
export default function CandidateGrid({ sortMethod = "default", ...props }: CandidateGridProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const constraintsRef = useRef(null)
  const [sortMethodState, setSortMethodState] = useState(sortMethod)

  // Add a function to sort candidates based on the sort method
  const getSortedCandidates = () => {
    switch (sortMethodState) {
      case "matchScore":
        return [...candidates].sort((a, b) => b.matchScore - a.matchScore)
      case "activity":
        // For this example, we'll use github contributions as a proxy for activity
        return [...candidates].sort((a, b) => b.github.contributions - a.github.contributions)
      case "skills":
        // Sort by the highest skill level
        return [...candidates].sort((a, b) => {
          const aMaxSkill = Math.max(...a.skills.map((s) => s.level))
          const bMaxSkill = Math.max(...b.skills.map((s) => s.level))
          return bMaxSkill - aMaxSkill
        })
      default:
        return candidates
    }
  }

  const sortedCandidates = getSortedCandidates()

  // Update the title to show the current sort method
  const getSortTitle = () => {
    switch (sortMethodState) {
      case "matchScore":
        return "Highest Match Candidates"
      case "activity":
        return "Most Active Candidates"
      case "skills":
        return "Top Skilled Candidates"
      default:
        return "All Candidates"
    }
  }

  // Add a function to set the sort method
  const setSortMethod = (method: string) => {
    if (props && props.onSortChange) {
      props.onSortChange(method)
    }
    setSortMethodState(method)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">{getSortTitle()}</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-sm bg-zinc-900/80 hover:bg-zinc-800 rounded-md transition-colors"
          >
            Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              sortMethodState === "matchScore"
                ? "bg-cyan-500/30 text-cyan-200"
                : "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300"
            }`}
            onClick={() => sortMethodState !== "matchScore" && setSortMethod("matchScore")}
          >
            Sort by Match
          </motion.button>
        </div>
      </div>

      <motion.div ref={constraintsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
        {sortedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidate === candidate.id}
            onSelect={() => setSelectedCandidate(candidate.id === selectedCandidate ? null : candidate.id)}
            //@ts-ignore
            constraintsRef={constraintsRef}
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
}

function CandidateCard({ candidate, isSelected, onSelect, constraintsRef }: CandidateCardProps) {
  // Motion values for drag
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // Spring physics for smoother movement
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
      {/* Match score indicator */}
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center overflow-hidden">
            <img
              src={candidate.image || "/placeholder.svg"}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
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

        {/* Skills */}
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

        {/* Tags */}
        {candidate.matchScore > 90 && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mr-2">
              <Award size={10} className="mr-1" /> Top Match
            </span>
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Star size={10} className="mr-1" /> Recommended
            </span>
          </div>
        )}
        {candidate.matchScore > 85 && candidate.matchScore <= 90 && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Star size={10} className="mr-1" /> Recommended
            </span>
          </div>
        )}

        {/* Platform insights */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* Action buttons */}
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
