
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { checkBackendStatus } from '@/services/api';
import PageTransition from '../components/PageTransition';

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
  tabType: 'main' | 'extras';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryCard: React.FC<CategoryProps> = ({ category, isActive, onClick, tabType, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      key={category.id}
      className={`relative flex-shrink-0 w-[300px] h-[400px] transition-all duration-300 ${
        isActive ? 'scale-105 z-10 border-2 border-white' : 'scale-95 opacity-70 hover:border hover:border-white'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05, opacity: 1 }}
    >
      {/* Main card */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        
        {/* Text overlay */}
        <motion.div 
          className={`absolute bottom-0 left-0 p-6 text-white ${isActive ? 'translate-y-[-80px]' : ''}`}
          animate={isActive ? { translateY: -80 } : { translateY: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-2 text-sm opacity-80">{tabType === 'main' ? 'MAIN' : 'EXTRA'}</div>
          <h3 className="text-3xl font-bold mb-1">{category.name}</h3>
        </motion.div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '80px' }}
            className="absolute bottom-0 left-0 w-full bg-white"
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
                <ArrowLeft className="h-5 w-5 text-white rotate-[135deg]" />
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  
  // Check if backend is available on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        setIsCheckingBackend(true);
        const status = await checkBackendStatus();
        setBackendConnected(status.status === 'online');
      } catch (error) {
        console.error('Error checking backend status:', error);
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
  
  // Use hovered index if available, otherwise use selected index
  const displayIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;

  const handleSelectCategory = (index: number) => {
    setSelectedIndex(index);
  };
  
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
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
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : activeCategories.length - 1));
          setHoveredIndex(null);
          break;
        case 'ArrowRight':
          setSelectedIndex(prev => (prev < activeCategories.length - 1 ? prev + 1 : 0));
          setHoveredIndex(null);
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

  // Get active category for dynamic text display
  const activeItem = activeCategories[displayIndex];

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
        {/* Navigation Tabs using the TabsList from shadcn */}
        <Tabs defaultValue="main" className="w-full mt-16">
          <TabsList className="w-full grid grid-cols-2 h-12 bg-white text-black">
            <TabsTrigger 
              value="main" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold"
              onClick={() => {
                setActiveCategory('main');
                setSelectedIndex(0);
                setHoveredIndex(null);
              }}
            >
              MAIN CATEGORIES
            </TabsTrigger>
            <TabsTrigger 
              value="extras"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold"
              onClick={() => {
                setActiveCategory('extras');
                setSelectedIndex(0);
                setHoveredIndex(null);
              }}
            >
              EXTRA CATEGORIES
            </TabsTrigger>
          </TabsList>
        </Tabs>

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

            {/* Category Cards Carousel */}
            {activeCategories.length > 0 ? (
              <div className="relative mt-12">
                <div className="flex overflow-hidden space-x-4 py-8">
                  <div 
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${displayIndex * 320}px)` }}
                  >
                    {activeCategories.map((category, index) => (
                      <CategoryCard 
                        key={category.id}
                        category={category}
                        isActive={displayIndex === index}
                        onClick={() => handleSelectCategory(index)}
                        tabType={activeCategory}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <p>No categories match your search</p>
              </div>
            )}
          </div>
        </PageTransition>
        
        {/* Dynamic Text Display at bottom (similar to Dashboard) */}
        {activeItem && (
          <motion.div 
            key={activeItem?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-6 mt-auto mb-20"
          >
            <h1 className="text-7xl font-bold tracking-tighter text-white/90">
              {activeItem.name}
            </h1>
            <div className="h-1 w-20 bg-red-600 mt-2"></div>
          </motion.div>
        )}
        
        {/* Bottom Stats Bar with integrated search */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-800 px-6 py-3 flex justify-between items-center z-50 border-t border-zinc-700">
          <div 
            className="text-white font-light tracking-wider cursor-pointer"
            onClick={() => navigate('/')}
          >
            NOTESGLIDER @mantavyam
          </div>
          
          <div className="flex-1 mx-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                type="search"
                placeholder="Search categories..." 
                className="pl-10 h-8 bg-zinc-700 border-zinc-600 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
    </div>
  );
};

export default MagazinePage;
