
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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

const ProductSlider: React.FC = () => {
  const navigate = useNavigate();
  
  const products: Product[] = [
    {
      title: "Newsletter",
      description: "Daily Newsletters: Quick, up-to-date documents with essential question's highlights",
      image: "/landing-assets/landing-4.png",
      action: {
        text: "GET STARTED",
        link: "#"
      },
    },
    {
      title: "Compilation",
      description: "Weekly Compilations: A curated document covering review of past week's lessons",
      image: "/landing-assets/landing-3.png",
      action: {
        text: "GET STARTED",
        link: "#"
      }
    },
    {
      title: "Magazine",
      description: "Monthly Magazines: A comprehensive document grouping an entire month's data",
      image: "/landing-assets/landing-2.png",
      action: {
        text: "GET STARTED",
        link: "#"
      }
    }
  ];

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div className={`rounded-3xl overflow-hidden p-8 ${product.bgColor || 'bg-zinc-900'} h-full flex flex-col`}>
        <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
        <p className="text-white/70 mb-8">{product.description}</p>
        
        <Button 
          variant="outline" 
          className="self-start rounded-full border-white/20 hover:bg-white/10 text-white"
          onClick={() => navigate('/dashboard')}
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

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Explore the Documents offered by<br />
            NoteGlider
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
