
import React from 'react';
import NavigationTray from './NavigationTray';
import { useNavigate } from 'react-router-dom';
import { checkBackendStatus } from '@/services/api';

interface HitmanLayoutProps {
  children: React.ReactNode;
}

const HitmanLayout: React.FC<HitmanLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [backendConnected, setBackendConnected] = React.useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = React.useState(true);

  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        setIsCheckingBackend(true);
        const status = await checkBackendStatus();
        setBackendConnected(status.status === 'online');
      } catch (error) {
        setBackendConnected(false);
      } finally {
        setIsCheckingBackend(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden relative">
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
      <div className="relative z-10 mt-10">
        <NavigationTray />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-zinc-800 py-3 px-6 flex justify-between items-center">
        <div 
          onClick={() => navigate('/')} 
          className="text-lg font-bold tracking-wider cursor-pointer hover:text-red-500 transition-colors"
        >
          NOTESGLIDER
        </div>
        
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'} mr-2 animate-pulse`}></div>
          <span className="text-xs text-zinc-400">
            {isCheckingBackend ? 'CHECKING SYSTEM...' : backendConnected ? 'SYSTEM ACTIVE' : 'SYSTEM INACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HitmanLayout;
