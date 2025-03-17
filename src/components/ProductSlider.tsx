
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  title: string;
  description: string;
  image: string;
  action: {
    text: string;
    link: string;
  };
  bgColor?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className={`rounded-3xl overflow-hidden p-8 ${product.bgColor || 'bg-zinc-900'} h-full flex flex-col`}>
      <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
      <p className="text-white/70 mb-8">{product.description}</p>
      
      <Button 
        variant="outline" 
        className="self-start rounded-full border-white/20 hover:bg-white/10 text-white"
      >
        {product.action.text}
      </Button>
      
      <div className="mt-auto pt-8">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

const ProductSlider: React.FC = () => {
  const products: Product[] = [
    {
      title: "ISLM",
      description: "HAQQ ecosystem utility token with full Shariah-compliance built-in for staking, yield generation, funds transfer through HAQQ wallet.",
      image: "/lovable-uploads/4c0d18b2-f25c-49b0-9dce-842bd2760824.png",
      action: {
        text: "BUY ISLM",
        link: "#"
      },
      bgColor: "bg-gradient-to-br from-black to-amber-950/50"
    },
    {
      title: "Debit card",
      description: "Spend ISLM and other crypto easy everytime with debit card.",
      image: "/lovable-uploads/61a13eb4-ba7a-4a85-9344-ba68454d9192.png",
      action: {
        text: "GET STARTED",
        link: "#"
      }
    },
    {
      title: "HAQQ Wallet",
      description: "A community-governed dApp marketplace for all ethical products, designed to meet the needs of the modern, conscientious users. Your gateway to halal finance.",
      image: "/lovable-uploads/9cbb9e19-dbc2-47ed-8335-0ab77c310b58.png",
      action: {
        text: "GET STARTED",
        link: "#"
      }
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Explore the products powered by<br />
            HAQQ Network
          </h2>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="rounded-full p-3 border-white/20 hover:bg-white/10"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full p-3 border-white/20 hover:bg-white/10"
              aria-label="Next slide"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
