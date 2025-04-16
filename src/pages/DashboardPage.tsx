
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/landing/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="space-y-8">
            {/* PDF Types Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Build On Demand Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Newsletter Card */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-black">Newsletter</CardTitle>
                      <FileText className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardDescription>Daily Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-white">
                    <p className="text-sm text-gray-600">
                      Transform your teaching content into professional daily newsletters with the
                      current workflow.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-white">
                    <Button
                      className="w-full bg-black hover:bg-black/80 text-white"
                      onClick={() => navigateToRoute('/task')}
                    >
                      Create Newsletter
                    </Button>
                  </CardFooter>
                </Card>

                {/* Compilation Card */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-black">Compilation</CardTitle>
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardDescription>Weekly Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-white">
                    <p className="text-sm text-gray-600">
                      Create comprehensive weekly compilations with a unique layout and structure adapting your Brand's Design.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-white">
                    <Button
                      className="w-full bg-black hover:bg-black/80 text-white"
                      onClick={() => navigateToRoute('/compilation')}
                    >
                      Create Compilation
                    </Button>
                  </CardFooter>
                </Card>

                {/* Magazine Card */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-black">Magazine</CardTitle>
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardDescription>Monthly Content</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 pb-2 bg-white">
                    <p className="text-sm text-gray-600">
                      Build comprehensive monthly magazines with multiple specialized layouts for different sections.
                    </p>
                  </CardContent>
                  <CardFooter className="bg-white">
                    <Button
                      className="w-full bg-black hover:bg-black/80 text-white"
                      onClick={() => navigateToRoute('/magazine')}
                    >
                      Create Magazine
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* History Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">History</h2>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Generated PDFs History</CardTitle>
                  <CardDescription>View your recently generated PDF files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table className='text-black'>
                      <TableHeader>
                        <TableRow className='text-black'>
                          <TableHead className='text-black'>Type</TableHead>
                          <TableHead className='text-black'>Name</TableHead>
                          <TableHead className='text-black'>Size</TableHead>
                          <TableHead className='text-black'>Pages</TableHead>
                          <TableHead className='text-black'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockHistory.map((item, index) => (
                          <TableRow key={index} className='hover:bg-gray-100'>
                            <TableCell className="font-medium">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold
                                  ${item.type === 'NEWSLETTER' ? 'bg-amber-100 text-amber-800' :
                                    item.type === 'COMPILATION' ? 'bg-blue-100 text-blue-800' :
                                      'bg-purple-100 text-purple-800'}`}
                              >
                                {item.type}
                              </span>
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.pages}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Download</Button>
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
    </Layout>
  );
};

export default DashboardPage;
