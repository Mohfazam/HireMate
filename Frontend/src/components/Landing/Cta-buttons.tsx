import React from 'react';
import { Briefcase, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../../types/index';
import { useNavigate } from 'react-router-dom';

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <motion.button
      className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const CTAButtons: React.FC = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 z-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          className="bg-gradient-to-r from-cyan-900 to-cyan-800 text-cyan-100 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          onClick={() => {navigate("/auth")}}
        >
          <Briefcase className="w-5 h-5" />
          Find Job
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button 
          className="bg-gradient-to-r from-cyan-800 to-cyan-900 text-cyan-100 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          onClick={() => {navigate("/auth")}}
        >
          <Plus className="w-5 h-5" />
          Post Job
        </Button>
      </motion.div>
    </div>
  );
};

export default CTAButtons;