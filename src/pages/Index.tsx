
import React from 'react';
import NoteGliderLayout from '@/components/landing/NoteGliderLayout';
import NoteGliderHero from '@/components/landing/NoteGliderHero';
import ProductSlider from '@/components/landing/ExploreDocuments';
import WalletSection from '@/components/landing/StreamLine';
import FeatureGrid from '@/components/landing/FeatureGrid';
import DeveloperSection from '@/components/landing/InterOperableFlow';
import BuildReasons from '@/components/landing/USP';
import GrantsSection from '@/components/landing/WorkflowSteps';
import CommunitySection from '@/components/landing/Footer';

const Index = () => {
  return (
    <NoteGliderLayout>
    {/* NoteGliderLayout */}

      {/* Hero Section */}
      {/* NoteGliderHero */}
      <NoteGliderHero />
      
      {/* Products Slider */}
      {/* ProductSlider */}
      <ProductSlider />
      
      {/* Wallet App Section - White Background */}
      {/* WalletSection */}
      <WalletSection />
      
      {/* Feature Grid Section */}
      {/* FeatureGrid */}
      <FeatureGrid />
      
      {/* Developer Section */}
      {/* DeveloperSection */}
      <DeveloperSection />
      
      {/* Why Build Section */}
      {/* BuildReasons */}
      <BuildReasons />
      
      {/* Grants Section - White Background */}
      {/* GrantsSection */}
      <GrantsSection />
      
      {/* Community & Footer Section */}
      {/* CommunitySection */}
      <CommunitySection />

    {/* NoteGliderLayout */}
    </NoteGliderLayout>
  );
};

export default Index;
