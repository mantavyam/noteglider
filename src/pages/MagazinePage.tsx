
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Categories data
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
  const [searchTerm, setSearchTerm] = useState('');
  // Backend connection status - In a real app, this would be determined by API check
  const [backendConnected, setBackendConnected] = useState(true);
  
  // Filter categories based on search term
  const filterCategories = (items: string[]) => {
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSelectCategory = (category: string) => {
    // Here you would navigate to the specific category layout
    navigate('/task', { state: { category } });
  };

  // Prepare filtered categories
  const filteredMainCategories = filterCategories(categories.main);
  const filteredExtraCategories = filterCategories(categories.extras);

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

          {/* Backend status indicator */}
          <div className={`text-sm flex items-center gap-2 ${backendConnected ? 'text-green-600' : 'text-red-600'}`}>
            {backendConnected ? (
              <>
                <CheckCircle size={16} />
                <span>Backend service is connected</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} />
                <span>Backend service is not available. Please start the backend server.</span>
              </>
            )}
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

          {/* Main Categories Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Main Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMainCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow h-full" onClick={() => handleSelectCategory(category)}>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{category}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
              
            {filteredMainCategories.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No main categories match your search
              </div>
            )}
          </section>

          {/* Extra Categories Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Extra Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredExtraCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card 
                    className="hover:shadow-md transition-shadow h-full bg-amber-50 border-amber-200"
                    onClick={() => handleSelectCategory(category)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">{category}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
              
            {filteredExtraCategories.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No extra categories match your search
              </div>
            )}
          </section>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MagazinePage;
