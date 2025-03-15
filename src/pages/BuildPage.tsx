
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UploadCloud, AlertTriangle, ArrowRight } from 'lucide-react';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageGrid from '@/components/ImageGrid';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const BuildPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // For demo purposes, we need to handle the case where there's no file uploaded
  const [markdownFile] = useState<File | null>(null);
  const [zipFile] = useState<File | null>(null);

  const handleReupload = () => {
    navigate('/task');
  };

  const handleAbort = () => {
    toast({
      title: "Process Aborted",
      description: "You've cancelled the design process",
    });
    navigate('/');
  };

  const handleContinue = () => {
    // Placeholder for future backend integration
    toast({
      title: "Processing Started",
      description: "Your newsletter is being generated",
    });
    navigate('/download');
  };

  // Show a message if no files are uploaded yet
  if (!markdownFile && !zipFile) {
    return (
      <Layout>
        <PageTransition>
          <div className="flex flex-col items-center justify-center space-y-6 p-6 min-h-[60vh]">
            <AlertTriangle className="w-16 h-16 text-orange-500" />
            <h2 className="text-2xl font-bold text-center">No Files Available</h2>
            <p className="text-center text-muted-foreground max-w-md">
              It seems you haven't uploaded any files yet. Please go back to the task page to upload your markdown and image files.
            </p>
            <Button onClick={() => navigate('/task')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Task Page
            </Button>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold">Preview Your Design</h1>
            <p className="text-muted-foreground">
              Review your content and images before generating the final newsletter
            </p>
            
            {/* Preview Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[60vh]">
              {/* Left side - Markdown Preview */}
              <div className="bg-white rounded-lg shadow-sm border p-4 overflow-auto max-h-[70vh]">
                <h2 className="text-lg font-medium mb-4">Markdown Content</h2>
                <div className="bg-gray-50 rounded p-4">
                  <MarkdownPreview file={markdownFile} />
                </div>
              </div>
              
              {/* Right side - Image Grid */}
              <div className="bg-white rounded-lg shadow-sm border p-4 overflow-auto max-h-[70vh]">
                <h2 className="text-lg font-medium mb-4">Image Assets</h2>
                <div className="bg-gray-50 rounded p-4 h-full">
                  <ImageGrid zipFile={zipFile} />
                </div>
              </div>
            </div>
            
            {/* Bottom action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 mt-8 border-t">
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleReupload}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Reupload
                </Button>
                <Button variant="destructive" onClick={handleAbort}>
                  <AlertTriangle className="mr-2 h-4 w-4" /> Abort
                </Button>
              </div>
              
              <Button onClick={handleContinue} className="w-full sm:w-auto">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BuildPage;
