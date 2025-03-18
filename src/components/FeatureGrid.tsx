
import React from 'react';
import { 
  Palette, 
  Calendar, 
  FileEdit, 
  Youtube, 
  FileText, 
  Share 
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureGrid: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Youtube size={32} />,
      title: "YouTube Integration",
      description: "Automatic video content conversion from your channel"
    },
    {
      icon: <Calendar size={32} />,
      title: "Scheduled Documents",
      description: "Daily, weekly, and monthly formats available"
    },
    {
      icon: <FileEdit size={32} />,
      title: "PPTX Conversion",
      description: "Quick transformation of presentation files"
    },
    {
      icon: <Palette size={32} />,
      title: "Beautiful Templates",
      description: "Professional designs for engaging materials"
    },
    {
      icon: <FileText size={32} />,
      title: "Complete PDF Solutions",
      description: "From creation to distribution in one platform"
    },
    {
      icon: <Share size={32} />,
      title: "Easy Sharing",
      description: "Directly distribute to your student networks"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 relative rounded-3xl p-8 hover:bg-zinc-800 transition-colors overflow-hidden"
            >
              <GlowingEffect disabled={false} glow={true} />
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 text-zinc-500">
          CREATE YOUR FIRST PDF NOW
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
