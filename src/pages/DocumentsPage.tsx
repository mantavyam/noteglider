
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { useNavigate } from 'react-router-dom';

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDocType, setSelectedDocType] = useState(0);

  const documents = [
    { 
      id: 0,
      title: 'NEWSLETTER', 
      subTitle: 'Daily Notes',
      path: '/task',
      image: 'https://images.pexels.com/photos/2169857/pexels-photo-2169857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: "NEWSLETTER"
    },
    { 
      id: 1,
      title: 'COMPILATION', 
      subTitle: 'Weekly Compilation',
      path: '/compilation',
      image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'COMPILATION'
    },
    { 
      id: 2,
      title: 'MAGAZINE', 
      subTitle: 'Monthly Outlook',
      path: '/magazine',
      image: 'https://images.pexels.com/photos/2131856/pexels-photo-2131856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'MAGAZINE'
    }
  ];

  const activeDocument = documents[selectedDocType];

  const handleDocumentSelect = (id: number) => {
    setSelectedDocType(id);
  };

  const handleDocumentNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-hidden">
      {/* Full screen background image for selected document */}
      <motion.div 
        key={activeDocument.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-0"
      >
        <img 
          src={activeDocument.image} 
          alt={activeDocument.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </motion.div>
      
      {/* Content with proper z-index */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Tray */}
        <NavigationTray />
        
        {/* Flex spacer */}
        <div className="flex-1"></div>
        
        {/* Bottom document selection */}
        <div className="flex items-stretch">
          {documents.map((doc, index) => {
            const isActive = selectedDocType === index;
            
            return (
              <div 
                key={index}
                className={`flex-1 cursor-pointer transition-all ${
                  isActive ? 'border-t-4 border-red-600' : ''
                } ${index > 0 ? 'ml-px' : ''}`}
                onClick={() => handleDocumentSelect(index)}
              >
                <div className={`px-4 py-6 ${
                  isActive ? 'bg-red-600' : 'bg-white'
                }`}>
                  <div className="text-xs font-bold mb-1 tracking-wider" style={{ 
                    color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'
                  }}>
                    {doc.subTitle}
                  </div>
                  <h3 className={`text-xl font-bold tracking-wide ${
                    isActive ? 'text-white' : 'text-black'
                  }`}>
                    {doc.location}
                  </h3>
                </div>
                <div 
                  className="bg-red-600 flex items-center justify-end cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDocumentNavigate(doc.path);
                  }}
                  style={{ 
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <span className="text-white font-semibold">START</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
