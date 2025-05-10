
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckIcon, Server } from 'lucide-react';
import HitmanLayout from '../components/HitmanLayout';
import FileUpload from '../components/FileUpload';
import { toast } from 'sonner';
import { checkBackendStatus } from '@/services/api';

const TaskPage = () => {
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

  return (
    <HitmanLayout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/documents')}
            className="mb-12 flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </motion.button>
          
          {/* Page Title */}
          <div className="mb-10">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">NEWSLETTER</h2>
            </div>
            <h1 className="text-3xl font-bold mt-4">Upload Your Content</h1>
            <div className="h-1 w-20 bg-red-600 mt-2"></div>
          </div>
          
          {/* Backend Status */}
          <motion.div 
            className={`mb-6 px-4 py-3 border ${
              isCheckingBackend 
              ? "border-zinc-600" 
              : backendConnected 
                ? "border-green-500" 
                : "border-red-500"
            } flex items-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Server className="w-5 h-5 mr-3" />
            <span>
              {isCheckingBackend 
                ? "Checking backend status..." 
                : backendConnected 
                  ? "Backend service is connected" 
                  : "Backend service is not available. Please start the backend server."}
            </span>
          </motion.div>
          
          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-800/50 p-6 border border-zinc-700">
            <div>
              <FileUpload
                label="Markdown File"
                accept=".md"
                onChange={setMarkdownFile}
                value={markdownFile}
              />
            </div>
            
            <div>
              <FileUpload
                label="Images (ZIP file)"
                accept=".zip"
                onChange={setImagesZip}
                value={imagesZip}
              />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={useCustomUrl}
                    onClick={() => setUseCustomUrl(!useCustomUrl)}
                    className={`h-5 w-5 rounded flex items-center justify-center transition-colors ${
                      useCustomUrl 
                        ? "bg-red-600 border-red-600" 
                        : "border border-white/30"
                    }`}
                  >
                    {useCustomUrl && <CheckIcon className="h-3 w-3 text-white" />}
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
                    className="w-full px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                </motion.div>
              )}
            </div>
            
            <div className="pt-6">
              <button
                type="submit"
                className={`w-full text-white rounded-none px-4 py-3 font-medium relative overflow-hidden group ${
                  backendConnected ? "bg-red-600 hover:bg-red-500" : "bg-zinc-600 cursor-not-allowed"
                }`}
                disabled={isSubmitting || !backendConnected}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Processing...' : 'Build Newsletter'}
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
              </button>
            </div>
          </form>
        </div>
      </div>
    </HitmanLayout>
  );
};

export default TaskPage;
