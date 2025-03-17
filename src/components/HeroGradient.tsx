
import React from 'react';
import { motion } from 'framer-motion';

const HeroGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-0 left-1/3 w-2/3 h-1/2 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/3 w-2/3 h-1/2 bg-gradient-to-tr from-blue-500/10 via-primary/10 to-transparent blur-3xl opacity-30" />
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-300/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/5 w-40 h-40 rounded-full bg-blue-400/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default HeroGradient;
