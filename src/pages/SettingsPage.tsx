
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Computer, Moon, Sun, UserPlus, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, save settings to user preferences
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

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
          {/* Settings Header */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">SYSTEM SETTINGS</h2>
            </div>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-800 text-zinc-400 mb-6">
                <TabsTrigger value="general" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  General
                </TabsTrigger>
                <TabsTrigger value="account" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Account
                </TabsTrigger>
                <TabsTrigger value="clients" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Client Management
                </TabsTrigger>
              </TabsList>
              
              {/* General Settings Tab */}
              <TabsContent value="general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Customize how the application looks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="font-medium">Theme</div>
                        <div className="flex flex-wrap gap-4">
                          <Button 
                            variant={theme === 'light' ? 'default' : 'outline'}
                            className={theme === 'light' ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-700 border-zinc-600'}
                            onClick={() => setTheme('light')}
                          >
                            <Sun className="h-5 w-5 mr-2" />
                            Light
                          </Button>
                          <Button 
                            variant={theme === 'dark' ? 'default' : 'outline'}
                            className={theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-700 border-zinc-600'}
                            onClick={() => setTheme('dark')}
                          >
                            <Moon className="h-5 w-5 mr-2" />
                            Dark
                          </Button>
                          <Button 
                            variant={theme === 'system' ? 'default' : 'outline'}
                            className={theme === 'system' ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-700 border-zinc-600'}
                            onClick={() => setTheme('system')}
                          >
                            <Computer className="h-5 w-5 mr-2" />
                            System
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="font-medium">Display Options</div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="compact-view">Compact View</Label>
                            <Switch 
                              id="compact-view" 
                              checked={compactView} 
                              onCheckedChange={setCompactView}
                              className="data-[state=checked]:bg-red-600"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Configure how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Switch 
                            id="email-notifications" 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications}
                            className="data-[state=checked]:bg-red-600"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-save">Auto Save</Label>
                          <Switch 
                            id="auto-save" 
                            checked={autoSave} 
                            onCheckedChange={setAutoSave}
                            className="data-[state=checked]:bg-red-600"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Account Tab */}
              <TabsContent value="account">
                <Card className="bg-zinc-800 border-zinc-700 text-white">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" className="bg-zinc-700 border-zinc-600" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john@example.com" className="bg-zinc-700 border-zinc-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" defaultValue="Acme Corporation" className="bg-zinc-700 border-zinc-600" />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Client Management Tab */}
              <TabsContent value="clients">
                <Card className="bg-zinc-800 border-zinc-700 text-white">
                  <CardHeader>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Add and manage clients for your documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-6">
                      <Button className="bg-red-600 hover:bg-red-700">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New Client
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-700 rounded-md flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Smith Enterprises</h4>
                          <p className="text-sm text-zinc-400">John Smith - john@smith.com</p>
                        </div>
                        <Button variant="outline" className="bg-zinc-600 border-zinc-500">Edit</Button>
                      </div>
                      <div className="p-4 bg-zinc-700 rounded-md flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Johnson Industries</h4>
                          <p className="text-sm text-zinc-400">Sarah Johnson - sarah@johnson.com</p>
                        </div>
                        <Button variant="outline" className="bg-zinc-600 border-zinc-500">Edit</Button>
                      </div>
                      <div className="p-4 bg-zinc-700 rounded-md flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Brown Solutions</h4>
                          <p className="text-sm text-zinc-400">Michael Brown - michael@brown.com</p>
                        </div>
                        <Button variant="outline" className="bg-zinc-600 border-zinc-500">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end mt-8">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                onClick={handleSaveSettings}
              >
                <Save className="mr-2 h-5 w-5" />
                SAVE SETTINGS
              </Button>
            </div>
            
            {savedSettings && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-600 text-white p-4 rounded text-center mt-4"
              >
                Settings saved successfully!
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
