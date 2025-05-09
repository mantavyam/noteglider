
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, History, Briefcase, Receipt, Settings, ArrowRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Feature grid items configuration
  const gridItems = [
    { 
      id: 1, 
      title: 'Documents', 
      description: 'Manage document workflows', 
      icon: FileText, 
      path: '/documents', 
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 2, 
      title: 'History', 
      description: 'View generated documents', 
      icon: History, 
      path: '/history', 
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 3, 
      title: 'Portfolio', 
      description: 'Service offerings and samples', 
      icon: Briefcase, 
      path: '/portfolio', 
      className: 'col-span-2 row-span-2'
    },
    { 
      id: 4, 
      title: 'Invoices', 
      description: 'Create and manage invoices', 
      icon: Receipt, 
      path: '/invoices', 
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 5, 
      title: 'Settings', 
      description: 'Configure application', 
      icon: Settings, 
      path: '/settings', 
      className: 'col-span-1 row-span-1'
    },
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-hidden">
      {/* Navigation Tray */}
      <NavigationTray />
      
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Feature Grid Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">FEATURED TOOLS</h2>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {gridItems.map((item) => (
                <div 
                  key={item.id}
                  className={`bg-zinc-800 border border-zinc-700 hover:border-red-600 cursor-pointer overflow-hidden group ${item.className}`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="h-48 bg-gradient-to-b from-zinc-700 to-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon className="w-16 h-16 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-zinc-700">
                    <div>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-xs text-zinc-400">{item.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
