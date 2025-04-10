"use client"

import { motion } from "framer-motion"
import { Briefcase, Building, MapPin } from "lucide-react"

type JobDetailsStepProps = {
  formData: {
    title: string
    location: string
    type: string
  }
  handleChange: (field: string, value: string) => void
  direction: number
}

export function JobDetailsStep({ formData, handleChange, direction }: JobDetailsStepProps) {
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
            <Briefcase className="h-6 w-6" />
          </span>
          Job Details
        </h2>
        <p className="text-gray-400 mt-2">Let's start with the basic information about the position</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Job Title
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-200" />
            </div>
            <input
              id="title"
              type="text"
              placeholder="e.g. Senior Frontend Developer"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="pl-10 w-full py-3 px-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 outline-none shadow-sm backdrop-blur-sm group-hover:border-gray-700"
            />
            <div className="absolute inset-0 rounded-xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-200" />
            </div>
            <input
              id="location"
              type="text"
              placeholder="e.g. New York, NY or Remote"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="pl-10 w-full py-3 px-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 outline-none shadow-sm backdrop-blur-sm group-hover:border-gray-700"
            />
            <div className="absolute inset-0 rounded-xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </div>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Job Type
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-200" />
            </div>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="pl-10 w-full py-3 px-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 outline-none shadow-sm backdrop-blur-sm appearance-none group-hover:border-gray-700"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="" disabled selected>
                Select job type
              </option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            <div className="absolute inset-0 rounded-xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
