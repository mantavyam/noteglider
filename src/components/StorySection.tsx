
import React from 'react';
import ScrollRevealSection from './ScrollRevealSection';

interface StorySectionProps {
  title: string;
  subtitle?: string;
  description: string;
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

const StorySection: React.FC<StorySectionProps> = ({
  title,
  subtitle,
  description,
  align = 'center',
  children,
  className = '',
  id
}) => {
  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-4xl mx-auto ${textAlign[align]}`}>
          <ScrollRevealSection>
            {subtitle && (
              <p className="text-primary font-medium mb-2">{subtitle}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {description}
            </p>
          </ScrollRevealSection>
          
          {children && (
            <ScrollRevealSection delay={0.3}>
              {children}
            </ScrollRevealSection>
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
