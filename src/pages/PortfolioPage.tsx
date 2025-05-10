
import React from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, BookOpen } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 to-black opacity-90"></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Navigation Tray */}
      <div className="relative z-20">
        <NavigationTray />

        <div className="container mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Portfolio Header */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-red-600 mr-3"></div>
                <h2 className="text-2xl font-light tracking-wider">SERVICE PORTFOLIO</h2>
              </div>

              <Tabs defaultValue="newsletter" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-800 text-zinc-400">
                  <TabsTrigger value="newsletter" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Newsletter</TabsTrigger>
                  <TabsTrigger value="compilation" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Compilation</TabsTrigger>
                  <TabsTrigger value="magazine" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Magazine</TabsTrigger>
                </TabsList>

                {/* Newsletter Tab */}
                <TabsContent value="newsletter" className="mt-6">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <FileText className="w-10 h-10 text-red-500" />
                        <div>
                          <CardTitle className="text-xl">Newsletter Service</CardTitle>
                          <CardDescription className="text-zinc-400">
                            Daily content delivery service for your audience
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-zinc-300">
                          Our newsletter service provides a streamlined solution for creating and distributing daily content to your subscribers.
                          With customizable templates and automated delivery systems, you can maintain consistent communication with your audience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Features</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Daily automated publishing</li>
                              <li>Customizable templates</li>
                              <li>Content scheduling</li>
                              <li>Analytics and tracking</li>
                            </ul>
                          </div>

                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Benefits</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Increased audience engagement</li>
                              <li>Consistent brand presence</li>
                              <li>Time-saving automation</li>
                              <li>Targeted content delivery</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Compilation Tab */}
                <TabsContent value="compilation" className="mt-6">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-10 h-10 text-blue-500" />
                        <div>
                          <CardTitle className="text-xl">Compilation Service</CardTitle>
                          <CardDescription className="text-zinc-400">
                            Weekly content compilations for comprehensive updates
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-zinc-300">
                          The Compilation service aggregates and organizes your weekly content into a cohesive package that provides
                          value to your subscribers. Perfect for delivering comprehensive weekly updates and maintaining engagement.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Features</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Weekly content aggregation</li>
                              <li>Organized sections and categories</li>
                              <li>Custom formatting options</li>
                              <li>Interactive table of contents</li>
                            </ul>
                          </div>

                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Benefits</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Comprehensive content delivery</li>
                              <li>Reduced content fragmentation</li>
                              <li>Improved reader retention</li>
                              <li>Higher perceived value</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Magazine Tab */}
                <TabsContent value="magazine" className="mt-6">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <BookOpen className="w-10 h-10 text-purple-500" />
                        <div>
                          <CardTitle className="text-xl">Magazine Service</CardTitle>
                          <CardDescription className="text-zinc-400">
                            Premium monthly editorial content in magazine format
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-zinc-300">
                          Our Magazine service transforms your content into professional, visually stunning monthly publications.
                          With advanced layout options and premium design elements, you can deliver an immersive reading experience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Features</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Professional layout and design</li>
                              <li>Advanced formatting options</li>
                              <li>Multi-section organization</li>
                              <li>Rich media integration</li>
                            </ul>
                          </div>

                          <div className="bg-zinc-700 p-4 rounded-md">
                            <h3 className="font-medium mb-2">Benefits</h3>
                            <ul className="list-disc list-inside space-y-1 text-zinc-300 text-sm">
                              <li>Premium content presentation</li>
                              <li>Enhanced reader experience</li>
                              <li>Brand authority building</li>
                              <li>Potential for monetization</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
