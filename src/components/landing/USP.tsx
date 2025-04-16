
import React from 'react';

const USP: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Why to choose NoteGlider?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-zinc-900/50 rounded-3xl p-10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-5">
              Smart Conversion & Processing
              </h3>
              <p className="text-white/70">
              Our backend engine converts your PPTX into a structured Google Docs format.
              Dynamic Template Application:
              </p>
            </div>
          </div>
          
          <div className="bg-zinc-900/50 rounded-3xl p-10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-5">
              Instant Delivery & Tracking
              </h3>
              <p className="text-white/70">
              Real-Time Dashboard to Monitor every stage of your document’s journey—from processing to final delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USP;
