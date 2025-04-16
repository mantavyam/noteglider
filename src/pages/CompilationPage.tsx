
import React, { useState, useEffect } from 'react';
import { checkBackendStatus } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/landing/Layout';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Image, Youtube, Plus, MinusCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Server } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface YouTubeUrlEntry {
  id: string;
  url: string;
  date: Date | undefined;
}

const CompilationPage: React.FC = () => {
  const navigate = useNavigate();
  const [backendConnected, setBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesZip, setImagesZip] = useState<File | null>(null);
  const [youtubeUrls, setYoutubeUrls] = useState<YouTubeUrlEntry[]>([
    { id: '1', url: '', date: undefined },
    { id: '2', url: '', date: undefined },
    { id: '3', url: '', date: undefined },
    { id: '4', url: '', date: undefined },
    { id: '5', url: '', date: undefined },
    { id: '6', url: '', date: undefined },
  ]);

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

  const handleYoutubeUrlChange = (id: string, value: string) => {
    setYoutubeUrls(prev => 
      prev.map(entry => entry.id === id ? { ...entry, url: value } : entry)
    );
  };

  const handleDateChange = (id: string, date: Date | undefined) => {
    setYoutubeUrls(prev => 
      prev.map(entry => entry.id === id ? { ...entry, date } : entry)
    );
  };

  const addYoutubeUrlField = () => {
    const newId = `${youtubeUrls.length + 1}`;
    setYoutubeUrls(prev => [...prev, { id: newId, url: '', date: undefined }]);
  };

  const removeYoutubeUrlField = (id: string) => {
    if (youtubeUrls.length <= 1) return;
    setYoutubeUrls(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
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
            <h1 className="text-3xl font-bold">Weekly Compilation</h1>
          </div>

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

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Required Files
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-6">
                Upload your content files to create a weekly compilation PDF with specialized layout.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-black">
                <div className="space-y-4">
                  <FileUpload
                    label="Markdown Document (.md)"
                    accept=".md"
                    onChange={setMarkdownFile}
                    value={markdownFile}
                  />
                  
                  <FileUpload
                    label="Images Archive (.zip)"
                    accept=".zip"
                    onChange={setZipFile}
                    value={zipFile}
                  />

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-black text-sm font-medium">
                        YouTube URLs (Optional)
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addYoutubeUrlField}
                        className="flex items-center gap-1 text-white"
                      >
                        <Plus className="h-4 w-4 text-white" />
                        Add URL
                      </Button>
                    </div>

                    {youtubeUrls.map((entry) => (
                      <div key={entry.id} className="flex items-start gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <Youtube className="h-5 w-5 text-black bg-white mt-2" />
                          <Input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={entry.url}
                            onChange={(e) => handleYoutubeUrlChange(entry.id, e.target.value)}
                            className="flex-1 bg-white text-black placeholder:text-gray-500"
                          />
                        </div>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[160px] justify-start text-left font-normal bg-white text-black",
                                !entry.date && "text-black bg-white"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {entry.date ? format(entry.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={entry.date}
                              onSelect={(date) => handleDateChange(entry.id, date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeYoutubeUrlField(entry.id)}
                          disabled={youtubeUrls.length <= 1}
                          className="p-2"
                        >
                          <MinusCircle className="h-5 w-5 text-gray-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={!markdownFile || !zipFile}
                    className="w-full sm:w-auto bg-black hover:bg-black/80 text-white"
                  >
                    Continue to Build
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CompilationPage;
