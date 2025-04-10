import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import GlassSidebar from "../General/glass-sidebar"
import CandidateGrid from "./candidate-grid"
import AnalyticsPanel from "./analytics-panel"
import { Award, Briefcase, TrendingUp, Users } from "lucide-react"
import { candidates } from "./Candidate-data"

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(false)
  const [sortMethod, setSortMethod] = useState("default")
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const candidateCounts = {
    total: candidates.length,
    //@ts-ignore
    shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
    //@ts-ignore

    interview: candidates.filter(c => c.status === 'interview').length,
    //@ts-ignore

    new: candidates.filter(c => c.status === 'new').length,
    //@ts-ignore

    pending: candidates.filter(c => c.status === 'pending').length,
    //@ts-ignore

    matched: candidates.filter(c => c.status === 'matched').length
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSortChange = (newSortMethod: string) => {
    setSortMethod(newSortMethod)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950 to-black opacity-80" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-teal-300/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(34, 211, 238, 0.15), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/50"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{
              x: cursorPosition.x,
              y: cursorPosition.y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex h-screen">
        <GlassSidebar 
          isMobile={isMobile} 
          onSortChange={handleSortChange}
          //@ts-ignore
          candidateCounts={candidateCounts}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6 p-4 bg-gradient-to-r from-cyan-950/30 to-zinc-900/70 rounded-xl border border-zinc-800/50">
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Award className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Top Candidate</p>
                  <p className="text-sm font-medium">Alex Morgan (92% Match)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Hiring Velocity</p>
                  <p className="text-sm font-medium">+15% this month</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Briefcase className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Active Positions</p>
                  <p className="text-sm font-medium">24 roles (8 urgent)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Users className="text-violet-400" size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Talent Pool</p>
                  <p className="text-sm font-medium">{candidateCounts.total} candidates</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <AnalyticsPanel />
            <CandidateGrid sortMethod={sortMethod} onSortChange={handleSortChange} />
          </div>
        </main>
      </div>
    </div>
  )
}