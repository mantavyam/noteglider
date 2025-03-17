
import React from 'react';

const GrantsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-8 text-sm font-medium">GRANTS FOR BUILDERS</div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          The HAQQ Ecosystem Fund is a grants and<br />
          investment program designed to support<br />
          the growth of HAQQ Network and ISLM
        </h2>
        
        <p className="text-zinc-700 max-w-3xl mx-auto">
          Our focus on Web3 projects will ensure that the HAQQ
          Ecosystem remains at the forefront of blockchain technology.
        </p>
      </div>
    </section>
  );
};

export default GrantsSection;
