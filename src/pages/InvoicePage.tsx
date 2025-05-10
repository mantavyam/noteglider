
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationTray from '../components/NavigationTray';
import { Calendar } from '@/components/ui/calendar';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
}

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
}

const mockClients: Client[] = [
  { id: '1', name: 'John Smith', company: 'Smith Enterprises', email: 'john@smith.com' },
  { id: '2', name: 'Sarah Johnson', company: 'Johnson Industries', email: 'sarah@johnson.com' },
  { id: '3', name: 'Michael Brown', company: 'Brown Solutions', email: 'michael@brown.com' },
];

const mockBankAccounts: BankAccount[] = [
  { id: '1', name: 'Main Business Account', accountNumber: '****3456', bankName: 'First National Bank' },
  { id: '2', name: 'Secondary Account', accountNumber: '****7890', bankName: 'Global Banking Group' },
];

const InvoicePage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>('');
  const [showGenerateSuccess, setShowGenerateSuccess] = useState(false);

  const handleGenerateInvoice = () => {
    // In a real app, this would generate and download the invoice
    setShowGenerateSuccess(true);
    setTimeout(() => setShowGenerateSuccess(false), 3000);
  };

  const isFormValid = date && selectedClient && selectedBankAccount;

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 to-black opacity-90"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Navigation Tray */}
      <NavigationTray />
      
      <div className="container mx-auto px-4 py-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Invoice Header */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-red-600 mr-3"></div>
              <h2 className="text-2xl font-light tracking-wider">INVOICE GENERATOR</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-800 border-zinc-700 text-white">
                <CardHeader>
                  <CardTitle>Select Month</CardTitle>
                  <CardDescription className="text-zinc-400">Choose the invoice period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-zinc-700 border-zinc-600 hover:bg-zinc-600",
                            !date && "text-zinc-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'MMMM yyyy') : <span>Select month</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="p-3 pointer-events-auto bg-zinc-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800 border-zinc-700 text-white">
                <CardHeader>
                  <CardTitle>Select Client</CardTitle>
                  <CardDescription className="text-zinc-400">Choose the invoice recipient</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={setSelectedClient}>
                    <SelectTrigger className="w-full bg-zinc-700 border-zinc-600">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id} className="hover:bg-zinc-700 focus:bg-zinc-700">
                          {client.name} - {client.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedClient && (
                    <div className="mt-4 p-3 bg-zinc-700 rounded-md">
                      <p className="text-sm font-medium">
                        {mockClients.find(c => c.id === selectedClient)?.company}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {mockClients.find(c => c.id === selectedClient)?.email}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800 border-zinc-700 text-white">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription className="text-zinc-400">Select payment account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={setSelectedBankAccount}>
                    <SelectTrigger className="w-full bg-zinc-700 border-zinc-600">
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      {mockBankAccounts.map(account => (
                        <SelectItem key={account.id} value={account.id} className="hover:bg-zinc-700 focus:bg-zinc-700">
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedBankAccount && (
                    <div className="mt-4 p-3 bg-zinc-700 rounded-md">
                      <p className="text-sm font-medium">
                        {mockBankAccounts.find(a => a.id === selectedBankAccount)?.bankName}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Account: {mockBankAccounts.find(a => a.id === selectedBankAccount)?.accountNumber}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
                disabled={!isFormValid}
                onClick={handleGenerateInvoice}
              >
                <Download className="mr-2 h-5 w-5" />
                GENERATE INVOICE
              </Button>
            </div>
            
            {showGenerateSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-600 text-white p-4 rounded text-center mt-4"
              >
                Invoice generated successfully! Download started.
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoicePage;
