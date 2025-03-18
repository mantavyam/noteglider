
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, File, RefreshCcw, AlertTriangle, FileText } from 'lucide-react';
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
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState(false);

  const state = location.state as DownloadPageState;
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const pdfPath = state?.pdfUrl ? (state.pdfUrl.startsWith('/') ? state.pdfUrl : `/${state.pdfUrl}`) : '';
  const pdfViewUrl = `${apiBaseUrl}${pdfPath}`;

  // Fetch PDF as blob for preview on mount
  useEffect(() => {
    if (!state?.pdfUrl) return;

    const fetchPdf = async () => {
      try {
        const response = await fetch(pdfViewUrl, { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch PDF');
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
      } catch (error) {
        console.error('PDF fetch error:', error);
        setPdfError(true);
      }
    };

    fetchPdf();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfViewUrl]);

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
      const response = await fetch(pdfViewUrl, { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to download PDF');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = state.filename || 'newsletter.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

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

  const relativeTime = state?.createdAt
    ? formatDistanceToNow(new Date(state.createdAt), { addSuffix: true })
    : 'recently';

  const formattedSize = state?.size
    ? state.size < 1024
      ? `${Math.round(state.size)} KB`
      : `${(state.size / 1024).toFixed(2)} MB`
    : 'Unknown size';

  if (!state?.pdfUrl) {
    return (
      <Layout>
        <PageTransition>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto">
              <Card className="shadow-lg border border-red-200 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="mr-2" />
                    No PDF Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    It seems you haven't generated a newsletter yet or the session has expired.
                    Please return to the task page to upload your files and generate a newsletter.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNewNewsletter} className="w-full bg-black text-white">
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

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {showPreview && (
              <div className="lg:col-span-2">
                <Card className="shadow-lg h-full flex flex-col bg-white border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center text-black">
                      <FileText className="mr-2 h-5 w-5" />
                      PDF Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden p-4">
                    <div className="w-full h-[70vh] rounded-md border border-gray-200 overflow-hidden bg-white">
                      {pdfError || !pdfBlobUrl ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6">
                          <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
                          <p className="text-center text-gray-600 mb-2">
                            The PDF preview cannot be displayed.
                          </p>
                          <p className="text-center text-sm text-gray-500 mb-4">
                            This might be due to network issues or file unavailability.
                          </p>
                          <Button onClick={handleDownload} variant="outline" size="sm" className="bg-white border-gray-300 text-black">
                            <Download className="mr-2 h-4 w-4" />
                            Download to View
                          </Button>
                        </div>
                      ) : (
                        <object
                          data={pdfBlobUrl}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                          title="PDF Preview"
                        >
                          <p>Your browser does not support PDF preview. <a href={pdfBlobUrl} download>Download</a> instead.</p>
                        </object>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className={`${showPreview ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
              <Card className="shadow-lg h-full bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-black">
                    <File className="mr-2 h-5 w-5" />
                    Your Newsletter is Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 text-center">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3">
                        <File className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-1 text-gray-900">{state.filename}</h3>
                      <div className="text-sm text-gray-600">
                        <p>Generated {relativeTime}</p>
                        <p>Size: {formattedSize}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button
                        onClick={handleDownload}
                        className="w-full bg-black text-white"
                        disabled={isDownloading}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {isDownloading ? 'Downloading...' : 'Download Newsletter'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleTogglePreview}
                        className="w-full bg-white border-gray-300 text-black hover:bg-gray-50"
                      >
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleNewNewsletter}
                        className="w-full bg-gray-100 text-black hover:bg-gray-200"
                      >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Create New Newsletter
                      </Button>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                      <h4 className="font-medium mb-2 text-black">Next Steps</h4>
                      <ul className="text-sm space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-blue-600 text-xs mr-2">1</span>
                          <span>Download your newsletter PDF</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-blue-600 text-xs mr-2">2</span>
                          <span>Share it with your audience via email or social media</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-blue-600 text-xs mr-2">3</span>
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
