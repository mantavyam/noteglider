
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Image, Youtube, Plus, MinusCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface YouTubeUrlEntry {
  id: string;
  url: string;
  date: Date | undefined;
}

const CompilationPage: React.FC = () => {
  const navigate = useNavigate();
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [youtubeUrls, setYoutubeUrls] = useState<YouTubeUrlEntry[]>([
    { id: '1', url: '', date: undefined },
    { id: '2', url: '', date: undefined },
    { id: '3', url: '', date: undefined },
    { id: '4', url: '', date: undefined },
    { id: '5', url: '', date: undefined },
    { id: '6', url: '', date: undefined },
  ]);
  
  // Backend connection status - In a real app, this would be determined by API check
  const [backendConnected, setBackendConnected] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would process the files and navigate to a build page
    navigate('/build');
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

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Required Files
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-gray-600 mb-6">
                Upload your content files to create a weekly compilation PDF with specialized layout.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      <label className="text-sm font-medium">
                        YouTube URLs (Optional)
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addYoutubeUrlField}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add URL
                      </Button>
                    </div>

                    {youtubeUrls.map((entry) => (
                      <div key={entry.id} className="flex items-start gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <Youtube className="h-5 w-5 text-gray-500 mt-2" />
                          <Input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={entry.url}
                            onChange={(e) => handleYoutubeUrlChange(entry.id, e.target.value)}
                            className="flex-1"
                          />
                        </div>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !entry.date && "text-gray-500"
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
