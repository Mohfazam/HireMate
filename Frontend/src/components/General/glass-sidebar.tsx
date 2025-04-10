"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  Settings,
  Search,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X,
} from "lucide-react"

// Update the GlassSidebarProps interface to include the onSortChange prop
interface GlassSidebarProps {
  isMobile: boolean
  onSortChange?: (sortMethod: string) => void
}

// Update the NavSection interface to include a sortBy property
interface NavSection {
  title: string
  icon: React.ElementType
  items: { name: string; count?: number; empty?: boolean; sortBy?: string }[]
}

export default function GlassSidebar({ isMobile, onSortChange }: GlassSidebarProps) {
  const [isOpen, setIsOpen] = useState(!isMobile)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Candidates"])

  // Add a new state for the active sort method and pass it to the parent component
  const [activeSort, setActiveSort] = useState<string>("default")

  // Update the navSections array to have more meaningful candidate sorting options
  // and simplify the empty feature indicators
  const navSections: NavSection[] = [
    {
      title: "Candidates",
      icon: Users,
      items: [
        { name: "All Candidates", count: 124, sortBy: "default" },
        { name: "Highest Match", count: 18, sortBy: "matchScore" },
        { name: "Recent Activity", count: 42, sortBy: "activity" },
        { name: "Technical Skills", count: 76, sortBy: "skills" },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      items: [{ name: "Overview" }, { name: "Reports", empty: true }, { name: "Insights", empty: true }],
    },
    {
      title: "Communication",
      icon: MessageSquare,
      items: [
        { name: "Messages", count: 3, empty: true },
        { name: "Templates", empty: true },
      ],
    },
    {
      title: "Schedule",
      icon: Calendar,
      items: [
        { name: "Calendar", empty: true },
        { name: "Availability", empty: true },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { name: "Account", empty: true },
        { name: "Team", empty: true },
        { name: "Integrations", empty: true },
      ],
    },
  ]

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-zinc-900/80 backdrop-blur-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -280 } : false}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`
              relative z-30 w-64 shrink-0 overflow-y-auto
              bg-black/40 backdrop-blur-2xl
              ${isMobile ? "fixed h-full" : ""}
            `}
          >
            {/* Animated border */}
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent">
              <div className="absolute inset-0 animate-pulse" />
            </div>

            {/* Sidebar content */}
            <div className="p-6 space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-400 to-teal-300 flex items-center justify-center">
                  <Zap size={18} className="text-black" />
                </div>
                <h1 className="text-xl font-semibold tracking-tight">HireMate</h1>
              </div>

              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navSections.map((section) => (
                  <div key={section.title} className="py-1">
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between p-2 rounded-md text-zinc-300 hover:text-white hover:bg-cyan-500/10 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <section.icon size={18} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                      {expandedSections.includes(section.title) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedSections.includes(section.title) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-9 pr-2 py-1 space-y-1">
                            {section.items.map((item) => (
                              <div key={item.name}>
                                {item.empty ? (
                                  <div
                                    className="w-full flex items-center justify-between p-2 rounded-md text-sm text-zinc-400/60 relative group cursor-not-allowed"
                                    title="New Feature Coming Soon"
                                  >
                                    <span>{item.name}</span>
                                    {item.count && (
                                      <span className="bg-zinc-800/50 text-zinc-400/60 px-2 py-0.5 rounded-full text-xs">
                                        {item.count}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className={`w-full flex items-center justify-between p-2 rounded-md text-sm 
          ${
            item.sortBy === activeSort
              ? "bg-cyan-500/20 text-cyan-300"
              : "text-zinc-400 hover:text-white hover:bg-cyan-500/10"
          } 
          relative group`}
                                    onClick={() => {
                                      if (item.sortBy) {
                                        setActiveSort(item.sortBy)
                                        // Pass the sort method to the parent component
                                        if (onSortChange) {
                                          onSortChange(item.sortBy)
                                        }
                                      }
                                    }}
                                  >
                                    <span>{item.name}</span>
                                    {item.count && (
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-xs transition-colors
            ${
              item.sortBy === activeSort
                ? "bg-cyan-500/30 text-cyan-200"
                : "bg-zinc-800 text-zinc-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300"
            }`}
                                      >
                                        {item.count}
                                      </span>
                                    )}

                                    {/* Glow effect on hover */}
                                    <motion.div
                                      className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 -z-10
            ${item.sortBy === activeSort ? "bg-cyan-500/10" : "bg-cyan-500/5"}`}
                                      layoutId={`glow-${item.name}`}
                                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                    />
                                  </motion.button>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* User profile */}
              <div className="pt-4 mt-auto border-t border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-black">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Doe</p>
                    <p className="text-xs text-zinc-400">Talent Acquisition</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
