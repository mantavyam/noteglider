
import React from 'react';
import { Button } from '@/components/ui/button';

const CommunitySection: React.FC = () => {
  return (
    <section className="pt-24 pb-0 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="mb-4 text-sm font-medium">NOTEGLIDER PROCESSES 100+ DOCUMENTS DAILY</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Integrate NoteGlider's Document<br />
            Content Automation System
          </h2>
          
          <div className="flex justify-center mt-16 space-x-12">
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="Discord" className="h-10 w-10" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="X" className="h-10 w-10" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="Telegram" className="h-10 w-10" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="YouTube" className="h-10 w-10" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="Medium" className="h-10 w-10" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="/placeholder.svg" alt="LinkedIn" className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>
      
      <footer className="bg-black border-t border-white/10 pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-4">
              <img 
                src="/placeholder.svg" 
                alt="HAQQ" 
                className="h-6 w-6"
              />
            </div>
            <div className="text-xl font-bold">HAQQ</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 md:flex space-y-6 md:space-y-0 md:space-x-16">
              <div className="space-y-4">
                <div className="text-white/70 hover:text-white transition-colors">ISLM token</div>
                <div className="text-white/70 hover:text-white transition-colors">HAQQ Wallet</div>
                <div className="text-white/70 hover:text-white transition-colors">ISLM Debit card</div>
                <div className="text-white/70 hover:text-white transition-colors">Ecosystem</div>
                <div className="text-white/70 hover:text-white transition-colors">Platform</div>
                <div className="text-white/70 hover:text-white transition-colors">Builders</div>
                <div className="text-white/70 hover:text-white transition-colors">Grants & Funding</div>
              </div>
              
              <div className="space-y-4">
                <div className="text-white/70 hover:text-white transition-colors">Our mission</div>
                <div className="text-white/70 hover:text-white transition-colors">Blog</div>
                <div className="text-white/70 hover:text-white transition-colors">Whitepaper</div>
                <div className="text-white/70 hover:text-white transition-colors">Community</div>
                <div className="text-white/70 hover:text-white transition-colors">Career</div>
                <div className="text-white/70 hover:text-white transition-colors">Brand Assets</div>
                <div className="text-white/70 hover:text-white transition-colors">Docs</div>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-4">
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="Discord" className="h-6 w-6 mr-3" />
                Discord
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="Twitter" className="h-6 w-6 mr-3" />
                Twitter
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="Telegram" className="h-6 w-6 mr-3" />
                Telegram
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="YouTube" className="h-6 w-6 mr-3" />
                YouTube
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="Medium" className="h-6 w-6 mr-3" />
                Medium
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="/placeholder.svg" alt="LinkedIn" className="h-6 w-6 mr-3" />
                LinkedIn
              </a>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-6">Sign up for HAQQ updates</h3>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full name" 
                  className="w-full bg-zinc-900 rounded-md px-4 py-3 border border-white/10 focus:outline-none focus:border-white/30"
                />
                <input 
                  type="email" 
                  placeholder="Enter your e-mail" 
                  className="w-full bg-zinc-900 rounded-md px-4 py-3 border border-white/10 focus:outline-none focus:border-white/30"
                />
                <div className="w-full bg-zinc-900 rounded-md px-4 py-3 border border-white/10 focus:outline-none focus:border-white/30">
                  Country
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>Success!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CommunitySection;
