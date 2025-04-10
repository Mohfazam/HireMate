"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Plus, X } from "lucide-react"

type RequirementsStepProps = {
  formData: {
    skills: string[]
    salaryMin: number
    salaryMax: number
  }
  handleChange: (field: string, value: number) => void
  currentSkill: string
  setCurrentSkill: (skill: string) => void
  addSkill: () => void
  removeSkill: (skill: string) => void
  direction: number
}

export function RequirementsStep({
  formData,
  handleChange,
  currentSkill,
  setCurrentSkill,
  addSkill,
  removeSkill,
  direction,
}: RequirementsStepProps) {
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

  // Custom slider component
  const [isDragging, setIsDragging] = useState(false)
  const [sliderValues, setSliderValues] = useState([formData.salaryMin, formData.salaryMax])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = Number.parseInt(e.target.value)
    const newValues = [...sliderValues]
    newValues[index] = newValue

    // Ensure min doesn't exceed max and max doesn't go below min
    if (index === 0 && newValue > sliderValues[1]) {
      newValues[0] = sliderValues[1]
    } else if (index === 1 && newValue < sliderValues[0]) {
      newValues[1] = sliderValues[0]
    }

    setSliderValues(newValues)
    handleChange(index === 0 ? "salaryMin" : "salaryMax", newValues[index])
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
          Requirements
        </h2>
        <p className="text-gray-400 mt-2">Specify the skills and compensation for this position</p>
      </div>

      <div className="space-y-8">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-1">
            Required Skills
          </label>
          <div className="flex group">
            <div className="relative flex-1">
              <input
                id="skills"
                type="text"
                placeholder="e.g. React, TypeScript"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                className="w-full py-3 px-4 bg-gray-900/50 border border-r-0 border-gray-800 rounded-l-xl text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 outline-none shadow-sm backdrop-blur-sm group-hover:border-gray-700"
              />
              <div className="absolute inset-0 rounded-l-xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
            <button
              type="button"
              onClick={addSkill}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded-r-xl transition-colors duration-200 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              <Plus className="h-5 w-5 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <AnimatePresence>
              {formData.skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="bg-gray-800/80 text-cyan-400 px-3 py-2 rounded-lg flex items-center gap-2 group-hover:bg-gray-700/80 transition-colors duration-200 border border-gray-700 group-hover:border-cyan-800">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-gray-500 hover:text-cyan-300 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {formData.skills.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">Add skills to help candidates understand the requirements</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Salary Range</label>
          <div className="mt-6 px-2">
            <div className="relative pt-6 pb-10">
              {/* Track */}
              <div className="absolute h-2 w-full bg-gray-800 rounded-full"></div>

              {/* Filled Track */}
              <div
                className="absolute h-2 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                style={{
                  left: `${((sliderValues[0] - 30000) / (200000 - 30000)) * 100}%`,
                  width: `${((sliderValues[1] - sliderValues[0]) / (200000 - 30000)) * 100}%`,
                }}
              >
                <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(8,145,178,0.5)]"></div>
              </div>

              {/* Min Thumb */}
              <input
                type="range"
                min={30000}
                max={200000}
                step={5000}
                value={sliderValues[0]}
                onChange={(e) => handleSliderChange(e, 0)}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ height: "2rem", opacity: 0, zIndex: 10 }}
              />

              {/* Max Thumb */}
              <input
                type="range"
                min={30000}
                max={200000}
                step={5000}
                value={sliderValues[1]}
                onChange={(e) => handleSliderChange(e, 1)}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer"
                style={{ height: "2rem", opacity: 0, zIndex: 10 }}
              />

              {/* Min Thumb Visual */}
              <motion.div
                animate={{
                  scale: isDragging ? 1.2 : 1,
                  boxShadow: isDragging ? "0 0 15px rgba(8, 145, 178, 0.7)" : "0 0 5px rgba(8, 145, 178, 0.5)",
                }}
                className="absolute top-0 h-6 w-6 bg-gray-900 border-2 border-cyan-500 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-transform"
                style={{ left: `${((sliderValues[0] - 30000) / (200000 - 30000)) * 100}%`, top: "0.5rem" }}
              ></motion.div>

              {/* Max Thumb Visual */}
              <motion.div
                animate={{
                  scale: isDragging ? 1.2 : 1,
                  boxShadow: isDragging ? "0 0 15px rgba(8, 145, 178, 0.7)" : "0 0 5px rgba(8, 145, 178, 0.5)",
                }}
                className="absolute top-0 h-6 w-6 bg-gray-900 border-2 border-cyan-500 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-transform"
                style={{ left: `${((sliderValues[1] - 30000) / (200000 - 30000)) * 100}%`, top: "0.5rem" }}
              ></motion.div>

              {/* Min Value Label */}
              <div
                className="absolute top-8 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-2 py-1 rounded-md text-sm font-medium"
                style={{ left: `${((sliderValues[0] - 30000) / (200000 - 30000)) * 100}%` }}
              >
                ${sliderValues[0].toLocaleString()}
              </div>

              {/* Max Value Label */}
              <div
                className="absolute top-8 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-2 py-1 rounded-md text-sm font-medium"
                style={{ left: `${((sliderValues[1] - 30000) / (200000 - 30000)) * 100}%` }}
              >
                ${sliderValues[1].toLocaleString()}
              </div>

              {/* Range Labels */}
              <div className="absolute w-full flex justify-between mt-16 text-sm text-gray-500">
                <span>$30,000</span>
                <span>$200,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
