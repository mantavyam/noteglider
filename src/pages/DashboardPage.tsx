
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Feature grid items configuration
  const gridItems = [
    { 
      id: 1, 
      title: 'DOCUMENTS', 
      description: 'Manage document workflows', 
      icon: FileText, 
      path: '/documents', 
      image: 'https://source.unsplash.com/photo-1523712999610-f77fbcfc3843',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 2, 
      title: 'HISTORY', 
      description: 'View generated documents', 
      icon: History, 
      path: '/history', 
      image: 'https://source.unsplash.com/photo-1500673922987-e212871fec22',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 3, 
      title: 'PORTFOLIO', 
      description: 'Service offerings and samples', 
      icon: Briefcase, 
      path: '/portfolio', 
      image: 'https://source.unsplash.com/photo-1501854140801-50d01698950b',
      className: 'col-span-2 row-span-2'
    },
    { 
      id: 4, 
      title: 'INVOICES', 
      description: 'Create and manage invoices', 
      icon: Receipt, 
      path: '/invoices', 
      image: 'https://source.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 5, 
      title: 'SETTINGS', 
      description: 'Configure application', 
      icon: Settings, 
      path: '/settings', 
      image: 'https://source.unsplash.com/photo-1458668383970-8ddd3927deed',
      className: 'col-span-1 row-span-1'
    },
  ];

  const navigate = (path: string, id: number) => {
    setSelectedItem(id);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  const activeItem = gridItems.find(item => item.id === (selectedItem ?? hoveredItem));

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-hidden">
      {/* Navigation Tray */}
      <NavigationTray />
      
      <div className="container mx-auto px-4 pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between min-h-[calc(100vh-200px)]"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {gridItems.map((item) => {
              const isActive = selectedItem === item.id || hoveredItem === item.id;
              
              return (
                <div 
                  key={item.id}
                  className={`relative overflow-hidden cursor-pointer group ${item.className}`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => navigate(item.path, item.id)}
                >
                  <div className="h-full">
                    {/* Image background */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                    
                    {/* Bottom label */}
                    <div className={`absolute bottom-0 left-0 right-0 z-10 transition-colors ${
                      isActive ? 'bg-red-600' : 'bg-white'
                    }`}>
                      <div className="flex items-center px-4 py-3 justify-between">
                        <div className="flex items-center space-x-3">
                          <item.icon 
                            className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} 
                          />
                          <div>
                            <h3 className={`font-bold ${isActive ? 'text-white' : 'text-black'}`}>
                              {item.title}
                            </h3>
                            <p className={`text-xs ${
                              isActive ? 'text-white/80' : 'text-black/70'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom Dynamic Text Display */}
          {activeItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-auto mb-10"
            >
              <h1 className="text-7xl font-bold tracking-tighter text-white/90">
                {activeItem.title}
              </h1>
              <div className="h-1 w-20 bg-red-600 mt-2"></div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom Stats Bar - similar to Hitman UI */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 py-3 px-8 border-t border-zinc-800">
        <div className="flex items-center space-x-8 text-xs text-zinc-400">
          <span>TOTAL COMPLETION 0%</span>
          <span>DOCUMENTS CREATED 0 / 131</span>
          <span>PROJECT STATUS 0 / 7</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
