
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { checkBackendStatus } from '@/services/api';

const DashboardPage: React.FC = () => {
  // Change default selectedItem to 1 (Documents)
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const navigate = useNavigate();

  // Check backend status on component mount
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

  // Feature grid items configuration
  const gridItems = [
    { 
      id: 1, 
      title: 'DOCUMENTS', 
      description: 'Manage document workflows', 
      icon: FileText, 
      path: '/documents', 
      image: 'https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 2, 
      title: 'HISTORY', 
      description: 'View generated documents', 
      icon: History, 
      path: '/history', 
      image: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 3, 
      title: 'PORTFOLIO', 
      description: 'Service offerings and samples', 
      icon: Briefcase, 
      path: '/portfolio', 
      image: 'https://images.pexels.com/photos/210012/pexels-photo-210012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      className: 'col-span-2 row-span-2'
    },
    { 
      id: 4, 
      title: 'INVOICES', 
      description: 'Create and manage invoices', 
      icon: Receipt, 
      path: '/invoices', 
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      className: 'col-span-1 row-span-1'
    },
    { 
      id: 5, 
      title: 'SETTINGS', 
      description: 'Configure application', 
      icon: Settings, 
      path: '/settings', 
      image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      className: 'col-span-1 row-span-1'
    },
  ];

  const handleNavigate = (path: string, id: number) => {
    setSelectedItem(id);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const activeItem = gridItems.find(item => item.id === (hoveredItem ?? selectedItem));

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden flex flex-col relative">
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 to-black opacity-90"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Navigation Tray */}
      <div className="relative z-10 mt-10">
        <NavigationTray />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-6 relative z-10">
        {/* Grid Layout - UPDATED to match the requested arrangement */}
        <div className="container mx-auto px-6 mt-10">
          <div className="grid grid-cols-4 gap-4 h-[calc(100vh-300px)]">
            {/* Column 1: Documents (Top) */}
            <div 
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(1)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/documents', 1)}
            >
              <div className="h-full">
                <img src={gridItems[0].image} alt={gridItems[0].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${(selectedItem === 1 || hoveredItem === 1) ? 'bg-red-600' : 'bg-white'}`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className={`w-5 h-5 ${(selectedItem === 1 || hoveredItem === 1) ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`font-bold ${(selectedItem === 1 || hoveredItem === 1) ? 'text-white' : 'text-black'}`}>DOCUMENTS</h3>
                      <p className={`text-xs ${(selectedItem === 1 || hoveredItem === 1) ? 'text-white/80' : 'text-black/70'}`}>
                        Manage document workflows
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 1: History (Bottom) */}
            <div 
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(2)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/history', 2)}
            >
              <div className="h-full">
                <img src={gridItems[1].image} alt={gridItems[1].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${(selectedItem === 2 || hoveredItem === 2) ? 'bg-red-600' : 'bg-white'}`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <History className={`w-5 h-5 ${(selectedItem === 2 || hoveredItem === 2) ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`font-bold ${(selectedItem === 2 || hoveredItem === 2) ? 'text-white' : 'text-black'}`}>HISTORY</h3>
                      <p className={`text-xs ${(selectedItem === 2 || hoveredItem === 2) ? 'text-white/80' : 'text-black/70'}`}>
                        View generated documents
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 2: Portfolio (Full Height/Width - 2x2) */}
            <div 
              className="relative overflow-hidden cursor-pointer col-span-2 row-span-2"
              onMouseEnter={() => setHoveredItem(3)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/portfolio', 3)}
            >
              <div className="h-full">
                <img src={gridItems[2].image} alt={gridItems[2].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${(selectedItem === 3 || hoveredItem === 3) ? 'bg-red-600' : 'bg-white'}`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <Briefcase className={`w-5 h-5 ${(selectedItem === 3 || hoveredItem === 3) ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`font-bold ${(selectedItem === 3 || hoveredItem === 3) ? 'text-white' : 'text-black'}`}>PORTFOLIO</h3>
                      <p className={`text-xs ${(selectedItem === 3 || hoveredItem === 3) ? 'text-white/80' : 'text-black/70'}`}>
                        Service offerings and samples
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 3: Invoices (Top) */}
            <div 
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(4)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/invoices', 4)}
            >
              <div className="h-full">
                <img src={gridItems[3].image} alt={gridItems[3].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${(selectedItem === 4 || hoveredItem === 4) ? 'bg-red-600' : 'bg-white'}`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <Receipt className={`w-5 h-5 ${(selectedItem === 4 || hoveredItem === 4) ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`font-bold ${(selectedItem === 4 || hoveredItem === 4) ? 'text-white' : 'text-black'}`}>INVOICES</h3>
                      <p className={`text-xs ${(selectedItem === 4 || hoveredItem === 4) ? 'text-white/80' : 'text-black/70'}`}>
                        Create and manage invoices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 3: Settings (Bottom) */}
            <div 
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(5)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/settings', 5)}
            >
              <div className="h-full">
                <img src={gridItems[4].image} alt={gridItems[4].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${(selectedItem === 5 || hoveredItem === 5) ? 'bg-red-600' : 'bg-white'}`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className={`w-5 h-5 ${(selectedItem === 5 || hoveredItem === 5) ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`font-bold ${(selectedItem === 5 || hoveredItem === 5) ? 'text-white' : 'text-black'}`}>SETTINGS</h3>
                      <p className={`text-xs ${(selectedItem === 5 || hoveredItem === 5) ? 'text-white/80' : 'text-black/70'}`}>
                        Configure application
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Dynamic Text Display */}
        {activeItem && (
          <motion.div 
            key={activeItem?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-6 mt-auto mb-16"
          >
            <h1 className="text-7xl font-bold tracking-tighter text-white/90">
              {activeItem.title}
            </h1>
            <div className="h-1 w-20 bg-red-600 mt-2"></div>
          </motion.div>
        )}
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="relative z-10 border-t border-zinc-800 py-3 px-6 flex justify-between items-center">
        <div 
          onClick={() => navigate('/')} 
          className="text-lg font-bold tracking-wider cursor-pointer hover:text-red-500 transition-colors"
        >
          NOTESGLIDER
        </div>
        
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'} mr-2 animate-pulse`}></div>
          <span className="text-xs text-zinc-400">
            {isCheckingBackend ? 'CHECKING SYSTEM...' : backendConnected ? 'SYSTEM ACTIVE' : 'SYSTEM INACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
