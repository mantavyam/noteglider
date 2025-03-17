
import React from 'react';
import { Button } from '@/components/ui/button';

const DeveloperSection: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Design and propel your<br />
          product innovation using<br />
          familiar tools
        </h2>
        
        <p className="text-white/70 max-w-3xl mx-auto mb-10">
          HAQQ Network is a scalable, high-throughput Proof-of-Stake 
          blockchain that is fully compatible and interoperable with 
          Ethereum. Build Shariah-compliant products on time-tested 
          technology fully compatible with the rest of Web3.
        </p>
        
        <Button 
          variant="outline" 
          className="rounded-full border-white/20 hover:bg-white/10 text-white mb-20"
        >
          PLATFORM
        </Button>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-24 h-12 bg-black">
                <img 
                  src="/placeholder.svg" 
                  alt={`Partner ${index + 1}`} 
                  className="w-full h-full object-contain opacity-70"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
