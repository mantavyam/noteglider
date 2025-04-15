
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Image, Youtube } from 'lucide-react';

const CompilationPage: React.FC = () => {
  const navigate = useNavigate();
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would process the files and navigate to a build page
    // This is just a placeholder navigation
    navigate('/build');
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

          <Card>
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

                  <div className="space-y-2">
                    <label htmlFor="youtube" className="text-sm font-medium">
                      YouTube URL (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-gray-500" />
                      <Input
                        id="youtube"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={!markdownFile || !zipFile}
                    className="w-full sm:w-auto"
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
