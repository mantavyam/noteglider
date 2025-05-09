
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 to-black opacity-90"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="inline-block px-12 py-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.5em] text-white">
              NOTEGLIDER
            </h1>
            <div className="h-1 bg-red-600 w-full mt-4"></div>
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
            className="text-white text-xl tracking-widest hover:bg-red-600 border-2 border-red-600 px-8 py-3 transition-all duration-300"
          >
            ENTER SYSTEM
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
