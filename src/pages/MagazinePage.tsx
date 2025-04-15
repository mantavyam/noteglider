
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const categories = {
  main: [
    'Appointments & Resignation',
    'Awards & Recognition',
    'Banking & Insurance',
    'Books & Authors',
    'Brand Ambassadors',
    'Defence News',
    'Festivals',
    'GDP Forecast',
    'Important Days',
    'International News',
    'MOU\'s & Partnership',
    'National News',
    'Obituaries',
    'RBI & SEBI Corner',
    'Reports & Indices',
    'Science & Technology',
    'Sports',
    'State / UT News',
    'Visits, Meetings & Summits',
  ],
  extras: [
    'Current Affairs Cracker SHOTS',
    'Static Awareness',
    'Current Affairs MCQs',
  ],
};

const MagazinePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Filter categories based on search term
  const filterCategories = (items: string[]) => {
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSelectCategory = (category: string) => {
    // Here you would navigate to the specific category layout
    // For now, just go to the task page as a placeholder
    navigate('/task', { state: { category } });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold">Monthly Magazine</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              type="search"
              placeholder="Search categories..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="main" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="main">Main Categories</TabsTrigger>
              <TabsTrigger value="extras">Extra Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="main">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterCategories(categories.main).map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4 px-5 text-left hover:bg-purple-50 hover:border-purple-300 hover:text-purple-800"
                      onClick={() => handleSelectCategory(category)}
                    >
                      <span className="truncate">{category}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              {filterCategories(categories.main).length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No categories match your search
                </div>
              )}
            </TabsContent>

            <TabsContent value="extras">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterCategories(categories.extras).map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-4 px-5 text-left hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800"
                      onClick={() => handleSelectCategory(category)}
                    >
                      <span className="truncate">{category}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              {filterCategories(categories.extras).length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No categories match your search
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MagazinePage;
