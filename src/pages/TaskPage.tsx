
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckIcon } from 'lucide-react';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import FileUpload from '../components/FileUpload';
import { toast } from 'sonner';

const TaskPage = () => {
  const navigate = useNavigate();
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [imagesZip, setImagesZip] = useState<File | null>(null);
  const [useCustomUrl, setUseCustomUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!markdownFile) {
      toast.error('Please upload a Markdown file');
      return;
    }
    
    if (!imagesZip) {
      toast.error('Please upload a ZIP file with images');
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, you would process files or send them to a server here
    // For now, we'll simulate this with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/build', { 
        state: { 
          markdownFile,
          imagesZip,
          streamUrl: useCustomUrl ? customUrl : 'https://www.youtube.com/@default/streams'
        } 
      });
    }, 1000);
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
            onClick={() => navigate('/')}
            className="mb-12 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </motion.button>
          
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
                className="w-full bg-primary text-primary-foreground rounded-md px-4 py-3 font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Processing...' : 'Build Design'}
                </span>
                <motion.span
                  className="absolute inset-0 bg-primary-foreground/10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1, 
                    transition: { duration: 0.4 } 
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default TaskPage;
