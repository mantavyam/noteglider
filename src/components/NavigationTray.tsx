
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';

const NavigationTray = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { name: 'FEATURED', path: '/dashboard', icon: Home },
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
    <div className="border-b border-zinc-700 bg-zinc-900 mt-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const ItemIcon = item.icon;
            
            return (
              <button 
                key={item.path}
                className={`px-6 py-4 transition-colors ${
                  isActive 
                    ? 'text-white bg-red-600' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
                onClick={() => navigateToRoute(item.path)}
              >
                <div className="flex items-center space-x-2">
                  <ItemIcon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center pr-4">
          <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          <span className="text-xs text-zinc-400">SYSTEM ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationTray;
