
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/landing/Layout';
import { Search, ArrowLeft, Server, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { checkBackendStatus } from '@/services/api';
import { toast } from 'sonner';
import { FileText } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Slider } from '@/components/ui/slider';

// Categories data
const categories = {
  main: [
    {
      id: 1,
      name: 'Appointments & Resignation',
      location: 'India',
      image: '/landing-assets/landing-2.png',
      difficulty: 'Normal',
      progress: '14/105'
    },
    {
      id: 2,
      name: 'Awards & Recognition',
      location: 'Paris',
      image: '/landing-assets/landing-1.png',
      difficulty: 'Medium',
      progress: '8/35'
    },
    {
      id: 3,
      name: 'Banking & Insurance',
      location: 'Bangkok',
      image: '/landing-assets/landing-3.png',
      difficulty: 'Hard',
      progress: '3/12'
    },
    {
      id: 4,
      name: 'Books & Authors',
      location: 'Marrakesh',
      image: '/landing-assets/landing-4.png',
      difficulty: 'Easy',
      progress: '10/15'
    },
    {
      id: 5,
      name: 'Brand Ambassadors',
      location: 'Tokyo',
      image: '/landing-assets/sample-weekly-compile-notesglider.png',
      difficulty: 'Normal',
      progress: '5/20'
    },
    {
      id: 6,
      name: 'Defence News',
      location: 'Berlin',
      image: '/landing-assets/landing-3.png',
      difficulty: 'Hard',
      progress: '7/25'
    },
    {
      id: 7,
      name: 'Festivals',
      location: 'Rio',
      image: '/landing-assets/landing-4.png',
      difficulty: 'Medium',
      progress: '12/30'
    },
  ],
  extras: [
    {
      id: 101,
      name: 'Tabular Data',
      location: 'New York',
      image: '/landing-assets/landing-1.png',
      difficulty: 'Medium',
      progress: '4/10'
    },
    {
      id: 102,
      name: 'Static Awareness',
      location: 'London',
      image: '/landing-assets/landing-2.png',
      difficulty: 'Easy',
      progress: '9/15'
    },
    {
      id: 103,
      name: 'Current Affairs MCQs',
      location: 'Sydney',
      image: '/landing-assets/landing-3.png',
      difficulty: 'Hard',
      progress: '2/20'
    }
  ],
};

interface CategoryProps {
  category: {
    id: number;
    name: string;
    location: string;
    image: string;
    difficulty: string;
    progress: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryProps> = ({ category, isActive, onClick }) => {
  return (
    <motion.div
      key={category.id}
      className={`relative flex-shrink-0 w-[300px] h-[400px] transition-all duration-300 ${
        isActive ? 'scale-105 z-10' : 'scale-95 opacity-70'
      }`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
    >
      {/* Main card */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="mb-2 text-sm opacity-80">{category.location}</div>
          <h3 className="text-3xl font-bold mb-1">{category.name}</h3>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="absolute bottom-0 left-0 h-12 bg-white"
          >
            <div className="flex items-center justify-between px-4 h-full">
              <div>
                <div className="text-sm font-medium text-black">
                  Difficulty Level: <span className="font-bold">{category.difficulty}</span>
                </div>
                <div className="text-xs text-gray-600">
                  Challenge Completion: {category.progress}
                </div>
              </div>
              <div className="bg-gray-800 p-2">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const MagazinePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'main' | 'extras'>('main');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  
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

  // Filter categories based on search term
  const filteredCategories = {
    main: categories.main.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    extras: categories.extras.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  const activeCategories = filteredCategories[activeCategory];
  
  const handleSelectCategory = (index: number) => {
    setSelectedIndex(index);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setSelectedIndex(prev => (prev < activeCategories.length - 1 ? prev + 1 : 0));
    } else {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : activeCategories.length - 1));
    }
  };

  const handleViewCategory = () => {
    const category = activeCategories[selectedIndex];
    navigate('/task', { state: { category: category.name } });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handleNavigation('prev');
          break;
        case 'ArrowRight':
          handleNavigation('next');
          break;
        case 'Enter':
          handleViewCategory();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, activeCategories]);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
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
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Tabs - Similar to NavigationTray */}
        <div className="mt-16 relative">
          <div className="flex w-full">
            <button 
              className={`flex-1 py-4 flex items-center justify-center space-x-2 transition-colors border-r border-gray-700 ${
                activeCategory === 'main' ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-zinc-200'
              }`}
              onClick={() => {
                setActiveCategory('main');
                setSelectedIndex(0);
              }}
            >
              <FileText className="w-5 h-5" />
              <span className="font-bold tracking-wider text-sm">MAIN CATEGORIES</span>
            </button>
            <button 
              className={`flex-1 py-4 flex items-center justify-center space-x-2 transition-colors ${
                activeCategory === 'extras' ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-zinc-200'
              }`}
              onClick={() => {
                setActiveCategory('extras');
                setSelectedIndex(0);
              }}
            >
              <FileText className="w-5 h-5" />
              <span className="font-bold tracking-wider text-sm">EXTRA CATEGORIES</span>
            </button>
          </div>
        </div>

        <PageTransition>
          <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate('/documents')}
              className="mb-8 flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Documents
            </motion.button>
            
            {/* Backend Status */}
            <motion.div 
              className={`mb-6 px-4 py-2 rounded-lg flex items-center ${
                isCheckingBackend 
                ? "bg-gray-800" 
                : backendConnected 
                  ? "bg-green-900/30 text-green-400" 
                  : "bg-red-900/30 text-red-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Server className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {isCheckingBackend 
                  ? "Checking backend status..." 
                  : backendConnected 
                    ? "Backend service is connected" 
                    : "Backend service is not available. Please start the backend server."}
              </span>
            </motion.div>

            {/* Search */}
            <div className="relative my-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="search"
                placeholder="Search categories..." 
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory === 'main' ? 'Main Categories' : 'Extra Categories'}
              </h2>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleNavigation('prev')}
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleNavigation('next')}
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Category Cards Carousel */}
            {activeCategories.length > 0 ? (
              <div className="relative">
                <div className="flex overflow-hidden space-x-4 py-8">
                  <div 
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${selectedIndex * 320}px)` }}
                  >
                    {activeCategories.map((category, index) => (
                      <CategoryCard 
                        key={category.id}
                        category={category}
                        isActive={selectedIndex === index}
                        onClick={() => handleSelectCategory(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* Slider for position indication */}
                <div className="mt-6 flex items-center px-4">
                  <Slider 
                    value={[selectedIndex]}
                    max={Math.max(0, activeCategories.length - 1)}
                    step={1}
                    className="max-w-md"
                    onValueChange={(vals) => setSelectedIndex(vals[0])}
                  />
                  <div className="ml-4 text-gray-400 text-sm">
                    {selectedIndex + 1}/{activeCategories.length}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p>No categories match your search</p>
              </div>
            )}

            {/* Action Button */}
            {activeCategories.length > 0 && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  className="bg-red-600 hover:bg-red-700 px-8"
                  onClick={handleViewCategory}
                >
                  View {activeCategories[selectedIndex]?.name}
                </Button>
              </motion.div>
            )}
          </div>
        </PageTransition>
        
        {/* Bottom Stats Bar - Added via NavigationTray component */}
      </div>
    </div>
  );
};

export default MagazinePage;
