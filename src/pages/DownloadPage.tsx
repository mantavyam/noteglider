
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Home } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const DownloadPage = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // In a real implementation, this would be a link to the generated PDF
    alert('In a real implementation, this would download the generated PDF');
  };

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-8 py-12 max-w-3xl mx-auto">
            <div className="bg-primary/10 p-8 rounded-full">
              <Download className="w-24 h-24 text-primary" />
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Your Newsletter is Ready!</h1>
              <p className="text-xl text-muted-foreground">
                Your PDF newsletter has been generated and is ready for download.
              </p>
            </div>
            
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-medium mb-4">Download Details</h2>
              <div className="space-y-2 mb-6">
                <p><span className="font-medium">File name:</span> newsletter.pdf</p>
                <p><span className="font-medium">Size:</span> 2.4 MB</p>
                <p><span className="font-medium">Created:</span> {new Date().toLocaleString()}</p>
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
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
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
        </div>
      </PageTransition>
    </Layout>
  );
};

export default DownloadPage;
