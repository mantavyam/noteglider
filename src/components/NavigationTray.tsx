
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';
import { checkBackendStatus } from '@/services/api';

const NavigationTray = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);

  // Navigation items configuration
  const navItems = [
    { name: 'FEATURED', path: '/dashboard', icon: Star },
    { name: 'DOCUMENTS', path: '/documents', icon: FileText },
    { name: 'HISTORY', path: '/history', icon: History },
    { name: 'PORTFOLIO', path: '/portfolio', icon: Briefcase },
    { name: 'INVOICES', path: '/invoices', icon: Receipt },
    { name: 'SETTINGS', path: '/settings', icon: Settings },
  ];

  // Check if backend is available on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        setIsCheckingBackend(true);
        const status = await checkBackendStatus();
        setBackendConnected(status.status === 'online');
      } catch (error) {
        setBackendConnected(false);
      } finally {
        setIsCheckingBackend(false);
      }
    };

    checkBackend();
  }, []);

  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <div className="mt-16 relative">
      <div className="flex w-full">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const ItemIcon = item.icon;
          
          return (
            <button 
              key={item.path}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 transition-colors ${
                isActive 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-black hover:bg-zinc-200'
              } ${index > 0 ? 'ml-px' : ''}`}
              onClick={() => navigateToRoute(item.path)}
            >
              <ItemIcon className="w-5 h-5" />
              <span className="font-bold tracking-wider text-sm">{item.name}</span>
            </button>
          );
        })}
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 px-6 py-3 flex justify-between items-center z-50 border-t border-zinc-700">
        <div 
          className="text-white font-light tracking-wider cursor-pointer"
          onClick={() => navigate('/')}
        >
          NOTESGLIDER @mantavyam
        </div>
        
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 animate-pulse ${
            isCheckingBackend 
              ? "bg-yellow-500" 
              : backendConnected 
                ? "bg-green-500" 
                : "bg-red-500"
          }`}></div>
          <span className="text-xs text-zinc-400">
            {isCheckingBackend 
              ? "CHECKING SYSTEM" 
              : backendConnected 
                ? "SYSTEM ACTIVE" 
                : "SYSTEM INACTIVE"
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavigationTray;
