
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout showLogo={false}>
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl font-bold mb-2">
              <span className="font-bold">note</span>
              <span className="text-primary">glider</span>
            </h1>
            <p className="text-muted-foreground max-w-md text-lg">
              Transform your markdown documents into beautifully designed PDF newsletters
            </p>
          </motion.div>

          {/* Create Design Button */}
          <motion.button
            onClick={() => navigate('/task')}
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">CREATE DESIGN</span>
            <motion.span
              className="absolute inset-0 bg-primary-foreground/10"
              initial={{ scaleX: 0 }}
              whileHover={{ 
                scaleX: 1, 
                transition: { duration: 0.4 } 
              }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.button>

          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.6, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
