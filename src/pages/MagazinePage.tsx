
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/landing/Layout';
import { Search, ArrowLeft, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { checkBackendStatus } from '@/services/api';
import {toast} from 'sonner';
import { FileText} from 'lucide-react';
import PageTransition from '../components/PageTransition';

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
    'Tabular Data',
    'Static Awareness',
    'Current Affairs MCQs',
  ],
};

const MagazinePage= () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [imagesZip, setImagesZip] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        setBackendConnected(false);
      } finally {
        setIsCheckingBackend(false);
      }
    };

    checkBackend();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!backendConnected) {
      toast.error('Backend service is not available. Please make sure the backend server is running.');
      return;
    }

    if (!markdownFile) {
      toast.error('Please upload a Markdown file');
      return;
    }
    
    if (!imagesZip) {
      toast.error('Please upload a ZIP file with images');
      return;
    }
    setIsSubmitting(true);
    
    // Navigate to build page with the files
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/build', { 
        state: { 
          markdownFile,
          imagesZip,
        } 
      });
    }, 500);
  };
  
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
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
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
                <PageTransition>
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/documents')}
            className="mb-12 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </motion.button>
          
          {/* Backend Status */}
          <motion.div 
            className={`mb-6 px-4 py-2 rounded-lg flex items-center ${
              isCheckingBackend 
              ? "bg-gray-100" 
              : backendConnected 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
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
          {/* Page Title */}
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold">Monthly Magazine</h1>
            <p className="text-muted-foreground mt-2">
              Create the associated PDF from your intended Input Types
            </p>
          </motion.div>
        </div>
      </PageTransition>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <Input 
              type="search"
              placeholder="Search categories..." 
              className="pl-10 bg-white text-black"
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
                  <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-black"><h3 className="font-medium">{category}</h3></CardTitle>
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardDescription>Description Here</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-white">
                    <h3 className="font-medium">{category}</h3>
                  </CardContent>
                  <CardFooter className="bg-white">
                    <Button
                      className="w-full bg-white hover:bg-gray-100 text-black border border-black"
                      onClick={() => handleSelectCategory(category)}
                    >
                      Create Document
                    </Button>
                  </CardFooter>
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
                  <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-black"><h3 className="font-medium">{category}</h3></CardTitle>
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardDescription>Description Here</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-white">
                    <h3 className="font-medium">{category}</h3>
                  </CardContent>
                  <CardFooter className="bg-white">
                    <Button
                      className="w-full bg-white hover:bg-gray-100 text-black border border-black"
                      onClick={() => handleSelectCategory(category)}
                    >
                      Create Document
                    </Button>
                  </CardFooter>
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