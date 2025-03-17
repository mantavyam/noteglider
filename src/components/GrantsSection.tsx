
import React from 'react';

const GrantsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-8 text-sm font-medium">HOW IT WORKS</div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Three simple steps to transform<br />
          your teaching content into professional<br />
          study materials
        </h2>
        
        <p className="text-zinc-700 max-w-3xl mx-auto">
          Our automated process monitors your YouTube channel, converts your PPTX files,
          and delivers beautifully designed PDFs to help your students excel in competitive exams.
        </p>
      </div>
    </section>
  );
};

export default GrantsSection;
