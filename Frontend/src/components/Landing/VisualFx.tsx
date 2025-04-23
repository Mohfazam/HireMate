import React from 'react';
import { motion } from 'framer-motion';
import { VisualFXProps } from '../../types/index';

const FloatingOrb: React.FC<{ delay: number; className: string }> = ({ delay, className }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl bg-cyan-400/10 ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 8, 
        delay,
        ease: "easeInOut" 
      }}
    />
  );
};

const VisualFX: React.FC<VisualFXProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dynamic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent"
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />

      {/* Floating Orbs */}
      <FloatingOrb delay={0} className="top-[10%] left-[20%] w-[40vw] h-[40vw] opacity-30" />
      <FloatingOrb delay={2} className="bottom-[20%] right-[10%] w-[35vw] h-[35vw] opacity-20" />
      <FloatingOrb delay={4} className="top-[40%] right-[30%] w-[25vw] h-[25vw] opacity-25" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
};

export default VisualFX;