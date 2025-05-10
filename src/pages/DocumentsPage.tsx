
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDocType, setSelectedDocType] = useState(0);

  const documents = [
    { 
      id: 0,
      title: 'NEWSLETTER', 
      subTitle: 'NEW ZEALAND',
      description: 'Daily Content', 
      icon: FileText, 
      path: '/task',
      image: 'https://source.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      location: "HAWKE'S BAY"
    },
    { 
      id: 1,
      title: 'COMPILATION', 
      subTitle: 'USA',
      description: 'Weekly Content', 
      icon: Calendar, 
      path: '/compilation',
      image: 'https://source.unsplash.com/photo-1531297484001-80022131f5a1',
      location: 'MIAMI'
    },
    { 
      id: 2,
      title: 'MAGAZINE', 
      subTitle: 'COLOMBIA',
      description: 'Monthly Content', 
      icon: BookOpen, 
      path: '/magazine',
      image: 'https://source.unsplash.com/photo-1470813740244-df37b8c1edcb',
      location: 'SANTA FORTUNA'
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
      {/* Navigation Tray */}
      <NavigationTray />
      
      <div className="relative h-[calc(100vh-180px)]">
        {/* Full screen background image for selected document */}
        <motion.div 
          key={activeDocument.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={activeDocument.image} 
            alt={activeDocument.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </motion.div>
        
        {/* Bottom document selection */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-stretch">
          {documents.map((doc, index) => {
            const isActive = selectedDocType === index;
            
            return (
              <div 
                key={index}
                className={`flex-1 cursor-pointer transition-all ${
                  isActive ? 'border-t-4 border-red-600' : ''
                }`}
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
              </div>
            );
          })}
        </div>

        {/* Document info overlay */}
        <div className="absolute left-10 bottom-32 z-20">
          <motion.div
            key={activeDocument.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/60 inline-block p-3 mb-4">
              <activeDocument.icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-2">{activeDocument.title}</h1>
            <div className="flex space-x-2 items-center">
              <button 
                className="px-6 py-2 bg-red-600 text-white flex items-center justify-center space-x-2 hover:bg-red-700"
                onClick={() => handleDocumentNavigate(activeDocument.path)}
              >
                <span>START</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-white/80">{activeDocument.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Stats Bar - similar to Hitman UI */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 py-3 px-8 border-t border-zinc-800">
        <div className="flex items-center space-x-8 text-xs text-zinc-400">
          <span>TOTAL COMPLETION 0%</span>
          <span>DOCUMENTS CREATED 0 / 131</span>
          <span>PROJECT STATUS 0 / 7</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
