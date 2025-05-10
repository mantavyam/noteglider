
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
    <div className="relative w-full">
      <div className="flex w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const ItemIcon = item.icon;
          
          return (
            <button 
              key={item.path}
              className={`flex-1 py-4 flex items-center justify-center space-x-2 transition-colors ${
                isActive 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
              onClick={() => navigateToRoute(item.path)}
            >
              <ItemIcon className="w-5 h-5" />
              <span className="font-bold tracking-wider text-sm">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTray;
