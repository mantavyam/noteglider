
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Newsletter from "./pages/NewsletterPage";
import BuildPage from "./pages/BuildPage";
import DownloadPage from "./pages/DownloadPage";
import DashboardPage from "./pages/DashboardPage";
import CompilationPage from "./pages/CompilationPage";
import MagazinePage from "./pages/MagazinePage";
import NotFound from "./pages/NotFound";
import DocumentsPage from "./pages/DocumentsPage";
import HistoryPage from "./pages/HistoryPage";
import PortfolioPage from "./pages/PortfolioPage";
import InvoicePage from "./pages/InvoicePage";
import SettingsPage from "./pages/SettingsPage";

// Create a new query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/task" element={<Newsletter />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/compilation" element={<CompilationPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
