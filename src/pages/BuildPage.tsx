
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UploadCloud, AlertTriangle, ArrowRight } from 'lucide-react';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageGrid from '@/components/ImageGrid';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { generatePDF } from '@/services/api';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LocationState {
  markdownFile: File;
  imagesZip: File;
  streamUrl?: string;
}

const BuildPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Get state from navigation or use default empty values
  const state = location.state as LocationState | null;
  const markdownFile = state?.markdownFile || null;
  const zipFile = state?.imagesZip || null;
  const customUrl = state?.streamUrl;

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

  const handleContinue = async () => {
    if (!markdownFile || !zipFile) {
      toast({
        title: "Missing Files",
        description: "Please upload both markdown and image files",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      toast({
        title: "Processing Started",
        description: "Your newsletter is being generated",
      });
      
      const result = await generatePDF(markdownFile, zipFile, customUrl);
      
      // Navigate to download page with the result data
      navigate('/download', { 
        state: { 
          pdfUrl: result.pdf_url,
          filename: result.filename,
          size: result.size,
          createdAt: new Date().toISOString()
        } 
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
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
              <div className="bg-white rounded-lg shadow-sm border p-4 overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium mb-4 sticky top-0 bg-white pb-2 z-10">Markdown Content</h2>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[60vh]">
                    <div className="bg-gray-50 rounded p-4">
                      <MarkdownPreview file={markdownFile} />
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              {/* Right side - Image Grid */}
              <div className="bg-white rounded-lg shadow-sm border p-4 overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium mb-4 sticky top-0 bg-white pb-2 z-10">Image Assets</h2>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[60vh]">
                    <div className="bg-gray-50 rounded p-4">
                      <ImageGrid zipFile={zipFile} />
                    </div>
                  </ScrollArea>
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
              
              <Button 
                onClick={handleContinue} 
                className="w-full sm:w-auto"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Continue"} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BuildPage;
