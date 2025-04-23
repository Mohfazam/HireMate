import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Briefcase, MapPin, DollarSign, FileText } from 'lucide-react';
import { locations, commonRequirements } from '../../assets/mockData';

export const PostJobTab: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState(50);
  const [maxSalary, setMaxSalary] = useState(150);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const filteredRequirements = currentRequirement.trim() 
    ? commonRequirements.filter(req => 
        req.toLowerCase().includes(currentRequirement.toLowerCase()) &&
        !requirements.includes(req)
      )
    : [];

  const handleAddRequirement = (req: string) => {
    if (!requirements.includes(req) && req.trim() !== '') {
      setRequirements([...requirements, req]);
      setCurrentRequirement('');
      setIsDropdownOpen(false);
      
      // Clear error if it exists
      if (formErrors.requirements) {
        const newErrors = { ...formErrors };
        delete newErrors.requirements;
        setFormErrors(newErrors);
      }
    }
  };

  const handleRemoveRequirement = (req: string) => {
    setRequirements(requirements.filter(r => r !== req));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) errors.title = "Job title is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!location) errors.location = "Location is required";
    if (requirements.length === 0) errors.requirements = "At least one requirement is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would submit the job data
      console.log({
        title,
        description,
        location,
        salary: `$${minSalary}k-$${maxSalary}k`,
        requirements
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setMinSalary(50);
      setMaxSalary(150);
      setRequirements([]);
      setFormErrors({});
      
      // Show success message
      alert('Job posted successfully!');
    }
  };
  
  return (
    <motion.div 
      className="flex-1 p-4 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-zinc-100 text-2xl font-semibold mb-6">Post a New Job</h2>
        
        <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6">
          {/* Job Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-zinc-300 mb-2 font-medium">
              Job Title
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-zinc-800 text-zinc-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 ${
                  formErrors.title ? 'ring-2 ring-red-500' : 'focus:ring-cyan-500/50'
                }`}
                placeholder="e.g., Senior React Developer"
              />
              {formErrors.title && (
                <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
              )}
            </div>
          </div>
          
          {/* Job Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-zinc-300 mb-2 font-medium">
              Job Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-zinc-500" size={18} />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full bg-zinc-800 text-zinc-100 rounded-xl py-3 pl-10 pr-4 min-h-32 outline-none focus:ring-2 ${
                  formErrors.description ? 'ring-2 ring-red-500' : 'focus:ring-cyan-500/50'
                }`}
                placeholder="Describe the job responsibilities and requirements..."
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-zinc-300 mb-2 font-medium">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
              <button
                type="button"
                className={`w-full bg-zinc-800 text-left text-zinc-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 ${
                  formErrors.location ? 'ring-2 ring-red-500' : 'focus:ring-cyan-500/50'
                }`}
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              >
                {location || "Select a location"}
              </button>
              {formErrors.location && (
                <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
              )}
              
              {locationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-10 mt-1 w-full bg-zinc-800 rounded-xl shadow-lg max-h-60 overflow-auto"
                >
                  {locations.map((loc, index) => (
                    <button
                      key={index}
                      type="button"
                      className="block w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      onClick={() => {
                        setLocation(loc);
                        setLocationDropdownOpen(false);
                      }}
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Salary Range */}
          <div className="mb-6">
            <label className="block text-zinc-300 mb-2 font-medium">
              Salary Range (k)
            </label>
            <div className="relative mt-4">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
              <div className="flex items-center">
                <span className="pl-10 text-zinc-100 w-16">${minSalary}k</span>
                <div className="flex-1 px-4">
                  <div className="relative h-2 bg-zinc-800 rounded-full">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                      style={{ 
                        left: `${(minSalary - 30) / 2.2}%`, 
                        right: `${100 - ((maxSalary - 30) / 2.2)}%` 
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="250"
                    value={minSalary}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setMinSalary(val < maxSalary ? val : maxSalary - 10);
                    }}
                    className="absolute w-full top-0 appearance-none h-2 bg-transparent"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <input
                    type="range"
                    min="30"
                    max="250"
                    value={maxSalary}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setMaxSalary(val > minSalary ? val : minSalary + 10);
                    }}
                    className="absolute w-full top-0 appearance-none h-2 bg-transparent"
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <span className="text-zinc-100 w-16">${maxSalary}k</span>
              </div>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="mb-8">
            <label htmlFor="requirements" className="block text-zinc-300 mb-2 font-medium">
              Requirements
            </label>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-2">
                {requirements.map((req, index) => (
                  <div 
                    key={index} 
                    className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-md flex items-center gap-1"
                  >
                    <span>{req}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveRequirement(req)}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  id="requirements"
                  value={currentRequirement}
                  onChange={(e) => {
                    setCurrentRequirement(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => filteredRequirements.length > 0 && setIsDropdownOpen(true)}
                  className={`w-full bg-zinc-800 text-zinc-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 ${
                    formErrors.requirements ? 'ring-2 ring-red-500' : 'focus:ring-cyan-500/50'
                  }`}
                  placeholder="Add a requirement"
                />
                {formErrors.requirements && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.requirements}</p>
                )}
                
                {isDropdownOpen && filteredRequirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-10 mt-1 w-full bg-zinc-800 rounded-xl shadow-lg max-h-60 overflow-auto"
                  >
                    {filteredRequirements.map((req, index) => (
                      <button
                        key={index}
                        type="button"
                        className="block w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                        onClick={() => handleAddRequirement(req)}
                      >
                        {req}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-900 font-medium py-3 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Post Job
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default PostJobTab;