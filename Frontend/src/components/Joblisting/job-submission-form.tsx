"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { JobDetailsStep } from "./job-details-step"
import { RequirementsStep } from "./requirements-step"
import { PreviewStep } from "./preview-step"
import { useNavigate } from "react-router-dom"

export default function JobSubmissionForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    skills: [] as string[],
    salaryMin: 50000,
    salaryMax: 100000,
  })
  const [currentSkill, setCurrentSkill] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Handle form field changes
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Add skill tag
  const addSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill],
      }))
      setCurrentSkill("")
    }
  }

  // Remove skill tag
  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false) 
    alert("Job submitted successfully!")
    navigate("/dashboard")
    // Reset form or redirect
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="flex items-center justify-center h-full bg-black p-4 relative overflow-hidden w-full">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIg')] bg-[length:50px_50px] opacity-[0.03]"></div>

      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_800px_at_var(--x)_var(--y),rgba(8,145,178,0.06),transparent_100%)]"
        style={
          {
            "--x": `${mousePosition.x}px`,
            "--y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      ></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-900/30 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(8,145,178,0.2)] p-8 relative overflow-hidden border border-gray-800 z-20"
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent"></div>

        {/* Content container with z-index to appear above background decorations */}
        <div className="relative z-10">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Post a New Job</h1>
            <p className="text-gray-400">Complete the form to publish your job listing</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full font-medium text-sm z-10`}
                    initial={false}
                    animate={{
                      backgroundColor: currentStep >= step ? "#0891b2" : "rgba(17, 24, 39, 0.5)",
                      color: currentStep >= step ? "#ffffff" : "#9ca3af",
                      scale: currentStep === step ? 1.1 : 1,
                      boxShadow:
                        currentStep === step
                          ? "0 0 20px rgba(8, 145, 178, 0.6), 0 0 0 1px rgba(8, 145, 178, 0.8) inset"
                          : currentStep > step
                            ? "0 0 10px rgba(8, 145, 178, 0.3), 0 0 0 1px rgba(8, 145, 178, 0.5) inset"
                            : "0 0 0 1px rgba(75, 85, 99, 0.5) inset",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep > step ? <CheckCircle className="h-6 w-6" /> : <span>{step}</span>}

                    {/* Pulse animation for current step */}
                    {currentStep === step && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-cyan-500 z-0"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                    )}
                  </motion.div>

                  {step < 3 && (
                    <div className="relative w-20 mx-1">
                      <div className={`h-1 ${currentStep > step ? "bg-cyan-600" : "bg-gray-800"}`} />

                      {/* Animated progress for current step connection */}
                      {currentStep === step && (
                        <motion.div
                          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-600 to-cyan-400"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5 }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <div className="min-h-[400px] flex items-start">
            <AnimatePresence mode="wait" custom={direction}>
              {currentStep === 1 && (
                <JobDetailsStep key="step1" formData={formData} handleChange={handleChange} direction={direction} />
              )}
              {currentStep === 2 && (
                <RequirementsStep
                  key="step2"
                  formData={formData}
                  handleChange={handleChange}
                  currentSkill={currentSkill}
                  setCurrentSkill={setCurrentSkill}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                  direction={direction}
                />
              )}
              {currentStep === 3 && <PreviewStep key="step3" formData={formData} direction={direction} />}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 ${
                currentStep === 1 || isSubmitting
                  ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800/80 text-white hover:bg-gray-700/80 border border-gray-700 hover:border-gray-600"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(8, 145, 178, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200 ${
                isSubmitting
                  ? "bg-cyan-700/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400"
              }`}
            >
              {currentStep === 3 ? (
                isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Job
                    <CheckCircle className="h-5 w-5" />
                  </>
                )
              ) : (
                <>
                  Continue
                  <ChevronRight className="h-5 w-5" />
                </>
              )}

              {/* Button glow effect */}
              <div className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
