import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, History, Briefcase, Receipt, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number>(1); // Set Documents (id: 1) as default selected
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const navigate = useNavigate();

  // Feature grid items configuration
  const gridItems = [
    { 
      id: 1, 
      title: 'DOCUMENTS', 
      description: 'Manage document workflows', 
      icon: FileText, 
      path: '/documents', 
      image: 'https://images.pexels.com/photos/768474/pexels-photo-768474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    { 
      id: 2, 
      title: 'HISTORY', 
      description: 'View generated documents', 
      icon: History, 
      path: '/history', 
      image: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    { 
      id: 3, 
      title: 'PORTFOLIO', 
      description: 'Service offerings and samples', 
      icon: Briefcase, 
      path: '/portfolio', 
      image: 'https://images.pexels.com/photos/210012/pexels-photo-210012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    { 
      id: 4, 
      title: 'INVOICES', 
      description: 'Create and manage invoices', 
      icon: Receipt, 
      path: '/invoices', 
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    { 
      id: 5, 
      title: 'SETTINGS', 
      description: 'Configure application', 
      icon: Settings, 
      path: '/settings', 
      image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const handleNavigate = (path: string, id: number) => {
    setSelectedItem(id);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  // This function determines which item should be considered "active" for highlighting
  // If an item is being hovered, it takes precedence over the selected item
  const isItemActive = (id: number) => {
    if (hoveredItem !== null) {
      return hoveredItem === id;
    }
    return selectedItem === id;
  };
  
  // Get the active item for the dynamic text display
  const activeItem = gridItems.find(item => isItemActive(item.id));
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (selectedItem > 1 && selectedItem !== 3) {
            setSelectedItem(prev => prev - 1);
          } else if (selectedItem === 1) {
            setSelectedItem(5);
          } else if (selectedItem === 3) {
            setSelectedItem(2);
          } else if (selectedItem === 4) {
            setSelectedItem(3);
          }
          break;
        case 'ArrowRight':
          if (selectedItem < 5 && selectedItem !== 3) {
            setSelectedItem(prev => prev + 1);
          } else if (selectedItem === 5) {
            setSelectedItem(1);
          } else if (selectedItem === 3) {
            setSelectedItem(4);
          } else if (selectedItem === 2) {
            setSelectedItem(3);
          }
          break;
        case 'ArrowUp':
          if (selectedItem === 1) setSelectedItem(4);
          if (selectedItem === 2) setSelectedItem(5);
          if (selectedItem === 4) setSelectedItem(1);
          if (selectedItem === 5) setSelectedItem(2);
          break;
        case 'ArrowDown':
          if (selectedItem === 1) setSelectedItem(4);
          if (selectedItem === 2) setSelectedItem(5);
          if (selectedItem === 4) setSelectedItem(1);
          if (selectedItem === 5) setSelectedItem(2);
          break;
        case 'Enter':
          if (selectedItem) {
            const item = gridItems.find(item => item.id === selectedItem);
            if (item) {
              navigate(item.path);
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, navigate]);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden flex flex-col">
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
      <div className="relative z-10">
        <NavigationTray />
      </div>
      
      <div className="flex-1 flex flex-col justify-center py-10 relative z-10">
        {/* Grid Layout */}
        <div className="container mx-auto flex justify-center mt-auto mb-20">
          <div className="grid grid-cols-5 gap-1 h-[500px]">
            {/* Column 1 Top - Documents */}
            <div 
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(1)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/documents', 1)}
              tabIndex={0}
            >
              <div className="h-full">
                <img 
                  src={gridItems[0].image} 
                  alt={gridItems[0].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className={`absolute bottom-0 left-0 right-0 transition-colors ${
                  isItemActive(1) ? 'bg-red-600' : 'bg-white'
                }`}>
                  <div className="flex items-center px-4 py-3 justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText 
                        className={`w-5 h-5 ${isItemActive(1) ? 'text-white' : 'text-black'}`} 
                      />
                      <div>
                        <h3 className={`font-bold ${isItemActive(1) ? 'text-white' : 'text-black'}`}>
                          DOCUMENTS
                        </h3>
                        <p className={`text-xs ${
                          isItemActive(1) ? 'text-white/80' : 'text-black/70'
                        }`}>
                          Manage document workflows
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 1 Bottom - History */}
            <div 
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(2)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/history', 2)}
              tabIndex={0}
            >
              <div className="h-full">
                <img 
                  src={gridItems[1].image} 
                  alt={gridItems[1].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className={`absolute bottom-0 left-0 right-0 transition-colors ${
                  isItemActive(2) ? 'bg-red-600' : 'bg-white'
                }`}>
                  <div className="flex items-center px-4 py-3 justify-between">
                    <div className="flex items-center space-x-3">
                      <History 
                        className={`w-5 h-5 ${isItemActive(2) ? 'text-white' : 'text-black'}`} 
                      />
                      <div>
                        <h3 className={`font-bold ${isItemActive(2) ? 'text-white' : 'text-black'}`}>
                          HISTORY
                        </h3>
                        <p className={`text-xs ${
                          isItemActive(2) ? 'text-white/80' : 'text-black/70'
                        }`}>
                          View generated documents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 2 - Portfolio (full column) */}
            <div 
              className="col-span-1 row-span-2 relative overflow-hidden cursor-pointer w-64 md:w-80 lg:w-96"
              onMouseEnter={() => setHoveredItem(3)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/portfolio', 3)}
              tabIndex={0}
            >
              <div className="h-full">
                <img 
                  src={gridItems[2].image} 
                  alt={gridItems[2].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              
              <div className={`absolute bottom-0 left-0 right-0 transition-colors ${
                isItemActive(3) ? 'bg-red-600' : 'bg-white'
              }`}>
                <div className="flex items-center px-4 py-3 justify-between">
                  <div className="flex items-center space-x-3">
                    <Briefcase 
                      className={`w-5 h-5 ${isItemActive(3) ? 'text-white' : 'text-black'}`} 
                    />
                    <div>
                      <h3 className={`font-bold ${isItemActive(3) ? 'text-white' : 'text-black'}`}>
                        PORTFOLIO
                      </h3>
                      <p className={`text-xs ${
                        isItemActive(3) ? 'text-white/80' : 'text-black/70'
                      }`}>
                        Service offerings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 3 Top - Invoices */}
            <div 
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(4)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/invoices', 4)}
              tabIndex={0}
            >
              <div className="h-full">
                <img 
                  src={gridItems[3].image} 
                  alt={gridItems[3].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className={`absolute bottom-0 left-0 right-0 transition-colors ${
                  isItemActive(4) ? 'bg-red-600' : 'bg-white'
                }`}>
                  <div className="flex items-center px-4 py-3 justify-between">
                    <div className="flex items-center space-x-3">
                      <Receipt 
                        className={`w-5 h-5 ${isItemActive(4) ? 'text-white' : 'text-black'}`} 
                      />
                      <div>
                        <h3 className={`font-bold ${isItemActive(4) ? 'text-white' : 'text-black'}`}>
                          INVOICES
                        </h3>
                        <p className={`text-xs ${
                          isItemActive(4) ? 'text-white/80' : 'text-black/70'
                        }`}>
                          Create and manage invoices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 3 Bottom - Settings */}
            <div 
              className="col-span-2 row-span-1 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredItem(5)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigate('/settings', 5)}
              tabIndex={0}
            >
              <div className="h-full">
                <img 
                  src={gridItems[4].image} 
                  alt={gridItems[4].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className={`absolute bottom-0 left-0 right-0 transition-colors ${
                  isItemActive(5) ? 'bg-red-600' : 'bg-white'
                }`}>
                  <div className="flex items-center px-4 py-3 justify-between">
                    <div className="flex items-center space-x-3">
                      <Settings 
                        className={`w-5 h-5 ${isItemActive(5) ? 'text-white' : 'text-black'}`} 
                      />
                      <div>
                        <h3 className={`font-bold ${isItemActive(5) ? 'text-white' : 'text-black'}`}>
                          SETTINGS
                        </h3>
                        <p className={`text-xs ${
                          isItemActive(5) ? 'text-white/80' : 'text-black/70'
                        }`}>
                          Configure application
                        </p>
                      </div>
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
            className="container mx-auto px-6 mt-auto mb-20"
          >
            <h1 className="text-7xl font-bold tracking-tighter text-white/90">
              {activeItem.title}
            </h1>
            <div className="h-1 w-20 bg-red-600 mt-2"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;