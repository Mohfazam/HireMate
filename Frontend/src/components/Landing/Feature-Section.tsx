import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Clock, DollarSign } from 'lucide-react';
import { FeatureCardProps, StatCardProps } from '../../types/index';

const StatCard: React.FC<StatCardProps> = ({ value, label, description }) => (
  <motion.div
    className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-4xl font-bold text-cyan-400 mb-2">{value}</div>
    <h3 className="text-xl font-bold mb-2 text-cyan-50">{label}</h3>
    <p className="text-cyan-100/70 text-sm">{description}</p>
  </motion.div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-cyan-50">{title}</h3>
    <p className="text-cyan-100/70">{description}</p>
  </motion.div>
);

const FeaturesSection: React.FC = () => {
  const stats = [
    {
      value: "45%",
      label: "Bad Hires",
      description: "Of hiring decisions result in failed placements within 18 months"
    },
    {
      value: "52",
      label: "Days to Hire",
      description: "Average time to fill a position using traditional methods"
    },
    {
      value: "$15K",
      label: "Cost Per Hire",
      description: "Average cost of recruiting and onboarding a new employee"
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match candidates with the perfect opportunities based on skills and culture fit."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Screening",
      description: "Automated screening process that saves time while ensuring quality candidates."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Savings",
      description: "Reduce your time-to-hire by up to 75% with automated workflows and AI assistance."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Cost Reduction",
      description: "Cut recruitment costs by 60% while improving the quality of your hires."
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          The Reality of Recruitment Today
        </h2>
        <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto mb-12">
          Traditional recruitment is broken. Here's why we need a better solution:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          The HireMate AI Solution
        </h2>
        <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto">
          Transform your hiring process with our cutting-edge features
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;