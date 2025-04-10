"use client"

import { motion } from "framer-motion"
import { Briefcase, CheckCircle, Clock, MapPin, Star } from "lucide-react"

type PreviewStepProps = {
  formData: {
    title: string
    location: string
    type: string
    skills: string[]
    salaryMin: number
    salaryMax: number
  }
  direction: number
}

export function PreviewStep({ formData, direction }: PreviewStepProps) {
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  const jobTypeLabels: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    freelance: "Freelance",
    internship: "Internship",
  }

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-400">
            <CheckCircle className="h-6 w-6" />
          </span>
          Preview Job Listing
        </h2>
        <p className="text-gray-400 mt-2">Review your job listing before publishing</p>
      </div>

      <div className="bg-gray-900/60 rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_30px_rgba(8,145,178,0.15)] backdrop-blur-sm">
        {/* Header with gradient */}
        <div className="relative p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-gray-900/0 to-gray-900/0"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-gray-800/80 backdrop-blur-sm text-cyan-400 rounded-full text-sm font-medium mb-3 border border-gray-700">
              {formData.type ? jobTypeLabels[formData.type] : "Job Type"}
            </div>
            <h3 className="text-2xl font-bold text-white">{formData.title || "Job Title"}</h3>

            <div className="flex items-center gap-3 mt-3 text-gray-300">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>{formData.location || "Location"}</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>Posted today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Badge */}
        <div className="px-6 -mt-5 flex justify-end">
          <div className="bg-gray-800 shadow-lg rounded-xl px-4 py-2 text-cyan-400 font-bold border border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              ${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">
                <CheckCircle className="h-5 w-5" />
              </span>
              Required Skills
            </h4>

            <div className="flex flex-wrap gap-2">
              {formData.skills.length > 0 ? (
                formData.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-800 text-cyan-400 px-3 py-1 rounded-lg text-sm border border-gray-700"
                  >
                    {skill}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills specified</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h5 className="font-medium text-white">Company Details</h5>
                <p className="text-gray-400 text-sm">Acme Inc. • Technology • 50-100 employees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <Star className="h-4 w-4 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400">Featured listing</span>
            </div>
            <div className="bg-gray-800 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium border border-gray-700">
              Ready to publish
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-900/40 rounded-xl p-4 border border-gray-800 backdrop-blur-sm">
        <h4 className="font-medium text-white flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-cyan-400" />
          Ready to Submit
        </h4>
        <p className="text-gray-400 text-sm mt-1">
          Please review all details before submitting. Once submitted, your job will be published on our platform.
        </p>
      </div>
    </motion.div>
  )
}
