import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign,
  Award,
  Briefcase,
  LineChart,
  Smile
} from 'lucide-react';
import { ImpactStatProps } from '../types';

const ImpactStat: React.FC<ImpactStatProps> = ({ icon, value, label, description, trend }) => (
  <motion.div
    className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/10 relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-cyan-400 p-2 bg-cyan-950/50 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'} flex items-center`}>
            {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          {value}
        </div>
        <h3 className="text-lg font-semibold text-cyan-50">{label}</h3>
        <p className="text-sm text-cyan-100/70">{description}</p>
      </div>
    </div>
  </motion.div>
);

const ImpactSection: React.FC = () => {
  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      value: "75%",
      label: "Time Saved",
      description: "Reduction in time-to-hire through AI-powered candidate matching",
      trend: "down"
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: "93%",
      label: "Match Accuracy",
      description: "Precision in candidate-role fit using our AI algorithms",
      trend: "up"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "60%",
      label: "Cost Reduction",
      description: "Lower recruitment costs compared to traditional methods",
      trend: "down"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "5x",
      label: "Candidate Quality",
      description: "Increase in qualified candidate pipeline",
      trend: "up"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "98%",
      label: "Retention Rate",
      description: "First-year employee retention for AI-matched placements",
      trend: "up"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      value: "10x",
      label: "Processing Speed",
      description: "Faster application processing and screening",
      trend: "up"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      value: "85%",
      label: "Bias Reduction",
      description: "Decrease in hiring bias through objective AI assessment",
      trend: "up"
    },
    {
      icon: <Smile className="w-6 h-6" />,
      value: "96%",
      label: "Satisfaction Rate",
      description: "Employer satisfaction with hired candidates",
      trend: "up"
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
          Revolutionary Impact
        </h2>
        <p className="text-cyan-100/70 text-lg max-w-2xl mx-auto">
          Transforming recruitment with groundbreaking AI technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {stats.map((stat, index) => (
          <ImpactStat key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;