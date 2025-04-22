
import React from 'react';

const Footer: React.FC = () => {
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
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d7714_1.svg" alt="Discord" className="h-20 w-20" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d7716_2.svg" alt="X" className="h-20 w-20" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d772c_3.svg" alt="Telegram" className="h-20 w-20" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d772f_4.svg" alt="YouTube" className="h-20 w-20" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d7720_5.svg" alt="Medium" className="h-20 w-20" />
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              <img src="https://cdn.prod.website-files.com/66eade0c3f9fa1dbb50d7697/66eade0c3f9fa1dbb50d7728_6.svg" alt="LinkedIn" className="h-20 w-20" />
            </a>
          </div>
        </div>
      </div>
      
      <footer className="bg-black border-t border-white/10 pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-4">
              <img 
                src="/noteglider-logo-dark.png" 
                alt="NoteGlider" 
                className="h-6 w-6"
              />
            </div>
            <div className="text-xl font-bold">NoteGlider</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 md:flex space-y-6 md:space-y-0 md:space-x-16">
              <div className="space-y-4">
                <div className="text-white/70 hover:text-white transition-colors">API</div>
                <div className="text-white/70 hover:text-white transition-colors">Documents</div>
                <div className="text-white/70 hover:text-white transition-colors">Automation</div>
                <div className="text-white/70 hover:text-white transition-colors">Ecosystem</div>
                <div className="text-white/70 hover:text-white transition-colors">Platform</div>
                <div className="text-white/70 hover:text-white transition-colors">Builders</div>
                <div className="text-white/70 hover:text-white transition-colors">Funding</div>
              </div>
              
              <div className="space-y-4">
                <div className="text-white/70 hover:text-white transition-colors">Our mission</div>
                <div className="text-white/70 hover:text-white transition-colors">Blog</div>
                <div className="text-white/70 hover:text-white transition-colors">Whitepaper</div>
                <div className="text-white/70 hover:text-white transition-colors">Community</div>
                <div className="text-white/70 hover:text-white transition-colors">Career</div>
                <div className="text-white/70 hover:text-white transition-colors">Branding</div>
                <div className="text-white/70 hover:text-white transition-colors">Docs</div>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-4">
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/color/48/discord-logo.png" alt="Discord" className="h-6 w-6 mr-3" />
                Discord
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/color/48/twitter--v1.png" alt="Twitter" className="h-6 w-6 mr-3" />
                Twitter
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/color/48/telegram-app.png" alt="Telegram" className="h-6 w-6 mr-3" />
                Telegram
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/color/48/youtube-play.png" alt="Youtube" className="h-6 w-6 mr-3" />
                Youtube
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/badges/48/medium-monogram.png" alt="Medium" className="h-6 w-6 mr-3" />
                Medium
              </a>
              <a href="#" className="flex items-center text-white/70 hover:text-white transition-colors">
                <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" className="h-6 w-6 mr-3" />
                LinkedIn
              </a>
            </div>
            
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-6">Sign up for NoteGlider updates</h3>
              
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

export default Footer;
