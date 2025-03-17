
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  threshold?: number;
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  delay = 0.2,
  direction = 'up',
  className = '',
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });
  const controls = useAnimation();

  // Set initial animation states based on direction
  let initial = {};
  switch (direction) {
    case 'up':
      initial = { y: 50, opacity: 0 };
      break;
    case 'down':
      initial = { y: -50, opacity: 0 };
      break;
    case 'left':
      initial = { x: 50, opacity: 0 };
      break;
    case 'right':
      initial = { x: -50, opacity: 0 };
      break;
    default:
      initial = { y: 50, opacity: 0 };
  }

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
