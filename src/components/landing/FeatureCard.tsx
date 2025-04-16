
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  imageUrl?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = 'bg-primary/5',
  imageUrl,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`${color} rounded-2xl p-8 border border-border/50 hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
    >
      <div className="relative z-10">
        <div className="bg-background/80 rounded-full p-4 inline-flex items-center justify-center mb-6 shadow-sm backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {imageUrl && (
        <div className="absolute -bottom-16 -right-16 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <img src={imageUrl} alt="" className="w-full h-full object-contain" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default FeatureCard;
