import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, CheckCircle2, BriefcaseIcon, Target, Award, Zap } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  return (
    <motion.div 
      className="flex-1 p-6 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-100">Recruitment Analytics</h2>
          <select className="bg-zinc-800 text-zinc-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-500/50">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BriefcaseIcon, label: "Open Positions", value: "24", trend: "+12%", color: "text-cyan-400" },
            { icon: Users, label: "Total Applicants", value: "847", trend: "+28%", color: "text-emerald-400" },
            { icon: Clock, label: "Time to Hire", value: "18 days", trend: "-22%", color: "text-amber-400" },
            { icon: CheckCircle2, label: "Hire Rate", value: "68%", trend: "+8%", color: "text-purple-400" }
          ].map((metric, index) => (
            <div key={index} className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <metric.icon className={`${metric.color}`} size={20} />
                <span className="text-zinc-400">{metric.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-zinc-100">{metric.value}</span>
                <span className={`text-sm ${metric.trend.startsWith('+') ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Timeline */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100">Applications Timeline</h3>
              <TrendingUp className="text-emerald-400" size={20} />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 60, 38, 52, 65, 75, 45, 55, 70, 85, 65, 75].map((height, i) => (
                <div key={i} className="relative flex-1">
                  <motion.div 
                    className="w-full bg-gradient-to-t from-cyan-500/20 to-emerald-500/20 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-zinc-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Top Performing Roles */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100">Top Performing Roles</h3>
              <Target className="text-cyan-400" size={20} />
            </div>
            <div className="space-y-4">
              {[
                { role: "Senior React Developer", score: 92, applicants: 156 },
                { role: "Full Stack Engineer", score: 88, applicants: 143 },
                { role: "Product Designer", score: 85, applicants: 98 },
                { role: "DevOps Engineer", score: 82, applicants: 112 }
              ].map((role, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{role.role}</span>
                    <span className="text-zinc-400">{role.applicants} applicants</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${role.score}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hiring Funnel */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100">Hiring Funnel</h3>
              <Award className="text-amber-400" size={20} />
            </div>
            <div className="space-y-4">
              {[
                { stage: "Applications", count: 847, percentage: 100 },
                { stage: "Screened", count: 423, percentage: 50 },
                { stage: "Interviewed", count: 164, percentage: 19 },
                { stage: "Offers Made", count: 38, percentage: 4.5 }
              ].map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{stage.stage}</span>
                    <span className="text-zinc-400">{stage.count}</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Metrics */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100">Time Metrics</h3>
              <Zap className="text-emerald-400" size={20} />
            </div>
            <div className="space-y-6">
              {[
                { metric: "Time to Fill", value: "32 days", trend: "-15%" },
                { metric: "Time in Stage", value: "5.2 days", trend: "-8%" },
                { metric: "Response Time", value: "1.8 days", trend: "-25%" },
                { metric: "Interview Duration", value: "4.5 hours", trend: "+5%" }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-zinc-300">{metric.metric}</div>
                    <div className="text-lg font-medium text-zinc-100">{metric.value}</div>
                  </div>
                  <span className={`text-sm ${metric.trend.startsWith('-') ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {metric.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsTab;