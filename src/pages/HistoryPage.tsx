
import React from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';
import { checkBackendStatus } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import HitmanLayout from '../components/HitmanLayout';

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
  { type: 'NEWSLETTER', name: 'Daily Update April 16', size: '2.1 MB', pages: 4 },
  { type: 'COMPILATION', name: 'Weekly Digest Apr 15-21', size: '5.3 MB', pages: 14 },
  { type: 'MAGAZINE', name: 'Monthly Edition February', size: '9.7 MB', pages: 26 },
];

const HistoryPage: React.FC = () => {
  return (
    <HitmanLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">DOCUMENT HISTORY</h2>
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
    </HitmanLayout>
  );
};

export default HistoryPage;
