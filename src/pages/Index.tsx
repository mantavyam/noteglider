
import React from 'react';
import HaqqLayout from '@/components/HaqqLayout';
import HaqqHero from '@/components/HaqqHero';
import ProductSlider from '@/components/ProductSlider';
import WalletSection from '@/components/WalletSection';
import FeatureGrid from '@/components/FeatureGrid';
import DeveloperSection from '@/components/DeveloperSection';
import BuildReasons from '@/components/BuildReasons';
import GrantsSection from '@/components/GrantsSection';
import CommunitySection from '@/components/CommunitySection';

const Index = () => {
  return (
    <HaqqLayout>
      {/* Hero Section */}
      <HaqqHero />
      
      {/* Products Slider */}
      <ProductSlider />
      
      {/* Wallet App Section - White Background */}
      <WalletSection />
      
      {/* Feature Grid Section */}
      <FeatureGrid />
      
      {/* Developer Section */}
      <DeveloperSection />
      
      {/* Why Build Section */}
      <BuildReasons />
      
      {/* Grants Section - White Background */}
      <GrantsSection />
      
      {/* Community & Footer Section */}
      <CommunitySection />
    </HaqqLayout>
  );
};

export default Index;
