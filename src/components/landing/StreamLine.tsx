
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Youtube, FileUp } from 'lucide-react';

const StreamLine: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm font-medium">STREAMLINE YOUR CONTENT, AMPLIFY STUDENT SUCCESS</div>
        <h2 className="text-5xl md:text-6xl font-bold mb-6">One Platform for All Your PDF Needs</h2>
        
        <p className="text-zinc-700 max-w-2xl mx-auto mb-10">
          Our platform is engineered specifically for educators who need<br />
          to deliver consistent, high-quality notes. By integrating your YouTube<br />
          channel and Google Drive uploads, we automate the tedious conversion process.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16">
          <Button 
            className="bg-white text-black border border-black hover:bg-gray-50 rounded-lg shadow-sm"
            onClick={() => navigate('/dashboard')}
          >
            <Youtube className="w-5 h-5 mr-2" />
            Connect Your<br />YouTube Channel
          </Button>
          
          <Button 
            className="bg-white text-black border border-black hover:bg-gray-50 rounded-lg shadow-sm"
            onClick={() => navigate('/dashboard')}
          >
            <FileUp className="w-5 h-5 mr-2" />
            UPLOAD<br />PPTX Files
          </Button>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="/landing-assets/DashboardNoteGlider.png" 
            alt="PDF Creation App" 
            className="max-w-full h-auto md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default StreamLine;
