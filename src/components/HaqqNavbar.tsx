
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HaqqNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-black/90 backdrop-blur-md' : 'py-4 bg-black'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="HAQQ" 
                className="h-6 w-6"
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-white/80 hover:text-white transition-colors py-2">
                Discover
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white/80 hover:text-white transition-colors py-2">
                Business
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white/80 hover:text-white transition-colors py-2">
                Builders
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white/80 hover:text-white transition-colors py-2">
                Community
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white/80 hover:text-white transition-colors py-2">
                About
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="rounded-full border-white/20 hover:bg-white/10 text-white"
          >
            SHELL
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full border-white/20 hover:bg-white/10 text-white"
          >
            HAQQ WALLET
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HaqqNavbar;
