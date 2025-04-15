
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HaqqHero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-32 pb-40 md:py-48 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697%2F66fecb2829b0adf0d9648871_1_4_herou-3okt-poster-00001.jpg"
          >
            <source src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697%2F66fecb2829b0adf0d9648871_1_4_herou-3okt-transcode.mp4" type="video/mp4" />
            <source src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697%2F66fecb2829b0adf0d9648871_1_4_herou-3okt-transcode.webm" type="video/webm" />
          </video>
        </div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-medium mb-5 text-white">
          Effortless<br />Notes Automation
        </h1>
        
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12">
          Transform your YouTube live classes into beautifully designed study materials 
          without the hassle. 
        </p>
        
        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-4">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-white text-black border border-gray-300 hover:bg-gray-50 text-lg px-8 py-6 h-6 rounded-full shadow-xl"
          >
            Start Building
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HaqqHero;
