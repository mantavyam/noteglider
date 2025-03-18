
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Youtube, FileUp } from 'lucide-react';

const WalletSection: React.FC = () => {
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
            className="bg-black hover:bg-black/90 text-white rounded-lg"
            onClick={() => navigate('/task')}
          >
            <Youtube className="w-5 h-5 mr-2" />
            Connect Your<br />YouTube Channel
          </Button>
          
          <Button 
            className="bg-black hover:bg-black/90 text-white rounded-lg"
            onClick={() => navigate('/task')}
          >
            <FileUp className="w-5 h-5 mr-2" />
            UPLOAD<br />PPTX Files
          </Button>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/75a05867-f430-4592-9140-d7bd68cda560.png" 
            alt="PDF Creation App" 
            className="max-w-full h-auto md:max-w-md"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">Daily</div>
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">Weekly</div>
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">Monthly</div>
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">Custom</div>
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
