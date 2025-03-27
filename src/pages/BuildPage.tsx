
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UploadCloud, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageGrid from '@/components/ImageGrid';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { generatePDF } from '@/services/api';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
    setError(null);
    setUploadProgress(0);
    
    try {
      toast({
        title: "Processing Started",
        description: "Your newsletter is being generated. This may take a moment...",
      });
      
      // For debugging, log the file sizes
      console.log('Sending files to server:', {
        markdownName: markdownFile.name,
        markdownSize: markdownFile.size,
        zipName: zipFile.name,
        zipSize: zipFile.size,
        customUrl
      });
      
      const result = await generatePDF(markdownFile, zipFile, customUrl);
      
      toast({
        title: "Generation Complete",
        description: "Your newsletter has been successfully generated!",
      });
      
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
      let errorMessage = "PDF generation failed. Please check your files and try again.";
      
      // Try to extract more detailed error message if available
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const anyError = error as any;
        if (anyError.response?.data?.detail) {
          errorMessage = anyError.response.data.detail;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setUploadProgress(0);
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
            <h1 className="text-3xl font-bold text-black">Preview Your Design</h1>
            <p className="text-zinc-600">
              Review your content and images before generating the final newsletter
            </p>
            
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Preview Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[60vh]">
              {/* Left side - Markdown Preview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium mb-4 sticky top-0 bg-white pb-2 z-10 text-black">Markdown Content</h2>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[60vh]">
                    <div className="bg-gray-50 rounded p-4">
                      <MarkdownPreview file={markdownFile} />
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              {/* Right side - Image Grid */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium mb-4 sticky top-0 bg-white pb-2 z-10 text-black">Image Assets</h2>
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 mt-8 border-t border-gray-200">
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleReupload} 
                  disabled={isGenerating} 
                  className="bg-white text-black border-gray-300 hover:bg-gray-50"
                >
                  <UploadCloud className="mr-2 h-4 w-4" /> Reupload
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleAbort} 
                  disabled={isGenerating}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Abort
                </Button>
              </div>
              
              <Button 
                onClick={handleContinue} 
                className="w-full sm:w-auto bg-black text-white hover:bg-black/90"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BuildPage;
