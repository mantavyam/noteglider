
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Home, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DownloadState {
  pdfUrl: string;
  filename: string;
  size: number;
  createdAt: string;
}

const DownloadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as DownloadState | null;
  
  // Backend API URL
  const backendUrl = 'http://localhost:8000';
  
  const handleDownload = () => {
    if (state?.pdfUrl) {
      // Create a temporary link and click it to trigger the download
      const link = document.createElement('a');
      link.href = `${backendUrl}${state.pdfUrl}`;
      link.setAttribute('download', state.filename || 'newsletter.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('PDF URL not available. Please try generating the newsletter again.');
    }
  };

  // If there's no PDF data, show a message
  if (!state?.pdfUrl) {
    return (
      <Layout>
        <PageTransition>
          <div className="flex flex-col items-center justify-center space-y-6 p-6 min-h-[60vh]">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">No Newsletter Data Available</h1>
              <p className="text-muted-foreground max-w-md">
                It seems you haven't generated a newsletter yet. Please go back to create one.
              </p>
              <Button onClick={() => navigate('/task')} className="mt-4">
                Create Newsletter
              </Button>
            </div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
            <div className="flex flex-col space-y-8">
              <div className="bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto lg:mx-0">
                <Download className="w-12 h-12 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-center lg:text-left">Your Newsletter is Ready!</h1>
                <p className="text-lg text-muted-foreground text-center lg:text-left">
                  Your PDF newsletter has been generated and is ready for download.
                </p>
              </div>
              
              <div className="w-full p-6 bg-white rounded-lg shadow-sm border">
                <h2 className="text-xl font-medium mb-4">Download Details</h2>
                <div className="space-y-2 mb-6">
                  <p><span className="font-medium">File name:</span> {state.filename || 'newsletter.pdf'}</p>
                  <p><span className="font-medium">Size:</span> {(state.size / 1024).toFixed(2)} MB</p>
                  <p><span className="font-medium">Created:</span> {new Date(state.createdAt).toLocaleString()}</p>
                </div>
                
                <Button 
                  onClick={handleDownload} 
                  className="w-full py-6 text-lg"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Newsletter
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/task')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Create Another
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </div>
            </div>
            
            {/* PDF Preview Component */}
            <div className="bg-muted rounded-lg shadow-sm border p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">PDF Preview</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  asChild
                  className="text-xs"
                >
                  <a 
                    href={`${backendUrl}${state.pdfUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open in new tab
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
              
              <ScrollArea className="flex-1 border rounded-md bg-white min-h-[500px]">
                {state.pdfUrl && (
                  <iframe
                    src={`${backendUrl}${state.pdfUrl}`}
                    title="PDF Preview"
                    className="w-full h-[680px]"
                    frameBorder="0"
                  />
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default DownloadPage;
