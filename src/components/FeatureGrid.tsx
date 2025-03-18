
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
  gradient: string;
}

const FeatureGrid: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Youtube size={32} className="text-blue-400" />,
      title: "YouTube Integration",
      description: "Automatic video content conversion from your channel",
      gradient: "from-blue-500/20 via-blue-400/20 to-blue-300/20"
    },
    {
      icon: <Calendar size={32} className="text-green-400" />,
      title: "Scheduled Documents",
      description: "Daily, weekly, and monthly formats available",
      gradient: "from-green-500/20 via-green-400/20 to-green-300/20"
    },
    {
      icon: <FileEdit size={32} className="text-amber-400" />,
      title: "PPTX Conversion",
      description: "Quick transformation of presentation files",
      gradient: "from-amber-500/20 via-amber-400/20 to-amber-300/20"
    },
    {
      icon: <Palette size={32} className="text-purple-400" />,
      title: "Beautiful Templates",
      description: "Professional designs for engaging materials",
      gradient: "from-purple-500/20 via-purple-400/20 to-purple-300/20"
    },
    {
      icon: <FileText size={32} className="text-pink-400" />,
      title: "Complete PDF Solutions",
      description: "From creation to distribution in one platform",
      gradient: "from-pink-500/20 via-pink-400/20 to-pink-300/20"
    },
    {
      icon: <Share size={32} className="text-cyan-400" />,
      title: "Easy Sharing",
      description: "Directly distribute to your student networks",
      gradient: "from-cyan-500/20 via-cyan-400/20 to-cyan-300/20"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">One Platform for All Your PDF Needs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 feature-card-hover relative rounded-3xl p-8 transition-all duration-300 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <GlowingEffect disabled={false} glow={true} />
              <div className="relative z-10">
                <div className="mb-6 bg-zinc-800 p-4 rounded-full inline-block group-hover:bg-zinc-700 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            onClick={() => window.location.href = '/task'} 
            className="bg-white text-black hover:bg-white/90 px-8 py-6 h-auto rounded-lg shadow-lg"
          >
            CREATE YOUR FIRST PDF NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
