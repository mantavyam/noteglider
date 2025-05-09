
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaskPage from "./pages/TaskPage";
import BuildPage from "./pages/BuildPage";
import DownloadPage from "./pages/DownloadPage";
import DashboardPage from "./pages/DashboardPage";
import CompilationPage from "./pages/CompilationPage";
import MagazinePage from "./pages/MagazinePage";
import NotFound from "./pages/NotFound";
import React from "react";

// Create a new query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/task" element={<TaskPage />} />
              <Route path="/build" element={<BuildPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/compilation" element={<CompilationPage />} />
              <Route path="/magazine" element={<MagazinePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
