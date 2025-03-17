
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {showLogo && (
          <div className="flex justify-center py-6">
            <Link to="/">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-2xl font-medium tracking-tight"
              >
                <span className="font-bold">note</span>
                <span className="text-amber-300">glider</span>
              </motion.div>
            </Link>
          </div>
        )}
        <main>{children}</main>
      </motion.div>
    </div>
  );
};

export default Layout;
