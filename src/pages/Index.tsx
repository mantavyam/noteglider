
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-neutral-800 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background world map overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="/lovable-uploads/16b5b8eb-c8c1-422c-b3ce-738d183efa03.png" 
          alt="World Map" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="inline-block border-2 border-white px-12 py-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.5em] text-white">
              NOTEGLIDER
            </h1>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-white text-xl tracking-widest hover:bg-white hover:text-neutral-800 border border-white px-8 py-3 transition-all duration-300"
          >
            PRESS TO CONTINUE
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
