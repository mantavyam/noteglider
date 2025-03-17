
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
      
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">EduPDF</h3>
              <p className="text-white/70">Transform your teaching content into professional study materials.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-white">Features</Link></li>
                <li><Link to="/" className="text-white/70 hover:text-white">Pricing</Link></li>
                <li><Link to="/" className="text-white/70 hover:text-white">Templates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-white">Documentation</Link></li>
                <li><Link to="/" className="text-white/70 hover:text-white">Blog</Link></li>
                <li><Link to="/" className="text-white/70 hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/70">support@edupdf.com</li>
                <li className="text-white/70">1-800-123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">© 2023 EduPDF. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="text-white/50 hover:text-white">Terms</Link>
              <Link to="/" className="text-white/50 hover:text-white">Privacy</Link>
              <Link to="/" className="text-white/50 hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HaqqLayout;
