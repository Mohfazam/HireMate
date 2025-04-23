import React from 'react';
import { motion } from 'framer-motion';
import CTAButtons from './Cta-buttons';
import { HeroSectionProps } from '../../types/index';

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <motion.div 
      className={`relative z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-xl bg-black/40 rounded-3xl p-8 sm:p-12 border border-transparent relative overflow-hidden max-w-3xl mx-auto">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/30 to-transparent pointer-events-none" />
        
        {/* Inner Shadow */}
        <div className="absolute inset-0 rounded-3xl shadow-[0_8px_32px_rgba(34,211,238,0.15)] pointer-events-none" />
        
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            HireMate AI
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-cyan-100/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Smart Recruitment Platform
          </motion.p>
          
          <CTAButtons />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;