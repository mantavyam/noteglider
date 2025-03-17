
import React from 'react';
import { Button } from '@/components/ui/button';

const WalletSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm font-medium">OVER 1.4 MILLION USERS ALREADY TRUST HAQQ WALLET</div>
        <h2 className="text-5xl md:text-6xl font-bold mb-6">One App for Everything Crypto</h2>
        
        <p className="text-zinc-700 max-w-2xl mx-auto mb-10">
          HAQQ Wallet is a community-governed dApp marketplace.<br />
          A hub for all ethical products, designed to meet the needs of<br />
          the modern, conscientious users
        </p>
        
        <div className="flex justify-center space-x-8 mb-16">
          <Button className="bg-black hover:bg-black/90 text-white rounded-lg">
            <img src="/placeholder.svg" alt="Apple" className="w-5 h-5 mr-2" />
            Download on the<br />App Store
          </Button>
          
          <Button className="bg-black hover:bg-black/90 text-white rounded-lg">
            <img src="/placeholder.svg" alt="Google Play" className="w-5 h-5 mr-2" />
            GET IT ON<br />Google Play
          </Button>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/75a05867-f430-4592-9140-d7bd68cda560.png" 
            alt="HAQQ Wallet App" 
            className="max-w-full h-auto md:max-w-md"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-16 h-16 bg-gray-100 rounded-md"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalletSection;
