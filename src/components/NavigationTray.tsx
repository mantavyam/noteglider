
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';

const NavigationTray = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { name: 'FEATURED', path: '/dashboard', icon: Star },
    { name: 'DOCUMENTS', path: '/documents', icon: FileText },
    { name: 'HISTORY', path: '/history', icon: History },
    { name: 'PORTFOLIO', path: '/portfolio', icon: Briefcase },
    { name: 'INVOICES', path: '/invoices', icon: Receipt },
    { name: 'SETTINGS', path: '/settings', icon: Settings },
  ];

  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <div className="mt-16 px-8">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const ItemIcon = item.icon;
          
          return (
            <button 
              key={item.path}
              className={`px-8 py-4 flex items-center space-x-2 transition-colors ${
                isActive 
                  ? 'bg-red-600 text-white' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
              onClick={() => navigateToRoute(item.path)}
            >
              <ItemIcon className="w-5 h-5" />
              <span className="font-bold tracking-wider text-sm">{item.name}</span>
            </button>
          );
        })}
      </div>
      
      <div className="absolute top-4 right-8 flex items-center">
        <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
        <span className="text-xs text-zinc-400">SYSTEM ACTIVE</span>
      </div>
    </div>
  );
};

export default NavigationTray;
