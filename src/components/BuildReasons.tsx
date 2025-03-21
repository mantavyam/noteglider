
import React from 'react';

const BuildReasons: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Why to choose NoteGlider?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-zinc-900/50 rounded-3xl p-10 relative overflow-hidden">
            {/* Decorative line elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
            </div>
            
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
            {/* Decorative dot elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="flex justify-between items-center absolute top-1/2 left-0 right-0">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-white' : 'bg-white/30'}`}
                  ></div>
                ))}
              </div>
            </div>
            
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

export default BuildReasons;
