"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Briefcase,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const candidateFlowData = [
  { name: "Applied", value: 240 },
  { name: "Screened", value: 180 },
  { name: "Interviewed", value: 90 },
  { name: "Offered", value: 35 },
  { name: "Hired", value: 28 },
]

const timeToHireData = [
  { name: "Jan", value: 28 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 22 },
  { name: "Apr", value: 24 },
  { name: "May", value: 20 },
  { name: "Jun", value: 18 },
  { name: "Jul", value: 15 },
]

const skillDistributionData = [
  { name: "Frontend", value: 35 },
  { name: "Backend", value: 30 },
  { name: "Full Stack", value: 20 },
  { name: "DevOps", value: 10 },
  { name: "Mobile", value: 5 },
]

const locationData = [
  { name: "San Francisco", value: 30 },
  { name: "New York", value: 25 },
  { name: "Seattle", value: 15 },
  { name: "Austin", value: 12 },
  { name: "Chicago", value: 10 },
  { name: "Remote", value: 8 },
]

// AI insights data
const aiInsights = [
  {
    id: 1,
    title: "Candidate Quality Improving",
    description: "The average match score has increased by 12% this month, indicating better candidate sourcing.",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    id: 2,
    title: "Time to Hire Decreasing",
    description: "Your team is now 30% faster at hiring compared to industry average.",
    icon: Clock,
    color: "text-cyan-400",
  },
  {
    id: 3,
    title: "Skill Gap Identified",
    description: "There's a shortage of candidates with Kubernetes experience for your DevOps roles.",
    icon: Users,
    color: "text-amber-400",
  },
]

export default function AnalyticsPanel() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % aiInsights.length)
  }

  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + aiInsights.length) % aiInsights.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-zinc-900/70 backdrop-blur-xl rounded-xl border border-zinc-800 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Recruitment Analytics</h2>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "overview"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              Overview
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("candidates")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "candidates"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              Candidates
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("locations")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "locations"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              Locations
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metrics row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-400">Total Candidates</h3>
              <Users size={16} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-semibold mt-2">1,248</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +12% from last month
            </p>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-400">Time to Hire</h3>
              <Clock size={16} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-semibold mt-2">18 days</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full">70% faster</span>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-400">Match Accuracy</h3>
              <CheckCircle2 size={16} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-semibold mt-2">95%</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full">
                High precision
              </span>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-zinc-400">Open Positions</h3>
              <Briefcase size={16} className="text-cyan-400" />
            </div>
            <p className="text-2xl font-semibold mt-2">24</p>
            <p className="text-xs text-amber-400 flex items-center gap-1 mt-1">8 urgent needs</p>
          </div>
        </div>

        {/* AI Insights carousel */}
        <div className="bg-gradient-to-r from-zinc-900/80 via-cyan-950/20 to-zinc-900/80 rounded-xl p-6 mb-6 relative overflow-hidden">
          {/* Ambient orb */}
          <motion.div
            className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20">
              <Zap size={16} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentInsight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div
                  className={`p-2 rounded-lg ${aiInsights[currentInsight].color.replace("text-", "bg-").replace("400", "500/20")}`}
                >
                  {React.createElement(aiInsights[currentInsight].icon, {
                    className: aiInsights[currentInsight].color,
                    size: 20,
                  })}
                </div>
                <div>
                  <h4 className="text-base font-medium">{aiInsights[currentInsight].title}</h4>
                  <p className="text-sm text-zinc-400 mt-1">{aiInsights[currentInsight].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevInsight}
                className="p-1 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <div className="flex gap-1">
                {aiInsights.map((_, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setCurrentInsight(index)}
                    className={`w-2 h-2 rounded-full ${index === currentInsight ? "bg-cyan-400" : "bg-zinc-700"}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextInsight}
                className="p-1 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Candidate Flow */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Candidate Flow</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={candidateFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#374151",
                          borderRadius: "0.375rem",
                          color: "#f3f4f6",
                        }}
                      />
                      <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]}>
                        {candidateFlowData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={`rgba(6, 182, 212, ${0.5 + index * 0.1})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Time to Hire */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Time to Hire (Days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeToHireData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#374151",
                          borderRadius: "0.375rem",
                          color: "#f3f4f6",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        dot={{ fill: "#06b6d4", r: 4 }}
                        activeDot={{ fill: "#06b6d4", r: 6, stroke: "#0e7490", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "candidates" && (
            <motion.div
              key="candidates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Skill Distribution */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Skill Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {skillDistributionData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              [
                                "#06b6d4", // cyan
                                "#0ea5e9", // sky
                                "#3b82f6", // blue
                                "#8b5cf6", // violet
                                "#d946ef", // fuchsia
                              ][index % 5]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#374151",
                          borderRadius: "0.375rem",
                          color: "#f3f4f6",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Skills */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Top Skills in Demand</h3>
                <div className="space-y-4">
                  {[
                    { name: "React", value: 85, color: "bg-cyan-500" },
                    { name: "TypeScript", value: 78, color: "bg-blue-500" },
                    { name: "Node.js", value: 72, color: "bg-emerald-500" },
                    { name: "AWS", value: 65, color: "bg-amber-500" },
                    { name: "Python", value: 60, color: "bg-violet-500" },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div className={`h-full ${skill.color}`} style={{ width: `${skill.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "locations" && (
            <motion.div
              key="locations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Location Heatmap */}
              <div className="bg-zinc-800/30 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Candidate Locations</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                      <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderColor: "#374151",
                          borderRadius: "0.375rem",
                          color: "#f3f4f6",
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`rgba(6, 182, 212, ${0.4 + entry.value / 100})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
