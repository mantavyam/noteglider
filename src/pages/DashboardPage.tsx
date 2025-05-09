
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, BookOpen, ArrowRight } from 'lucide-react';

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

  // PDF type route navigation
  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-800 text-white overflow-hidden">
      {/* Top Navigation */}
      <div className="border-b border-neutral-700">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center mr-auto">
            <span className="text-2xl font-light tracking-widest mr-2">NOTE</span>
            <span className="text-2xl font-medium text-amber-500">GLIDER</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button className="text-neutral-400 hover:text-white transition-colors">
              Featured
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              Documents
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              Templates
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              Profile
            </button>
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
          <div className="border-l-4 border-amber-500 pl-4">
            <h1 className="text-3xl font-light tracking-wider">DOCUMENTS</h1>
          </div>

          <div className="space-y-8">
            {/* PDF Types Section */}
            <div>
              <h2 className="text-2xl font-light mb-6 text-neutral-200">BUILD ON DEMAND DOCUMENTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Newsletter Card */}
                <Card className="bg-neutral-900 border-neutral-700 hover:border-white transition-all group">
                  <CardHeader className="bg-gradient-to-r from-amber-900/30 to-amber-700/20 border-b border-neutral-700">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Newsletter</CardTitle>
                      <div className="w-8 h-8 flex items-center justify-center bg-amber-800/50 rounded-full">
                        <FileText className="h-4 w-4 text-amber-300" />
                      </div>
                    </div>
                    <CardDescription className="text-neutral-400">Daily Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-neutral-900 text-neutral-300">
                    <p className="text-sm">
                      Transform your teaching content into professional daily newsletters with the
                      current workflow.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-neutral-900 border-t border-neutral-800">
                    <button
                      onClick={() => navigateToRoute('/task')}
                      className="w-full flex items-center justify-between group-hover:bg-white/10 py-2 px-3 text-white transition-all"
                    >
                      <span>CREATE NEWSLETTER</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </CardFooter>
                </Card>

                {/* Compilation Card */}
                <Card className="bg-neutral-900 border-neutral-700 hover:border-white transition-all group">
                  <CardHeader className="bg-gradient-to-r from-blue-900/30 to-blue-700/20 border-b border-neutral-700">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Compilation</CardTitle>
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-800/50 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-300" />
                      </div>
                    </div>
                    <CardDescription className="text-neutral-400">Weekly Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-neutral-900 text-neutral-300">
                    <p className="text-sm">
                      Create comprehensive weekly compilations with a unique layout and structure adapting your Brand's Design.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-neutral-900 border-t border-neutral-800">
                    <button
                      onClick={() => navigateToRoute('/compilation')}
                      className="w-full flex items-center justify-between group-hover:bg-white/10 py-2 px-3 text-white transition-all"
                    >
                      <span>CREATE COMPILATION</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </CardFooter>
                </Card>

                {/* Magazine Card */}
                <Card className="bg-neutral-900 border-neutral-700 hover:border-white transition-all group">
                  <CardHeader className="bg-gradient-to-r from-purple-900/30 to-purple-700/20 border-b border-neutral-700">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white">Magazine</CardTitle>
                      <div className="w-8 h-8 flex items-center justify-center bg-purple-800/50 rounded-full">
                        <BookOpen className="h-4 w-4 text-purple-300" />
                      </div>
                    </div>
                    <CardDescription className="text-neutral-400">Monthly Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-neutral-900 text-neutral-300">
                    <p className="text-sm">
                      Build comprehensive monthly magazines with multiple specialized layouts for different sections.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-neutral-900 border-t border-neutral-800">
                    <button
                      onClick={() => navigateToRoute('/magazine')}
                      className="w-full flex items-center justify-between group-hover:bg-white/10 py-2 px-3 text-white transition-all"
                    >
                      <span>CREATE MAGAZINE</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* History Section */}
            <div>
              <h2 className="text-2xl font-light mb-6 text-neutral-200">HISTORY</h2>
              <Card className="bg-neutral-900 border-neutral-700">
                <CardHeader className="border-b border-neutral-800">
                  <CardTitle className="text-white text-lg font-light">Generated PDF Documents</CardTitle>
                  <CardDescription className="text-neutral-400">View your recently generated files</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-none">
                    <Table className="text-neutral-300">
                      <TableHeader>
                        <TableRow className="border-neutral-800 hover:bg-transparent">
                          <TableHead className="text-neutral-300 font-light">TYPE</TableHead>
                          <TableHead className="text-neutral-300 font-light">NAME</TableHead>
                          <TableHead className="text-neutral-300 font-light">SIZE</TableHead>
                          <TableHead className="text-neutral-300 font-light">PAGES</TableHead>
                          <TableHead className="text-neutral-300 font-light">ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockHistory.map((item, index) => (
                          <TableRow key={index} className="border-neutral-800 hover:bg-neutral-800/50">
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
                              <button className="text-neutral-400 hover:text-white transition-colors text-sm">DOWNLOAD</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
