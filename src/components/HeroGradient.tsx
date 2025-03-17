
import React from 'react';
import { motion } from 'framer-motion';

const HeroGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Dark background with glow */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Gold/amber horizon glow */}
      <div className="absolute left-0 right-0 bottom-[30%] h-2 bg-gradient-to-r from-amber-200/0 via-amber-300/70 to-amber-200/0"></div>
      
      {/* Center glow sphere */}
      <div className="absolute left-1/2 bottom-[28%] -translate-x-1/2 w-[40vw] h-[5vh] bg-gradient-radial from-amber-200/70 via-amber-300/20 to-transparent rounded-[100%] blur-xl"></div>
      
      {/* Vertical light rays */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-amber-100/10 to-transparent"
          style={{ 
            left: `${5 + i * 7}%`, 
            opacity: i % 3 === 0 ? 0.15 : 0.05 
          }}
        ></div>
      ))}
      
      {/* Animated subtle particles */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-amber-100/10 blur-sm"
        animate={{
          y: [0, -50, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-amber-100/10 blur-sm"
        animate={{
          y: [0, -30, 0],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

export default HeroGradient;
