import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './Hero-Section';
import FeaturesSection from './Feature-Section';
import ImpactSection from './ImpactSection';
import VisualFX from './VisualFx';

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950 text-zinc-100 font-['Inter',sans-serif]">
      <VisualFX className="fixed inset-0" />
      
      <motion.div 
        style={{ opacity, scale }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vmax] h-[150vmax] rounded-full bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent blur-3xl"
      />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection className="min-h-screen flex items-center justify-center" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            {/* @ts-ignore */}
          <FeaturesSection className="min-h-screen py-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            {/* @ts-ignore */}
          <ImpactSection className="min-h-screen py-20" />
        </motion.div>
      </div>

      {/* Interactive Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_100%)] animate-pulse" />
      </div>
    </div>
  );
};

export default LandingPage;