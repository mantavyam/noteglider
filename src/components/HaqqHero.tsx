
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PulseBeamsFirstDemo } from '@/components/ui/pulse-beams-demo';

const HaqqHero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-32 pb-40 md:py-48 overflow-hidden">
      {/* Background with curved lines */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b79608d7-7fb6-4b24-8339-1018c249e4c5.png')] bg-cover bg-center opacity-50"></div>
        <div className="absolute w-full h-40 bottom-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Effortless PDF Creation<br />for Live Educators
        </h1>
        
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
          Transform your YouTube live classes into beautifully designed study materials 
          without the hassle. Create daily newsletters, weekly compilations, and monthly 
          magazines to boost student success.
        </p>
        
        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-center gap-4">
          <div onClick={() => navigate('/task')} className="cursor-pointer">
            <PulseBeamsFirstDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaqqHero;
