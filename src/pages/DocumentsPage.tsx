
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { FileText, Calendar, BookOpen, ArrowRight } from 'lucide-react';

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();

  const documents = [
    { 
      title: 'Newsletter', 
      description: 'Daily Content', 
      icon: FileText, 
      path: '/task'
    },
    { 
      title: 'Compilation', 
      description: 'Weekly Content', 
      icon: Calendar, 
      path: '/compilation'
    },
    { 
      title: 'Magazine', 
      description: 'Monthly Content', 
      icon: BookOpen, 
      path: '/magazine'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-hidden">
      {/* Navigation Tray */}
      <NavigationTray />
      
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Document Types Grid */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">DOCUMENT TYPES</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documents.map((doc, index) => (
                <div 
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 hover:border-red-600 cursor-pointer overflow-hidden group"
                  onClick={() => navigate(doc.path)}
                >
                  <div className="h-48 bg-gradient-to-b from-zinc-700 to-zinc-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <doc.icon className="w-16 h-16 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-zinc-700">
                    <div>
                      <h3 className="text-lg font-medium">{doc.title}</h3>
                      <p className="text-xs text-zinc-400">{doc.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentsPage;
