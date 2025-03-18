
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GrantsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-8 text-sm font-medium">HOW IT WORKS</div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Three simple steps to transform<br />
          your teaching content into professional<br />
          study materials
        </h2>
        
        <p className="text-zinc-700 max-w-3xl mx-auto mb-8">
          Our automated process monitors your YouTube channel, converts your PPTX files,
          and delivers beautifully designed PDFs to help your students excel in competitive exams.
        </p>

        <Button 
          className="bg-black hover:bg-black/90 text-white rounded-lg px-8 py-6"
          onClick={() => navigate('/task')}
        >
          Start Creating Now
        </Button>
      </div>
    </section>
  );
};

export default GrantsSection;
