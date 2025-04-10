import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  BarChart3,
  Settings,
  Search,
  ChevronDown,
  ChevronRight,
  Zap,
  Menu,
  X,
  UserCheck,
  CalendarCheck,
  UserPlus,
  Star,
  Clock,
  Award
} from "lucide-react"

interface GlassSidebarProps {
  isMobile: boolean
  onSortChange?: (sortMethod: string) => void
}

interface NavSection {
  title: string
  icon: React.ElementType
  items: { 
    name: string
    count?: number
    icon?: React.ElementType
    sortBy?: string 
    status?: 'active' | 'new' | 'urgent'
  }[]
}

export default function GlassSidebar({ isMobile, onSortChange }: GlassSidebarProps) {
  const [isOpen, setIsOpen] = useState(!isMobile)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Candidates"])
  const [activeSort, setActiveSort] = useState<string>("default")

  const navSections: NavSection[] = [
    {
      title: "Candidates",
      icon: Users,
      items: [
        { 
          name: "All Candidates", 
          count: 124, 
          icon: Users,
          sortBy: "default" 
        },
        { 
          name: "Shortlisted", 
          count: 18, 
          icon: Star,
          sortBy: "shortlisted",
          status: 'active'
        },
        { 
          name: "Interview Stage", 
          count: 12, 
          icon: CalendarCheck,
          sortBy: "interview",
          status: 'urgent'
        },
        { 
          name: "New Applications", 
          count: 45, 
          icon: UserPlus,
          sortBy: "new",
          status: 'new'
        },
        { 
          name: "Pending Review", 
          count: 28, 
          icon: Clock,
          sortBy: "pending" 
        },
        { 
          name: "Top Matches", 
          count: 15, 
          icon: Award,
          sortBy: "matches" 
        }
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      items: [
        { name: "Overview", icon: BarChart3 },
        { name: "Hiring Pipeline", icon: Users },
        { name: "Performance", icon: Award }
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { name: "Preferences", icon: Settings },
        { name: "Team Access", icon: Users },
      ],
    },
  ]

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => 
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  const getStatusColor = (status?: 'active' | 'new' | 'urgent') => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-300'
      case 'new':
        return 'bg-blue-500/20 text-blue-300'
      case 'urgent':
        return 'bg-amber-500/20 text-amber-300'
      default:
        return 'bg-zinc-800 text-zinc-300'
    }
  }

  return (
    <>
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
              relative z-30 w-72 shrink-0 overflow-y-auto
              bg-black/40 backdrop-blur-2xl
              ${isMobile ? "fixed h-full" : ""}
            `}
          >
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent">
              <div className="absolute inset-0 animate-pulse" />
            </div>

            <div className="p-6 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-400 to-teal-300 flex items-center justify-center">
                  <Zap size={20} className="text-black" />
                </div>
                <h1 className="text-xl font-semibold tracking-tight">HireMate</h1>
              </div>

              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>

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
                              <motion.button
                                key={item.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                  w-full flex items-center justify-between p-2 rounded-md text-sm
                                  ${item.sortBy === activeSort 
                                    ? "bg-cyan-500/20 text-cyan-300" 
                                    : "text-zinc-400 hover:text-white hover:bg-cyan-500/10"
                                  }
                                  relative group
                                `}
                                onClick={() => {
                                  if (item.sortBy) {
                                    setActiveSort(item.sortBy)
                                    if (onSortChange) {
                                      onSortChange(item.sortBy)
                                    }
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon && (
                                    <item.icon 
                                      size={16} 
                                      className={item.sortBy === activeSort ? "text-cyan-300" : "text-zinc-400"}
                                    />
                                  )}
                                  <span>{item.name}</span>
                                </div>
                                {item.count && (
                                  <span className={`
                                    px-2 py-0.5 rounded-full text-xs transition-colors
                                    ${item.status 
                                      ? getStatusColor(item.status)
                                      : item.sortBy === activeSort
                                        ? "bg-cyan-500/30 text-cyan-200"
                                        : "bg-zinc-800 text-zinc-300"
                                    }
                                  `}>
                                    {item.count}
                                  </span>
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="pt-4 mt-auto border-t border-zinc-800/50">
                <div className="flex items-center gap-3 p-2 rounded-md bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-300 flex items-center justify-center">
                    <UserCheck size={20} className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Cooper</p>
                    <p className="text-xs text-zinc-400">HR Manager</p>
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