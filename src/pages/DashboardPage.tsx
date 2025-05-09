
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, BookOpen, ArrowRight, Home, Box, Download } from 'lucide-react';

interface HistoryItem {
  type: 'NEWSLETTER' | 'COMPILATION' | 'MAGAZINE';
  name: string;
  size: string;
  pages: number;
}

// Mock data for demonstration
const mockHistory: HistoryItem[] = [
  { type: 'NEWSLETTER', name: 'Daily Update April 15', size: '2.4 MB', pages: 5 },
  { type: 'COMPILATION', name: 'Weekly Digest Apr 8-14', size: '4.8 MB', pages: 12 },
  { type: 'MAGAZINE', name: 'Monthly Edition March', size: '10.2 MB', pages: 28 },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white overflow-hidden">
      {/* Top Navigation Tray */}
      <div className="border-b border-zinc-700 bg-black">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex space-x-1">
            <button 
              className="px-6 py-4 text-white bg-red-600 hover:bg-red-700 transition-colors"
              onClick={() => navigateToRoute('/dashboard')}
            >
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>HOME</span>
              </div>
            </button>
            
            <button 
              className="px-6 py-4 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigateToRoute('/task')}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>TASKS</span>
              </div>
            </button>
            
            <button 
              className="px-6 py-4 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigateToRoute('/build')}
            >
              <div className="flex items-center space-x-2">
                <Box className="w-5 h-5" />
                <span>BUILD</span>
              </div>
            </button>
            
            <button 
              className="px-6 py-4 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              onClick={() => navigateToRoute('/download')}
            >
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>DOWNLOAD</span>
              </div>
            </button>
          </div>
          
          <div className="flex items-center pr-4">
            <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
            <span className="text-xs text-zinc-400">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>
      
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
              <h2 className="text-2xl font-light tracking-wider">BUILD ON DEMAND DOCUMENTS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Newsletter Card */}
              <div 
                className="bg-zinc-800 border border-zinc-700 hover:border-red-600 cursor-pointer overflow-hidden group"
                onClick={() => navigateToRoute('/task')}
              >
                <div className="h-48 bg-gradient-to-b from-zinc-700 to-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-zinc-500 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-zinc-700">
                  <div>
                    <h3 className="text-lg font-medium">Newsletter</h3>
                    <p className="text-xs text-zinc-400">Daily Content</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Compilation Card */}
              <div 
                className="bg-zinc-800 border border-zinc-700 hover:border-red-600 cursor-pointer overflow-hidden group"
                onClick={() => navigateToRoute('/compilation')}
              >
                <div className="h-48 bg-gradient-to-b from-zinc-700 to-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-zinc-500 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-zinc-700">
                  <div>
                    <h3 className="text-lg font-medium">Compilation</h3>
                    <p className="text-xs text-zinc-400">Weekly Content</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Magazine Card */}
              <div 
                className="bg-zinc-800 border border-zinc-700 hover:border-red-600 cursor-pointer overflow-hidden group"
                onClick={() => navigateToRoute('/magazine')}
              >
                <div className="h-48 bg-gradient-to-b from-zinc-700 to-zinc-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-zinc-500 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-zinc-700">
                  <div>
                    <h3 className="text-lg font-medium">Magazine</h3>
                    <p className="text-xs text-zinc-400">Monthly Content</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">HISTORY</h2>
            </div>
            
            <div className="bg-zinc-800 border border-zinc-700">
              <div className="border-b border-zinc-700 p-4">
                <h3 className="text-lg font-medium">Generated PDF Documents</h3>
                <p className="text-xs text-zinc-400">View your recently generated files</p>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-transparent">
                      <TableHead className="text-zinc-400">TYPE</TableHead>
                      <TableHead className="text-zinc-400">NAME</TableHead>
                      <TableHead className="text-zinc-400">SIZE</TableHead>
                      <TableHead className="text-zinc-400">PAGES</TableHead>
                      <TableHead className="text-zinc-400">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHistory.map((item, index) => (
                      <TableRow key={index} className="border-zinc-700 hover:bg-zinc-700">
                        <TableCell className="font-medium">
                          <span
                            className={`px-2 py-1 text-xs font-medium
                              ${item.type === 'NEWSLETTER' ? 'text-amber-300' :
                                item.type === 'COMPILATION' ? 'text-blue-300' :
                                  'text-purple-300'}`}
                          >
                            {item.type}
                          </span>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.pages}</TableCell>
                        <TableCell>
                          <button className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center">
                            <span className="mr-1">DOWNLOAD</span>
                            <Download className="h-3 w-3" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
