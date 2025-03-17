
import React from 'react';
import { Link } from 'react-router-dom';
import HaqqNavbar from './HaqqNavbar';

interface HaqqLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

const HaqqLayout: React.FC<HaqqLayoutProps> = ({ 
  children, 
  showNavbar = true 
}) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {showNavbar && <HaqqNavbar />}
      <main>{children}</main>
    </div>
  );
};

export default HaqqLayout;
