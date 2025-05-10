
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HitmanLayout from '../components/HitmanLayout';

const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['All', 'Newsletters', 'Compilations', 'Magazines'];
  
  const portfolioItems = [
    {
      id: 1,
      title: 'Corporate Newsletter',
      category: 'newsletters',
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'Academic Weekly Update',
      category: 'newsletters',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Research Compilation',
      category: 'compilations',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Science Magazine',
      category: 'magazines',
      image: 'https://images.pexels.com/photos/52500/books-library-knowledge-study-52500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      title: 'Tech Magazine',
      category: 'magazines',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      title: 'Annual Compilation',
      category: 'compilations',
      image: 'https://images.pexels.com/photos/4560083/pexels-photo-4560083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory.toLowerCase());

  return (
    <HitmanLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Portfolio Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">PORTFOLIO</h2>
            </div>
            
            {/* Categories */}
            <div className="flex space-x-1 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 transition-colors ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden cursor-pointer group"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  
                  {/* Bottom label */}
                  <div className={`absolute bottom-0 left-0 right-0 bg-white group-hover:bg-red-600 transition-colors`}>
                    <div className="flex items-center px-4 py-3 justify-between">
                      <div>
                        <h3 className={`font-bold group-hover:text-white text-black`}>
                          {item.title}
                        </h3>
                        <p className={`text-xs capitalize group-hover:text-white/80 text-black/70`}>
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </HitmanLayout>
  );
};

export default PortfolioPage;
