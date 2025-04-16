
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  rating?: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  title,
  rating = 5,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-border"
    >
      {rating > 0 && (
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      )}
      
      <div className="mb-6">
        <p className="text-lg leading-relaxed italic">"{quote}"</p>
      </div>
      
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
