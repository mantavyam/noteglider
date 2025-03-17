
import React from 'react';
import { 
  Wallet, 
  Star, 
  Globe, 
  TrendingUp, 
  RefreshCcw, 
  CircleDollarSign 
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureGrid: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Wallet size={32} />,
      title: "Crypto for everyday",
      description: "use with smooth and safe transactions"
    },
    {
      icon: <Star size={32} />,
      title: "Halal yield",
      description: "that aligns with your ethical values"
    },
    {
      icon: <Globe size={32} />,
      title: "Send and receive money globally",
      description: "with low fees and high speed"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Staking",
      description: "opportunities to earn rewards"
    },
    {
      icon: <RefreshCcw size={32} />,
      title: "P2P lending",
      description: "while complying with Shariah laws"
    },
    {
      icon: <CircleDollarSign size={32} />,
      title: "Integrated Zakat & Charity",
      description: "donation services"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-3xl p-8 hover:bg-zinc-800 transition-colors"
            >
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
          COMING IN Q3 2024
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
