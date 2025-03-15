
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, File, RefreshCcw, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface DownloadPageState {
  pdfUrl: string;
  filename: string;
  size: number;
  createdAt: string;
}

const DownloadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  
  // Get state from navigation or use default empty values
  const state = location.state as DownloadPageState;
  
  const handleDownload = async () => {
    if (!state?.pdfUrl) {
      toast({
        title: "Download Failed",
        description: "PDF URL is not available",
        variant: "destructive"
      });
      return;
    }
    
    setIsDownloading(true);
    
    try {
      // Create download link
      const apiBaseUrl = 'http://localhost:8000'; // Should match your backend
      const downloadUrl = `${apiBaseUrl}${state.pdfUrl}`;
      
      // Create a link and click it
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = state.filename || 'newsletter.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Your newsletter is being downloaded"
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your newsletter",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleNewNewsletter = () => {
    navigate('/task');
  };

  const handleTogglePreview = () => {
    setShowPreview(prev => !prev);
  };
  
  // Calculate relative time
  const relativeTime = state?.createdAt 
    ? formatDistanceToNow(new Date(state.createdAt), { addSuffix: true })
    : 'recently';
  
  // Format file size
  const formattedSize = state?.size 
    ? state.size < 1024 
      ? `${Math.round(state.size)} KB` 
      : `${(state.size / 1024).toFixed(2)} MB`
    : 'Unknown size';
  
  // If no state is provided, show error
  if (!state?.pdfUrl) {
    return (
      <Layout>
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto">
              <Card className="shadow-lg border-red-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="mr-2" />
                    No PDF Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    It seems you haven't generated a newsletter yet or the session has expired.
                    Please return to the task page to upload your files and generate a newsletter.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNewNewsletter} className="w-full">
                    Create a Newsletter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </PageTransition>
      </Layout>
    );
  }
  
  // Generate the full PDF URL
  const apiBaseUrl = 'http://localhost:8000'; // Should match your backend
  const pdfViewUrl = `${apiBaseUrl}${state.pdfUrl}`;
  
  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PDF Preview Section - takes up 2/3 of the width on large screens */}
            {showPreview && (
              <div className="lg:col-span-2">
                <Card className="shadow-lg h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">PDF Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-4">
                    <div className="w-full h-[70vh] rounded-md border border-gray-200 overflow-hidden">
                      {/* PDF Viewer using object tag */}
                      <object 
                        data={pdfViewUrl} 
                        type="application/pdf" 
                        className="w-full h-full"
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6">
                          <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
                          <p className="text-center text-muted-foreground mb-2">
                            The PDF preview cannot be displayed in your browser.
                          </p>
                          <p className="text-center text-sm text-muted-foreground">
                            Please download the file to view it.
                          </p>
                        </div>
                      </object>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Download Panel - takes up 1/3 or full width depending on preview state */}
            <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <File className="mr-2 h-5 w-5" />
                    Your Newsletter is Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 text-center">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3">
                        <File className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">{state.filename}</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>Generated {relativeTime}</p>
                        <p>Size: {formattedSize}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        onClick={handleDownload} 
                        className="w-full"
                        disabled={isDownloading}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {isDownloading ? 'Downloading...' : 'Download Newsletter'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleTogglePreview} 
                        className="w-full"
                      >
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                      </Button>
                      
                      <Button
                        variant="secondary"
                        onClick={handleNewNewsletter}
                        className="w-full"
                      >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Create New Newsletter
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border bg-card p-4">
                      <h4 className="font-medium mb-2">Next Steps</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs mr-2">1</span>
                          <span>Download your newsletter PDF</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs mr-2">2</span>
                          <span>Share it with your audience via email or social media</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs mr-2">3</span>
                          <span>Create another newsletter whenever you need</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default DownloadPage;
