
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckIcon, Server } from 'lucide-react';
import Layout from '../components/landing/Layout';
import PageTransition from '../components/PageTransition';
import FileUpload from '../components/FileUpload';
import { toast } from 'sonner';
import { checkBackendStatus } from '@/services/api';

const Newsletter = () => {
  const navigate = useNavigate();
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [imagesZip, setImagesZip] = useState<File | null>(null);
  const [useCustomUrl, setUseCustomUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
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
          streamUrl: useCustomUrl ? customUrl : undefined
        } 
      });
    }, 500);
  };

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
            <h1 className="text-3xl font-bold">Upload Your Content</h1>
            <p className="text-muted-foreground mt-2">
              Provide the necessary files to create your newsletter
            </p>
          </motion.div>
          
          {/* Upload Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <FileUpload
                label="Markdown File"
                accept=".md"
                onChange={setMarkdownFile}
                value={markdownFile}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <FileUpload
                label="Images (ZIP file)"
                accept=".zip"
                onChange={setImagesZip}
                value={imagesZip}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={useCustomUrl}
                    onClick={() => setUseCustomUrl(!useCustomUrl)}
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${
                      useCustomUrl 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-input"
                    }`}
                  >
                    {useCustomUrl && <CheckIcon className="h-3 w-3" />}
                  </button>
                  <label 
                    htmlFor="custom-url" 
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Use custom stream URL
                  </label>
                </div>
              </div>
              
              {useCustomUrl && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="url"
                    id="custom-url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full px-4 py-2 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </motion.div>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-6">
              <motion.button
                type="submit"
                className={`w-full text-white rounded-md px-4 py-3 font-medium relative overflow-hidden group ${
                  backendConnected ? "bg-black hover:bg-black/90" : "bg-gray-400 cursor-not-allowed"
                }`}
                whileHover={backendConnected ? { scale: 1.01 } : {}}
                whileTap={backendConnected ? { scale: 0.98 } : {}}
                disabled={isSubmitting || !backendConnected}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Processing...' : 'Build Design'}
                </span>
                {backendConnected && (
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ scaleX: 0 }}
                    whileHover={{ 
                      scaleX: 1, 
                      transition: { duration: 0.4 } 
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Newsletter;